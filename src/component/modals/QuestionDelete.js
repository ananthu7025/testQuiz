import React from "react";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../redux/actions/questions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Components.css";

const QuestionDelete = ({ question, Deleteclose }) => {
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
                onClick={() => Deleteclose()}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div class="modal-body">
                <p>
                  {question !== undefined
                    ? `Do you really want to delete these * ${question.question.substring(
                        0,
                        20
                      )}... * records?`
                    : "Unable to delete this record please reload page and  Try again!."}{" "}
                </p>
              </div>
              <div class="modal-footer justify-content-center">
                <button
                  type="button btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => Deleteclose()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  disabled={question === undefined}
                  data-bs-dismiss="modal"
                  onClick={() =>
                    dispatch(deleteQuestion(question._id)).then(() =>
                      Deleteclose()
                    )
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

export default QuestionDelete;
