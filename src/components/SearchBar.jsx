import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import "bootstrap-daterangepicker/daterangepicker.css";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

function SearchBar({ onButtonClick, buttonLabel,dropdown },props) {
  const apiUrl = process.env.REACT_APP_BASE_URL;
  
  const storedData = JSON.parse(localStorage.getItem("searchData")) || {
    destination: null,
    dateRange: { startDate: null, endDate: null },
    roomCount: 0,
    adults: 0,
    children: 0,
  };
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [destination, setDestination] = useState(storedData.destination);
  const [dateRange, setDateRange] = useState(storedData.dateRange);
  const [roomCount, setRoomCount] = useState(storedData.roomCount);
  const [adults, setAdults] = useState(storedData.adults);
  const [children, setChildren] = useState(storedData.children);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/v1/master/property/get-all-property-locations`
        );
        if (response.data && response.data.status && response.data.data) {
          const cities = response.data.data.map((property) => ({
            value: property.city,
            label: property.city,
          }));
          setDestinationOptions(cities);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDestinationChange = (selectedOption) => {
    setDestination(selectedOption);
  };


  const decrementRoom = () => {
    if (roomCount > 1) {
      setRoomCount(roomCount - 1);
    }
  };

  const incrementRoom = () => {
    setRoomCount(roomCount + 1);
  };
  
  useEffect(() => {
    // Retrieving data from localStorage
    const storedData = localStorage.getItem("searchData");
    if (storedData) {
      const searchData = JSON.parse(storedData);
      // Use searchData as needed in other parts of the component
      // console.log(searchData); // Just for demonstration, use the data accordingly
    }
  }, []);
  
  const handleDateSelect = (event, picker) => {
    setDateRange({
      startDate: moment(picker.startDate.toDate()).format('ddd Do MMM') ,
      endDate: moment(picker.endDate.toDate()).format('ddd Do MMM'),
    });
  };
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollPercentage = (window.scrollY / window.innerHeight) * 100;
      setScrollPercentage(newScrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Guests
  const dropdownRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Click occurred outside the dropdown, so close it
      // You may add further logic here to handle the closing of dropdown
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  
  const handleDropdownClick = (event) => {
    event.preventDefault();
    // Handle the dropdown click event, e.g., increment or decrement
    const { target } = event;
    if (target.classList.contains("increment-adults")) {
      setAdults(adults + 1);
    } else if (target.classList.contains("decrement-adults")) {
      if (adults > 0) {
        setAdults(adults - 1);
      }
    } else if (target.classList.contains("increment-children")) {
      setChildren(children + 1);
    } else if (target.classList.contains("decrement-children")) {
      if (children > 0) {
        setChildren(children - 1);
      }
    }
    event.stopPropagation();
  };

const handleButtonClick = () => {
  if (!destination || !dateRange.startDate || !dateRange.endDate || roomCount === 0 || adults === 0) {
    // Display an alert or some error message for the user
    toast.error("Please fill all fields.", {
      style: {
        background: '#1e2526', // Set background color to pink
        color:"white"
      },
      progressStyle: {
        background: '#b69b6c', // Set progress bar color to gold
      },
      closeButton: <IoClose color="white" />, // Set close button to white
      closeOnClick: true, 
    });
    return;
  }

  // Additional logic for handleSearch
  const searchData = {
    destination,
    roomCount,
    adults,
    children,
    dateRange,
    extraBed: 0
  };
  onButtonClick(searchData);
  console.log('>>>>>>>>>>>', "serach")
  // Storing data in localStorage
  localStorage.setItem("searchData", JSON.stringify(searchData));

};

  return (
  <>
  
    <div className={`searchbar-section   p-1`} >
      <div className="container ">
        <div className="multi-main-search searchbarborder py-5 row d-flex justify-content-between align-items-center searchbar-mobile">
          {/* Destination */}       
          <div className="col-lg-2 border-right p-0 text-center">
  <Dropdown className="border-0">
    <Dropdown.Toggle
      variant="outline-darkgreen text-white"
      id="destinationDropdown"
      className="border-0"
    >
      {destination ? destination.label : "Search Destination"}
      {dropdown==="room"?(null):(<img
        src="https://hatimi.s3.amazonaws.com/frontendpropertyImages/dropdownarrow.svg"
        className="img-fluid dropdownarrow"
        alt="image"
      />)}
    </Dropdown.Toggle>

    {dropdown==="room"?(null):(<Dropdown.Menu className="darkgreen text-white dropdown_border">
      {destinationOptions.map((option) => (
        <Dropdown.Item
          key={option.value}
          className="drop-down-li text-white px-5 mx-0 bg-transparent border-0"
          onClick={() => handleDestinationChange(option)}
        >
          {option.label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>)}
  </Dropdown>
</div>

          {/* Date Picker */}

          <div className="col-lg-4 broder-right px-1">
            
            <div className=" search-box-single d-flex flex-row justify-content-center fs-4 gap-2">
              
              <DateRangePicker onApply={handleDateSelect}>
                <div className="search-box-single d-flex align-items-center gap-3">
                  <div className="d-flex flex-column justify-content-start align-items-start w-75">
                    <p className="m-0 ms-3 text-white fs-6 text-start">
                      Check in
                    </p>
                    <input
                      type="text"
                      className="form-searchbar text-center custom-date-picker"
                      value={
                        dateRange.startDate ? dateRange.startDate : 'DD-MM-YY'
                      }
                      readOnly
                      
                      style={{
                        border: "none", // Remove default border
                        outline: "none", // Remove focus outline
                        boxShadow: "none", // Remove focus box-shadow
                        fontSize: "18px",
                        fontFamily: "lorin",
                      }}
                    />
                  </div>
                  <p className="text-white">-</p>
                </div>
              </DateRangePicker>
              <DateRangePicker onApply={handleDateSelect} className="border-0">
                <div className="search-box-single d-flex align-items-center  gap-2">
                  <div className="d-flex flex-column justify-content-center align-items-start w-75">
                    <p className="m-0  ms-3 text-white fs-6">Check out</p>
                    <input
                      type="text"
                      className="form-searchbar text-center border-0 "
                      value={
                        dateRange.endDate ? dateRange.endDate : "DD-MM-YY"
                         
                      }
                      readOnly
                     
                      style={{
                        border: "none", // Remove default border
                        outline: "none", // Remove focus outline
                        boxShadow: "none", // Remove focus box-shadow
                        fontSize: "18px",
                        fontFamily: "lorin",
                      }}
                    />
                  </div>
                  <img
                    src="https://hatimi.s3.amazonaws.com/frontendpropertyImages/calsearchbar.svg"
                    className="calsearchbar_img"
                    alt="image"
                  />
                </div>
              </DateRangePicker>
            </div>
          </div>
         

          {/* Room */}

          
<div className="d-flex col-lg-4 gap-2 justify-content-evenly">
<div className=" broder-right text-white d-flex justify-content-center align-items-center gap-2 px-0">
      <Dropdown
       
        className="border-0 "
        drop="down"
      >
        <Dropdown.Toggle
          variant="outline-darkgreen"
          id="dropdown-basic"
          className="bg-transparent border-0 d-flex gap-3 align-items-center ps-0 pe-4"
          
        >
          <div className="d-flex flex-column">
            <p className="m-0 text-start">Rooms</p>
            {`Rooms: ${roomCount}`}
          </div>
          <img
            src="https://hatimi.s3.amazonaws.com/frontendpropertyImages/roomsearchbar.svg"
            className="calsearchbar_img"
            alt="image"
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className="darkgreen text-white dropdown_border " x-placement="bottom-start" >
          <Dropdown.ItemText className="text-white" >Rooms</Dropdown.ItemText>
          <Dropdown.Item className="d-flex align-items-center justify-content-between p-3 gap-2 text-white bg-transparent">
            <span>Rooms</span>
            <div className="d-flex align-items-center product_detail_increment text-white rounded">
              <button
                className="btn btn-sm text-white m-0 border-0"
                onClick={(e) => {
                  decrementRoom();
                   e.preventDefault();
                  e.stopPropagation();
                }}
              >
                -
              </button>
              <span className="mx-2">{roomCount}</span>
              <button
                className="btn btn-sm text-white m-0 border-0"
                onClick={(e) => {
                  incrementRoom();
                   e.preventDefault();
                  e.stopPropagation();
                }}
              >
                +
              </button>
            </div>
          </Dropdown.Item>
          <p className="m-0 max-members">Max 5 rooms</p>
        </Dropdown.Menu>
      </Dropdown>
    </div>

          {/* persons */}
         
            <div className="row  px-0 m-0">
      <div className="col d-flex justify-content-center align-items-center px-0">
        <Dropdown>
          <Dropdown.Toggle variant="outline-darkgreen" id="dropdown-basic" className="d-flex gap-2 align-items-center">
        
            <div className="d-flex flex-column text-white">
              <p className="m-0 text-start">Guests</p> {adults} P{" "}
              {/* {children} K */}
            </div>
            <img
              src="https://hatimi.s3.amazonaws.com/frontendpropertyImages/guest.svg"
              className="img-fluid h-50 ps-3"
              alt="image"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className="darkgreen dropdown_border gap-2">
  <Dropdown.Item className="drop-down-li d-flex justify-content-between text-white gap-2 py-2 bg-transparent">
    Persons :
    <div className="product_detail_increment text-white rounded d-flex align-items-center">
      <p
        className="btn btn-sm text-white m-0 decrement-adults border-0"
        onClick={handleDropdownClick} // This will trigger your logic
      >
        -
      </p>
      <p className="m-0"> {adults}</p>
      <p
        className="btn btn-sm text-white m-0 increment-adults border-0"
        onClick={handleDropdownClick} // This will trigger your logic
      >
        +
      </p>
    </div>
  </Dropdown.Item>
  {/* <Dropdown.Item className="drop-down-li d-flex justify-content-between text-white gap-2 py-2 bg-transparent">
    Kids :
    <div className="product_detail_increment text-white rounded d-flex align-items-center">
      <p
        className="btn btn-sm text-white m-0 decrement-children border-0"
        onClick={handleDropdownClick} // This will trigger your logic
      >
        -
      </p>
      <p className="m-0">{children}</p>
      <p
        className="btn btn-sm text-white m-0 increment-children border-0"
        onClick={handleDropdownClick} // This will trigger your logic
      >
        +
      </p>
    </div>
  </Dropdown.Item>
  <p className="m-0 max-members text-start px-2">
    Above 5 years will not be considered as Kids
  </p> */}
</Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
</div>
       

    
          {/* Submit Button */}
          <div
            className={` d-flex justify-content-center ${
              props.check === "home" ? "col-lg-1" : "col-lg-2"
            }`}
          >
           

            <button className="eg-btn btn btn-searchbar" onClick={handleButtonClick} >{buttonLabel}</button>
            
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default SearchBar;
