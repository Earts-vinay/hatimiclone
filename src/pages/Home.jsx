import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const ImageChanger = () => {
  const navigateTo = useNavigate();
  const handleHomeButtonClick = (location) => {
    console.log('>>>>>>>>>>>from home', location)
    // Redirect to Properties page
    navigateTo('/home/properties');
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  const getImages = () => {
    if (isMobile) {
      return [
        'assets/images/banners/mobileBanners/mobilemaimoon.jpg',
        'assets/images/banners/mobileBanners/lonavalmobilenew.jpg',
        'assets/images/banners/mobileBanners/mobilepanchagani.jpg',
        'assets/images/banners/mobileBanners/mobilemontabu.jpg',
        'assets/images/banners/mobileBanners/mobiledumas.jpg',
      ];
    } else {
      return [
        '/assets/images/banners/matheran1.jpg',
        '/assets/images/banners/lonavalanew.jpg',
        '/assets/images/banners/panchagani.png',
        '/assets/images/banners/mountabu1.jpg',
        '/assets/images/banners/Dumas1.jpg',
      ];
    }
  };

  const images = getImages();
  const linkTexts = ['Matheran', 'Lonavala', 'Panchgani', 'Mount Abu', 'Dummas'];

  return (
    <Box sx={{ position: 'relative', top: '-4rem' }}>
      <Box sx={{ position: 'relative', height: {lg:"90vh",md:"60vh",sm:"60vh",xs:"50vh"} }}>
        <Carousel
          autoPlay={true}
          interval={5000} // Time in milliseconds
          indicators={false}
          navButtonsAlwaysVisible
          onChange={(index) => handleSelect(index)}
          sx={{ height: '100%' }}
        >
          {images.map((image, index) => (
            <Box key={index}>
              <img
                src={image}
                alt={linkTexts[index]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Carousel>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            p: 2,
            boxSizing: 'border-box',
            zIndex:1
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex',flexWrap:"wrap", gap: '1rem', padding: 0,borderBottom:"1px solid white", }}>
            {linkTexts.map((linkText, index) => (
              <li key={index} >
                <Box
                  onClick={() => handleSelect(index)}
                  variant="text"
                  sx={{
                    color: activeIndex === index ? '#B69B6C' : '#fff',
                    borderBottom: activeIndex === index ? '4px solid #B69B6C' : 'none',
                    fontFamily:"footlight",
                    fontSize:"18px",
                    padding:"10px",
                    textDecoration:"capitalize",
                    position:"relative",
                    top: "2px"
                  }}
                >
                  {linkText}
                </Box>
              </li>
            ))}
          </ul>
        </Box>
        <SearchBar className="" check="home" onButtonClick={handleHomeButtonClick} buttonLabel="Search" dropdown="home"/>
      </Box>
    </Box>
  );
};

export default ImageChanger;
