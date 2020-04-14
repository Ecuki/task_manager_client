import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import {
  Checkbox,
  Divider,
  Form,
  Grid,
  Header,
  Label,
  Segment
} from "semantic-ui-react";

import { REGISTER_USER } from "../utils/graphql";
import { AuthContext } from "../context/auth";

const initialCredentials = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  termAgree: false
};
const initialErrors = {
  username: null,
  password: null,
  confirmPassword: null,
  email: null,
  termAgree: null
};

function Register(props) {
  const context = useContext(AuthContext);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [errors, setErrors] = useState(initialErrors);
  const { username, password, confirmPassword, email, termAgree } = credentials;

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username,
      password,
      confirmPassword,
      email,
      termAgree
    }
  });

  function handleChange(e, result) {
    setCredentials({ ...credentials, [result.name]: result.value });
    setErrors({ ...errors, [result.name]: null });
  }

  function handleTermAgreeChange() {
    setCredentials({ ...credentials, termAgree: !termAgree });
  }

  function onSubmit(e) {
    e.preventDefault();
    addUser();
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
            Register new account
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
              error={errors.email}
              fluid
              icon="mail"
              iconPosition="left"
              name="email"
              onChange={handleChange}
              placeholder="E-mail address"
              value={email}
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
            <Form.Input
              error={errors.confirmPassword}
              fluid
              icon="lock"
              iconPosition="left"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm password"
              type="password"
              value={confirmPassword}
            />
            <Form.Field>
              <Checkbox
                checked={termAgree}
                name="termAgree"
                onClick={handleTermAgreeChange}
                label="I agree to the Terms and Conditions"
              />
              {errors.termAgree && (
                <Label pointing prompt>
                  {errors.termAgree}
                </Label>
              )}
            </Form.Field>

            <Form.Button
              color="black"
              fluid
              size="huge"
              type="submit"
              style={{ boxShadow: "0 0 2px 2px #ddd" }}
            >
              <span style={{ paddingRight: 10 }}>🚀</span>Register
            </Form.Button>

            <span style={{ paddingRight: 10 }}>Already have an account?</span>
            <Label as="a" href="/login" color="black" horizontal>
              Login
            </Label>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Register;
