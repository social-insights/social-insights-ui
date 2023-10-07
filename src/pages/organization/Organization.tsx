import React from "react";
import OrgInvite from "./OrgInvite";
import { Col, Container, List, ListGroup, ListGroupItem, ListInlineItem, Row } from "reactstrap";

export default function Organization() {
  return (
    <>
      <Container className="mw-100 p-0 vh-100">
        <Row noGutters>
          <Col md={3} className="foreground vh-100">
            <ListGroup flush>
              <ListGroupItem>
                <ListGroup flush>
                  <ListGroupItem disabled>Manage</ListGroupItem>
                  <ListGroupItem style={{border: "none"}}>Users</ListGroupItem>
                  <ListGroupItem style={{border: "none"}}>Invites</ListGroupItem>
                </ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroup flush>
                  <ListGroupItem disabled>Configure</ListGroupItem>
                  <ListGroupItem style={{border: "none"}}>Permissions</ListGroupItem>
                  <ListGroupItem style={{border: "none"}}>Invites</ListGroupItem>
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={9}>
            <OrgInvite></OrgInvite>
          </Col>
        </Row>
      </Container>
    </>
  );
}
