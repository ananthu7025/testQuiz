import React from "react";

const Footer = () => {
  return (
    <div className=" w-100">
      <footer
        className="text-center text-lg-start text-white pb-0 "
        style={{ backgroundColor: "#929fba" }}
      >
        <div className="container pb-0">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Zeksta Technology Pvt. Ltd.
                </h6>
                <p>
                  We at Zeksta emerged out of experiences banked by our
                  developers and designers. Yes! We are a team of developers,
                  designers, and analysts, ready to deliver sensible yet
                  attractive, innovative, and easy to operate web as well as
                  software solutions for businesses
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Service</h6>
                <p>
                  <a className="text-white">Website Development</a>
                </p>
                <p>
                  <a className="text-white">ECommerce Web Development</a>
                </p>
                <p>
                  <a className="text-white">Web Design</a>
                </p>
                <p>
                  <a className="text-white">Mobile Application Development</a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                <p>
                  <i className="fas fa-home mr-3"></i> 3rd Floor, GNK Plaza, 9th
                  Cross, 1st Phase JP Nagar, Bangalore – 560078
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> solutions@zeksta.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> +91 9620390226
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 01 234 567 89
                </p>
              </div>
            </div>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2" }}
        >
          © 2022 Copyright:
          <a
            className="text-white"
            href="https://www.google.com/search?gs_ssp=eJzj4tVP1zc0zDIoLik2TMkyYLRSNagwTkpMNTRNtEg1Sk5NTDE0tjKoME-1TDQyTjIztLBMMzQxSfYSrErNLi5JVChJTc7Iy8_JT68EABj4Fq4&q=zeksta+technology&rlz=1C1CHBF_enIN933IN934&oq=zeksta+&aqs=chrome.1.69i57j46i175i199i512j0i512j69i61.3409j0j15&sourceid=chrome&ie=UTF-8"
          >
            {" "}
            Zeksta Technology Pvt. Ltd.
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
