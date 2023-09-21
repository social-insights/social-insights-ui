import React from "react";
import { Col, Container, Row } from "reactstrap";

export default function Dashboard() {
  return (
    <Container className="vh-100 p-4" fluid>
      <Row className="h-100">
        <Col
          md={4}
          className="h-100 d-flex flex-column gap-4 justify-content-start"
        >
          <Container className="h-25 foreground raised round-1">
            followers per account
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
