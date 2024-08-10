import React from 'react'
import RoomCard from '../../../utils/RoomCard';
import AlarmClockIcon from '@mui/icons-material/Alarm';
import IronIcon from '@mui/icons-material/Iron'; // Use the closest available icon
import WifiIcon from '@mui/icons-material/Wifi';
import KingBedIcon from '@mui/icons-material/KingBed';
import { Container, Grid } from '@mui/material';
import SearchBar from '../../SearchBar';

const data = [
    {
      image: '/assets/images/banners/matheran1.jpg',
      title: 'Standard Room',
      PropertyLocation:"maimoon Villa",
      location: 'Matheran',
      capacity: 14,
      rating: 4.6,
      rooms: 4,
      price:5300,
      taxes:646,
      availableRooms:1,
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
const Booking = () => {
  return (
    <Container>
          <SearchBar
        className="bookings"
        style={{ position: "relative", top: 0 }}

        buttonLabel="Update Search"
        dropdown="property"
      />
    <Grid container spacing={3}>
        {data.map((item, index) => (
          <RoomCard key={index} {...item} />
        ))}
      </Grid>
    </Container>
  )
}

export default Booking