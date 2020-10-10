import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({ setFormOpen }) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  function handleSignOut() {
    setAuthenticated(false);
    history.push("/");
  }

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 15 }} />
          Tracker
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" name="Events"></Menu.Item>
        {authenticated && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button
              onClick={() => setFormOpen(true)}
              inverted
              positive
              content="Create Event"
            ></Button>
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInMenu signOut={handleSignOut}></SignedInMenu>
        ) : (
          <SignedOutMenu setAuthenticated={setAuthenticated}></SignedOutMenu>
        )}
      </Container>
    </Menu>
  );
}
