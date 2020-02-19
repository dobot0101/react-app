import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <div className="menu">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">
            영화
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" activeClassName="active">
            뉴스
          </NavLink>
        </li>
        <li>
          <NavLink to="/todo" activeClassName="active">
            일정관리
          </NavLink>
        </li>
        <li>
          <NavLink to="/memo" activeClassName="active">
            포스트잇
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
