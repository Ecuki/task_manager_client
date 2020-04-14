import React from "react";
import { Card, Image } from "semantic-ui-react";

import moment from "moment";

import imgProfile from "../assets/no_image.png";

const mockUser = {
  username: "Emil",
  createdAt: "2020-04-12T14:42:39.350Z",
  email: "jeziorski.emil@gmail.com"
};

function UserProfile({ user }) {
  //   if (error) return <div>{console.log(error)}</div>;
  const { username, createdAt, email } = user ? user : mockUser;

  return (
    <Card>
      <Image src={imgProfile} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{email}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <a>
          <Icon name="user" />
          10 Friends
        </a> */}
      </Card.Content>
    </Card>
  );
}
export default UserProfile;
