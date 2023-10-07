import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Button,
} from "reactstrap";
import { getUserOrgs } from "../../supabase/api/accounts/accountCalls";
import { useAuth } from "../../util/auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

export default function SelectOrg() {
  const [orgs, setOrgs] = useState<any[]>();
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    getUserOrgs(auth.user.id).then((res) => {
      if (res.error) {
        console.log("Unable to retrieve orgs");
      }
      setOrgs(res.data!);
    });
  }, []);
  return (
    <Container>
      {orgs && orgs.length === 0 && <Navigate to={"/organization/join"} />}
      <Row>
        <Col xs={3} />
        <Col
          xs={6}
          className="foreground raised p-5 my-5 d-flex flex-column align-items-center gap-3 round-1"
        >
          <h3>Select an organization</h3>
          <ListGroup>
            {orgs?.map((org) => {
              return (
                <ListGroupItem
                  key={org.org_id}
                  onClick={() => {
                    auth.setOrg(org);
                    if (org.org_id) {
                      navigate("/dashboard");
                    }
                  }}
                >
                  {org.name}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
        <Col xs={3} />
      </Row>
    </Container>
  );
}
