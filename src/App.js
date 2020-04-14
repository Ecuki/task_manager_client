import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import { AuthRoute, NoAuthRoute } from "./utils/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MenuBar from "./components/MenuBar";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container style={{ height: "100vh" }}>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <NoAuthRoute exact path="/login" component={Login} />
          <NoAuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/user/:userId" component={Profile} />
          <AuthRoute exact path="/tasks" component={Tasks} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
