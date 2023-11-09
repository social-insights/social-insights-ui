import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Container,
} from "reactstrap";

import { Link } from "react-router-dom";

import { BiUserCircle } from "react-icons/bi";

import "./Header.scss";
import { useAuth } from "../util/auth/AuthProvider";



export default function Header() {
  // TEMP ACCOUNT HOLDERS
  const accountOptions = ["insta", "facebook", "twitter"];

  const [account, setAccount] = useState('ACCOUNT')
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const toggleDD = () => setDropdownOpen((prevState) => !prevState);
  
  const toggleAccountDD = () => setAccountDropdownOpen((prevState) => !prevState);

  const toggleNav = () => setIsOpen(!isOpen);

// CHANGE TYPE when using account ?
  const handleDropdownChange = (account:string) => {
    setAccount(account);
  };
  
  const auth = useAuth();

  return (
    <div>
      <Navbar dark color="dark" expand="md" container="fluid">
        <NavbarBrand href="/dashboard">
          <img
            alt="logo"
            src={require("../images/logo_720.webp")}
            style={{
              height: 40,
            }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/posts">Posts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/insights">Insights</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/reports">Reports</NavLink>
            </NavItem>
          </Nav>
          <Nav navbar className="d-flex m-auto align-items-center justify-content-center">
            {/* only render on dashboard page  */}
              { window.location.pathname === "/dashboard" ? 
              (<Dropdown inNavbar isOpen={accountDropdownOpen} toggle={toggleAccountDD}>
              <DropdownToggle nav caret className="italic border border-white raised round-1">
                <i>{account}</i>
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem onClick={() => handleDropdownChange('@instauser')}>Instagram</DropdownItem>
                {/* <DropdownItem handleDropdownChange{user?.username}>{}</DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem onClick={() => handleDropdownChange('@facebookuser')}>Facebook</DropdownItem>
                {/* <DropdownItem handleDropdownChange{user?.username}>{}</DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem onClick={() => handleDropdownChange('@twitteruser')}>Twitter</DropdownItem>
                {/* <DropdownItem handleDropdownChange{user?.username}>{}</DropdownItem> */}

              </DropdownMenu>
            </Dropdown>)
            : (<></>)}  
          </Nav>
          <Nav navbar className="ms-auto">
            <Dropdown inNavbar isOpen={dropdownOpen} toggle={toggleDD}>
              <DropdownToggle nav caret>
                <BiUserCircle size={"2em"} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem href="/profile">Profile</DropdownItem>
                <DropdownItem href="/organization">Organization</DropdownItem>
                <DropdownItem href="/organization/select">Change Organization</DropdownItem>
                <DropdownItem href="/organization/join">Join Organization</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => auth.signOut(() => {})}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
