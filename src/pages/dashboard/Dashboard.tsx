import React from "react";
import { Col, Container, Row } from "reactstrap";
import InstagramLogo from "../../images/instagram-logo.webp";
import FacebookLogo from "../../images/facebook.webp";
import {
  BiLogoFacebookSquare,
  BiLogoInstagram,
  BiLogoTwitter,
} from "react-icons/bi";

import "./Dashboard.css";

// TODO: Link actual follower amounts, change fonts


export default function Dashboard() {
  return (
    <Container className="vh-100 p-4" fluid>
      <Row className="h-100">
        <Col
          md={4}
          className="h-100 d-flex flex-column gap-4 "
        >
          <Container className="h-25 foreground raised round-1 justify-content-between">
            <p className="mb-1" style={{}}>Social Media Followers</p>
            <Row className="h-10 mt-4">
              <Col md={4} className="d-flex flex-column align-items-center">
                <BiLogoInstagram size={60} className="instagram" />

                <h4 className="mt-2">1,234,567</h4> 
                <p style={{fontSize: '11px'}}>Followers</p>

              </Col>
              <Col md={4} className="d-flex flex-column align-items-center">
                <BiLogoFacebookSquare size={60} className="facebook" />
                <h4 className="mt-2">674,438</h4> 
                <p style={{fontSize: '11px'}}>Followers</p>
              </Col>
              <Col md={4} className="d-flex flex-column align-items-center">
                <BiLogoTwitter size={60} className="twitter" />
                <h4 className="mt-2">50,237</h4> 
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
            engagements and impressions over time
          </Container>
          <Container className="h-50 foreground raised round-1">
            recent post performance
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
