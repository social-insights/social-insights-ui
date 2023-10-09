import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";

//TODO: Populate lists with Supabase data instead of dummy data
// Add way to edit which roles / users have which permissions

export default function ManagePerms() {
    return (
        <Container className="vh-100 p-4" fluid>
            <div>manage perms</div>
        <Row className="h-100">
          <Col
            md={4}
            className="h-100 d-flex flex-column gap-4 justify-content-start"
          >
            <Container className="h-25 foreground raised round-1">
              permission 1
              <ListGroup>
                <ListGroupItem>role 1</ListGroupItem>
              </ListGroup>
            </Container>
            <Container className="h-25 foreground raised round-1">
              permission 4
              <ListGroup>
                <ListGroupItem>role 1</ListGroupItem>
                <ListGroupItem>role 2</ListGroupItem>
                <ListGroupItem>special role 2</ListGroupItem>
              </ListGroup>
            </Container>
            <Container className="h-25 foreground raised round-1">
              permission 7
              <ListGroup>
                <ListGroupItem>role 1</ListGroupItem>
                <ListGroupItem>role 2</ListGroupItem>
                <ListGroupItem>role 3</ListGroupItem>
                <ListGroupItem>special role 2</ListGroupItem>
              </ListGroup>
            </Container>
          </Col>
          <Col
            md={4}
            className="h-100 d-flex flex-column gap-4 justify-content-start"
          >
            <Container className="h-25 foreground raised round-1">
              permission 2
              <ListGroup>
                <ListGroupItem>role 1</ListGroupItem>
              </ListGroup>
            </Container>
            <Container className="h-25 foreground raised round-1">
              permission 5
              <ListGroup>
                <ListGroupItem>role 1</ListGroupItem>
                <ListGroupItem>role 2</ListGroupItem>
                <ListGroupItem>role 3</ListGroupItem>
                <ListGroupItem>special role 1</ListGroupItem>
              </ListGroup>
            </Container>
          </Col>
          <Col
            md={4}
            className="h-100 d-flex flex-column gap-4 justify-content-start"
          >
            <Container className="h-25 foreground raised round-1">
              permission 3
              <ListGroup>
                <ListGroupItem>role 1</ListGroupItem>
                <ListGroupItem>role 2</ListGroupItem>
              </ListGroup>
            </Container>
            <Container className="h-25 foreground raised round-1">
              permission 6
              <ListGroup>
                <ListGroupItem>role 1</ListGroupItem>
                <ListGroupItem>role 2</ListGroupItem>
                <ListGroupItem>role 3</ListGroupItem>
                <ListGroupItem>special role 1</ListGroupItem>
              </ListGroup>
            </Container>
          </Col>
        </Row>
      </Container>
    );
}