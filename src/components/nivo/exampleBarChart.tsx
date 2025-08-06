"use client"
import React from 'react';
import '@/app/styles.css'

// import { useTheme } from 'next-themes'
import { ResponsiveBar } from "@nivo/bar";
import { mockBarData as data } from "./mockData";
import colors from 'tailwindcss/colors'

const BarChart = ({ isDashboard = false }) => {

  const formatDollar = (tickItem: number) => {

    return `$${tickItem/1000}k`;
  }

  // const { theme, setTheme } = useTheme()
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
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
      keys={["Term Life Premiums", "Whole Life Premiums"]}
      indexBy="quarter"
      margin={{ top: 0, right: 30, bottom: 80, left: 50 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={['#1E5FD0', '#65A2FF']}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      // axisBottom={{
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: isDashboard ? undefined : "country", // changed
      //   legendPosition: "middle",
      //   legendOffset: 32,
      // }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: formatDollar,
        // legend: isDashboard ? undefined : "new clients", // changed
        // legendPosition: "middle",
        // legendOffset: -40,
      }}
      // enableGridY={false}
      enableGridX={true}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          // translateX: 120,
          translateY: 70,
          itemsSpacing: 2,
          itemWidth: 150,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in quarter: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
