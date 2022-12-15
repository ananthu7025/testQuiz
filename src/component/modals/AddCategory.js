import React from "react";
import { useState } from "react";
import CategoryDataService from "../../services/categoryServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const AddCategoryModel = ({ refreshList }) => {
  const initialCategoryState = {
    id: null,
    category: "",
    status: "false",
  };
  const [categoryList, setCategoryList] = useState(initialCategoryState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inCategory, setInCategory] = useState(false);
  const [inSameCategory, setInSameCategory] = useState(false);
  const [inStatus, setInStatus] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryList({ ...categoryList, [name]: value });
  };
  useEffect(() => {}, [categoryList]);
  const SuccessNotify = () =>
    toast.success("Submitted Successfully!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const ErrorNotify = () =>
    toast.warn("Somthing went worng!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleStatusChange = (e) => {
    if (e.target.checked) {
      setCategoryList({ ...categoryList, status: "true" });
    } else {
      setCategoryList({ ...categoryList, status: "false" });
    }
  };
  const saveCategory = (e) => {
    setLoading(true);
    var data = {
      category: categoryList.category,
      status: categoryList.status,
    };
    if (data.category === "") {
      setInCategory(true);
      setInSameCategory(false);
      return;
    }
    if (data.status === "") {
      setInStatus(true);
      return;
    }
    CategoryDataService.create(data)
      .then((res) => {
        setCategoryList({
          id: res.data.id,
          category: res.data.category,
          status: res.data.status,
        });
        SuccessNotify();
        refreshList();

        setLoading(false);
        setInCategory(false);
        setInStatus(false);
        setInSameCategory(false);
        setCategoryList(initialCategoryState);
        setAddModal(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setInCategory(false);
        setInStatus(false);
        setInSameCategory(true);
        ErrorNotify();
        setCategoryList(initialCategoryState);
        setSubmitted(true);
      });
  };

  const newCategory = () => {
    setCategoryList(initialCategoryState);
    setSubmitted(false);
  };

  return (
    <div>
      <ToastContainer />
      <button
        type="button"
        class="addCatButton"
        onClick={() => setAddModal(true)}
      >
        ADD
      </button>

      {addModal ? (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Category Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setAddModal(false);
                    refreshList();
                    setSubmitted(false);
                    setInCategory(false);
                    setInStatus(false);
                    setInSameCategory(false);
                    setCategoryList(initialCategoryState);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div
                  className={
                    inCategory || inSameCategory ? "form was-validated" : "form"
                  }
                >
                  <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                      type="text"
                      className="form-control "
                      id="category"
                      required
                      value={categoryList.category}
                      onChange={handleInputChange}
                      name="category"
                    />
                    {inCategory && (
                      <p className="text-warning">Please Enter Category</p>
                    )}

                    {inSameCategory && (
                      <p className="text-warning">
                        This Category is Already Listed. Please Enter Different
                        Category
                      </p>
                    )}

                    <div class="form-switch mb-3 mt-3">
                      <input
                        class="form-check-input"
                        style={{ marginRight: "15px" }}
                        onChange={(e) => handleStatusChange(e)}
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />

                      {categoryList.status == "true" ? "Active" : "Not-Active"}
                    </div>
                    <button
                      onClick={(e) => saveCategory(e)}
                      type={"submit"}
                      className="w-100"
                    >
                      SUBMIT
                    </button>
                    <p></p>
                    <button
                      type="button"
                      className=" w-100 "
                      class="btn btn-danger w-100 "
                      onClick={newCategory}
                    >
                      CLEAR
                    </button>
                  </div>
                </div>
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

export default AddCategoryModel;
