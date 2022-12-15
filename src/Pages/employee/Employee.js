import React, { useState } from "react";
import AddEmployee from "../../component/modals/AddEmployee";
import EmployeeTable from "./EmployeeTable";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesBySearch } from "../../redux/actions/employee";
import { Helmet } from "react-helmet";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Employee = () => {
  const query = useQuery();
  const page = query.get("page") || 1;
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  




  const searchPost = (e) => {
    setSearch(e.target.value);
    if (search.trim()) {
      dispatch(getEmployeesBySearch({ search }));
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Quiz-App: &nbsp; Candidate</title>
        <meta name="Candidate" />
      </Helmet>
      <div className="row">
        <div className="col-xl-9 col-md-6">
          <form>
            <div className="form-group mb-0 w-50">
              <div className="input-group mb-0 search-box">
                <input
                  type="text"
                  name="search"
                  className="form-control border border-dark"
                  placeholder="Search..."
                  aria-describedby="project-search-addon"
                  value={search}
                  onChange={searchPost}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="col-xl-3 col-md-6 mb-3">
          <div className="container d-flex  justify-content-end">
            <div>
              <AddEmployee />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body border border-dark">
            <EmployeeTable search={search} page={page} searchEmp={employees} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
