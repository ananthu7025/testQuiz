import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Result from "./QuizResultTable";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getResultBySearch } from "../../redux/actions/results";
import CategoryDataService from "../../services/categoryServices";
import Select from "react-select";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Quiz_Result = () => {
  const { results } = useSelector((state) => state.results);
  const query = useQuery();
  const page = query.get("page") || 1;
  const [search, setSearch] = useState("");
  const [catData, setCatData] = useState([]);
  const [category, setCategory] = useState([]);
  const [catArr, setCatArr] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    var arr = [];
    for (var i = 0; i < category.length; i++) {
      arr.push(category[i].label);
    }
    setCatArr(arr);
  }, [category]);

  useEffect(() => {
    retrieveCategories();
  }, []);

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

  const retrieveCategories = () => {
    CategoryDataService.getAll()
      .then((res) => {
        setCatData(optionCreate(res.data));
      })
      .catch((err) => console.log(err));
  };

  const searchPost = (e) => {
    setSearch(e.target.value);
    if (search.trim()) {
      dispatch(getResultBySearch({ search }));
    }
  };

  return (
    <div class="container">
      <Helmet>
        <title>Quiz-App: &nbsp;Result</title>
        <meta name="Candidate" />
      </Helmet>
      <div class="row">
        <div class="col-xl-9 col-md-6">
          <form>
            <div class="form-group mb-0 w-50">
              <div class="input-group mb-0 search-box">
                <input
                  type="text"
                  name="search"
                  class="form-control border border-dark"
                  placeholder="Search by email..."
                  aria-describedby="project-search-addon"
                  value={search}
                  onChange={searchPost}
                />
              </div>
              <div id="toolbar" class="mt-3">
                <Select
                  id="selectMulti"
                  isMulti
                  isClearable={true}
                  onChange={(item) => setCategory(item)}
                  isSearchable={true}
                  closeMenuOnSelect={true}
                  options={catData}
                  placeholder={"Select Technology..."}
                />
              </div>
            </div>
          </form>
        </div>
        <div class="col-xl-3 col-md-6 mb-3">
          <div class="container d-flex  justify-content-end"></div>
        </div>
      </div>
      <div class="col-lg-12 mt-3">
        <div class="card">
          <div class="card-body border border-dark">
            <Result
              search={search}
              page={page}
              searchEmp={results}
              catArr={catArr}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz_Result;
