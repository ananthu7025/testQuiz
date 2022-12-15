import React from "react";
const categoryDelete = (props) => {
  const deleteCall = (id) => {
    props.deleteCategory(id);
    props.Deleteclose();
  };
  return (
    <>
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
                onClick={() => props.Deleteclose()}
              ></button>
            </div>
            <div className="modal-body">
              <div class="modal-body">
                {props.Id && (
                  <p>
                    Do you really want to delete these * {props.Id.category} *
                    Category? This process cannot be undone.
                  </p>
                )}
              </div>
              <div class="modal-footer justify-content-center">
                <button
                  type="button btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => props.Deleteclose()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => deleteCall(props.Id._id)}
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

export default categoryDelete;
