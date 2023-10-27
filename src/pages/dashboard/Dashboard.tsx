import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import InstagramLogo from "../../images/instagram-logo.webp";
import FacebookLogo from "../../images/facebook.webp";

import "./Dashboard.css";
import { InstagramUserProvider, Profile, getInstagramUserById, useInstagramUser } from "../../util/accounts";
import { supabase } from "../../supabase/supabase";
import { useAuth } from "../../util/auth/AuthProvider";

// TODO: Link actual follower amounts, change fonts

export default function Dashboard() {

  const [user, setUser] = React.useState<Profile>();
  const auth = useAuth();

  useEffect(() => {
    if (!user) {
      supabase
        .from("Organizations")
        .select("instagram_id")
        .eq("org_id", auth.org?.org_id)
        .maybeSingle()
        .then((data) => {
          if (data.data && data.data.instagram_id) {
            getInstagramUserById(
              data.data.instagram_id,
              auth.org?.org_id!
            ).then((data) => {
              setUser(data);
              console.log(data);
            });
          }
        });
    }
  }, [auth.org?.org_id, user]);

  function nFormatter(num: number, digits: number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }
  
  return (
    <InstagramUserProvider>
      <Container className="vh-100 p-4" fluid>
        <Row className="h-100">
          <Col
            md={4}
            className="h-100 d-flex flex-column gap-4 justify-content-start"
          >
            <Container className="h-25 foreground raised round-1">
              {/* <p className="mb-1" style={{}}>Social Media Followers</p> */}
              <Row className="h-100 justify-content-center">
                <Col
                  md={6}
                  className="d-flex flex-column align-items-center justify-content-center"
                >
                  <img
                    alt="instagram"
                    src={InstagramLogo}
                    style={{
                      height: 36,
                      width: 36,
                      margin: "2% 0 0 0",
                    }}
                  />
                  <aside>@{user?.username}</aside>
                  <h4>{user?.followers && nFormatter(user?.followers!, 2)}</h4>
                  <p style={{ fontSize: "11px" }}>Followers</p>
                </Col>
                {/* <Col
                  md={6}
                  className="d-flex flex-column align-items-center justify-content-center"
                >
                  <img
                    alt="facebook"
                    src={FacebookLogo}
                    style={{
                      height: 36,
                      width: 36,
                      margin: "2% 0 0 0",
                    }}
                  />
                  <h2 className="mt-2">674,438</h2>
                  <p style={{ fontSize: "11px" }}>Followers</p>
                </Col> */}
              </Row>
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
    </InstagramUserProvider>
  );
}
