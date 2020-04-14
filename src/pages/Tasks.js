import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux";
import { FETCH_TASKS_QUERY } from "../utils/graphql";
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import TasksList from "../components/TasksList";

function Tasks() {
  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(FETCH_TASKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  !loading && data && dispatch(fetchTasks(data.getTasks));
  return (
    <Grid>
      <Grid.Column width={16}>
        <Grid.Row>
          <TasksList />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default Tasks;
