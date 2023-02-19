import { ResponsiveLine } from '@nivo/line'
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import React from 'react';
import { ResponsiveBump } from '@nivo/bump'

const LineChart = ({isDashboard = false}) => {
   const email = useSelector((state) => state.global.email);
   // const { data, isLoading } = useGetSalesQuery(email);
   // console.log(data)
   const theme = useTheme();
   const data =
         [
            {
               id: "japan",
               color: "hsl(212, 70%, 50%)",
              data: [
                {
                  x: "plane",
                  y: 8
                },
                {
                  x: "helicopter",
                  y: 7
                },
                {
                  x: "dsdd",
                  y: 1
                },
                {
                  x: "dssd",
                  y: 3
                },
                {
                  x: "fgdf",
                  y: 11
                }
              ]
            }
         ]
   // if (!data || isLoading) return "Loading...";
return
   ( 
      <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
   <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "transportation", 
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "count", 
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  </Box>
    )
      }
export default LineChart;