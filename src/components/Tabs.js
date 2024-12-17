// src/components/Tabs.js
import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom'; // For routing
import { useLocation } from 'react-router-dom'; // To track the active tab

const BottomTabs = () => {
  const location = useLocation(); // Get current location to determine active tab
  const value = location.pathname; // Use the path to set the active tab

  return (
    <div className="bottom-tabs-container">
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
        aria-label="Bottom Navigation Tabs"
      >
        <Tab
          label="TTI"
          value="/tti"
          component={Link}
          to="/tti"
        />
        <Tab
          label="Salik"
          value="/salik"
          component={Link}
          to="/salik"
        />
        <Tab
          label="Jumeirah"
          value="/jumeirah"
          component={Link}
          to="/jumeirah"
        />
      </Tabs>
    </div>
  );
};

export default BottomTabs;
