import React, { Component } from "react";

import FirstImg from "../../../img/my_app_img.png";
import SecondImg from "../../../img/add_tasks_img.png";

import Img1 from "../../../img/progressive_app_img.png";
import Img2 from "../../../img/chatting.png";
import Img3 from "../../../img/real_time_collaboration_img.png";
import { Link } from 'react-router-dom';
import Slider from "./slider/slider";

import "./main.css";

export default class main extends Component {
  render() {
    return (
      <div className="container-fluid text-center">
        {/* starting first div start */}
        <div className="row">
          <div className="col-xs-12 col-lg-6 col-md-12">
            <img src={FirstImg} style={{ width: "100%" }} />
          </div>
          <div className="col-xs-12 col-lg-6 col-md-12 flex">
            <div className=" block-texts p-5 shadow">
              <h3 style={{ fontFamily: "Roboto Slab, serif" }}>
                Simple. Secure. Reliable messaging App.
              </h3>
              <p style={{ fontSize: "15px" }}>
                web Messenger Is A Chat App Which Provide Free Message Services. you'll
                get fast, simple, secure messaging.
              </p>
              <br></br>

              <a
                href="#block2"
                className="btn text-light"
                style={{ backgroundColor: "#7335dd" }}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
        {/* ending first div*/}

        {/* starting second div */}
        <div className="row " id="block2">
          <div className="col-xs-12 col-lg-6 col-md-12 flex nohidden">
            <div className=" block-texts p-5 shadow">
              <h3 style={{ fontFamily: "Roboto Slab, serif" }}>
                Attractive And Simple Layout
              </h3>
              <p style={{ fontSize: "15px" }}>
                Easy To Understand The Using. New Chats Are Easy To Make you'll
                get fast Response From This Site, So Let's Start
              </p>
              <br></br>
              <button
                className="btn "
                style={{ backgroundColor: "#7335dd", color: "white" }}>
                  <Link to="/login" style={{color: "white", textDecoration: "none"}}>
                    Sign Up
                  </Link>
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-lg-6 col-md-12 mt-3">
            <img src={SecondImg} style={{ width: "100%" }} />
          </div>
          
          <div className="col-xs-12 col-lg-6 col-md-12 flex hidden">
            <div className=" block-texts p-5 shadow">
              <h3 style={{ fontFamily: "Roboto Slab, serif" }}>
                Attractive And Simple Layout
              </h3>
              <p style={{ fontSize: "15px" }}>
                Easy To Understand The Using. New Chats Are Easy To Make you'll
                get fast Response From This Site, So Let's Start
              </p>
              <br></br>

              <button
                className="btn "
                style={{ backgroundColor: "#7335dd", color: "white" }}>
                  <Link to="/login" style={{color: "white", textDecoration: "none"}}>
                    Sign Up
                  </Link>
              </button>
            </div>
          </div>
        </div>

        {/* ending second div */}

        {/* starting third div cards */}

        <h2
          className="mt-5 p-3 "
          id="block3"
          style={{
            fontFamily: "Roboto Slab, serif",
          }}
        >
          Speciality
        </h2>
        <div className="row container-fluid m-0 p-0">
          <div className="col-lg-4 col-md-12 mt-4 shaker">
            {/* card1 start */}

            <div className="mt-3 shadow">
              <div className="view overlay">
                <img className="card-img-top" src={Img1} alt="Card image cap" />
              </div>

              <div className="card-body">
                <h4 className="card-title">Responsive Website</h4>

                <p className="card-text">
                  This Website Is Fully Responsive, So You Can Easily Run On
                  Mobile, Tablet Or Laptop
                </p>
                <a className="btn text-light" target="_blank" href="https://getbootstrap.com/docs/4.1/getting-started/introduction/" style={{textDecoration: "none", backgroundColor: "#7335dd", height:"35px"}}>
                  <p>To Understand about Bootstrap</p>
                </a>
              </div>
            </div>

            {/* card1 over */}
          </div>

          <div className="col-lg-4 col-md-12 mt-4 shaker">
            {/* card2 start */}

            <div className="mt-3 shadow">
              <div className="view overlay">
                <img
                  className="card-img-top"
                  src={Img2}
                  alt="Card image cap"
                  style={{ width: "68%" }}
                />
              </div>

              <div className="card-body">
                <h4 className="card-title">Chat Layout</h4>

                <p className="card-text">
                  The Layout Is User Friendly , They Can Easily Understand
                  Controls
                </p>
                <a className="btn text-light" href="https://reactjs.org/docs/getting-started.html" target="_blank" style={{textDecoration: "none", backgroundColor: "#7335dd", height:"35px"}}>
                  <p>To Understand about Reactjs</p>
                </a>
              </div>
            </div>

            {/* card2 over */}
          </div>

          <div className="col-lg-4 col-md-12 mt-4 shaker">
            {/* card3 start */}

            <div className="mt-3 shadow">
              <div className="view overlay">
                <img
                  className="card-img-top"
                  src={Img3}
                  alt="Card image cap"
                  style={{ width: "76%" }}
                />
              </div>

              <div className="card-body">
                <h4 className="card-title">Fastest Connection</h4>

                <p className="card-text">
                  We Use Firebase Free Servers So That User Can Achieve Fast
                  Connection
                </p>
                <a className="btn text-light" href="https://firebase.google.com/docs" target="_blank" style={{textDecoration: "none", backgroundColor: "#7335dd", height:"35px"}}>
                  <p>To Understand about firebase</p>
                </a>
              </div>
            </div>

            {/* card3 over */}
          </div>
        </div>
        {/* ending third div cards */}

        {/* slider start */}
        <div className="mt-5" id="block4">
          <h2 style={{ fontFamily: "Roboto Slab, serif" }}>Extra Features</h2>
          <Slider />
        </div>

        {/* slider end */}

        <br></br>
      </div>
    );
  }
}
