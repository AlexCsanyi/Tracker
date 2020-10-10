import React from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";

export default function EventListItem({ event, selectEvent, deleteEvent }) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={event.hostPhotoURL}
            ></Item.Image>
            <Item.Content>
              <Item.Header content={event.title}></Item.Header>
              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock"></Icon> {event.date}
          <Icon name="marker"></Icon> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee
              key={attendee.id}
              attendee={attendee}
            ></EventListAttendee>
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>{event.description}</div>
        <Button
          color="red"
          onClick={() => deleteEvent(event.id)}
          floated="right"
          content="Delete"
        ></Button>
        <Button
          color="teal"
          as={Link}
          to={`/events/${event.id}`}
          floated="right"
          content="View"
        ></Button>
      </Segment>
    </Segment.Group>
  );
}
