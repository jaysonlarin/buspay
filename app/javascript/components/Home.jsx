import React from "react";
import { Link, Button } from "react-router-dom";

class Home extends React.Component {
  clickedLeave() {
    console.log("left");
  };

  render() {
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="six wide column"></div>
          <div className="six wide column">
            <div className="ui large buttons">
              <button className='ui button negative' onClick={this.clickedLeave}>Leave</button>
              <div className="or"></div>
              <Link to='/list' className='ui button positive'>Start</Link>
            </div>
          </div>
          <div className="six wide column"></div>
        </div>
      </div>
    )
  }
};

export default Home;