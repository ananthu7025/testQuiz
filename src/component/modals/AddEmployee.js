import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { createEmployee} from "../../redux/actions/employee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import CategoryDataService from "../../services/categoryServices";
import "../styles/Components.css";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [employeeData, setEmployeeData] = useState({
    username: "",
    email: "",
    mobile_no: "",
    employee_exp: "",
    category_id: [],
    queLimit: "5"
  });
  const [catData, setCatData] = useState([]);
  const [addModel, setAddModel] = useState(false);

  useEffect(() => {
    retrieveCategories();
  }, []);

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
      if (data[i].status === "true") {
        obj.value = data[i]._id;
        obj.label = data[i].category;
        options.push(obj);
      }
    }
    return options;
  };
  const clear = () => {
    setEmployeeData({
      username: "",
      email: "",
      mobile_no: "",
      employee_exp: "",
      category_id: [],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createEmployee(employeeData, setAddModel));
    clear();
  };
  const addModelTrue = () => {
    setAddModel(true);
  };

  return (
    <div>
      <ToastContainer />

      <div></div>
      <button type="button" class="addEmpButton" onClick={addModelTrue}>
        ADD
      </button>

      {addModel ? (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Employee Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAddModel(false)}
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
                      required
                      value={employeeData.username}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          username: e.target.value,
                        })
                      }
                    />
                    <div class="invalid-feedback">
                      Please fill out this field.
                    </div>
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
                      required
                      value={employeeData.email}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          email: e.target.value,
                        })
                      }
                    />
                    <div class="invalid-feedback">
                      Please fill out this field.
                    </div>
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
                      required
                      value={employeeData.mobile_no}
                      onChange={(e) =>
                        setEmployeeData({
                          ...employeeData,
                          mobile_no: e.target.value,
                        })
                      }
                    />
                    <div class="invalid-feedback">
                      Please fill out this field.
                    </div>
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
                      value={employeeData.employee_exp}
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
                    <Select
                      isMulti
                      isClearable={true}
                      onChange={(item) =>
                        setEmployeeData({ ...employeeData, category_id: item })
                      }
                      isSearchable={true}
                      closeMenuOnSelect={true}
                      options={catData}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Test Questions Limit 
                    </label>
                    <select
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
      ) : (
        ""
      )}
    </div>
  );
};

export default AddEmployee;
