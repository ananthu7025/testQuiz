import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalEmployees } from "../../redux/actions/employee";
import { getResults, getTotalRes} from "../../redux/actions/results";
import ViewResult from "../../component/modals/ViewResult";
import Paginate from "../../component/paginate/ResultPaginate";
import useStyles from "../employee/Styles";

const Result = ({ searchEmp, page, search,catArr }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { employees } = useSelector((state) => state.employees);
  const { results } = useSelector((state) => state.results);
  const [currentId, setCurrentId] = useState(1);
  const [currentState, setCurrentState] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const hanldeClick = (selectedRec) => {
    setSelectedData(selectedRec);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  useEffect(() => {
    dispatch(getTotalEmployees(catArr.join(",")));
    catArr.length>0?dispatch(getTotalRes()):dispatch(getResults())
  }, [currentId,catArr]);
  useEffect(() => {
    if(searchEmp?.length > 0) setCurrentState(searchEmp)  
      
  }, [searchEmp]);

  useEffect(() => {
    var filterRes = [];
    results.forEach((res, index) => {
      employees.forEach((emp, i) => {
        if (res.empId == emp._id && !filterRes.includes(res)) {
          filterRes.push(res);
        }
      });
    });
    catArr.length>0?setCurrentState(filterRes):setCurrentState(results);
  }, [employees,results]);

  return (
    <>
      <div class="table-responsive project-list table-hover">
        <table class="table project-table table-centered">
          <thead>
            <tr class="border border-dark">
              <th scope="col">SL No</th>
              <th scope="col">Candidate</th>
              <th scope="col">Email</th>
              <th scope="col">Technology</th>
              <th scope="col">Score </th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <br />
          <tbody>
            {currentState?.map((result, i) => (
              <tr>
                <td>{i + 1 + (((catArr.length>0) || search) ? 0 :(Number(page)-1)*4)}</td>
                <td>
                  {employees?.filter((emp) => emp._id == result.empId).length >
                  0
                    ? employees?.filter((emp) => emp._id == result.empId)[0]
                        .username
                    : ""}
                </td>
                <td>{result.empEmail}</td>
                <td>
                  {employees?.filter((emp) => emp._id == result.empId).length >
                  0
                    ? employees
                        ?.filter((emp) => emp._id == result.empId)[0]
                        .category_id.map((item) => {
                          return (
                            <ol>
                              <li>{item.label}</li>
                            </ol>
                          );
                        })
                    : ""}
                </td>
                <td>
                  {(result.score * 100) / result.total_score <= 33
                    ? `bad (${result.score}/${result.total_score})`
                    : null}
                  {(33 < ((result.score * 100) / result.total_score)) && ((result.score * 100) / result.total_score <= 66)
                    ? `intermediate (${result.score}/${result.total_score})`
                    : null}
                  {(result.score * 100) / result.total_score > 66
                    ? `Excelent (${result.score}/${result.total_score})`
                    : null}
                </td>
                <td>
                  <button
                    className="viewEmp1"
                    style={{ color: "black", border: "1px solid white" }}
                    onClick={() => hanldeClick(result)}
                  >
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {show && <ViewResult details={selectedData} handleClose={hideModal} />}
      </div>
      <div className={classes.pagination}>
        {!search && catArr.length==0 && <Paginate page={page} />}
      </div>
    </>
  );
};

export default Result;
