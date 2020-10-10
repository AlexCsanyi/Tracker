import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "./../form/EventForm";
import { data } from "../../app/api/testData";

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectEvent,
  selectedEvent,
}) {
  const [events, setEvents] = useState(data);

  function handleCreateEvent(event) {
    setEvents([...events, event]);
  }

  function handleUpdateEvent(updateEvent) {
    setEvents(
      events.map((event) => (event.id === updateEvent.id ? updateEvent : event))
    );
    selectEvent(null);
  }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter((event) => event.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          selectEvent={selectEvent}
          events={events}
          deleteEvent={handleDeleteEvent}
        ></EventList>
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            createEvent={handleCreateEvent}
            selectedEvent={selectedEvent}
            updateEvent={handleUpdateEvent}
            key={selectedEvent ? selectedEvent.id : null}
          ></EventForm>
        )}
      </Grid.Column>
    </Grid>
  );
}
