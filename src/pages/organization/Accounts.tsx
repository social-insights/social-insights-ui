import React, { useEffect, useState } from "react";
import OrgInvite from "./OrgInvite";
import ManagePerms from "./ManagePermissions";
import ManageUsers from "./ManageUsers";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  List,
  ListGroup,
  ListGroupItem,
  ListInlineItem,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import {
  BiLink,
  BiLogoFacebook,
  BiLogoFacebookSquare,
  BiLogoInstagram,
  BiLogoTwitter,
  BiPlus,
} from "react-icons/bi";
import { LuArrowLeftRight } from "react-icons/lu";

import { supabase } from "../../supabase/supabase";
import { ThreeDots } from "react-loader-spinner";
import { useAuth } from "../../util/auth/AuthProvider";
import {
  getInstagramUserById,
  getInstagramUserByUsername,
  updateInstagramAccount,
  insertInstagramAccount,
} from "../../util/accounts";

export default function Accounts() {
  const [instagramSearchOpen, setInstagramSearchOpen] = useState(false);
  const [instagramSearchValue, setInstagramSearchValue] = useState("");
  const [instagramSearchResults, setInstagramSearchResults] =
    useState<Response>();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [currentAccountIds, setCurrentAccountIds] = useState<{
    instagram_id: string;
    facebook_id: string;
    twitter_id: string;
  }>({ instagram_id: "", facebook_id: "", twitter_id: "" });
  const [currentAccountData, setCurrentAccountData] = useState<{
    instagram: any;
    facebook: any;
    twitter: any;
  }>({ instagram: null, facebook: null, twitter: null });

  const toggleInstagramSearch = () =>
    setInstagramSearchOpen(!instagramSearchOpen);

  const searchInstagram = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    fetch(
      `http://127.0.0.1:5001/social-insights-66e0d/us-central1/get_user/?username=${instagramSearchValue}`
    ).then(async (res) => {
      res.json().then((data) => {
        console.log(data);
        setInstagramSearchResults(data);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    supabase
      .from("Accounts")
      .select("*")
      .eq("org_id", auth.org?.org_id)
      .then((res) => {
        if (res.data && res.data?.length > 0) {
          res.data?.forEach((account) => {
            if (account.account_type === "instagram") {
              setCurrentAccountIds((prevState) => ({
                ...prevState!,
                instagram_id: account.account_id!,
              }));
              getInstagramUserById(account.account_id!, auth.org?.org_id!).then(
                (res) => {
                  setCurrentAccountData((prevState) => ({
                    ...prevState!,
                    instagram: res,
                  }));
                }
              );
            }
          });
        }
      });
  }, []);

  return (
    <>
      <Container className="">
        <Row>account list</Row>
        <Row>
          <h3>Linked Accounts</h3>
          <Col>
            <Card>
              <CardBody className="d-flex flex-row justify-content-between align-items-center">
                {currentAccountIds?.instagram_id ? (
                  <>
                    <BiLogoInstagram size={48} className="instagram" />
                    <div>
                      <h5>{currentAccountData?.instagram?.username}</h5>
                    </div>
                    <LuArrowLeftRight
                      size={24}
                      color="#6fb76f"
                      className="clickable"
                      onClick={() => {
                        toggleInstagramSearch();
                      }}
                    />
                  </>
                ) : (
                  <>
                    <BiLogoInstagram size={48} className="instagram" />
                    <BiPlus
                      size={48}
                      color="#6fb76f"
                      className="clickable"
                      onClick={() => toggleInstagramSearch()}
                    />
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody className="d-flex flex-row justify-content-between">
                <BiLogoFacebookSquare size={48} className="facebook" />
                <BiPlus size={48} color="#6fb76f" className="clickable" />
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardBody className="d-flex flex-row justify-content-between">
                <BiLogoTwitter size={48} className="twitter" />
                <BiPlus size={48} color="#6fb76f" className="clickable" />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={instagramSearchOpen} toggle={toggleInstagramSearch}>
        <ModalBody>
          <Form onSubmit={searchInstagram}>
            <FormGroup floating inline>
              <Input
                className="mb-2"
                type="text"
                id="username"
                placeholder="Username"
                autoFocus
                name="username"
                // invalid={inputError !== ""}
                // valid={inputSuccess !== ""}
                value={instagramSearchValue}
                onChange={(e) => setInstagramSearchValue(e.target.value)}
              ></Input>
              <Label for="username">Username</Label>
              <Button>Search</Button>
            </FormGroup>
          </Form>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={loading}
          />
          {instagramSearchResults && (
            <InstagramAccountResult
              user={instagramSearchResults}
              toggleModal={setInstagramSearchOpen}
              type={currentAccountIds?.instagram_id ? "change" : "link"}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  );
}

function InstagramAccountResult({
  user,
  toggleModal,
  type,
}: {
  user: any;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  type: "link" | "change";
}) {
  const auth = useAuth();

  const linkAccount = () => {
    if (user) {
      supabase
        .from("Organizations")
        .update({ instagram_id: user.id as string })
        .eq("org_id", auth.org?.org_id)
        .single()
        .then((res: any) => {
          if (res.data) {
            insertInstagramAccount(user);
          }
        });
      toggleModal(false);
    }
  };
  const changeAccount = () => {
    if (user) {
      supabase
        .from("Organizations")
        .update({ instagram_id: user.id as string })
        .eq("org_id", auth.org?.org_id)
        .single()
        .then((res: any) => {
          if (res.data) {
            updateInstagramAccount(user);
          }
        });
      toggleModal(false);
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col xs={10}>
          <h3>{user.full_name}</h3>
          {/* use formatting from raw text in bio (e.g. \n, \t, special characters) */}
          <aside style={{ whiteSpace: "pre-wrap" }}>{user.bio}</aside>
        </Col>
        <Col className="h-100">
          <BiLink
            size={48}
            color="#6fb76f"
            className="clickable"
            onClick={() => {
              console.log("link");
              if (type === "change") changeAccount();
              else linkAccount();
            }}
          ></BiLink>
        </Col>
      </Row>
    </>
  );
}
