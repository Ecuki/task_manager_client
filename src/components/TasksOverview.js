import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { Table, Label, Icon, Button, Header } from "semantic-ui-react";
import { editAddModalToggle } from "../redux";

function TasksOverview() {
  const dispatch = useDispatch();
  const state = useSelector(state => {
    return {
      taskColorByImportance: state.taskColorByImportance,
      taskToOverview: state.taskToOverview,
      addOrEditModal: state.addOrEditModal
    };
  });
  const { taskColorByImportance, taskToOverview } = state;

  const toggleModal = payload => dispatch(editAddModalToggle(payload));

  const {
    id,
    username,
    body,
    createdAt,
    tag,
    importance,
    topic
  } = taskToOverview;

  return (
    <>
      <Header>
        Tasks Overview
        <Button.Group floated="right">
          <Button
            color="green"
            onClick={() =>
              toggleModal({ open: true, isEdited: false, isNew: true })
            }
          >
            <Icon name="add" />
            Add new task
          </Button>
          <Button
            color="blue"
            onClick={() =>
              toggleModal({ open: true, isEdited: true, isNew: false })
            }
          >
            <Icon name="edit" />
            Edit
          </Button>
        </Button.Group>
      </Header>
      <Table celled striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Icon name="sort amount up" /> Importance
            </Table.Cell>
            <Table.Cell>
              <Label color={taskColorByImportance[importance]} tag size="mini">
                {importance}
              </Label>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="tag" /> Tag
            </Table.Cell>
            <Table.Cell>{tag}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="heading" /> Task topic
            </Table.Cell>
            <Table.Cell>{topic}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="file text" /> Task description
            </Table.Cell>
            <Table.Cell>{body}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="key" /> ID:
            </Table.Cell>
            <Table.Cell>{id}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="user" /> Author:
            </Table.Cell>
            <Table.Cell>{username}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name="time" /> Created
            </Table.Cell>
            <Table.Cell>{moment(createdAt).calendar()}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

export default TasksOverview;
