import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Grid } from "semantic-ui-react";

import UsersList from "../components/UsersList";
import UserProfile from "../components/UserProfile";
import { AuthContext } from "../context/auth";
import { FETCH_USERS_QUERY } from "../utils/graphql";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_USERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Grid centered verticalAlign="middle" fluid>
      <Grid.Column width={6}>
        {data && <UsersList users={data.getUsers} />}
      </Grid.Column>
      <Grid.Column width={8}>{data && <UserProfile user={user} />}</Grid.Column>
    </Grid>
  );
}
