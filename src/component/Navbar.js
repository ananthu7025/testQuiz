import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BreadCrumb from "./breadcrumb/Breadcrumb";
import { useDispatch } from "react-redux";
import { Logout } from "../redux/actions/zohoToken";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const LogingOut = () => {
    dispatch(Logout());
  };
  return (
    <nav class="navbar navbar-expand-lg nav-color  py-4 px-4">
      <div style={{ marginLeft: "49px" }} class="d-flex align-items-center">
        <i class="fas fa-align-left  fs-4 me-3" id="menu-toggle"></i>
        <h2 class="fs-2 m-0">
          {" "}
          <BreadCrumb />
        </h2>
      </div>

      <button
        onClick={toggle}
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse text-dark transpert-bg"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav ms-auto text-dark mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle  fw-bold"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-user me-2"></i>Admin
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li onClick={LogingOut}>
                <a class="dropdown-item" href="">
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
