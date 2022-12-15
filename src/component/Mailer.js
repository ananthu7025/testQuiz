import axios from "axios";
import React, { useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../component/styles/Components.css";

const Mailer = ({ employee }) => {
  const baseURL = "http://localhost:3333/api/employees/auth/quiztest";
  const [post, setPost] = useState(null);
  const handleSubmit = () => {
    try {
      axios
        .post(baseURL, {
          email: employee.email,
          username: employee.username,
          password: "zeksta",
        })
        .then((response) => {
          setPost(response.data);
          toast("Email send successfully");
        });
    } catch (error) {
      console.error(error);
      return toast("Something wnt wrong");
    }
  };
  return (
    <td className="mailer1">
      <RiMailSendLine className="mailer2" onClick={handleSubmit} />
      <ToastContainer />
    </td>
  );
};
export default Mailer;
