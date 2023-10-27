import React, { useState } from "react";
//@ts-ignore
import Trend from 'react-trend';
// import Tooltip from './Tooltip';

import {
    TbTriangleFilled,
    TbTriangleInvertedFilled
  } from "react-icons/tb"

interface trendProps {
    dates: number;
    header: string;
    // data: number[];
}

  // will switch to passing in data
export default function Trendline({dates, header}: trendProps) {
    // const [showTooltip, setShowTooltip] = useState(false);
    // const [hoverX, setHoverX] = useState(0);
    // const [hoverY, setHoverY] = useState(0);
    // const [hoverValue, setHoverValue] = useState('');

    // let handleHover = (event: React.MouseEvent<HTMLElement>, value: string) => {
    //     setShowTooltip(true);
    //     setHoverX(event.clientX);
    //     setHoverY(event.clientY);
    //     setHoverValue(value);
    // };

    // let handleNoHover = () => {
    //     setShowTooltip(false);
    // }

    let dummyData: number[] = [];
    // dummy data generator
    for (let i = 0; i < dates; i++) {
        const randomNum = Math.floor(Math.random() * 1000000); 
        dummyData.push(randomNum);
      }
    
    const recentValue = ((dummyData[dummyData.length - 1]));         
    let trendingUp = dummyData[dummyData.length - 1] > dummyData[0];    // is it trending up

    let percentChange = ((recentValue - dummyData[0]) / dummyData[0]) * 100

    let lineColor = trendingUp ? '#056517' : '#b30404';
    // let areaColor = trendingUp ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'
  return (
    <>
        <p style={{fontSize: '22px'}}>{header}</p>
            {/* Pass selected date to trendline*/}
        <h4 className="">{recentValue.toLocaleString()}</h4> 
            {/* <Row className="h-10 d-flex justify-content-between"> */}
        
        {/* Render value if hovering over trendline */}
        {/* {showTooltip && (
            <Tooltip x={hoverX} y={hoverY} value={hoverValue} />
        )
        }    */}
        { trendingUp ? (
            <TbTriangleFilled size={15} color={lineColor} className="down" />
        ) : (
            <TbTriangleInvertedFilled size={15} color={lineColor} className="down" />
        )}   
        <p style={{fontSize: '10px'}}>{parseFloat(percentChange.toFixed(1))}%</p>     
      <Trend 
        data={dummyData} 
        gradient={[lineColor]}
        strokeWidth={2}
        strokeLinecap="round"
        // onMouseEnter={(e: React.MouseEvent<HTMLElement>) => handleHover(e, hoverValue)} // Use handleHover for onMouseEnter
        // onMouseLeave={handleNoHover}
        // area={areaColor}
      />
    </>
  );
}
