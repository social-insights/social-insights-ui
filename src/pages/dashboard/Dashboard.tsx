import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Trendline from "../../components/Trends";
import { Link } from "react-router-dom";
import { ResponsiveContainer } from "recharts";

import Chart from "../../components/Chart";

import {
  BiLogoFacebookSquare,
  BiLogoInstagram,
  BiLogoTwitter,
  BiSolidUpArrow ,
  BiSolidDownArrow ,
} from "react-icons/bi";

//@ts-ignore
import Trend from "react-trend";
//@ts-ignore
import Datalist from "react-datalist-field";

import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import "./Dashboard.css";
import {
  InstagramUserProvider,
  Profile,
  getInstagramUserById,
  useInstagramUser,
} from "../../util/accounts";
import { supabase } from "../../supabase/supabase";
import { useAuth } from "../../util/auth/AuthProvider";

// TODO: Link actual follower amounts, change fonts

const dummy_data = [0, 5, 10, 1, 3, 13, 22, 9, 17, 15, 6, 10, 11];

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
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  const [engageDates, setEngageDates] = useState("7"); // Initialize selectedValue state
  const [likesDates, setLikesDates] = useState("7"); // Initialize selectedValue state

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setEngageDates(newValue);
  };
  const handleLikesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setLikesDates(newValue);
  };

  // Current Date info
  const dateOptions = ["7", "14", "30", "90"];

  const getCurrentDate = (selectedDays: number) => {
    const endDate = new Date();       // todays date
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - selectedDays + 1);    // use user selection to calc range
    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    };
  };

  // Get live date ranges based on the selected days
  const engageDateRange = getCurrentDate(parseInt(engageDates));
  const likesDateRange = getCurrentDate(parseInt(likesDates));

  return (
    <Container className="vh-100 p-4" fluid>
      <Row className="h-100">
        <Col md={4} className="h-100 d-flex flex-column gap-4 ">
          <Container className="h-25 foreground raised round-1 justify-content-between">
            {/* <p style={{fontSize: '20px'}}>Social Media Followers</p> */}
            <Row className="h-100 mt-1">
              <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
                <BiLogoInstagram size={60} className="instagram" />

                <aside>@{user?.username}</aside>
                <h4>{user?.followers && nFormatter(user?.followers!, 2)}</h4>
                <p style={{ fontSize: "11px" }}>Followers</p>
              </Col>
              <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
                <BiLogoFacebookSquare size={60} className="facebook" />
                <aside>@nba</aside>
                <h4>39M</h4>
                <p style={{ fontSize: "11px" }}>Likes</p>
              </Col>
              <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
                <BiLogoTwitter size={60} className="twitter" />
                <aside>@nba</aside>
                <h4 className="">44.6M</h4>
                <p style={{ fontSize: "11px" }}>Followers</p>
              </Col>
            </Row>
          </Container>
          <Container className="h-50 foreground raised round-1">
            <p >Follower Change per Week</p>
            <Container className="d-flex mt-1 flex-column align-items-center align-text-bottom">
              <p className="">ACCOUNT PLACEHOLDER</p>
            </Container>

            <Container className="h-75 d-flex align-items-center justify-content-center">
              <Chart layout={'horizontal'}/>
            </Container>
          </Container>
          <Container className="h-25 foreground raised round-1">
            [ACCOUNT] Mentions
          </Container>
        </Col>
        <Col
          md={5}
          className="h-100 d-flex flex-column gap-4 justify-content-start"
        >
          <Container className="h-50 foreground raised round-1">
            <p style={{ fontSize: "20px" }}>
              Engagement and Impressions Over Time
            </p>
            <Row className="h-20 d-flex justify-content-between">
              <Col className="d-flex flex-column align-items-left justify-content-center">
                {/* Update to change based on selected date range */}
                <p style={{ fontSize: "14px" }}>
                {engageDateRange.startDate} - {engageDateRange.endDate}
                </p>
              </Col>
              <Col md={4} className="d-flex flex-column align-items-center">
                <select value={engageDates} onChange={handleChange}>
                  {/* LIST Date range options */}
                  {dateOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option} Days
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Container className="d-flex mt-0 align-items-center justify-content-center">
              <p className="mt-auto">ACCOUNT PLACEHOLDER</p>
            </Container>
            <Row className="h-10">
              <Col className="d-flex flex-column mx-4 align-items-center">
                <Trendline
                  dates={parseInt(engageDates)}
                  header={"User Engagement"}
                />
              </Col>
              <Col className="d-flex flex-column mx-4 align-items-center">
                <Trendline
                  dates={parseInt(engageDates)}
                  header={"Impressions"}
                />
              </Col>
            </Row>
          </Container>
          <Container className="h-50 foreground raised round-1">
            <p style={{ fontSize: "20px" }}>Recent Post Performance</p>
            <Row className="h-20 d-flex justify-content-between">
              <Col className="d-flex flex-column align-items-left justify-content-center">
                {/* Update to change based on selected date range */}
                <p style={{ fontSize: "14px" }}>
                  {likesDateRange.startDate} - {likesDateRange.endDate}
                </p>
              </Col>
              <Col md={4} className="d-flex flex-column align-items-center">
                <select value={likesDates} onChange={handleLikesChange}>
                  {/* LIST Date range options */}
                  {dateOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option} Days
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Container className="d-flex align-items-center justify-content-center">
              <p>ACCOUNT PLACEHOLDER</p>
            </Container>
            <Row className="h-10">
              <Col className="d-flex flex-column mx-4 align-items-center">
                {/* </Row> */}
                <Trendline
                  dates={parseInt(likesDates)}
                  header={"Recent Page Likes"}
                />
              </Col>
              
              <Col className="d-flex flex-column mx-4 align-items-center">
                <Trendline
                  dates={parseInt(likesDates)}
                  header={"Total Page Likes"}
                />
              </Col>
            </Row>
          </Container>
        </Col>
        <Col
          md={3}
          className="h-100 d-flex flex-column gap-4 justify-content-start"
        >
          <Container className="h-50 foreground raised round-1">
            <p className="mb-0">Account Metrics</p>

            <Row className="d-flex flex-column mt-3 align-items-center justify-content-between">
              <Col className="d-flex flex-column align-items-center mb-3">
                <p className="mb-0">Twitter likes last 10 posts</p>
                <Container className="hstack gap-3 justify-content-center">
                  <Col className="d-flex flex-column align-items-end">
                    <h2 className="mb-0">78</h2>
                    <p style={{ color: 'grey', fontSize: '9px'  }} className="mb-0">Likes</p>

                  </Col>
                  <div className="vr"></div>
                  <Col className="d-flex flex-column align-items-start">
                    {/* <Row className="d-flex flex-column align-items-center"> */}
                      <BiSolidUpArrow size={25} color="green"/>

                    {/* </Row> */}
                    <p style={{ color: 'grey', fontSize: '9px' }} className="mb-0">Last: (47)</p>
                  </Col>
                </Container>
              </Col>
              
              <Col className="d-flex flex-column align-items-center mb-3">
                <p className="mb-0">Twitter reposts last 10 posts</p>
                <Container className="hstack gap-3 justify-content-center">
                  <Col className="d-flex flex-column align-items-end">
                    <h2 className="mb-0">13</h2>
                    <p style={{ color: 'grey', fontSize: '9px' }} className="mb-0">Reposts</p>

                  </Col>
                  <div className="vr"></div>
                  <Col className="d-flex flex-column align-items-start">
                    <BiSolidUpArrow size={25} color="green"/>
                    <p style={{ color: 'grey', fontSize: '9px' }} className="mb-0">Last: (6)</p>

                  </Col>
                </Container>
              </Col>

              <Col className="d-flex flex-column align-items-center ">
                <p className="mb-0">Twitter comments last 10 posts</p>
                <Container className="hstack gap-3 justify-content-center">
                  <Col className="d-flex flex-column align-items-end">
                    <h2 className="mb-0">7</h2>
                    <p style={{ color: 'grey', fontSize: '9px' }} className="mb-0">Comments</p>

                  </Col>
                  <div className="vr"></div>
                  
                  <Col className="d-flex flex-column align-items-start">
                    <BiSolidDownArrow size={25} color="red"/>
                    <p style={{ color: 'grey', fontSize: '9px' }} className="mb-0">Last: (11)</p>

                  </Col>
                </Container>
              </Col>
            </Row>
          </Container>
          <Container className="h-25 foreground raised round-1">
            Follower Demographics
            {/* <Container> */}
              <Chart layout={'vertical'}/>
            {/* </Container> */}
          </Container>
          <Container className="h-25 foreground raised round-1">
            other
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
