import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Label } from '@mui/icons-material';
import Crops from 'scenes/crops';
import Harvests from 'scenes/harvest';

const MyTabs = () => {

   const [selectedTab,setSelectedTab] = React.useState(0)
   const handleChange = (event, newValue) => {
      setSelectedTab(newValue);
    };
   return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={selectedTab}
          onChange={handleChange} 
          aria-label="basic tabs example"
          textColor='secondary'
          // indicatorColor='#ffda85'
          indicatorColor="secondary"
          >
            <Tab label="Planted" />
            <Tab label="Harvest" />
          </Tabs>
      </Box>
    </Box>
    {selectedTab === 0 && <Crops/>}
    {selectedTab === 1 && <Harvests/>}
    </>
  )
}

export default MyTabs;
