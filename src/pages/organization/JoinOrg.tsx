import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { acceptInvite } from "../../supabase/api/accounts/accountCalls";
import { useAuth } from "../../util/auth/AuthProvider";
import { useNavigate } from "react-router-dom";


export default function JoinOrg() {
  const auth = useAuth();
  const navigate = useNavigate();


  const [inputError, setInputError] = useState("");
  const [inputSuccess, setInputSuccess] = useState("");
  const [invitationId, setInvitationId] = useState("");
  
  const handleClick = () => {
    navigate("/organization/select", { replace: true });
  
  };

  function join(e: SyntheticEvent) {
    e.preventDefault();
    acceptInvite(invitationId.toString(), auth.user).then((res) => {
      console.log("res", res);
      if (res) {
        switch (res.code) {
          case "22P02":
            setInputError("Invalid ID");
            setInputSuccess("");
            break;
          case "PGRST116":
            setInputError("Invitation has expired or does not exist");
            setInputSuccess("");
            break;
          default:
            setInputSuccess("");
            setInputError("");
        }
        if (res.status === 204) {
          setInputSuccess("Successfully joined organization");
          setInvitationId("");
        }
      } else {
        setInputError("Unknown error");
      }
    });
  }

  return (
    <>
      <Row className="align-items-start" noGutters>
        <Col lg={3} md={2} xs={1} />
        <Col
          lg={6}
          md={8}
          xs={10}
          className="foreground raised p-5 my-5 d-flex flex-column align-items-center gap-3 round-1"
        >
          <h3>Join an Organization</h3>
          <Row noGutters tag={"form"} onSubmit={join} className="w-75">
            <FormGroup floating>
              <Input
                type="text"
                id="invitation-id"
                placeholder="Invitation ID"
                autoFocus
                name="invitation-id"
                invalid={inputError !== ""}
                valid={inputSuccess !== ""}
                value={invitationId}
                onChange={(e) => setInvitationId(e.target.value)}
              ></Input>
              <Label for="invitation-id">Invitation ID</Label>
              {inputError !== "" && (
                <FormFeedback valid={false}>{inputError}</FormFeedback>
              )}
              {inputSuccess !== "" && (
                <FormFeedback valid>{inputSuccess}</FormFeedback>
              )}
            </FormGroup>
            <Button type="submit" onClick={handleClick}>Join</Button>
          </Row>
        </Col>
        <Col lg={3} xs={1} md={2} />
      </Row>
    </>
  );
}
