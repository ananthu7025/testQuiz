import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalQuestions } from "../../redux/actions/questions";
const ViewResult = ({ handleClose, details }) => {
  const { questions } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalQuestions());
  }, [details]);
  const abcd = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <div className="modal display-block">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header justify-content-end mx-5">
            Score:{details.score} / {details.total_score}
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                handleClose(true);
              }}
            ></button>
          </div>
          <div className="modal-body ">
            <div class="privew mt-3">
              <>
                <div class="questionsBox mt-3">
                  <div>
                    {details.answers.map((item) => {
                      return (
                        <>
                          <li class="questions">
                            {questions?.filter(
                              (que) => que._id === item.questionID
                            ).length > 0
                              ? questions?.filter(
                                  (que) => que._id === item.questionID
                                )[0].question
                              : ""}
                          </li>

                          {questions?.filter(
                            (que) => que._id === item.questionID
                          ).length > 0
                            ? questions
                                ?.filter(
                                  (que) => que._id === item.questionID
                                )[0]
                                .options.map((opt, i) => (
                                  <li
                                    class="answerList ans"
                                    style={
                                      (
                                        questions?.filter(
                                          (que) => que._id === item.questionID
                                        )[0].right_option.length > 1
                                          ? questions
                                              ?.filter(
                                                (que) =>
                                                  que._id === item.questionID
                                              )[0]
                                              .right_option.reduce((a, b) => {
                                                return a == opt || b == opt;
                                              })
                                          : (questions?.filter(
                                              (que) =>
                                                que._id === item.questionID
                                            )[0].right_option)[0] == opt
                                      )
                                        ? {
                                            backgroundColor: "green",
                                            color: "white",
                                          }
                                        : (
                                            item.answer.length > 1
                                              ? item.answer.reduce((a, b) => {
                                                  return a == opt || b == opt;
                                                })
                                              : opt == item.answer[0]
                                          )
                                        ? {
                                            backgroundColor: "red",
                                            color: "white",
                                          }
                                        : {}
                                    }
                                  >
                                    {abcd[i] + ")" + " "}
                                    {opt}
                                  </li>
                                ))
                            : ""}

                          <li class="answerList">
                            Correct answer:{" "}
                            {questions?.filter(
                              (que) => que._id === item.questionID
                            ).length > 0
                              ? questions?.filter(
                                  (que) => que._id === item.questionID
                                )[0].right_option.map((item) => {
                                  return (
                                    <td>
                                      {item}
                                    </td>
                                  );
                                })
                              : ""}
                          </li>
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewResult;
