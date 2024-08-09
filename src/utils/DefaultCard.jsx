import { Box, Container, Grid, Typography } from '@mui/material';
import { IoLocationSharp } from "react-icons/io5";
import CustomButton from './CustomButton';

const DefaultCard = ({ image, title, location, capacity, rating, rooms, size, amenities }) => {
  return (
 
     <Grid item xs={12} sm={12} md={12} lg={12}>
      <Box sx={{  boxShadow: 4,backgroundColor:"#1E2526",  borderRadius: 2,}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {sm:"column",md:"column",lg:"row",xl:"row",xs:"column"},
          overflow: 'hidden',
          width:"100%",
          height: '100%',
          padding:"30px",
          gap:"10px"
        }}
      >
        <Box component="img" src={image} alt={title} sx={{ width:{lg:"40%",md:"100%",sm:"100%",xs:"100%"},height: {lg:"280px",md:"300px",sm:"300px",xs:"200px"}, objectFit: 'cover',borderRadius:"5px" }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: {xs:1,sm:3,md:3,lg:3,xl:3},
            backgroundColor: 'transparent',
          }}
        >
          <Box>
            <Typography variant="h4" component="h4" sx={{color:"#b08e54",fontFamily:"footlight",}}>
              {title}
            </Typography>
            <Typography variant="body1" color="white" sx={{fontFamily:"lorin",alignItems:"center",display:"flex",gap:"8px"}}>
            <IoLocationSharp fontSize="18px"/> {location}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection:{sm:"row",md:"row",lg:"row",xl:"row",xs:"column"},
              alignItems: 'center',
              gap:{lg:8,md:8,sm:8,xs:3},
              pt:1
            }}
          >
            <Box sx={{}}>
             <Box sx={{display:'flex',gap:{lg:0,md:0,sm:0,xs:2},flexDirection:{sm:"column",md:"column",lg:"column",xl:"column",xs:"row"},alignItems:{xs:"center",sm:"start",md:"start",lg:"start"}}}>
             <Typography sx={{fontSize:"16px",color:"#b08e54",fontFamily:"lorin"}}>
                Max capacity of {capacity}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{backgroundColor:"#292C2C",width:"50px",padding:"5px",borderRadius:"5px",mt:1,color:"white"}}>
                {rating} ★
              </Typography>
             </Box>
              <Typography variant="body2"  sx={{backgroundColor:"#292C2C",color:"white",padding:"10px",borderRadius:"5px",mt:2}} >
             Total Rooms : {rooms} | Size : {size} premises
            </Typography>
            </Box>
            <Box >
            <Typography sx={{color:"white",pb:1,fontFamily:"lorin"}}>Offered Amenities</Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                
              }}
            >
              
             {amenities.map((amenity, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            backgroundColor: '#071011',
            color: 'primary.contrastText',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5, // Add space between icon and text
          }}
        >
          {amenity.icon}
          {amenity.name}
        </Box>
      ))}
            </Box>
          </Box>
          </Box>
        </Box>
        
      </Box>
     <Box sx={{textAlign:"end",padding:"10px"}}>
     <CustomButton width='auto'>View Rooms</CustomButton>
     </Box>
     </Box>
    </Grid>
  
  );
};

export default DefaultCard;