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
} from "reactstrap";
import { BiUserCircle } from "react-icons/bi";

import "./Header.scss";
import { useAuth } from "../util/auth/AuthProvider";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDD = () => setDropdownOpen((prevState) => !prevState);

  const toggleNav = () => setIsOpen(!isOpen);

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
          <Nav navbar className="ms-auto">
            <Dropdown inNavbar isOpen={dropdownOpen} toggle={toggleDD} end>
              <DropdownToggle nav caret>
                <BiUserCircle size={"2em"} />
              </DropdownToggle>
              <DropdownMenu end right>
                <DropdownItem>Profile</DropdownItem>
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
