import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


interface chartProps {
  layout: string,
}

export default function Chart({layout} : chartProps) {
  const data = layout === 'horizontal' ? [
    { x: 'Sept 10', Gained: 543, Lost: 231 },
    { x: 'Sept 17', Gained: 231, Lost: 111 },
    { x: 'Sept 24', Gained: 342, Lost: 99 },
    { x: 'Oct 1', Gained: 123, Lost: 221 },
    { x: 'Oct 8', Gained: 465, Lost: 65 },
    { x: 'Oct 15', Gained: 400, Lost: 232 },
    { x: 'Oct 22', Gained: 550, Lost: 200 },
    { x: 'Oct 29', Gained: 300, Lost: 400 },
    { x: 'Nov 5', Gained: 200, Lost: 300 },
  ] : [
    { x: '10-14', Amount: 45},
    { x: '15-18', Amount: 94},
    { x: '19-24', Amount: 112},
    { x: '25-29', Amount: 64},
    { x: '30-40', Amount: 32},
    { x: '40-55', Amount: 21},
    { x: '55+', Amount: 11},

  ];

  const bars = Object.keys(data[0]) // Extract keys from the first object in the array
    .filter(key => key !== 'name') // Exclude the 'name' key
    .map((key, index) => (
      <Bar key={index} dataKey={key} stackId="a" fill={`#${index}F5999`} />
    ));
    
      return (
        <ResponsiveContainer className="d-flex h-100 align-items-center justify-content-center " 
          width="100%" 
          // height={200}
        >
          <BarChart
            data={data}
            margin={{ top: 25, right: 30, left: 10, bottom: 25 }}
            title="Follower Change per Week"
          >
            <XAxis dataKey="x" />
            
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Gained" stackId="a" fill="#3B5999" />
            <Bar dataKey="Lost" stackId="a" fill="#00ACED" />
            <Bar dataKey="Amount" stackId="a" fill="#00ACED" />
          </BarChart>
        </ResponsiveContainer>

  );
}


//     <ResponsiveContainer className="d-flex h-100 align-items-center justify-content-center " width="100%">
//       {layout === 'horizontal' ? (
//         <BarChart
//           data={followerData}
//           layout={'horizontal'}
//           margin={{ top: 25, right: 30, left: 10 }}
//         >
//           <XAxis type="number" />
//           <YAxis dataKey="name" type="category" />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="Gained" stackId="a" fill="#3B5999" />
//           <Bar dataKey="Lost" stackId="a" fill="#00ACED" />
//         </BarChart>

//       ) : (
//         // horizontal chart
//         <BarChart
//           data={demoData}
//           layout={'vertical'}
//           margin={{ top: 25, right: 30, left: 10 }}
//         >
//           <XAxis dataKey="name" type="category" />
//           <YAxis type="number" />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="Gained" stackId="a" fill="#3B5999" />

//         </BarChart>
//       )}
//     </ResponsiveContainer>
//   );
// }
