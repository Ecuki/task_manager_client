import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Menu, Icon } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

function MenuBar() {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("/");

  useEffect(() => {
    setActiveItem(history.location.pathname.slice(1));
  }, [history.location.pathname]);

  function handleLoginLogout() {
    if (user) {
      logout();
    } else history.push("/login");
  }

  return (
    <Menu secondary>
      <Menu.Item>
        <Icon name="bug" size="large" style={{ margin: "0 auto" }} />
      </Menu.Item>

      <Menu.Item name="home" active={activeItem === ""} as={Link} to={"/"}>
        Home
      </Menu.Item>
      <Menu.Item
        name="tasks"
        active={activeItem === ""}
        as={Link}
        to={"/tasks"}
      >
        Tasks
      </Menu.Item>
      {/* <Menu.Item
          name="testimonials"
          active={activeItem === "testimonials"}
          onClick={handleItemClick}
        >
          Testimonials
        </Menu.Item> */}

      <Menu.Menu position="right">
        <Menu.Item
          name={user ? "logout" : "login"}
          active={activeItem === "logout" || activeItem === "login"}
          onClick={handleLoginLogout}
        />

        {!user && (
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            as={Link}
            to={"/register"}
          />
        )}
      </Menu.Menu>
    </Menu>
  );
}
export default MenuBar;
