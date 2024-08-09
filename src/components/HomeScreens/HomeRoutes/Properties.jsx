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
import AlarmClockIcon from '@mui/icons-material/Alarm';
import IronIcon from '@mui/icons-material/Iron'; // Use the closest available icon
import WifiIcon from '@mui/icons-material/Wifi';
import KingBedIcon from '@mui/icons-material/KingBed';


const data = [
  {
    image: '/assets/images/banners/matheran1.jpg',
    title: 'Maimoon Villa',
    location: 'Matheran',
    capacity: 14,
    rating: 4.6,
    rooms: 4,
    size: '35000 sq ft',
    amenities: [
      { name: 'Alarm Clock', icon: <AlarmClockIcon /> },
      { name: 'Iron', icon: <IronIcon /> }, // Closest available icon
      { name: 'Wi-Fi', icon: <WifiIcon /> },
      { name: 'King size bed', icon: <KingBedIcon /> }, // Closest available icon
    ],
  },
  // Add more data objects as needed
];

const Properties = () => {
  const dispatch = useDispatch();
  const { properties, location, loading, error } = useSelector(
    (state) => state.property
  );
  useEffect(() => {
    const destinationData = JSON.parse(localStorage.getItem("searchData"));
    dispatch(setLocation(destinationData?.destination?.value || ""));
  }, [dispatch]);
  return (
    <Container>
      <SearchBar
        className="bookings"
        style={{ position: "relative", top: 0 }}

        buttonLabel="Update Search"
        dropdown="property"
      />

      <Typography variant='h3' sx={{ fontFamily: "footlight", color: "white", pb: 3, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3rem' } }}>Properties in {location}</Typography>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <DefaultCard key={index} {...item} />
        ))}
      </Grid>
    </Container>
  )
}

export default Properties