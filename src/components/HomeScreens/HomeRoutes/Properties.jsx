import React, { useEffect } from 'react'
import SearchBar from '../../SearchBar'
import { useSelector, useDispatch } from "react-redux";
import {
  setLocation,
  setLoading,
  fetchProperties,
} from "../../../redux/ApiResponse/propertySlice";
import DefaultCard from '../../../utils/DefaultCard';
import { Container, Grid, Typography } from '@mui/material';


const Properties = () => {
  const dispatch = useDispatch();
  const { properties, location, loading, error } = useSelector(
    (state) => state.property
  );

  const filterData = properties?.data?.filter((obj) => obj.property_city === location);
  console.log(filterData);

  useEffect(() => {
    const destinationData = JSON.parse(localStorage.getItem("searchData"));
    dispatch(setLocation(destinationData?.destination?.value || ""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const updateSearch = ({ destination }) => {
    dispatch(setLocation(destination.value)); // Dispatch the action to update location
    // const filterData = properties?.data.filter((obj) => obj.property_city === destination.value);

    console.log('>>>>>>>>>>>dest', destination)
  };


  return (
    <Container>
      <SearchBar
        className="bookings"
        style={{ position: "relative", top: 0 }}
        onButtonClick={updateSearch}
        buttonLabel="Update Search"
        dropdown="property"
      />

      <Typography variant='h3' sx={{ fontFamily: "footlight", color: "white", pb: 3, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3rem' } }}>Properties in {location}</Typography>
      <Grid container spacing={3}>

        {filterData?.length === 0 ? (
          <h2 className="px-5 mx-5 text-white mt-5 mobileresponsive">
            No properties available in {location}
          </h2>
        ) :
          (
            filterData?.map((item) => (
              <DefaultCard
                key={item._id}
                image={item.property_images[0]}
                title={item.property_name}
                location={item.property_city}
                capacity={item.max_capacity}
                rating={item.property_rating}
                rooms={item.total_rooms}
                size={item.property_size}
                amenities={item.indoor_amenities.map(amenity => ({
                  name: amenity.amenity_name,
                  icon: <img src={amenity.amenity_icon} alt={amenity.amenity_name} style={{ width: 16, height: 16 }} />
                }))}
                propertyId={item.property_uid}
              />
            ))
          )
        }
      </Grid>
    </Container>
  )
}

export default Properties