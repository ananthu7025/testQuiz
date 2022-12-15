import React from "react";
import Logo from "../../assets/zeksta.png";
import "bootstrap/dist/css/bootstrap.min.css";

const ResultPage = () => {
  return (
    <>
      <div class="container w-100 " style={{ marginBottom: "70px" }}>
        <nav class="navbar navbar-light ">
          <div class="row">
            <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <img src={Logo} alt="logo" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default ResultPage;
