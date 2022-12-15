import React, { useEffect, useState } from "react";
import CategoryDataService from "../../services/categoryServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategory = (props) => {
  const initialCategoryState = {
    _id: null,
    category: "",
    status: false,
  };
  const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
  const [inCategory, setInCategory] = useState(false);
  const [inSameCategory, setInSameCategory] = useState(false);
  const getCategory = (id) => {
    CategoryDataService.get(id)
      .then((res) => {
        setCurrentCategory(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (props.Id) {
      getCategory(props.Id);
    }
  }, [props.Id]);
  const SuccessNotify = () =>
    toast.success("Updated Successfully!", {
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };
  const handleStatusChange = (e) => {
    if (e.target.checked) {
      setCurrentCategory({ ...currentCategory, status: "true" });
    } else {
      setCurrentCategory({ ...currentCategory, status: "false" });
    }
  };

  

  const updateCategory = () => {
    if (currentCategory.category === "") {
      setInCategory(true);
      setInSameCategory(false);
      return;
    }

    CategoryDataService.update(currentCategory._id, currentCategory)
      .then((response) => {
        props.refreshList();
        setInCategory(false);
        setInSameCategory(false);
        SuccessNotify();
        setEditModal();
      })
      .catch((e) => {
        setInCategory(false);
        setInSameCategory(true);
        ErrorNotify();
      });
    props.refreshList();
  };

  const refreshListCall = () => {
    props.refreshList();
  };

  const setEditModal = () => {
    props.Editclose();
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
                Edit Category Details
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  refreshListCall();
                  setInCategory(false);
                  setInSameCategory(false);
                  setEditModal();
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
                    value={currentCategory.category}
                    onChange={(e) => handleInputChange(e)}
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
                      checked={currentCategory.status == "true" ? true : false}
                    />
                    {currentCategory.status == "true" ? "Active" : "Not-Active"}
                  </div>
                  <button
                    onClick={updateCategory}
                    type={"submit"}
                    className="w-100"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
