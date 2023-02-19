import React,{useEffect,useState} from "react";
import { Box, useTheme } from "@mui/material";
import { useGetGeographyQuery } from "state/api";
import Header from "components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { GoogleMap,useJsApiLoader,Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";


const Geography = () => {
  const theme = useTheme();
  // const adminEmail = useSelector((state) => state.global.adminEmail);
  // const { data } = useGetGeographyQuery();
  // console.log(data)
  const [pin,setPin]=useState([]);
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey:"AIzaSyAMkFVMHIxpljPG08GMy61R2eCTpRpz_SI",}); 
  const adminEmail = useSelector((state) => state.global.adminEmail);
  const { data } = useGetGeographyQuery(adminEmail);
  console.log(data)

  // if(data){
  //    setPin(data)
  // }
  // useEffect(()=>{
  //   setPin(data)
  // },[data])
  const onMarkerClick = (title) => {
   alert(title);
  };

  if(!isLoaded) 
    return <>Loading...</>
  return (
    <>
  {data && 
   (<Box position='absolute' height='100%' width='100%'>
     <GoogleMap 
     center={{lat:32.2242783,lng:35.2450083}}
     zoom={10}
     mapContainerStyle={{width:'100%',height:'100%'}}
     >
       {data.map((item,index) => {
          return(
            <Marker
              position={{
                lat:item.latitude,
                lng:item.longitude
              }}
              key={index}
              label={item.title}
              onClick={()=>onMarkerClick(item.title)}
            />
           )
        })
      } 
     </GoogleMap>
   </Box>)}
   </>
  );
};


export default Geography;
