import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cards.css'

interface CardProps {
    cardInfo: {
        title: string;
        info: string;
    };
}

export default function Card(props: CardProps) {
    const { cardInfo } = props;
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    // const flip = isFlipped ? {transform: 'rotate(45deg)' } : {};
    return (
        // <div className='holder'>
            <div className={`card ${isFlipped ? 'clicked': ''}`} onClick={handleClick}>
                <div className="front raised">
                    <h1 style={{ fontSize: '22px' }}>{cardInfo.title}</h1>
                </div>
                <div className='back raised'>
                    <h1 style={{ fontSize: '16px' }}>{cardInfo.info}</h1>
                </div>
            </div>
        // </div>
    );
  }
  