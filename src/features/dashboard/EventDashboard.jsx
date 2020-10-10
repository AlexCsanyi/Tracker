import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { data } from "../../app/api/testData";

export default function EventDashboard() {
  const [events, setEvents] = useState(data);

  // function handleCreateEvent(event) {
  //   setEvents([...events, event]);
  // }

  // function handleUpdateEvent(updateEvent) {
  //   setEvents(
  //     events.map((event) => (event.id === updateEvent.id ? updateEvent : event))
  //   );
  // }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter((event) => event.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={handleDeleteEvent}></EventList>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
