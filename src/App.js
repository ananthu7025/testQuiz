import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import QuestionList from "./Pages/Question/questionList/QuestionList";
import Employee from "./Pages/employee/Employee";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/js/bootstrap.js'
import "./App.css";
import { generateAccessToken, tokenAvailable } from "./redux/actions/zohoToken";
import {
  ACCESS_TOKEN,
  GRANT_TYPE,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_GRAND_TYPE,
  LOGIN_URL,
} from "./generalConfig";
import QuizTest from "./Pages/quizTest/quizTest";
import CategoryList from "./Pages/Question/questionCategory/CategoryList";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Beforeunload, useBeforeunload } from "react-beforeunload";
import Dashboard from "./Pages/dashboard/Dashboard";
import Quiz_Result from "./Pages/result/QuizResult";
// import Profile from "./Pages/quizTest/Profile";
let qs = require("qs");
const App = () => {
  let dispatch = useDispatch();
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.innerWidth <= 800) setShowMobileWarning(true);
  }, []);
  const [code, setCode] = useState({
    code: "",
    location: "",
    accountsserver: "",
  });
  const [accessTokenInfo, setAccessTokenInfo] = useState({
    grant_type: GRANT_TYPE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code: null,
    config: {
      accessTokenUrl: ACCESS_TOKEN,
      refreshGandType: REFRESH_GRAND_TYPE,
    },
  });
  useEffect(() => {
    var url_string = window.location;
    var url = new URL(url_string);
    var name = url.searchParams.get("code");
    name = name;
    var location = url.searchParams.get("location");
    var accountsserver = url.searchParams.get("accounts-server");
    setCode({
      ...code,
      code: name,
      location: location,
      accountsserver: accountsserver,
    });
    setAccessTokenInfo({
      ...accessTokenInfo,
      code: name,
    });
    let accessTokenUrl = ACCESS_TOKEN;
    let data = qs.stringify({
      grant_type: accessTokenInfo.grant_type,
      client_id: accessTokenInfo.client_id,
      client_secret: accessTokenInfo.client_secret,
      redirect_uri: accessTokenInfo.redirect_uri,
      code: name,
    });
    if (
      localStorage.access_token == "undefined" ||
      localStorage.access_token == null
    ) {
      if (
        (name == "undefined" || name == null) &&
        pathname.split("/")[1] !== "quizTest"
      ) {
        window.location = LOGIN_URL;
      } else {
        dispatch(generateAccessToken(accessTokenUrl, data));
        dispatch(generateAccessToken(accessTokenUrl, data, pathname));
      }
    } else {
      dispatch(tokenAvailable());
    }
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId="720580292349-2q8be208letmfp57nm9ol56vkjd7s5e7.apps.googleusercontent.com">
        <Beforeunload useBeforeunload={useBeforeunload}>
          <Routes>
            {showMobileWarning ? (
              alert("dont use mobile or else you will be disqualified.")
            ) : (
              <Route
                target="_blank"
                rel="noopener noreferrer"
                path="/quizTest/:id"
                element={<QuizTest />}
              />
            )}
          </Routes>
        </Beforeunload>
      </GoogleOAuthProvider>
      {showMobileWarning ? (
        console.log()
      ) : pathname.split("/")[1] !== "quizTest" ? (
        <div className="d-flex dash-background" id="wrapper dash-back">
          <Sidebar />
          <div id="page-content-wrapper">
            <Navbar />
            <div className="container-fluid px-4">
              -
              <div className="row my-5">
                <Routes>
                  {/* <Route path="/profile" element={<Profile />} /> */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/question-list" element={<QuestionList />} />
                  <Route path="/employee" element={<Employee />} />
                  <Route path="/categories" element={<CategoryList />} />
                  <Route path="/result" element={<Quiz_Result />} />
                </Routes>
              </div>
            </div>
            <div
        className="text-center p-3 footer-over"
        style={{ backgroundColor: "white", marginTop: "100px" }}
      >
        <p className="text-dark">© 2022 Copyright:</p>
        <a
          className="text-dark"
          href="https://www.google.com/search?gs_ssp=eJzj4tVP1zc0zDIoLik2TMkyYLRSNagwTkpMNTRNtEg1Sk5NTDE0tjKoME-1TDQyTjIztLBMMzQxSfYSrErNLi5JVChJTc7Iy8_JT68EABj4Fq4&q=zeksta+technology&rlz=1C1CHBF_enIN933IN934&oq=zeksta+&aqs=chrome.1.69i57j46i175i199i512j0i512j69i61.3409j0j15&sourceid=chrome&ie=UTF-8"
        >
          {" "}
          Zeksta Technology Pvt. Ltd.
        </a>
      </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default App;
