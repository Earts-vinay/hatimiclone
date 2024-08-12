// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Destinations from './pages/Destination';
import Events from './pages/Events';
import DayPass from './pages/Daypass';
import Blogs from './pages/Blogs';
import Contactus from './pages/Contactus';
import "./App.css"
import Properties from './components/HomeScreens/HomeRoutes/Properties';
import Booking from './components/HomeScreens/HomeRoutes/Booking';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
       <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/home/properties" element={<Properties/>} />
          <Route path="/home/booking/:propertyId" element={<Booking />} />
          <Route path="/destinations" element={<Destinations/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/daypass" element={<DayPass/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/contact" element={<Contactus/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
