import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $termAgree: Boolean!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        termAgree: $termAgree
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      email
      username
      createdAt
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      username
      createdAt
    }
  }
`;
export const FETCH_TASK_QUERY = gql`
  query($taskId: ID!) {
    getTask(taskId: $taskId) {
      id
      topic
      tag
      importance
      body
      createdAt
      username
    }
  }
`;

export const FETCH_TASKS_QUERY = gql`
  {
    getTasks {
      id
      topic
      tag
      importance
      body
      createdAt
      username
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation createTask(
    $body: String!
    $topic: String!
    $tag: String!
    $importance: String!
  ) {
    createTask(body: $body, topic: $topic, tag: $tag, importance: $importance) {
      id
      topic
      tag
      importance
      body
      createdAt
      username
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTask(
    $taskId: ID!
    $body: String!
    $topic: String!
    $tag: String!
    $importance: String!
  ) {
    updateTask(
      taskId: $taskId
      body: $body
      topic: $topic
      tag: $tag
      importance: $importance
    ) {
      id
      topic
      tag
      importance
      body
      createdAt
      username
    }
  }
`;
