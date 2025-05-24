import { Routes, Route } from 'react-router-dom';
import './UI.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Chat from './components/Chat';
import CampusMap from './pages/CampusMap';
import CreateListing from './pages/CreateListing';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
// import Orders from './pages/Orders'; // Uncomment if used
// import Settings from './pages/Settings'; // Uncomment if used

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/profile" element={<Profile />} />
      {/* <Route path="/dashboard/orders" element={<Orders />} />
      <Route path="/dashboard/settings" element={<Settings />} /> */}
      <Route path="/create-listing" element={<CreateListing />} />
      <Route path="/listings/:id" element={<ListingDetail />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/map" element={<CampusMap />} />
    </Routes>
  );
}

export default App;
