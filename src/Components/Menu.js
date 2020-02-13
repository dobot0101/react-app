import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <div className="menu">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movie" activeClassName="active">
            Movie
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" activeClassName="active">
            News
          </NavLink>
        </li>
        <li>
          <NavLink to="/todo" activeClassName="active">
            ToDo
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
