import React, { useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import {
  Button,
  Container,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import {
  addUser,
  createInvite,
  createOrg,
  deleteOrg,
  getOrgs,
  removeUser,
} from "../../supabase/api/accounts/accountCalls";
import { supabase } from "../../supabase/supabase";
import { useAuth } from "../../util/auth/AuthProvider";

export default function OrgInvite() {
  const auth = useAuth();
  useEffect(() => {
    getOrgs().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <Container>
      <InputGroup>
        <Input
          style={{ backgroundColor: "white", color: "Black" }}
          contentEditable={false}
          value={"asfdafads"}
          addon={true}
          spellCheck={false}
          disabled={true}
        ></Input>
        <InputGroupText>
          <BiCopy size="1em" />
        </InputGroupText>
      </InputGroup>
      <Button
        onClick={() =>
          createOrg("Social Insights 2").then((res) => {
            console.log(res);
          })
        }
      >
        create org
      </Button>
      <Button
        onClick={() =>
          supabase.auth.getUser().then((res) => {
            addUser(5, res.data.user?.id!).then((res) => {
              console.log(res);
            });
          })
        }
      >
        add user
      </Button>
      <Button
        onClick={() =>
          supabase.auth.getUser().then((res) => {
            removeUser(5, res.data.user?.id!).then((res) => {
              console.log(res);
            });
          })
        }
      >
        remove user
      </Button>
      <Button
        onClick={() => {
          createInvite(auth.org?.org_id!, auth.user.id).then((res) => {
            console.log(res);
          });
        }}
      >
        invite user
      </Button>
    </Container>
  );
}
