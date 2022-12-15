import React, { useState, useEffect } from "react";
import AddQuestion from "../../../component/modals/AddQuestion";
import { Helmet } from "react-helmet";
import QuesstionTable from "./questionTable";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterQuestions,
  getQuestionBySearch,
} from "../../../redux/actions/questions";
import { IoMdArrowDropdown } from "react-icons/io";
import CategoryDataService from "../../../services/categoryServices";
import Select from "react-select";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const QuestionList = () => {
  const query = useQuery();
  var page = query.get("page") || 1;
  const [search, setSearch] = useState("");
  const [expirence, setExpirence] = useState("");
  const [category, setCategory] = useState([]);
  const [catData, setCatData] = useState([]);
  const [catArr, setCatArr] = useState([]);

  useEffect(() => {
    retrieveCategories();
  }, []);
  const dispatch = useDispatch();
  const searchQuestion = (e) => {
    setSearch(e.target.value);
    if (search.trim()) {
      dispatch(getQuestionBySearch({ search }));
    }
  };

  useEffect(() => {
    var arr = [];
    for (var i = 0; i < category.length; i++) {
      arr.push(category[i].label);
    }
    setCatArr(arr);
  }, [category]);

  useEffect(() => {
    dispatch(getFilterQuestions(page, expirence, catArr.join(",")));
  }, [page, expirence, catArr]);

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

  const { questions } = useSelector((state) => state.questions);
  return (
    <div className="container">
      <Helmet>
        <title>Quiz-App: &nbsp; Question</title>
        <meta name="employee" />
      </Helmet>
      <div className="row">
        <div className="col-xl-9 col-md-6">
          <form>
            <div className="form-group mb-0  w-50 ">
              <div className="input-group mb-0 search-box">
                <input
                  type="text"
                  className="form-control border border-dark"
                  placeholder="Search..."
                  aria-describedby="project-search-addon"
                  value={search}
                  onChange={searchQuestion}
                />
              </div>
              <div id="toolbar">
                <select
                  onChange={(e) => {
                    setExpirence(e.target.value);
                  }}
                  id="select"
                  className=" mt-2 "
                >
                  <IoMdArrowDropdown />
                  <option value="">All</option>
                  <option value={5}>Expert</option>
                  <option value={3}>Intermediate</option>
                  <option value={1}>Beginner</option>
                </select>
              </div>
              <div id="toolbar" className=" mt-2 ">
                {/* <label htmlFor="exampleInputEmail1" className="form-label">
                      Technology
                    </label> */}
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
        <div className="col-xl-3 col-md-6 mt-5">
          <div className="container d-flex  justify-content-end ">
            <AddQuestion />
          </div>
        </div>
      </div>
      <div className="col-lg-12 mt-3">
        <div className="card">
          <div className="card-body border border-dark">
            <QuesstionTable
              search={search}
              page={page}
              searchQue={questions}
              expirence={expirence}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
