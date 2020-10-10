import cuid from "cuid";
import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function EventForm({
  setFormOpen,
  createEvent,
  selectedEvent,
  updateEvent,
}) {
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };
  const [values, setValues] = useState(initialValues);

  function handleFormSubmit() {
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : createEvent({
          ...values,
          id: cuid(),
          hostedBy: "Bob",
          attendees: [],
          hostPhotoURL: "/assets/user.png",
        });
    setFormOpen(false);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <Segment clearing>
      <Header
        content={selectedEvent ? "Edit Event" : "Create New Event"}
      ></Header>
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type="text"
            name="title"
            onChange={(e) => handleInputChange(e)}
            value={values.title}
            placeholder="Event Title"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="category"
            onChange={(e) => handleInputChange(e)}
            value={values.category}
            placeholder="Category"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="description"
            onChange={(e) => handleInputChange(e)}
            value={values.description}
            placeholder="Description"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="city"
            onChange={(e) => handleInputChange(e)}
            value={values.city}
            placeholder="City"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="venue"
            onChange={(e) => handleInputChange(e)}
            value={values.venue}
            placeholder="Venue"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            name="date"
            onChange={(e) => handleInputChange(e)}
            value={values.date}
            placeholder="Date"
          />
        </Form.Field>
        <Button
          type="submit"
          floated="right"
          positive
          content="Submit"
        ></Button>
        <Button
          as={Link}
          to="/events"
          type="submit"
          floated="right"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
}
