import { createStore } from "redux";
const initialTask = {
  id: "",
  username: "",
  body: "",
  createdAt: "",
  tag: "",
  importance: "",
  topic: ""
};
const initialErrors = {
  topic: null,
  body: null,
  tag: null,
  importance: null
};
const initialState = {
  initialTask,
  initialErrors,
  errors: initialErrors,
  taskImportanceOptions: [
    { key: "l", text: "Low", value: "low" },
    { key: "n", text: "Normal", value: "normal" },
    { key: "h", text: "High", value: "high" }
  ],
  tasks: [initialTask],
  modalHeaders: {
    delete: "Are you sure to delete this item?",
    edited: "Edit a Task",
    new: "Add new Task"
  },
  taskToDelete: initialTask,

  taskToOverview: initialTask,
  deleteModalOpen: false,
  addOrEditModal: {
    open: false,
    isEdited: false,
    isNew: false
  },
  submitTask: {
    delete: false,
    edited: false,
    new: false
  },
  header: "",
  taskColorByImportance: {
    low: "black",
    normal: "yellow",
    high: "red"
  }
};

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export function reducer(state, { type, payload }) {
  switch (type) {
    case "SET_TASK_TO_OVERVIEW":
      return {
        ...state,
        taskToOverview: payload
      };
    case "DELETE_MODAL_OPEN":
      return {
        ...state,
        deleteModalOpen: true,
        taskToDelete: payload
      };
    case "DELETE_MODAL_CLOSE":
      return {
        ...state,
        deleteModalOpen: false,
        taskToDelete: null
      };

    case "EDIT_ADD_MODAL_TOGGLE":
      return {
        ...state,
        addOrEditModal: payload
      };

    case "FETCH_TASKS":
      return {
        ...state,
        tasks: payload
      };
    case "SET_SUBMIT":
      return {
        ...state,
        submitTask: { ...state.submitTask, ...payload }
      };

    case "SET_ERRORS":
      console.log(payload);
      return {
        ...state,
        errors: payload
      };
    case "CLEAR_MODAL":
      return {
        ...state,
        deleteModalOpen: false,
        taskToDelete: initialTask,
        addOrEditModal: {
          open: false,
          isEdited: false,
          isNew: false
        },
        submitTask: {
          delete: false,
          edited: false,
          new: false
        },
        errors: initialErrors
      };
    default:
      return state;
  }
}
export const setTaskToOverview = payload => ({
  type: "SET_TASK_TO_OVERVIEW",
  payload
});

export const deleteModalOpenAction = payload => ({
  type: "DELETE_MODAL_OPEN",
  payload
});

export const deleteModalCloseAction = payload => ({
  type: "DELETE_MODAL_CLOSE",
  payload
});

export const fetchTasks = payload => ({
  type: "FETCH_TASKS",
  payload
});
export const editAddModalToggle = payload => ({
  type: "EDIT_ADD_MODAL_TOGGLE",
  payload
});
export const setErrors = payload => ({
  type: "SET_ERRORS",
  payload
});
export const setSubmit = payload => ({
  type: "SET_SUBMIT",
  payload
});
export const clearModal = payload => ({
  type: "CLEAR_MODAL",
  payload
});
