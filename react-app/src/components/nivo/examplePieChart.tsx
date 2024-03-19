"use client"
import React from 'react';
import '@/app/styles.css'

// import { useTheme } from 'next-themes'
import { ResponsivePie } from "@nivo/pie";
import { mockPieData as data } from "./mockData";
import colors from 'tailwindcss/colors'

const PieChart = () => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.gray[600],
            },
          },
          legend: {
            text: {
              fill: colors.gray[600],
            },
          },
          ticks: {
            line: {
              stroke: colors.gray[600],
              strokeWidth: 1,
            },
            text: {
              fill: colors.gray[600],
            },
          },
        },
        legends: {
          text: {
            fill: colors.gray[600],
          },
        },
      }}
      colors={['#46B974', '#2864CC', '#1DAFCF', '#FBC756', '#B13984']}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.6}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.gray[600]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 75,
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
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
