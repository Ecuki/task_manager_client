import React from "react";
import { Link } from "react-router-dom";

import { List, Image, Label } from "semantic-ui-react";

import imgProfile from "../assets/no_image.png";

export default function UsersList({ users }) {
  console.log(users);
  return (
    <List
      animated
      verticalAlign="middle"
      style={{ height: "60%", overflowY: "scroll" }}
    >
      <List.Header as="h2">User List</List.Header>
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </List>
  );
}

function User({ user }) {
  return (
    <List.Item>
      <Image avatar src={user.imageUrl ? user.imageUrl : imgProfile} />
      <List.Content>
        <List.Header as={Link} to={`/user/${user.id}`}>
          {user.username}
        </List.Header>
      </List.Content>
      <Label circular color={"green"} empty />
    </List.Item>
  );
}
