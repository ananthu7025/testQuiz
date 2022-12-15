import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Modals.css";
import "react-toastify/dist/ReactToastify.css";

const ViewQuestion = ({ que }) => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(1);
  const questions = useSelector((state) =>
    currentId
      ? state.questions.questions?.find((q) => q._id === currentId)
      : null
  );
  const handleOpen = () => {
    setOpen(!open);
    setCurrentId(que._id);
  };

  const handleLess = () => {
    setCurrentId(null);
  };
  useEffect(() => {
    if (questions) {
      return questions;
    }
  }, [questions]);
  return (
    <>
      {!questions && (
        <a
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#ViewQuestionModal"
          onClick={handleOpen}
        >
          ...<small className="show-more">Show More</small>
        </a>
      )}
      {questions && (
        <div key={questions._id}>
          <div>
            <br />
            <h6 className="card-title">{questions.question}</h6>
            <p className="card-text">
              <strong>Options :</strong> &nbsp;{questions.options?.map((item,i) => {
                    return <tr><td>{i+1}.</td> <td>{item}</td></tr>;
                  })}
            </p>
            <a
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#ViewQuestionModal"
              onClick={handleLess}
            >
              <small className="show-more">Show Less</small>
            </a>
          </div>
          <br />
        </div>
      )}
    </>
  );
};

export default ViewQuestion;
