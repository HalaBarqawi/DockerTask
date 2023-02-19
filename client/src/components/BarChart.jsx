import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useGetCropAmountQuery } from 'state/api'
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useTheme } from "@mui/material";

const BarChart = () => {
    const theme = useTheme();
    const email = useSelector((state) => state.global.email);
    const { data, isLoading } = useGetCropAmountQuery(email);
    console.log(data);
    const cropName=[];
    if(data){
        data.map((item)=>{
            cropName.push(item.name)
        })
    }
    const colors = [
        "hsl(247, 70%, 50%)",
        "hsl(58, 70%, 50%)",
        "#1b9e77"
       ];
   const crops =[];
   if(data)
   {const result = data.map((item,index) =>{
     let cropName =item.name;
    crops.push({
      "crop":item.name,
      "Oats":item.value, 
      "color": colors[index]
    })
  })}
//    const crops = [
//       {
//         "crop": "AD",
//         "barley": 93,
//         "Color": "hsl(247, 70%, 50%)",
//         // "burger": 133,
//         // "burgerColor": "hsl(187, 70%, 50%)",
//         // "sandwich": 197,
//         // "sandwichColor": "hsl(334, 70%, 50%)",
//         // "kebab": 182,
//         // "kebabColor": "hsl(172, 70%, 50%)",
//         // "fries": 136,
//         // "friesColor": "hsl(25, 70%, 50%)",
//         // "donut": 64,
//         // "donutColor": "hsl(342, 70%, 50%)"
//       },
//       {
//         "crop": "AE",
//         "barley": 136,
//         "Color": "hsl(58, 70%, 50%)",
//         // "fries": 199,
//         // "friesColor": "hsl(159, 70%, 50%)",
//         // "donut": 51,
//         // "donutColor": "hsl(336, 70%, 50%)"
//       },
//       {
//         "crop": "AF",
//         "barley": 112,
//         "Color": "hsl(345, 70%, 50%)",
//         // "burger": 108,
//         // "burgerColor": "hsl(240, 70%, 50%)",
//         // "sandwich": 32,
//         // "sandwichColor": "hsl(161, 70%, 50%)",
//       },
//     ];
   
      return(<ResponsiveBar
          data={crops}
           keys={cropName}
           indexBy="crop"
           margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
           padding={0.3}
           valueScale={{ type: 'linear' }}
           indexScale={{ type: 'band', round: true }}
           colors={{ scheme: 'nivo' }}
           defs={[
               {
                   id: 'dots',
                   type: 'patternDots',
                   background: 'inherit',
                   color: '#38bcb2',
                   size: 4,
                   padding: 1,
                   stagger: true
               },
               {
                   id: 'lines',
                   type: 'patternLines',
                   background: 'inherit',
                   color: '#eed312',
                   rotation: -45,
                   lineWidth: 6,
                   spacing: 10
               }
           ]}
           fill={[
               {
                   match: {
                       id: 'fries'
                   },
                   id: 'dots'
               },
               {
                   match: {
                       id: 'sandwich'
                   },
                   id: 'lines'
               }
           ]}
           borderColor={{
               from: 'color',
               modifiers: [
                   [
                       'darker',
                       1.6
                   ]
               ]
           }}
           axisTop={null}
           axisRight={null}
           axisBottom={{
               tickSize: 5,
               tickPadding: 5,
               tickRotation: 0,
               legend: 'crop',
               legendPosition: 'middle',
               legendOffset: 32
           }}
           axisLeft={{
               tickSize: 5,
               tickPadding: 5,
               tickRotation: 0,
               legend: 'amount',
               legendPosition: 'middle',
               legendOffset: -40
           }}
           labelSkipWidth={12}
           labelSkipHeight={12}
           labelTextColor={{
               from: 'color',
               modifiers: [
                   [
                       'darker',
                       1.6
                   ]
               ]
           }}
           legends={[
               {
                   dataFrom: 'keys',
                   anchor: 'bottom-right',
                   direction: 'column',
                   justify: false,
                   translateX: 120,
                   translateY: 0,
                   itemsSpacing: 2,
                   itemWidth: 100,
                   itemHeight: 20,
                   itemDirection: 'left-to-right',
                   itemOpacity: 0.85,
                   symbolSize: 20,
                   effects: [
                       {
                           on: 'hover',
                           style: {
                               itemOpacity: 1
                           }
                       }
                   ]
               }
           ]}
           role="application"
           ariaLabel="Nivo bar chart demo"
           barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in crop: "+e.indexValue}}
       />)
}

export default BarChart