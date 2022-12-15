import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalEmployees } from "../../redux/actions/employee";
import Avatar from "@mui/material/Avatar";
import SideBar from "./DashSidebar";
import "./Style.css";
import { BiSearchAlt } from "react-icons/bi";
import { getTotalRes } from "../../redux/actions/results";
import moment from "moment";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const { results } = useSelector((state) => state.results);
  const [currentId, setCurrentId] = useState(1);
  const [succesEmplo, setSuccessEmplo] = useState([]);
  useEffect(() => {
    dispatch(getTotalEmployees(""));
    dispatch(getTotalRes());
  }, [currentId]);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    var successEmp = [];
    for (var i = 0; i < employees.length; i++) {
      for (var j = 0; j < results.length; j++) {
        if (
          employees[i]._id === results[j].empId &&
          !successEmp.includes(employees[i])
        ) {
          successEmp.push(employees[i]);
        }
      }
    }
    setSuccessEmplo(successEmp);
  }, [employees, results]);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const currentDate = moment();
  const cardStyle = {
    width: "400px",
    height: "370px",
    margin: "30px auto",
    overflow: "auto",
    maxheight: "300px",
  };

  const cardBody = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  };

  return (
    <>
      <div className="dash-back">
        <div className="row dash-t">
          <div class="col-lg-6">
            <div class="card-dash card-01 second-card">
              <div class="card-body">
                <div class="list-group">
                  <div class="d-flex Heading ">
                    <h5 class="text-heading">New Candidate</h5>
                  </div>
                  {employees?.filter((item) =>
                    moment(item.createdAt).isSame(currentDate, "day")
                  ).length === 0 ? (
                    <div style={{ margin: "auto" }}>
                      <BiSearchAlt className="icon-nodata" />
                      <h5 className="no-data">
                        No New Candidate in past 1 day.
                      </h5>
                    </div>
                  ) : (
                    employees
                      ?.filter((item) =>
                        moment(item.createdAt).isSame(currentDate, "day")
                      )
                      .map((employee, i) => (
                        <div
                          onClick={showSidebar}
                          key={employee._id}
                          style={cardBody}
                        >
                          <a
                            onClick={() => setCurrentId(employee._id)}
                            href="#"
                            class="list-group-item list-group-item-action flex-column align-items-start dash-content "
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Avatar
                                src=""
                                onClick={() => setCurrentId(employee._id)}
                              />
                            </div>
                            <p style={{ marginTop: "-40px" }} class="mb-1">
                              {" "}
                              <strong>Name:</strong> &nbsp;{employee.username}
                            </p>
                            <small class="mb-1">
                              <strong>Email:</strong> &nbsp;{employee.email}
                            </small>
                            <br />
                            <small class="mb-1">
                              <strong>Mobile_No:</strong> &nbsp;
                              {employee.mobile_no}
                            </small>
                          </a>
                        </div>
                      ))
                  )}
                  <SideBar
                    currentId={currentId}
                    cardStyle={cardStyle}
                    employees={employees}
                    sidebar={sidebar}
                    showSidebar={showSidebar}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card-dash card-01 second-card">
              <div class="card-body">
                <div class="list-group">
                  <div class="d-flex Heading">
                    <h5 class="text-heading">Pending Candidate</h5>
                  </div>
                  {employees?.filter((emp) => !succesEmplo.includes(emp))
                    .length === 0 ? (
                    <div style={{ margin: "auto" }}>
                      <BiSearchAlt className="icon-nodata" />
                      <h5 className="no-data">No New Pending Candidate </h5>
                    </div>
                  ) : (
                    employees
                      .filter((emp) => !succesEmplo.includes(emp))
                      ?.map((employee, i) => (
                        <div key={employee._id}>
                          <a
                            href="#"
                            class="dash-content list-group-item list-group-item-action flex-column align-items-start "
                          >
                            <p class="mb-1">
                              {" "}
                              <strong>Name:</strong> &nbsp;{employee.username}
                            </p>
                            <small class="mb-1">
                              <strong>Email:</strong> &nbsp;{employee.email}
                            </small>
                            <br />
                            <small class="mb-1">
                              <strong>Mobile_No:</strong> &nbsp;
                              {employee.mobile_no}
                            </small>
                          </a>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 ">
            <div class="card-dash card-01 second-card">
              <div class="card-body">
                <div class="list-group">
                  <div class="d-flex Heading">
                    <h5 class="text-heading">Expired Candidate</h5>
                  </div>

                  {employees?.filter((emp) => !succesEmplo.includes(emp))
                    .length === 0 ? (
                    <div style={{ margin: "auto" }}>
                      <BiSearchAlt className="icon-nodata" />
                      <h5 className="no-data">No New Expired Candidate </h5>
                    </div>
                  ) : (
                    employees?.map((employee, i) => (
                      <div key={employee._id}>
                        <a
                          href="#"
                          class="list-group-item list-group-item-action flex-column align-items-start dash-content "
                        >
                          <p class="mb-1">
                            {" "}
                            <strong>Name:</strong> &nbsp;{employee.username}
                          </p>
                          <small class="mb-1">
                            <strong>Email:</strong> &nbsp;{employee.email}
                          </small>
                          <br />
                          <small class="mb-1">
                            <strong>Mobile_No:</strong> &nbsp;
                            {employee.mobile_no}
                          </small>
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card-dash card-01 second-card">
              <div class="card-body">
                <div class="list-group">
                  <div class="d-flex Heading">
                    <h5 class="heading">Candidate Result</h5>
                  </div>

                  {results
                    ?.filter((item) =>
                      moment(item.createdAt).isSame(currentDate, "day")
                    )
                    .map((result, i) => (
                      <div key={i}>
                        <a
                          href="#"
                          class="list-group-item list-group-item-action flex-column align-items-start dash-content "
                        >
                          <p class="mb-1">
                            {" "}
                            <strong>Name:</strong> &nbsp;
                            {employees?.filter((emp) => emp._id == result.empId)
                              .length > 0
                              ? employees?.filter(
                                  (emp) => emp._id == result.empId
                                )[0].username
                              : ""}
                          </p>
                          <small class="mb-1">
                            <strong>Email:</strong> &nbsp;{result.empEmail}
                          </small>
                          <br />
                          <small class="mb-1">
                            <strong>Score:</strong> &nbsp;
                            {result.score + "/" + result.total_score}
                          </small>
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
