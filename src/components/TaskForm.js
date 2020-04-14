import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";

import { Form } from "semantic-ui-react";

import {
  CREATE_TASK_MUTATION,
  FETCH_TASKS_QUERY,
  UPDATE_TASK_MUTATION,
  DELETE_TASK_MUTATION
} from "../utils/graphql";
import { setErrors, clearModal } from "../redux";

function TaskForm({}) {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return {
      taskToOverview: state.taskToOverview,
      initialTask: state.initialTask,
      addOrEditModal: state.addOrEditModal,
      taskImportanceOptions: state.taskImportanceOptions,
      initialErrors: state.initialErrors,
      errors: state.errors,
      submitTask: state.submitTask,
      deleteModalOpen: state.deleteModalOpen
    };
  });
  const {
    initialTask,
    taskToOverview,

    addOrEditModal: { isEdited, isNew },
    taskImportanceOptions,

    errors,
    submitTask
  } = state;

  const [task, setTask] = useState(isNew ? initialTask : taskToOverview);

  const { id, body, topic, tag, importance } = task;

  const setErr = payload => dispatch(setErrors(payload));

  function handleChange(e, result) {
    const { name, value } = result;
    setTask({ ...task, [name]: value });
    errors[name] && setErr({ ...errors, [name]: null });
  }

  const [createTask, { loading }] = useMutation(CREATE_TASK_MUTATION, {
    variables: { ...task },
    update(
      cache,
      {
        data: { createTask }
      }
    ) {
      const { getTasks } = cache.readQuery({ query: FETCH_TASKS_QUERY });
      cache.writeQuery({
        query: FETCH_TASKS_QUERY,
        data: { getTasks: [createTask, ...getTasks] }
      });
      setTask(initialTask);
    },
    onError(err) {
      setErr(err.graphQLErrors[0].extensions.errors);
    }
  });

  const [updateTask, { loading: loadingUpdate }] = useMutation(
    UPDATE_TASK_MUTATION,
    {
      variables: { taskId: id, body, topic, tag, importance },
      update(
        cache,
        {
          data: { updateTask }
        }
      ) {
        const { getTasks } = cache.readQuery({ query: FETCH_TASKS_QUERY });
        cache.writeQuery({
          query: FETCH_TASKS_QUERY,
          data: {
            getTasks: [...getTasks.map(t => (t.id === id ? updateTask : t))]
          }
        });
        setTask(initialTask);
      },
      onError(err) {
        setErr(err.graphQLErrors[0].extensions.errors);
      }
    }
  );

  // const [deleteTask, { loading: loadingDelete }] = useMutation(
  //   DELETE_TASK_MUTATION,
  //   {
  //     variables: { taskId: taskToDelete.id },
  //     update(
  //       cache,
  //       {
  //         data: { deleteTask }
  //       }
  //     ) {
  //       const { getTasks } = cache.readQuery({ query: FETCH_TASKS_QUERY });
  //       cache.writeQuery({
  //         query: FETCH_TASKS_QUERY,
  //         data: {
  //           getTasks: [...getTasks.filter(t => t.id !== deleteTask.id)]
  //         }
  //       });
  //       setTask(initialTask);
  //     },
  //     onError(err) {
  //       setErr(err.graphQLErrors[0].extensions.errors);
  //     }
  //   }
  // );

  useEffect(() => {
    if (submitTask.edited || submitTask.new) {
      (submitTask.edited ? updateTask() : createTask()).then(() => {
        console.log("object1");
        console.log(errors);
      });

      // console.log("object2");
      // const noErrors = Object.keys(errors).findIndex(
      //   error => errors[error] !== null
      // );
      // console.log(errors);
      // if (noErrors > 0) {
      //   console.log("object");
      //   handleModalClose();
      // }
    }
  }, [submitTask]);

  function handleModalClose() {
    dispatch(clearModal());
  }

  return (
    <Form loading={loading || loadingUpdate ? true : false}>
      <Form.Input
        fluid
        label="Task topic"
        name="topic"
        onChange={handleChange}
        placeholder="Short task description"
        value={topic}
        error={errors.topic}
      />
      <Form.Input
        fluid
        label="Tag"
        name="tag"
        onChange={handleChange}
        placeholder="Tag"
        value={tag}
        error={errors.tag}
      />
      <Form.Dropdown
        fluid
        name="importance"
        label="Importance"
        selection
        onChange={handleChange}
        options={taskImportanceOptions}
        placeholder="Importance"
        value={importance}
        error={errors.importance}
      />

      <Form.TextArea
        label="Task description"
        name="body"
        onChange={handleChange}
        placeholder="Tell us more about this task..."
        value={body}
        error={errors.body}
      />
    </Form>
  );
}

export default TaskForm;
