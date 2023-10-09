import React from "react";
import OrgInvite from "./OrgInvite";
import ManagePerms from "./ManagePermissions";
import ManageUsers from "./ManageUsers";
import { Col, Container, List, ListGroup, ListGroupItem, ListInlineItem, Row } from "reactstrap";

//TODO: Make clickable things change on hover

export default function Organization() {
  const [view, setView] = React.useState("OrgInvites");

  const swapView = (view: string) => {
    setView(view);
  };

  return (
    <>
      <Container className="mw-100 p-0 vh-100">
        <Row noGutters>
          <Col md={3} className="foreground vh-100">
            <ListGroup flush>
              <ListGroupItem>
                <ListGroup flush>
                  <ListGroupItem onClick={() => swapView("OrgInvites")}>Manage</ListGroupItem>
                  <ListGroupItem style={{border: "none"}} onClick={() => swapView("ManageUsers")}>Users</ListGroupItem>
                  <ListGroupItem style={{border: "none"}}>Invites</ListGroupItem>
                </ListGroup>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroup flush>
                  <ListGroupItem>Configure</ListGroupItem>
                  <ListGroupItem style={{border: "none"}} onClick={() => swapView("ManagePermissions")}>Permissions</ListGroupItem>
                  <ListGroupItem style={{border: "none"}}>Invites</ListGroupItem>
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={9}>
            {view === "OrgInvites" && <OrgInvite></OrgInvite>}
            {view === "ManageUsers" && <ManageUsers></ManageUsers>}
            {view === "ManagePermissions" && <ManagePerms></ManagePerms>}
          </Col>
        </Row>
      </Container>
    </>
  );
}
