import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSubmit, clearModal, setErrors } from "../redux";

import { useMutation } from "@apollo/react-hooks";

import { FETCH_TASKS_QUERY, DELETE_TASK_MUTATION } from "../utils/graphql";

import { Modal, Button } from "semantic-ui-react";

function ModalProvider({ children }) {
  const setErr = payload => dispatch(setErrors(payload));
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return {
      taskToDelete: state.taskToDelete,
      deleteModalOpen: state.deleteModalOpen,
      addOrEditModal: state.addOrEditModal,
      modalHeaders: state.modalHeaders,
      submitTask: state.submitTask,
      errors: state.errors
    };
  });
  const {
    deleteModalOpen,
    addOrEditModal,
    modalHeaders,
    submitTask,
    taskToDelete,
    errors
  } = state;

  const header = () => {
    if (deleteModalOpen) return modalHeaders.delete;
    else if (addOrEditModal.isEdited) return modalHeaders.edited;
    else if (addOrEditModal.isNew) return modalHeaders.new;
  };

  const submitModal = () => {
    if (deleteModalOpen) {
      dispatch(setSubmit({ delete: true }));
    } else if (addOrEditModal.isEdited) {
      dispatch(setSubmit({ edited: true }));
    } else if (addOrEditModal.isNew) {
      dispatch(setSubmit({ new: true }));
    }
  };

  const [deleteTask, { loading }] = useMutation(DELETE_TASK_MUTATION, {
    variables: { taskId: taskToDelete.id },
    update(
      cache,
      {
        data: { deleteTask }
      }
    ) {
      const { getTasks } = cache.readQuery({ query: FETCH_TASKS_QUERY });
      cache.writeQuery({
        query: FETCH_TASKS_QUERY,
        data: {
          getTasks: [...getTasks.filter(t => t.id !== deleteTask)]
        }
      });
    },
    onError(err) {
      setErr(err.graphQLErrors[0].extensions.errors);
    }
  });

  useEffect(() => {
    if (submitTask.delete) {
      deleteTask();

      // const noErrors = Object.keys(errors).findIndex(
      //   error => errors[error] !== null
      // );
      // console.log(noErrors);
      // if (!noErrors) {
      //   console.log("object");
      //   handleModalClose();
      // }
    }
  }, [submitTask]);
  let isModalOpen = deleteModalOpen || addOrEditModal.open;

  function handleModalClose() {
    dispatch(clearModal());
  }

  return (
    <Modal open={isModalOpen}>
      <Modal.Header>{header()}</Modal.Header>
      <Modal.Content>
        <Modal.Description>{children}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={handleModalClose}>
          Close
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Submit"
          onClick={submitModal}
          disabled={submitTask.edited || submitTask.new || submitTask.delete}
        />
      </Modal.Actions>
    </Modal>
  );
}
export default ModalProvider;
