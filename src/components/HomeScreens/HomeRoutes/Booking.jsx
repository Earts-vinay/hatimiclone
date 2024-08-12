import React, { useEffect, useState } from 'react'
import RoomCard from '../../../utils/RoomCard';
import { Container, Grid } from '@mui/material';
import SearchBar from '../../SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRoomData } from '../../../redux/ApiResponse/roomSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Cart from '../../Cart/Cart';
import { HashLoader } from "react-spinners";

const Booking = () => {
  const dispatch = useDispatch();
  const { propertyId } = useParams();
  const availableRooms = useSelector((state) => state.room.availableRooms)
  const soldOutRooms = useSelector((state) => state.room.soldOutRooms)
  const propertyData = useSelector((state) => state.room.propertyData)
  const loading = useSelector((state) => state.room.loading)

  const [bookingData, setBookingData] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem('searchData');
    if (storedData) {
      const searchedData = JSON.parse(storedData);
      setBookingData(searchedData);
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (bookingData && bookingData.dateRange && bookingData.dateRange.startDate && bookingData.dateRange.endDate) {
          await dispatch(fetchRoomData({ propertyId, bookingData }));
        } else {
          console.log('Booking Data is Missed or Invalid');
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };
    fetchData();
  }, [bookingData, propertyId, dispatch]);

  const handleRoomTypeSelect = (event) => {
    setSelectedRoomType(event.target.value);
  };

  const filteredRooms = selectedRoomType
    ? availableRooms?.filter((room) => room.room_type === selectedRoomType)
    : availableRooms;

  if (loading) {
    return (
      <div className="loading-spinner w-100 d-flex justify-content-center align-items-center">
        <HashLoader color={"#B08E54"} loading={loading} size={50} />
      </div>
    );
  }

  return (
    <Container>
      <SearchBar
        className="bookings"
        style={{ position: "relative", top: 0 }}

        buttonLabel="Update Search"
        dropdown="property"
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "40px" }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel sx={{ color: "white" }}>
            Room Type
          </InputLabel>
          <Select
            value={selectedRoomType}
            label="Room Type"
            onChange={handleRoomTypeSelect}
            sx={{ border: "1px solid white", color: "#FFF", backgroundColor: "#333" }}
          >
            {
              Array.from(new Set(availableRooms?.flatMap((room) => room.room_type)))
                .map((type) => (
                  <MenuItem
                    key={type}
                    value={type}
                  >
                    {type}
                  </MenuItem>
                ))
            }
          </Select>
        </FormControl>

        <Cart />
      </div>

      <Grid container spacing={3}>
        {
          filteredRooms.length === 0 ? (
            <h2 className=" text-white mt-5 mobileresponsive mx-5 px-5">
              No rooms available for this property
            </h2>
          ) : (
            filteredRooms.map((room) => (
              <RoomCard
                key={room._id}
                image={room.room_images[0]}
                title={room.room_type}
                location={propertyData?.property_city}
                capacity={room.max_guest_occupancy}
                rating="4.6"
                rooms={room.bed_size}
                size={room.room_size}
                amenities={room.room_amenities.map(amenity => ({
                  name: amenity.amenity_name,
                  icon: <img src={amenity.amenity_icon} alt={amenity.amenity_name} style={{ width: 24, height: 24 }} />
                }))}
                PropertyLocation={room.property_name}
                price={room.room_charge}
                taxes={
                  Number(room.room_charge) >= 7500
                    ? Number(room.room_charge * (18 / 100))
                    : Number(room.room_charge) * (12 / 100)
                }
                availableRooms={room.availableRooms}
              />
            ))
          )
        }
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {
          soldOutRooms.map((room) => (
            <RoomCard
              key={room._id}
              image={room.room_images[0]}
              title={room.room_type}
              location={propertyData?.property_city}
              capacity={room.max_guest_occupancy}
              rating="4.6"
              rooms={room.bed_size}
              size={room.room_size}
              amenities={room.room_amenities.map(amenity => ({
                name: amenity.amenity_name,
                icon: <img src={amenity.amenity_icon} alt={amenity.amenity_name} style={{ width: 24, height: 24 }} />
              }))}
              PropertyLocation={room.property_name}
              price={room.room_charge}
              taxes={
                Number(room.room_charge) >= 7500
                  ? Number(room.room_charge * (18 / 100))
                  : Number(room.room_charge) * (12 / 100)
              }
              availableRooms={room.availableRooms}
            />
          ))
        }
      </Grid>
    </Container>
  )
}

export default Booking