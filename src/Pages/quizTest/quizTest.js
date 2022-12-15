import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getNewQuestions } from "../../redux/actions/questions";
import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createResult, getResults } from "../../redux/actions/results";
import { getTotalEmployees } from "../../redux/actions/employee";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { Beforeunload } from "react-beforeunload";
import ResultPage from "./ResultPage";
import Footer from "./Footer";
import Logo from "../../assets/zeksta.png";

const QuizTest = () => {
  let abcd = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.questions);
  const { results } = useSelector((state) => state.results);
  const { employees } = useSelector((state) => state.employees);
  const [getEmployee, setGetEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  var filterEmployee;
  useEffect(() => {
    dispatch(getResults());
    dispatch(getTotalEmployees(""));
  }, []);
  useEffect(() => {
    setGetEmployee(employees.filter((item) => item.email === jwtPayload.email));
  }, [employees]);
  window.addEventListener("beforeunload", () => {
    return false;
  });
  useEffect(() => {
    if (getEmployee.length > 0) {
      let categoryStr = "";
      for (var i = 0; i < getEmployee[0].category_id.length; i++) {
        categoryStr = categoryStr + getEmployee[0].category_id[i].label + ",";
      }
      dispatch(
        getNewQuestions(
          categoryStr,
          getEmployee[0].queLimit,
          getEmployee[0].employee_exp
        )
      );
      setLoading(false);
    }
  }, [getEmployee]);

  const { pathname } = useLocation();
  var auth = pathname.split("/quizTest/")[1];
  const jwtPayload = JSON.parse(window.atob(auth.split(".")[1]));
  var current_time = new Date().getTime() / 1000;
  const [tokenLive, setTokenLive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resultPas, setResultPas] = useState("");
  const [data, setData] = useState({});
  const [answersArr, setAnswerArr] = useState([]);
  const [googleAuth, setGoogleAuth] = useState(false);
  const [googleToken, setGoogleToken] = useState("");
  const [expired, setExpired] = useState(false);
  const [reloaded, setReloaded] = useState(false);

  function showAlert() {
    alert(
      "Note: Do not try to refresh the page otherwise test will be automatically Submit!"
    );
  }

  useEffect(() => {
    setDuration(parseInt(START_SECOND, 10) + 60 * parseInt(START_MINUTES, 10));

    let filterResult = results.filter(
      (item) => Number(item.tokenIAT) === jwtPayload.iat
    );
    if (filterResult.length !== 0) {
      setLoading(true);
      if (
        filterResult[filterResult.length - 1].score >=
        (filterResult[filterResult.length - 1].total_score * 33) / 100
      ) {
        setResultPas("Passed");
        setLoading(false);
      } else {
        setResultPas("Failed");
        setLoading(false);
      }
    }
    if (jwtPayload.exp > current_time) {
      if (filterResult.length > 0) {
        setTokenLive(false);
        setSubmitted(true);
        setIsRunning(false);
        setLoading(false);
      } else {
        if (googleAuth && googleToken) {
          var googleData = jwt_decode(googleToken);

          if (googleData.email === jwtPayload.email) {
            setTokenLive(true);
            setIsRunning(true);
          }
        }
        setLoading(false);
      }
    } else {
      setExpired(true);
    }
  }, [results, googleAuth, googleToken, data, reloaded]);
  filterEmployee = employees.filter((item) => item.email === jwtPayload.email);
  const START_MINUTES = "1";
  const START_SECOND = "0";
  const START_DERATION = 10;
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState(START_DERATION);
  const [isRunning, setIsRunning] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  let timer;
  useEffect(() => {
    let answersArrVar = Object.entries(data).map(([questionID, answer]) => ({
      questionID,
      answer,
    }));
    setAnswerArr(answersArrVar);
  }, [data]);

  useEffect(() => {
    if ((timeOut || reloaded) && !submitted) {
      onSubmit();
      setLoading(false);
    }
  }, [answersArr, timeOut, reloaded]);
  useEffect(() => {
    setLoading(false);
    if (isRunning === true) {
      timer = duration;
      var minutes, seconds;

      const interval = setInterval(function () {
        if (--timer <= 0) {
          setTimeOut(true);
          setLoading(false);
        } else {
          filterEmployee = employees.filter(
            (item) => item.email === jwtPayload.email
          );
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          setMinutes(minutes);
          setSeconds(seconds);
          setLoading(false);
        }
      }, 100000);

      return () => clearInterval(interval);
    }
  }, [isRunning, getEmployee, questions, googleToken]);
  const onChange = (questionID, e, question_type) => {
    const temp = { ...data };
    if (temp[questionID] && question_type === "checkbox") {
      if (e.target.checked) {
        temp[questionID] = [...temp[questionID], e.target.value];
      } else {
        temp[questionID] = temp[questionID].filter(
          (ele) => ele !== e.target.value
        );
      }
    } else {
      if (e.target.checked) {
        temp[questionID] = [e.target.value];
      }
    }
    setData(temp);
  };

  const onSubmit = () => {
    setLoading(true);
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
    setDuration(START_DERATION);
    setTokenLive(false);
    setSubmitted(true);

    let filterResult = results.filter(
      (item) => Number(item.tokenIAT) === jwtPayload.iat
    );

    if (filterResult.length > 0) {
      setTokenLive(false);
      setSubmitted(true);

      return;
    }

    filterEmployee = employees.filter(
      (item) => item.email === jwtPayload.email
    );

    var newScore = 0;

    for (var i = 0; i < questions.length; i++) {
      for (var j = 0; j < answersArr.length; j++) {
        if (questions[i]._id === answersArr[j].questionID) {
          if (
            questions[i].right_option.sort().join("") ==
            answersArr[j].answer.sort().join("")
          ) {
            newScore++;
          }
        }
      }
    }

    dispatch(
      createResult({
        empId: filterEmployee[0]._id,
        total_score: questions.length,
        score: newScore,
        answers: answersArr,
        empEmail: filterEmployee[0].email,
        tokenIAT: jwtPayload.iat,
      })
    );
    setTokenLive(false);
    setSubmitted(true);
    setLoading(false);
  };
  return (
    <>
      {googleAuth && !tokenLive && !submitted && !expired && (
        <div>
          <ResultPage />
          <div style={{ padding: "100px" }}>
            <h5>You need to login with correct Gmail Id</h5>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                setGoogleAuth(true);
                setGoogleToken(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              size="large"
              text="continue_with"
              type="standard"
              width="300px"
            />
          </div>
          <Footer />
        </div>
      )}

      {!googleAuth && !tokenLive && (
        <div style={{ width: "100%" }}>
          <ResultPage />
          <div className="container pb-0" style={{ height: "500px" }}>
            <div className="row" style={{ width: "90%" }}>
              <div
                className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3"
                style={{ width: "90%" }}
              >
                <h5>First you need to login by Google</h5>

                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    setGoogleAuth(true);
                    setGoogleToken(credentialResponse.credential);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  size="large"
                  text="continue_with"
                  type="standard"
                  width="300px"
                />

                <p style={{ marginTop: "30px" }}>
                  <a style={{ color: "Red" }}>Note</a> : Once Test will be start
                  then do not refresh the browser and also do not open any new
                  tab and any softwere and if you will try to do this it will be
                  automatically submit.
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
      {loading && (
        <div style={{ display: "flex", margin: "auto", padding: "auto" }}>
          <img
            style={{ margin: "auto" }}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
          />
        </div>
      )}
      {!loading &&
        googleAuth &&
        (tokenLive ? (
          <>
            {/* <Beforeunload
              onBeforeunload={(event) => {
                event.preventDefault();
                if (!submitted) {
                  setReloaded(true);
                }
              }}
            /> */}
            {
              (window.onbeforeunload = function () {
                if (!submitted) {
                  setReloaded(true);
                }
              })
            }
            <div className="headerTest" onLoad={!submitted ? showAlert : ""}>
              <div
                className="modal-header justify-content-between "
                style={{
                  alignItems: "center",
                  display: "flex",
                  width: "90%",
                  margin: "auto",
                }}
              >
                <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase">
                  <img src={Logo} alt="logo" />
                </div>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="modal-title"
                  id="exampleModalLabel"
                >
                  <h3
                    style={{
                      margin: "auto 0px auto 0px",
                      color: "#F67F15",
                      fontWeight: "bolder",
                    }}
                  >
                    QUIZ TEST
                  </h3>
                </div>
                <div>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="timer" style={{ fontSize: "30px" }}>
                      {currentMinutes}
                      <span className="mx-3">:</span>
                      {currentSeconds}
                    </div>
                  </span>
                </div>
              </div>
              <hr />
            </div>
            <Box
              className="box"
              style={{
                width: "90%",
                display: "flex",
                margin: "20px auto 30px auto",
              }}
            >
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="privew mt-2">
                      {questions.map((item, i) => {
                        return (
                          <>
                            <div className="questionsBox">
                              <div className="questions">
                                {i + 1 + ".  " + item.question}
                              </div>
                              <ol type="A" className="answerList">
                                {item.options
                                  .sort(() => 1 - Math.random())
                                  .map((ans, index) => {
                                    function selectOnlyThis(id) {
                                      var ID = id.checked;
                                      var myCheckbox =
                                        document.getElementsByName(
                                          item.question
                                        );
                                      Array.prototype.forEach.call(
                                        myCheckbox,
                                        function (el) {
                                          el.checked = false;
                                        }
                                      );
                                      id.checked = ID;
                                    }
                                    return (
                                      <li className="list-options  centre">
                                        <label
                                          className="optionLabel "
                                          style={{}}
                                          htmlFor={item.question}
                                        >
                                          <div
                                            className="d-flex flex-row"
                                            style={{}}
                                          >
                                            <div
                                              className="d-flex justify-content-start"
                                              style={{
                                                width: "20px",
                                                marginRight: "20px",
                                              }}
                                            >
                                              <div
                                                className="p-2 mcqOtions"
                                                style={{
                                                  marginRight: "5px",
                                                  width: "40px",
                                                  display: "block",
                                                }}
                                              >
                                                {abcd[index] + ". "}
                                              </div>

                                              {item.question_type ===
                                              "checkbox" ? (
                                                <input
                                                  type="checkbox"
                                                  className="mcqAns"
                                                  name={item.question}
                                                  id={item.question}
                                                  value={ans}
                                                  onChange={(e) =>
                                                    onChange(
                                                      item._id,
                                                      e,
                                                      item.question_type
                                                    )
                                                  }
                                                />
                                              ) : (
                                                <input
                                                  type="checkbox"
                                                  className="mcqAns"
                                                  name={item.question}
                                                  id={item.question}
                                                  value={ans}
                                                  onChange={(e) =>
                                                    onChange(
                                                      item._id,
                                                      e,
                                                      item.question_type
                                                    )
                                                  }
                                                  onClick={(e) =>
                                                    selectOnlyThis(e.target)
                                                  }
                                                />
                                              )}
                                            </div>
                                            <span
                                              className="p-2  mcqOtions"
                                              style={{ marginLeft: "15px" }}
                                            >
                                              {"  " + ans}
                                            </span>
                                          </div>
                                        </label>
                                      </li>
                                    );
                                  })}
                              </ol>
                            </div>
                          </>
                        );
                      })}
                      <div className="modal-footer justify-content-center mt-4">
                        <button
                          type="button btn-close"
                          className="button-66 mr-3"
                          onClick={onSubmit}
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
            <Footer />
          </>
        ) : googleAuth && submitted ? (
          <div w={"100%"}>
            <ResultPage />
            <div
              style={{
                height: "400px",
                width: "100%",
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                padding: "auto",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <h5>Your Test is Submitted Successfully...</h5>
              <br />
              <h5>Thank you !</h5>
            </div>
            <Footer />
          </div>
        ) : (
          ""
        ))}
      {expired && googleAuth && (
        <div w={"100%"}>
          <ResultPage />
          <div
            style={{
              height: "400px",
              width: "100%",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              padding: "auto",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <h5>Your Link is Expired...Thank you !</h5>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
export default QuizTest;
