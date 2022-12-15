import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddPopup = ({ currentId }) => {
  const employee = useSelector((state) =>
    currentId
      ? state.employees.employees.find((e) => e._id === currentId)
      : null
  );
  const [employeeData, setEmployeeData] = useState({
    username: "",
    email: "",
    mobile_no: "",
    _id: null,
  });
  useEffect(() => {
    if (employee) {
      setEmployeeData(employee);
    }
  }, [employee]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const style = { color: "green", fontSize: "1.3em" };
  return (
    <>
      <FaPlusCircle
        style={style}
        class="fa fa-plus"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#EditModal"
      />
      <div
        className="modal fade"
        id="EditModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Schedule Test for New Hires
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 ">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    id="Name"
                    aria-describedby="emailHelp"
                    name="username"
                    value={employeeData ? employeeData.username : null}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={employeeData ? employeeData.email : null}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="phone"
                    placeholder=" Phone-Number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="mobile_no"
                    value={employeeData ? employeeData.mobile_no : null}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        mobile_no: e.target.value,
                      })
                    }
                  />
                </div>
                <div></div> <br />
                <button
                  type="submit"
                  className=" w-100 "
                  data-bs-dismiss="modal"
                >
                  SUBMIT
                </button>
                <p></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPopup;
