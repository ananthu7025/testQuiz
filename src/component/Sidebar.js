import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import "./styles/Components.css";
import 'bootstrap/dist/js/bootstrap.min.js'
import logo from "../assets/zeksta.png";

const Sidebar = () => {
  const { pathname } = useLocation();
  useEffect(() => {}, [pathname]);
  return (
    <div class="sidebarColor" id="sidebar-wrapper">
      <div
        style={{ backgroundColor: "rgb(0, 21, 41)" }}
        class="sidebar-heading  py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"
      >
        <img src={logo} alt="logo" />
      </div>

      <div class="list-group  side-hover  my-3">
        <Link className="link" to="/">
          {" "}
          <a
            class={
              pathname === "/"
                ? "list-group-item list-group-item-action active second-text"
                : "list-group-item list-group-item-action bg-transparent second-text"
            }
          >
            <i class="fas fa-tachometer-alt me-2"></i>Dashboard
          </a>
        </Link>
        <Link className="link" to="/employee">
          {" "}
          <a
            class={
              pathname === "/employee"
                ? "list-group-item list-group-item-action active second-text border"
                : "list-group-item list-group-item-action bg-transparent second-text "
            }
          >
            <i class="fas fa-chart-line me-2"></i>Employee
          </a>
        </Link>
        <Link className="link" to="/result">
          {" "}
          <a
            class={
              pathname === "/result"
                ? "list-group-item list-group-item-action active second-text"
                : "list-group-item list-group-item-action bg-transparent second-text"
            }
          >
            <AssignmentTurnedInIcon className="result-icons" />
            Result
          </a>
        </Link>
        <li
          style={{ paddingLeft: "10px" }}
          className={
            pathname === "/question-list" || pathname === "/categories"
              ? "list-group-item list-group-item-action active second-text dropdown side-question"
              : "list-group-item list-group-item-action  bg-transparent second-text  dropdown side-question"
          }
        >
          <span
            className="dropdown-toggle side-question"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <a>
              <i class="fas fa-solid fa-question me-2 side-question"></i>
              Question
            </a>
          </span>
          <li className="side-question side-hover-q dropdown-menu dropdown-menu-dark border-0 bg-transparent w-100">
            <Link to="/question-list" className="link">
              {" "}
              <a
                className="dropdown-item text-white w-75"
                style={{
                  marginTop: "10px",
                  paddingLeft: "10px",
                  backgroundColor: "rgb(0, 21, 41)",
                }}
              >
                <i class="fas fa-list-alt me-2"></i> Question List
              </a>
            </Link>
            <Link to="/categories" className="link">
              {" "}
              <a
                className="dropdown-item text-white w-75"
                style={{
                  marginTop: "15px",
                  paddingLeft: "10px",
                  backgroundColor: "rgb(0, 21, 41)",
                }}
              >
                {" "}
                <i class="fas fa-list-alt me-2"></i>Question Category
              </a>
            </Link>
          </li>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
