// // src/App.js
// import React from "react";
// import TravelTimeIndexTable from "./components/TravelTimeIndexTable";

// const App = () => {
//   return (
//     <div>
//       <TravelTimeIndexTable />
//     </div>
//   );
// };

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TravelTimeIndexTable from './components/TravelTimeIndexTable';
import HomePage from './components/HomePage'; 
import BottomTabs from './components/Tabs'; 
import Jumeirah from './components/Jumeirah';
import Salik from './components/Salik';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tti" element={<TravelTimeIndexTable />} />
        <Route path="/salik" element={<Salik />} />
        <Route path="/jumeirah" element={<Jumeirah />} />
      </Routes>
      <BottomTabs /> {/* Display tabs on every page, placed outside Routes */}
    </Router>
  );
};

export default App;

