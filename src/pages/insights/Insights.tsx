import React, { useState } from 'react';
import { Col, Container, Row } from "reactstrap";
import "./Insights.css";

export default function Insights() {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files && event.target.files[0];
    setImage(selectedImage);
  };

  return (
    <Container>
      <Container className='h-10 d-flex justify-content-center align-items-center' 
                        style={{marginTop: '35px'}}>
                <p style={{ fontFamily: 'Quicksand', fontSize: '56px'}}>
                  <b>Sentiment Insights{"\n"}</b>
                </p> 
      </Container>
      <Container className='vh-100 d-flex justify-content-center align-items-start'>
          
          <Container className='text-container foreground raised round-1 p-5'>
            <h2>Caption Insight</h2>

            {/* Text Input */}
            <Container>
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder='Enter caption here:'
                style={{width: '100%', height: '250px', alignItems: 'top'}}
                
              ></textarea>
              <button style={{width: '100%', marginTop:'4%'}}type='button'>
                Enter
              </button>
            </Container>
          </Container>
          <Container className='text-container foreground raised round-1 p-5 align-items-center'>
            {/* Image Input */}
            <h2>Image Insight</h2>

            <div>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button style={{width: '100%', marginTop:'4%'}}type='button'>
                Enter
            </button>
            
            
          </Container>
        </Container>
      </Container>
  );
}
