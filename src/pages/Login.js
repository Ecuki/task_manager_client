import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  Form,
  Grid,
  Icon,
  Header,
  Label,
  Segment,
  Message,
  Divider
} from "semantic-ui-react";

import { LOGIN_USER } from "../utils/graphql";
import { AuthContext } from "../context/auth";

const initialCredentials = {
  username: "",
  password: ""
};
const initialErrors = {
  username: null,
  password: null
};

function Login(props) {
  const context = useContext(AuthContext);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [errors, setErrors] = useState(initialErrors);

  const { username, password } = credentials;

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      console.log(userData);
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors({ message: err.graphQLErrors[0].message });
      console.log(errors);
    },
    variables: {
      username,
      password
    }
  });

  function handleChange(e, result) {
    setCredentials({ ...credentials, [result.name]: result.value });
    setErrors({ ...errors, [result.name]: null, message: null });
  }

  function onSubmit(e) {
    e.preventDefault();
    loginUser();
  }

  return (
    <Grid centered verticalAlign="middle" fluid>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Segment raised style={{ padding: "50px 80px" }}>
          <Header
            as="h1"
            color="black"
            textAlign="center"
            style={{ paddingBottom: 30 }}
          >
            <Icon name="bug" />
            Hello !
          </Header>
          <Divider />
          <Form
            size="large"
            loading={loading ? true : false}
            onSubmit={onSubmit}
            noValidate
          >
            <Form.Input
              error={errors.username}
              fluid
              icon="user"
              iconPosition="left"
              name="username"
              onChange={handleChange}
              placeholder="Username"
              value={username}
            />

            <Form.Input
              error={errors.password}
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              type="password"
              value={password}
            />
            {errors.message && (
              <>
                <Divider />
                <Message pointing prompt color="red" size="mini">
                  <Message.Content>Wrong credentials</Message.Content>
                </Message>
                <Divider />
              </>
            )}
            <Form.Button
              color="black"
              fluid
              size="huge"
              type="submit"
              style={{ boxShadow: "0 0 2px 2px #ddd", marginTop: 40 }}
            >
              Login
            </Form.Button>

            <span style={{ paddingRight: 10 }}>Don't have an account?</span>
            <Label as="a" href="/register" color="black" horizontal>
              Register
            </Label>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
