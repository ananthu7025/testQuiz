import React, { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import Avatar from "@mui/material/Avatar";
import "./Style.css";
import { useSelector } from "react-redux";

const SideBar = ({ sidebar, showSidebar, currentId }) => {
  const employees = useSelector((state) =>
    currentId
      ? state.employees.employees.find((e) => e._id === currentId)
      : null
  );
  useEffect(() => {
    if (employees) {
      return employees;
    }
  }, [employees]);

  const cardBody = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  };

  const cardStyle = {
    width: "200px",
    height: "370px",
    margin: "30px auto",
    overflow: "y",
    maxheight: "300px",
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose
                  style={{ color: "red" }}
                  onClick={showSidebar}
                />
              </Link>
            </li>
            <div style={cardStyle}>
              {employees && (
                <div key={employees._id} style={cardBody}>
                  <div>
                    <Avatar src="" />
                  </div>
                  <br />
                  <div>
                    <h5 className="card-title">{employees.username}</h5>
                    <p className="card-text">{employees.email}</p>
                    <PhoneAndroidOutlinedIcon />
                    <p className="card-text">{employees.mobile_no}</p>
                    <p className="card-text">
                      Experience:{employees.employee_exp}
                    </p>
                    <p className="card-text">Date:{employees.createdAt}</p>

                    <hr />
                  </div>
                </div>
              )}
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
