import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Trendline from "../../components/Trends";

import {
  BiLogoFacebookSquare,
  BiLogoInstagram,
  BiLogoTwitter,
  BiTrendingUp,
  BiTrendingDown,
} from "react-icons/bi";

//@ts-ignore
import Trend from 'react-trend';
//@ts-ignore
import Datalist from "react-datalist-field";

import {
  TbTriangleFilled,
  TbTriangleInvertedFilled
} from "react-icons/tb"
// import "./Dashboard.css";

// TODO: Link actual follower amounts, change fonts

const dummy_data = [0,5,10,1,3,13,22,9,17,15,6,10,11]

export default function Dashboard() {
  const [engageDates, setEngageDates] = useState('7'); // Initialize selectedValue state
  const [likesDates, setLikesDates] = useState('7'); // Initialize selectedValue state

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setEngageDates(newValue);
  };
  const handleLikesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setLikesDates(newValue);
  };

  const dateOptions = [
    '7',
    '14',
    '30',
    '90',
  ];

  return (
    <Container className="vh-100 p-4" fluid>
      <Row className="h-100">
        <Col
          md={4}
          className="h-100 d-flex flex-column gap-4 "
        >
          <Container className="h-25 foreground raised round-1 justify-content-between">
            <p style={{fontSize: '20px'}}>Social Media Followers</p>
            <Row className="h-10">
              <Col md={4} className="d-flex flex-column align-items-center">
                <BiLogoInstagram size={60} className="instagram" />

                <h4 className="">1,234,567</h4> 
                <p style={{fontSize: '11px'}}>Followers</p>

              </Col>
              <Col md={4} className="d-flex flex-column align-items-center">
                <BiLogoFacebookSquare size={60} className="facebook" />
                <h4 className="">674,438</h4> 
                <p style={{fontSize: '11px'}}>Followers</p>
              </Col>
              <Col md={4} className="d-flex flex-column align-items-center">
                <BiLogoTwitter size={60} className="twitter" />
                <h4 className="">50,237</h4> 
                <p style={{fontSize: '11px'}}>Followers</p>
              </Col>
            </Row>
          </Container>
          <Container className="h-25 foreground raised round-1">
            weekly change in followers/likes
          </Container>
          <Container className="h-50 foreground raised round-1">
            key metrics last n days (clicks, likes, shares, etc.)
          </Container>
        </Col>
        <Col
          md={5}
          className="h-100 d-flex flex-column gap-4 justify-content-start"
        >
          <Container className="h-50 foreground raised round-1">
            <p style={{fontSize: '20px'}}>Engagement and Impressions Over Time</p>
            <Row className="h-20 d-flex justify-content-between">
              <Col className="d-flex flex-column align-items-left justify-content-center">
                {/* Update to change based on selected date range */}
                <p style={{fontSize: '12px'}}>October 19, 2023 - October 26, 2023</p>
              </Col>
              <Col md={4} className="d-flex flex-column align-items-center">
                <select value={engageDates} onChange={handleChange}>
                {/* LIST Date range options */}
                  {dateOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option} Days
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            
            <Row className="h-100">
              <Col className="d-flex flex-column p-4 align-items-center">
                
                <Trendline 
                  dates={parseInt(engageDates)} 
                  header={'User Engagement'}
                  
                />
              </Col>
              <Col className="d-flex flex-column p-4 align-items-center">
                
                <Trendline dates={parseInt(engageDates)} header={'Impressions'}/>
              </Col>
              
            </Row>

           
          </Container>
          <Container className="h-50 foreground raised round-1">
            <p style={{fontSize: '20px'}}>Recent Post Performance</p>
            <Row className="h-20 d-flex justify-content-between">
              <Col className="d-flex flex-column align-items-left justify-content-center">
                {/* Update to change based on selected date range */}
                <p style={{fontSize: '12px'}}>October 19, 2023 - October 26, 2023</p>
              </Col>
              <Col md={4} className="d-flex flex-column align-items-center">
                <select value={likesDates} onChange={handleLikesChange}>
                {/* LIST Date range options */}
                  {dateOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option} Days
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            
            <Row className="h-100">
              <Col className="d-flex flex-column p-4 align-items-center">
                {/* </Row> */}
                <Trendline dates={parseInt(likesDates)} header={'Recent Page Likes'}/>
              </Col>
              <Col className="d-flex flex-column p-4 align-items-center">

                <Trendline dates={parseInt(likesDates)} header={'Total Page Likes'}/>
              </Col>
              
            </Row>
          </Container>
        </Col>
        <Col
          md={3}
          className="h-100 d-flex flex-column gap-4 justify-content-start"
        >
          <Container className="h-50 foreground raised round-1">
            mentions
          </Container>
          <Container className="h-25 foreground raised round-1">
            viewer demographics
          </Container>
          <Container className="h-25 foreground raised round-1">
            other
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
