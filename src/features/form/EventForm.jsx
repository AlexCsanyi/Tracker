import cuid from "cuid";
import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../dashboard/redux/eventAction";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
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
      ? dispatch(updateEvent({ ...selectedEvent, ...values }))
      : dispatch(
          createEvent({
            ...values,
            id: cuid(),
            hostedBy: "Bob",
            attendees: [],
            hostPhotoURL: "/assets/user.png",
          })
        );
    history.push("/events");
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
