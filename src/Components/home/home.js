import React, { Component } from "react";

import Header from "./header/header";
import Main from "./main/main";
import Footer from "./footer/footer";

export default class home extends Component {

  render() {
    return (
      <div
        className="container-fluid p-0 m-0"
        style={{ backgroundColor: "white" }}
      >
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
