import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";

// TODO: Populate lists with Supabase data instead of dummy data
// Add way to edit which users have which roles

export default function ManageUsers() {
    return (
        <Container className="vh-100 p-4" fluid>
            <div>manage users</div>
        <Row className="h-100">
          <Col
            md={4}
            className="h-100 d-flex flex-column gap-4 justify-content-start"
          >
            <Container className="h-25 foreground raised round-1">
              owner
              <ListGroup>
                <ListGroupItem>David Johnson</ListGroupItem>
              </ListGroup>
            </Container>
            <Container className="h-25 foreground raised round-1">
              special role 1
              <ListGroup>
                <ListGroupItem>Mario Sumanasekera</ListGroupItem>
              </ListGroup>
            </Container>
          </Col>
          <Col
            md={4}
            className="h-100 d-flex flex-column gap-4 justify-content-start"
          >
            <Container className="h-25 foreground raised round-1">
              administrator
              <ListGroup>
                <ListGroupItem>Duncan Lynn</ListGroupItem>
                <ListGroupItem>Derek Zhang</ListGroupItem>
              </ListGroup>
            </Container>
            <Container className="h-25 foreground raised round-1">
              special role 2
              <ListGroup>
                <ListGroupItem>Spencer Hughes</ListGroupItem>
              </ListGroup>
            </Container>
          </Col>
          <Col
            md={4}
            className="h-100 d-flex flex-column gap-4 justify-content-start"
          >
            <Container className="h-25 foreground raised round-1">
              member
              <ListGroup>
                <ListGroupItem>Ryan Andrew</ListGroupItem>
              </ListGroup>
            </Container>
          </Col>
        </Row>
      </Container>
    );
}