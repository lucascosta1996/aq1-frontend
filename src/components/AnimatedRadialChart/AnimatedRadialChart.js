import React, { useRef, useState, useEffect } from 'react';
import { Group } from '@visx/group';
import { LineRadial } from '@visx/shape';
import { scaleTime, scaleLog } from '@visx/scale';
import { curveBasisOpen } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { AxisLeft } from '@visx/axis';
import { GridRadial, GridAngle } from '@visx/grid';
import { animated, useSpring } from '@react-spring/web';

const green = '#e5fd3d';
export const blue = '#0052FF';
const darkgreen = '#0052FF';
export const background = '#000';
const darkbackground = '#FFF';
const strokeColor = '#0052FF';
const springConfig = {
  tension: 60,
};

function AnimatedRadialChart({ width, height, volumeStats, animate = true }) {
  const lineRef = useRef(null);
  const [lineLength, setLineLength] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  // utils
function extent(data, value) {
    if (!data) return;
    const values = data?.map(value);
    return [Math.min(...values), Math.max(...values)];
  }
  
  // accessors
  const date = (d) => new Date(d.date).valueOf();
  const close = (d) => d.close;
  const formatTicks = (val) => String(val);
  
  // scales
  const xScale = scaleTime({
    range: [0, Math.PI * 2],
    domain: extent(volumeStats, date),
  });
  const yScale = scaleLog({
    domain: extent(volumeStats, close),
  });
  
  const angle = (d) => xScale(date(d)) ?? 0;
  const radius = (d) => yScale(close(d)) ?? 0;
  const padding = 20;
  
  const firstPoint = volumeStats[0];
  const lastPoint = volumeStats[volumeStats.length - 1];

  const spring = useSpring({
    frame: shouldAnimate ? 0 : 1,
    config: springConfig,
    onRest: () => setShouldAnimate(false),
  });

  // set line length once it is known after initial render
  const effectDependency = lineRef.current;
  useEffect(() => {
    if (lineRef.current) {
      setLineLength(lineRef.current.getTotalLength());
    }
  }, [effectDependency]);

  useEffect(() => {
    console.log(`volumeStats`, volumeStats);
    // console.log('appleStock', appleStock);
  }, [])

  if (width < 10) return null;

  // Update scale output to match component dimensions
  yScale.range([0, height / 2 - padding]);
  const reverseYScale = yScale.copy().range(yScale.range().reverse());
  const handlePress = () => setShouldAnimate(true);

  return (
    <>
      {/* {animate && (
        <>
          <button type="button" onClick={handlePress} onTouchStart={handlePress}>
            Animate
          </button>
          <br />
        </>
      )} */}
      <svg width={width} height={height} onClick={() => setShouldAnimate(!shouldAnimate)}>
        <LinearGradient from={green} to={blue} id="line-gradient" />
        <rect width={width} height={height} fill={background} rx={14} />
        <Group top={height / 2} left={width / 2}>
          <GridAngle
            scale={xScale}
            outerRadius={height / 2 - padding}
            stroke={green}
            strokeWidth={1}
            strokeOpacity={0.3}
            strokeDasharray="5,2"
            numTicks={20}
          />
          <GridRadial
            scale={yScale}
            numTicks={5}
            stroke={blue}
            strokeWidth={1}
            fill={blue}
            fillOpacity={0.1}
            strokeOpacity={0.2}
          />
          <AxisLeft
            top={-height / 2 + padding}
            scale={reverseYScale}
            numTicks={5}
            tickStroke="none"
            tickLabelProps={{
              fontSize: 8,
              fill: blue,
              fillOpacity: 1,
              textAnchor: 'middle',
              dx: '1em',
              dy: '-0.5em',
              stroke: strokeColor,
              strokeWidth: 0.5,
              paintOrder: 'stroke',
            }}
            tickFormat={formatTicks}
            hideAxisLine
          />
          <LineRadial angle={angle} radius={radius} curve={curveBasisOpen}>
            {({ path }) => {
              const d = path(volumeStats) || '';
              return (
                <>
                  <animated.path
                    d={d}
                    ref={lineRef}
                    strokeWidth={2}
                    strokeOpacity={0.8}
                    strokeLinecap="round"
                    fill="none"
                    stroke={animate ? darkbackground : 'url(#line-gradient)'}
                  />
                  {shouldAnimate && (
                    <animated.path
                      d={d}
                      strokeWidth={2}
                      strokeOpacity={0.8}
                      strokeLinecap="round"
                      fill="none"
                      stroke="url(#line-gradient)"
                      strokeDashoffset={spring.frame.interpolate((v) => v * lineLength)}
                      strokeDasharray={lineLength}
                    />
                  )}
                </>
              );
            }}
          </LineRadial>

          {[firstPoint, lastPoint].map((d, i) => {
            const cx = ((xScale(date(d)) ?? 0) * Math.PI) / 180;
            const cy = -(yScale(close(d)) ?? 0);
            return <circle key={`line-cap-${i}`} cx={cx} cy={cy} fill={darkgreen} r={3} />;
          })}
        </Group>
      </svg>
    </>
  );
}

export default AnimatedRadialChart;