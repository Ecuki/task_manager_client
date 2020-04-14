import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";

import { List, Grid } from "semantic-ui-react";

import { setTaskToOverview, setErrors } from "../redux";

import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import TasksOverview from "../components/TasksOverview";
import ModalProvider from "../components/ModalProvaider";

const TasksList = () => {
  const dispatch = useDispatch();

  const state = useSelector(state => {
    return {
      tasks: state.tasks,

      deleteModalOpen: state.deleteModalOpen,
      addOrEditModal: state.addOrEditModal,

      errors: state.errors,
      submitTask: state.submitTask
    };
  });
  const { tasks, deleteModalOpen, addOrEditModal } = state;

  const setTaskToView = (task = tasks[0]) => dispatch(setTaskToOverview(task));

  useEffect(() => {
    setTaskToView();
  }, []);

  return (
    <>
      <Grid>
        <Grid.Row color="grey">
          <Grid.Column width={3} />

          <Grid.Column width={2}>
            <List.Content as="h5">Username</List.Content>
          </Grid.Column>

          <Grid.Column as="h5" width={7}>
            Topic
          </Grid.Column>
          <Grid.Column as="h5" width={2}>
            Tag
          </Grid.Column>
          <Grid.Column width={2} />
        </Grid.Row>
      </Grid>
      <List
        divided
        verticalAlign="middle"
        style={{
          maxHeight: "50vh",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: 10
        }}
      >
        {tasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </List>
      <TasksOverview />
      <ModalProvider>
        {deleteModalOpen && <Task />}
        {addOrEditModal.open && <TaskForm />}
      </ModalProvider>
    </>
  );
};

export default TasksList;
