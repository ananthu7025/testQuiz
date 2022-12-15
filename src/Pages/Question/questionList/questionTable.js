import React, { useState, useEffect } from "react";
import EditQuestion from "../../../component/modals/EditQuestion";
import "../Question.css";
import { useSelector, useDispatch } from "react-redux";
import Paginate from "../../../component/paginate/QuestionPaginate";
import useStyles from "../../employee/Styles";
import QuestionDelete from "../../../component/modals/QuestionDelete";
import ViewQuestion from "../../../component/modals/viewQuestion";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

const QuesstionTable = ({ page, searchQue, search, expirence }) => {
  const { questions, Limit } = useSelector((state) => state.questions);
  const [currentId, setCurrentId] = useState(1);
  const [currentState, setCurrentState] = useState();
  const classes = useStyles();
  const [viewCurrentState, setViewCurrentState] = useState();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const Editclose = () => {
    setEditModal(false);
  };

  const Deleteclose = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    searchQue?.length > 0
      ? setViewCurrentState(searchQue)
      : setViewCurrentState(questions);
  }, [searchQue]);

  useEffect(() => {
    searchQue?.length > 0
      ? setCurrentState(searchQue)
      : setCurrentState(questions);
  }, [searchQue]);
  return (
    <>
      <div class="table-responsive project-list">
        {editModal && (
          <EditQuestion currentId={currentId} Editclose={Editclose} />
        )}

        {deleteModal && (
          <QuestionDelete question={currentId} Deleteclose={Deleteclose} />
        )}
        <table class="table project-table table-centered">
          <thead>
            <tr class="border border-dark">
              <th scope="col">SL No</th>
              <th scope="col">Questions & Options</th>
              <th scope="col">Answer</th>
              <th scope="col">Category </th>
              <th scope="col">Level</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <br />
          <tbody>
            {viewCurrentState?.map((question, i) => (
              <tr key={question._id}>
                <th scope="row">{(page - 1) * Limit + (i + 1)}</th>
                <td className="question_w">
                  {`${question.question.substring(0, 20)}`}
                  <a
                    onClick={(e) => {
                      if (currentState) {
                        setCurrentId(
                          e.target.parentElement.parentElement.parentElement
                            .parentElement.parentElement.rowIndex - 1
                        );
                      }
                    }}
                  >
                    <ViewQuestion currentId={currentId} que={question} />
                  </a>
                </td>

                <td className="td-options">{question.right_option?.map((item) => {
                    return <tr>{item}</tr>;
                  })}</td>
                <td>
                  {" "}
                  {question.category_id?.map((item) => {
                    return <tr>{item.label}</tr>;
                  })}
                </td>
                <td>{question.expirence}</td>

                <td>
                  <div class="action">
                    <div className="editCatBtn1">
                      <BsFillPencilFill
                        className="editCatBtn2"
                        type="button"
                        title=""
                        data-original-title="Edit"
                        onClick={(e) => {
                          setCurrentId(
                            question
                            // e.target.parentElement.parentElement.parentElement
                            //   .parentElement.parentElement.rowIndex - 1
                          );
                          setEditModal(true);
                        }}
                      />
                    </div>
                    <div className="delCatBtn1">
                      <BsFillTrashFill
                        className="delCatBtn2 h5 m-0 text-danger mr-4"
                        type="button"
                        onClick={(e) => {
                          setCurrentId(
                            question
                            // e.target.parentElement.parentElement.parentElement
                            //   .parentElement.parentElement.rowIndex - 1
                          );
                          setDeleteModal(true);
                        }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classes.pagination}>
        {!search && <Paginate page={page} />}
      </div>
    </>
  );
};

export default QuesstionTable;
