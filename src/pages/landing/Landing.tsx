import LandingHeader from "./LandingHeader";
import Footer from "../../components/Footer";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import Card from "../../components/Cards";

import { Col, Container, Row } from "reactstrap";

import "../../components/Header.scss";

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  const headingStyle = {
    marginTop: "50px",
  };

  return (
    <div className="landing">
      <div className="header">
        <LandingHeader />
      </div>
      <div className="min-vh-100 body">
        <Container className="p-4" fluid>
          <Container
            className="h-10 d-flex justify-content-center align-items-center"
            style={{ marginTop: "35px" }}
          >
            <p style={{ fontFamily: "Quicksand", fontSize: "56px" }}>
              <b>Social Insights{"\n"}</b>
            </p>
          </Container>

          <Container className="h-10 d-flex justify-content-center align-items-center">
            <p style={{ fontFamily: "Quicksand", fontSize: "22px" }}>
              Analyze your social media performance
            </p>
          </Container>
          <Container className="mt-3 d-flex justify-content-center align-items-center align-content-space-between">
            {/* <button
                onClick={() =>
                  {navigate("/login");}
                }
              >
                Log In
              </button> */}
            <button
              className="start"
              onClick={() => {
                navigate("/signup");
              }}
            >
              GET STARTED
            </button>
          </Container>

          <Container className="boxes">
            <Row className="row" style={{ gap: "50px" }}>
              {/* <Col className="h-100 d-flex justify-content-center align-items-center foreground raised round-1">
                    <h1 style={{ fontSize: '22px' }}> Performance Tracking </h1>
                  </Col> */}
              <Col className="p-0 h-100 d-flex justify-content-center align-items-center">
                <Card
                  cardInfo={{
                    title: "Performance Tracking",
                    info: "Track and measure social media performance metrics over time, enabling continuous improvement of your online presence",
                  }}
                />
              </Col>
              <Col className="p-0 h-100 d-flex justify-content-center align-items-center">
                <Card
                  cardInfo={{
                    title: "Post Insights",
                    info: "Analyze individual posts to uncover engagement data, audience behavior, and performance trends for informed content optimization",
                  }}
                />
              </Col>
              <Col className="p-0 h-100 d-flex justify-content-center align-items-center">
                <Card
                  cardInfo={{
                    title: "Predictive Modeling",
                    info: "Enhance your social media strategy with our Predictive Modeling feature - forecasting engagement, content trends, and audience insights for data-driven decision",
                  }}
                />
              </Col>
              {/* <Col className="h-100 d-flex justify-content-center align-items-center foreground raised round-1">
                    <h1 style={{ fontSize: '22px' }}> Post Insights </h1>
                  </Col>
                  <Col className="h-100 d-flex justify-content-center align-items-center foreground raised round-1">
                    <h1 style={{ fontSize: '22px' }}> Predictive Modeling </h1>
                  </Col> */}
            </Row>
            <Row className="row mt-5" style={{ gap: "50px" }}>
              {/* <Col className="h-100 d-flex justify-content-center align-items-center foreground raised round-1">
                    <h1 style={{ fontSize: '22px' }}> A/B Testing </h1>
                  </Col>
                  <Col className="h-100 d-flex justify-content-center align-items-center foreground raised round-1">
                    <h1 style={{ fontSize: '22px' }}> Sentiment Analysis </h1>
                  </Col>
                  <Col className="h-100 d-flex justify-content-center align-items-center foreground raised round-1">
                    <h1 style={{ fontSize: '22px' }}> Reports </h1>
                  </Col> */}
              <Col className="p-0 h-100 d-flex justify-content-center align-items-center">
                <Card
                  cardInfo={{
                    title: "A/B Testing",
                    info: "Run experiments with different content variations to identify what resonates best with your audience and optimize your social strategy",
                  }}
                />
              </Col>
              <Col className="p-0 h-100 d-flex justify-content-center align-items-center">
                <Card
                  cardInfo={{
                    title: "Sentiment Analysis",
                    info: "Automatically assess audience sentiment toward your content to gauge public opinion and tailor your messaging accordingly, as well as improve your sentimental impact based on your desired tone",
                  }}
                />
              </Col>
              <Col className="p-0 h-100 d-flex justify-content-center align-items-center">
                <Card
                  cardInfo={{
                    title: "Reports",
                    info: "Generate comprehensive reports with key metrics, providing a clear overview of your social media efforts for strategic decision-making",
                  }}
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
