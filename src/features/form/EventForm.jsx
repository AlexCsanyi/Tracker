import cuid from "cuid";
import React from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../dashboard/redux/eventAction";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import CustomTextArea from "./../../app/common/form/CustomTextArea";
import CustomSelectInput from "./../../app/common/form/CustomSelectInput";
import CustomDateInput from "./../../app/common/form/CustomDateInput";
import { categoryData } from "./../../app/api/categoryData";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) => state.event.events.find((e) => e.id === match.params.id));
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required("You must provide a description"),
    city: Yup.string().required("You must provide a city"),
    venue: Yup.string().required("You must provide a venue"),
    date: Yup.string().required("You must provide a date"),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
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
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="teal" content="Event Details"></Header>
            <CustomTextInput name="title" placeholder="Event Title"></CustomTextInput>
            <CustomSelectInput
              name="category"
              placeholder="Category"
              options={categoryData}
            ></CustomSelectInput>
            <CustomTextArea name="description" placeholder="Description" rows="3"></CustomTextArea>
            <Header sub color="teal" content="Event Location Details"></Header>
            <CustomTextInput name="city" placeholder="City"></CustomTextInput>
            <CustomTextInput name="venue" placeholder="Venue"></CustomTextInput>
            <CustomDateInput
              name="date"
              placeholderText="Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            ></CustomDateInput>

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            ></Button>
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            ></Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
