import React from 'react'
import { useSelector } from 'react-redux';
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useGetTaskStatusQuery } from "state/api";
import { useState } from "react";
import StatBox from './StatBox';

function TasksPieChart({ isDashboard = false }) {
  const email = useSelector((state) => state.global.email);
  const { data, isLoading } = useGetTaskStatusQuery(email);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  console.log(data)
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";
  const colors = [
   "hsl(12, 70%, 50%)",
    theme.palette.secondary[500],
   "#1b9e77"
  ];
  const reformatted =[];

  //  const result = data.map((item,index) =>{
  //   reformatted.push({
  //     id:item.name,
  //     label:item.name, 
  //     value:item.value,
  //     color: colors[index]
  //   })
  // })
  
  return (
    <Box
      height={isDashboard ? "300px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
     <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
      Task Status:
     </Typography>
     {/* <Box
       display="grid"
       gridTemplateColumns="repeat(12, 1fr)"
       // gridAutoRows="160px"
       gap="60px"
       sx={{
         "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
       }}> */}
       <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }} style={{marginTop:10,marginRight:20}}>Late: {data.late}</Typography>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }} style={{marginTop:10,marginRight:20}}>Early: {data.early}</Typography>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }} style={{marginTop:10,marginRight:20}}>On Time: {data.onTime}</Typography>
           {/* <StatBox 
          title={"Late"}
           value={data && data.late}/>
           <StatBox 
          title={"Late"}
           value={data && data.late}/> */}
      {/* </Box> */}
      {/* <ResponsivePie
        data={reformatted}
        
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[300],
              },
            },
            legend: {
            //   text: {
            //     fill: theme.palette.grey[300],
            //   },
            itemTextColor: '#ffff',
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[300],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[300],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[300],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        colors={{ datum: "data.color" }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[400]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[100]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      > */}
        {/* <Typography variant="h6">
          {!isDashboard && "Total:"} ${total}
        </Typography> */}
      {/* </Box> */}
    </Box>
  );
}

export default TasksPieChart
