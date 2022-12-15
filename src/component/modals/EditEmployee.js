import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEmployee } from "../../redux/actions/employee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import CategoryDataService from "../../services/categoryServices";
import "../styles/Components.css";

const EditEmployee = ({ currentId, Editclose, refreshList }) => {
  const [employeeData, setEmployeeData] = useState({
    username: "",
    email: "",
    mobile_no: "",
    employee_exp: "",
    category_id: [],
    queLimit:"",
    _id: null,
  });
  const dispatch = useDispatch();
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    if (currentId) {
      setEmployeeData(currentId);
      setCatData(retrieveCategories());
    }
  }, [currentId]);

  const clear = () => {
    setEmployeeData({
      username: "",
      email: "",
      mobile_no: "",
      employee_exp: "",
      category_id: [],
      queLimit:"",
      _id: null,
    });
  };
  const retrieveCategories = () => {
    CategoryDataService.getAll()
      .then((res) => {
        setCatData(optionCreate(res.data));
      })
      .catch((err) => console.log(err));
  };
  const optionCreate = (data) => {
    let options = [];
    for (var i = 0; i < data.length; i++) {
      let obj = {};
      obj.value = data[i]._id;
      obj.label = data[i].category;
      options.push(obj);
    }
    return options;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateEmployee(employeeData._id, employeeData))
      .then(() => setEditModal())
      .catch((err) => console.log(err));
    clear();
  };

  const setEditModal = () => {
    Editclose();
  };
  const refreshListCall = () => {
    refreshList();
  };

  return (
    <>
      <ToastContainer />
      <div
        className="modal show fade"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Employee Details
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setEditModal();
                  refreshListCall();
                }}
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
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
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
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
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Phone-Number
                  </label>
                  <input
                    type="phone"
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

                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Employee Experience
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="employee_exp"
                    value={employeeData ? employeeData.employee_exp : null}
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        employee_exp: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Technology
                  </label>
                  {
                    <Select
                      value={employeeData ? employeeData.category_id : null}
                      isMulti
                      isClearable={true}
                      onChange={(e) =>
                        setEmployeeData({ ...employeeData, category_id: e })
                      }
                      isSearchable={true}
                      closeMenuOnSelect={true}
                      options={catData}
                    />
                  }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Test Questions Limit 
                    </label>
                    <select
                    value={employeeData ? employeeData.queLimit : null}
                    class="form-select "
                    onChange={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        queLimit: e.target.value,
                      })
                    }
                  >
                    <option value="5" >5</option>  
                    <option value="10">10</option> 
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="60">60</option>
                    <option value="100">100</option>
                  </select>
                  </div>
                <button
                  type="submit"
                  className=" w-100 "
                  data-bs-dismiss="modal"
                >
                  SUBMIT
                </button>
                <p></p>
                <button
                  type="button"
                  className=" w-100 "
                  class="btn btn-danger w-100 "
                  onClick={clear}
                >
                  CLEAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
