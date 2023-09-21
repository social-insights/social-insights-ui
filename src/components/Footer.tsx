import React from "react";
import { Col, Container } from "reactstrap";

export default function Footer() {
  return <Container className="foreground raised mw-100 pt-1">
    <footer className="w-100 d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
      <Col md={4}>
      © {(new Date()).getFullYear()} Social Insights
      </Col>
    </footer>
  </Container>
}
