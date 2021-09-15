import React, { Component } from "react";
import Loading from "react-loading";
import { Link } from "react-router-dom";

import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import ForgetImg from "../../img/forget.png";
import "./forget.css";
toast.configure()
export default class forget extends Component {
  state = {
    email: "",
    loading: false,
  };

  submitData = async () => {
    const { email } = this.state;

    this.setState({ loading: true });

    try {
      if (email) {
        await auth.sendPasswordResetEmail(email);

        toast.info("Password Reset Link Is Sent",{position: toast.POSITION.TOP_CENTER, autoClose: 3000, hideProgressBar: true});

        this.setState({ loading: false });
      } else {
        toast.error("Please Enter Valid Data",{position: toast.POSITION.TOP_CENTER, autoClose: 2000, hideProgressBar: true});
        this.setState({ loading: false });
      }
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <div style={{backgroundColor: "#F8F8F8", height: "100vh" }}>
        {/* main login container start */}
        <div className="center forget-pass-container shadow p-5 " >
          {/* row container starting here */}

          {this.state.loading === false ? (
            <div className="row  ">
              {/* first col starting here */}
              <div className="col-lg-6 col-md-6 left flex">
                <img src={ForgetImg} className="forget-pass-img" />
              </div>

              <div className="col-lg-6 col-md-6 right flex2">
                <h1 style={{ fontWeight: "600", color: "#555456" }}>
                  Forget Password
                </h1>
                <div className="login-inputs">
                  <br></br>
                  <input style={{width: "80%" }}
                    className="email p-2"
                    type="email"
                    value={this.state.email}
                    onChange={(e) =>
                      this.setState({ email: e.target.value.toLowerCase() })
                    }
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        this.submitData();
                      }
                    }}
                    placeholder="Email"
                  />

                  <br></br>
                  <br></br>

                  <button
                    className="btn login-btn mt-2"
                    style={{
                      backgroundColor: "#7536e2",
                      color: "white",
                      borderRadius: "50px",
                    }}
                    onClick={() => this.submitData()}
                  >
                    Submit
                  </button>
                  <div className="mt-4">
                    <Link to="/login" style={{ color: "black" }}>
                      <b className="text-secondary">Already User</b>
                    </Link>
                  </div>

                  <div style={{ fontWeight: "700" }}>Or</div>

                  <div className="">
                    <Link to="/login" style={{ color: "black" }}>
                      <b className="text-secondary">Create Account</b>
                    </Link>
                  </div>
                </div>
              </div>
              {/* first col ending here */}
            </div>
          ) : (
            <center>
              <div
                className="shadow p-3"
                style={{ backgroundColor: "#E7E7E7", height:"100%", width: "100%"}}
              >
                <Loading type="bars" color="black" height={100} width={100} />

                <h3>Processing...</h3>
              </div>
            </center>
          )}
          {/* row container ending here */}
        </div>
        {/* main login container end */}
      </div>
    );
  }
}
