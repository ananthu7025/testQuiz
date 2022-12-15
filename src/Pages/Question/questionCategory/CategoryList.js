import React from "react";
import CategoryDataService from "../../../services/categoryServices";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import CategoryTable from "./CategoryTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryFailure,
  getCategoryRequest,
  getCategorySuccess,
} from "../../../redux/actions/categoryActions";
import { Helmet } from "react-helmet";
import AddCategoryModel from "../../../component/modals/AddCategory";
import CatePagination from "./CategoryPagination";

const CategoryList = (props) => {
  const [Newcategories, setNewCategories] = useState([]);
  const [searchCate, setSearchCate] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState(true);
  const cateRef = useRef();
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  useEffect(() => {
    retrieveCategories();
  }, [status, page]);

  useEffect(() => {
    setCount(Math.ceil(category.length / pageSize));
    setNewCategories(category.slice((page - 1) * pageSize, page * pageSize));
  }, [page, pageSize, category]);

  const SuccessNotify = () =>
    toast.success("Deleted Successfully!", {
      position: "top-right",
      autoClose: 500,
    });

  const ErrorNotify = () =>
    toast.warn("Somthing went worng!", {
      position: "top-right",
      autoClose: 500,
    });

  const onChangeSearchCate = (e) => {
    CategoryDataService.findByCategory(searchCate)
      .then((res) => {
        dispatch(getCategorySuccess(res.data));
      })
      .catch((err) => console.log(err));
    const searchcategory = e.target.value;
    setSearchCate(searchcategory);
  };
  const retrieveCategories = () => {
    dispatch(getCategoryRequest());
    CategoryDataService.getAll({ q: searchCate })
      .then((res) => {
        dispatch(getCategorySuccess(res.data));
        setNewCategories(res.data);
      })
      .catch((err) => {
        dispatch(getCategoryFailure());
        console.log(err);
      });
  };
  const refreshList = () => {
    retrieveCategories();
  };
  const findByCategory = () => {
    CategoryDataService.findByCategory(searchCate)
      .then((res) => {
        dispatch(getCategorySuccess(res.data));
      })
      .catch((err) => console.log(err));
  };
  const handleStatusChange = (e, checked, i) => {
    if (e.target.checked && checked) {
      CategoryDataService.update(Newcategories[i]._id, {
        status: "true",
        category: Newcategories[i].category,
      })
        .then(() => retrieveCategories())
        .catch((err) => console.log(err));
    } else {
      CategoryDataService.update(Newcategories[i]._id, {
        status: "false",
        category: Newcategories[i].category,
      })
        .then(() => retrieveCategories())
        .catch((err) => console.log(err));
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };
  const deleteCategory = (id) => {
    CategoryDataService.remove(id)
      .then((res) => {
        refreshList();
        SuccessNotify();
      })
      .catch((err) => {
        console.log(err);
        ErrorNotify();
      });
  };

  return (
    <>
      <Helmet>
        <title>Quiz-App: &nbsp; Category</title>

        <meta name="category" />
      </Helmet>
      <div className="container" style={{ width: "100%" }}>
        <div className="d-flex justify-content-between" style={{ width: "100%" }}>
          <div className="col-xl-3 col-md-6 mb-3" style={{ width: "40%" }}>
            <div className="input-group mb-0" style={{ width: "100%" }}>
              <div
                className="d-flex justify-content-start "
                style={{ width: "70%" }}
              >
                <div style={{ width: "100%" }}>
                  <input
                    type="text"
                    className="form-control border border-dark "
                    placeholder="Search..."
                    value={searchCate}
                    onChange={onChangeSearchCate}
                    aria-describedby="project-search-addon"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-9 col-md-6 d-flex justify-content-end"
            style={{ width: "30%" }}
          >
            <form>
              <div className="form-group mb-0">
                <div>
                  <AddCategoryModel refreshList={refreshList} />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body border border-dark">
              <CategoryTable
                data={Newcategories}
                refreshList={refreshList}
                deleteCategory={deleteCategory}
                page={page}
                pageSize={pageSize}
                handleStatusChange={handleStatusChange}
                status={status}
              />
              <div
                className="d-flex .justify-content-between"
                style={{
                  marginRight: "5px",
                  width: "120px",

                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginRight: "5px",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <select
                    className="form-select "
                    onChange={handlePageSizeChange}
                    style={{ width: "70px", marginRight: "5px" }}
                  >
                    <option value="10" selected>
                      10
                    </option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                  </select>
                  <div>Items</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CatePagination page={page} setPage={setPage} count={count} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
