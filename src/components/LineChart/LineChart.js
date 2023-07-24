import React, { useEffect, useMemo, useState } from "react";
import { LinePath } from "@visx/shape";
import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { scaleTime, scaleLinear } from "@visx/scale";
import { extent } from "d3-array";

export const blues = ["#ecf4f3", "#68b0ab", "#006a71"];

export default function LineChart({ width, height, stats, color }) {
  const data = stats;
  const getDate = (d) => new Date(d.date).valueOf();
  const getStockValue = (d) => d.close;
  const xScale = useMemo(
    () =>
      scaleTime({
        domain: extent(data, (d) => getDate(d)),
        range: [0, width]
      }),
    [width]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: extent(data, (d) => getStockValue(d)),
        range: [height - 100, 100]
      }),
    [height]
  );
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={`rgba(0, 0, 0, 0)`} />
      <LinePath
        stroke={color}
        strokeWidth={2}
        data={data}
        x={(d) => xScale(getDate(d)) ?? 0}
        y={(d) => yScale(getStockValue(d)) ?? 0}
      />
    </svg>
  );
}
