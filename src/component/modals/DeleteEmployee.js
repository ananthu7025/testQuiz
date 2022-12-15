import React from "react";
import { useDispatch } from "react-redux";
import { deleteEmployee } from "../../redux/actions/employee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlertBox = ({ employee, Deleteclose, refreshList }) => {
  const dispatch = useDispatch();
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
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => Deleteclose()}
              ></button>
            </div>
            <div className="modal-body">
              <div class="modal-body">
                <p>
                  {employee !== undefined
                    ? `Do you really want to delete these *${employee.username}* records?`
                    : "Unable to delete this record please reload page and  Try again!."}{" "}
                </p>
              </div>
              <div class="modal-footer justify-content-center">
                <button
                  type="button btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  data-dismiss="modal"
                  onClick={() => Deleteclose()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  disabled={employee === undefined}
                  data-bs-dismiss="modal"
                  onClick={() =>
                    dispatch(deleteEmployee(employee._id)).then(() => {
                      Deleteclose();
                      refreshList();
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertBox;
