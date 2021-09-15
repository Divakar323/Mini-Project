import React, { Component } from "react";

export default class footer extends Component {
  render() {
    return (
      <div
        className="container-fluid text-light p-2 text-center"
        style={{ backgroundColor: "rgb(230 230 230)"}}
      >
        <br></br>
        <p style={{color: "#000"}}>
        This Chat application is build by Divakar D and G Suhas<br />
        @Nocopyright Is Reserved With This
        </p>
      </div>
    );
  }
}
