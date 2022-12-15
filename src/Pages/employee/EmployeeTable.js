import React, { useEffect, useState } from "react";
import AlertBox from "../../component/modals/DeleteEmployee";
import { useSelector } from "react-redux";
import EditEmployee from "../../component/modals/EditEmployee";
import Paginate from "../../component/paginate/Pagination";
import useStyles from "./Styles.js";
import Mailer from "../../component/Mailer";
import moment from "moment";
import { getTotalEmployees } from "../../redux/actions/employee";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

const EmployeeTable = ({ searchEmp, page, search }) => {
  const classes = useStyles();
  const [currentState, setCurrentState] = useState();
  const [currentId, setCurrentId] = useState(1);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { employees, Limit } = useSelector((state) => state.employees);

  useEffect(() => {
    searchEmp?.length > 0
      ? setCurrentState(searchEmp)
      : setCurrentState(employees);
  }, [searchEmp]);

  const tablecenterCSS = {
    textAlign: "left",
  };

  const Editclose = () => {
    setEditModal(false);
  };

  const Deleteclose = () => {
    setDeleteModal(false);
  };

  const refreshList = () => {
    getTotalEmployees();
  };

  return (
    <>
      {editModal && (
        <EditEmployee
          currentId={currentId}
          setCurrentId={setCurrentId}
          Editclose={Editclose}
          refreshList={refreshList}
        />
      )}

      {deleteModal && (
        <AlertBox
          employee={currentId}
          refreshList={refreshList}
          Deleteclose={Deleteclose}
        />
      )}
      <div class="table-responsive project-list table-hover">
        <table class="table project-table table-centered table-nowrap">
          <thead>
            <tr class="border border-dark">
              <th className="slno" scope="col">
                SL No
              </th>
              <th scope="col">Candidate Name </th>
              <th scope="col">Mobile</th>
              <th scope="col">Email</th>
              <th style={tablecenterCSS} scope="col">
                Experience
              </th>
              <th scope="col">Technology</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <br />
          <tbody>
            {currentState?.map((employee, i) => (
              <tr>
                <th scope="row">{(page - 1) * Limit + (i + 1)}</th>
                <td>{employee.username}</td>
                <td>{employee.mobile_no}</td>
                <td>{employee.email}</td>
                <td style={tablecenterCSS}>
                  {employee.employee_exp}&nbsp;Years
                </td>
                <td>
                  {employee.category_id?.map((item) => {
                    return <tr style={tablecenterCSS}>{item.label}</tr>;
                  })}
                </td>
                <td>{moment(employee.createdAt).utc().format("DD-MM-YY")}</td>
                <td>
                  <div class="action">
                    <div className="editCatBtn1">
                      <BsFillPencilFill
                        className="editCatBtn2"
                        type="button"
                        onClick={(e) => {
                          setCurrentId(employee);
                          setEditModal(true);
                        }}
                      />
                    </div>
                    <div className="delCatBtn1" style={{"marginRight":"10px"}}>
                      <BsFillTrashFill
                        className="deleteEmp2 h5 m-0 text-danger"
                        type="button"
                        onClick={(e) => {
                          setCurrentId(
                            employee
                          );
                          setDeleteModal(true);
                        }}
                      />
                    </div>

                    <Mailer employee={employee} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classes.pagination}>
        {!search && <Paginate page={page} />}
      </div>
    </>
  );
};

export default EmployeeTable;
