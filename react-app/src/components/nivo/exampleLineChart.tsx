"use client"
import React from 'react';
import '@/app/styles.css'

// import { useTheme } from 'next-themes'
import { ResponsiveLine } from "@nivo/line";
import { mockLineData as data } from "./mockData";
import colors from 'tailwindcss/colors'

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const formatDollar = (tickItem: number) => {

    return `$${tickItem/1000}k`;
  }

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#EFF1F3",
            },
          },
          legend: {
            text: {
              fill: "hsla(204, 61%, 15%, 56%)",
            },
          },
          ticks: {
            line: {
              stroke: "#A8B6C5",
              strokeWidth: 1,
            },
            text: {
              fill: "hsla(204, 61%, 15%, 56%)",
            },
          },
        },
        legends: {
          text: {
            fill: colors.gray[600],
          },
        },
        grid: {
          line: {
            stroke: '#EFF1F3',
          },
        },
      }}
      colors={['#DC5858']} // added
      margin={{ top: 20, right: 30, bottom: 30, left: 50 }}
      xScale={{ type: "point" }}
      // yScale={{
      //   type: "linear",
      //   min: "auto",
      //   max: "auto",
      //   stacked: true,
      //   reverse: false,
      // }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      // axisBottom={{
      //   orient: "bottom",
      //   tickSize: 0,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: isDashboard ? undefined : "transportation", // added
      //   legendOffset: 36,
      //   legendPosition: "middle",
      // }}
      axisLeft={{
        // orient: "left",
        // tickValues: 5, // added
        // tickSize: 3,
        // tickPadding: 5,
        // tickRotation: 0,
        // legend: isDashboard ? undefined : "count", // added
        // legendOffset: -40,
        // legendPosition: "middle",
        format: formatDollar,
      }}
      enableGridX={true}
      enableGridY={true}
      enableArea={true}
      pointSize={8}
      pointColor={"#DC5858"}
      // pointBorderWidth={0}
      // pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      // legends={[
      //   {
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 100,
      //     translateY: 0,
      //     itemsSpacing: 0,
      //     itemDirection: "left-to-right",
      //     itemWidth: 80,
      //     itemHeight: 20,
      //     itemOpacity: 0.75,
      //     symbolSize: 12,
      //     symbolShape: "circle",
      //     symbolBorderColor: "rgba(0, 0, 0, .5)",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemBackground: "rgba(0, 0, 0, .03)",
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};

export default LineChart;
