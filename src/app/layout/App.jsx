import React from "react";
import EventDashboard from "../../features/dashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import { Route, useLocation } from "react-router-dom";
import HomePage from "./../../features/home/HomePage";
import EventDetailPage from "../../features/eventdetails/EventDetailPage";
import EventForm from "./../../features/form/EventForm";

export default function App() {
  const { key } = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar></NavBar>
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailPage} />
              <Route
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
            </Container>
          </>
        )}
      />
    </>
  );
}
