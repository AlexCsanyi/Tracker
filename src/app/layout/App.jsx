import React, { useState } from "react";
import EventDashboard from "../../features/dashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import { Route } from "react-router-dom";
import HomePage from "./../../features/home/HomePage";
import EventDetailedPage from "./../../features/eventdetails/EventDetailedPage";
import EventForm from "./../../features/form/EventForm";

export default function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen(event) {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar setFormOpen={handleCreateFormOpen}></NavBar>
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <Route path="/createEvent" component={EventForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}
