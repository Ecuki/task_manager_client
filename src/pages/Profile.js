import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Container, Grid } from "semantic-ui-react";

import { FETCH_USER_QUERY } from "../utils/graphql";
import UserProfile from "../components/UserProfile";

function Profile(props) {
  const userId = props.match.params.userId;

  const { loading, error, data } = useQuery(FETCH_USER_QUERY, {
    variables: { userId }
  });

  if (error) return <div>{console.log(error)}</div>;
  return (
    <Container>
      <Grid centered verticalAlign="middle" fluid>
        <Grid.Column width={12}>
          {!loading && data && <UserProfile user={data.getUser} />}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
export default Profile;
