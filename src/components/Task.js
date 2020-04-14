import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Image, List, Label, Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import imgProfile from "../assets/no_image.png";
import { setTaskToOverview, deleteModalOpenAction } from "../redux";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const state = useSelector(state => {
    return {
      taskColorByImportance: state.taskColorByImportance,
      deleteModalOpen: state.deleteModalOpen,
      taskToDelete: state.taskToDelete,
      taskToOverview: state.taskToOverview
    };
  });
  const {
    taskColorByImportance,
    deleteModalOpen,
    taskToDelete,
    taskToOverview
  } = state;
  const { id, username, tag, importance, topic } = task ? task : taskToDelete;

  const setTaskToView = task => dispatch(setTaskToOverview(task));
  const handleDeleteClick = task => dispatch(deleteModalOpenAction(task));

  function handleWatchClick(task) {
    setTaskToView(task);
  }

  return (
    <List.Item
      style={task === taskToOverview ? { backgroundColor: "#ddd" } : {}}
    >
      <Grid divided centered verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={2}>
            <List.Content>
              <Image avatar src={imgProfile} />
            </List.Content>
          </Grid.Column>
          <Grid.Column width={2}>
            <List.Content>{username}</List.Content>
          </Grid.Column>

          <Grid.Column width={5}>{topic}</Grid.Column>
          <Grid.Column width={2}>
            <Label color={taskColorByImportance[importance]} tag size="mini">
              {importance}
            </Label>
          </Grid.Column>
          <Grid.Column width={2}>{tag}</Grid.Column>
          <Grid.Column width={2}>
            {!deleteModalOpen && (
              <>
                <Button
                  circular
                  color="white"
                  icon="eye"
                  size="mini"
                  onClick={() => handleWatchClick(task)}
                />
                {username === user.username && (
                  <Button
                    id={id}
                    circular
                    color="red"
                    icon="delete"
                    size="mini"
                    onClick={() => handleDeleteClick(task)}
                  />
                )}
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </List.Item>
  );
};

export default Task;
