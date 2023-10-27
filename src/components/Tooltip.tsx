import React from 'react';

interface toolProps {
    x: number;
    y: number;
    value: string;  
}

export default function Tooltip({ x, y, value }: toolProps) {
    return (
        <div
          style={{
            position: "absolute",
            left: x + 10, // Adjust the position as needed
            top: y - 30, // Adjust the position as needed
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "5px",
          }}
        >
          Value: {value}
        </div>
      );
    }
