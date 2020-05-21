import React from "react";
import { Link } from "react-router-dom";
import ModalLeave from './Leave';
import { SemanticToastContainer } from 'react-semantic-toasts';

class Home extends React.Component {
  render() {
    return (
      <div className="center-container">
        <SemanticToastContainer />
        <div className="center-position ui relaxed grid middle aligned">
          <div className="three column row">
            <div className="column"></div>
            <div className="column flex-me">
              <div className="ui large buttons">
                <ModalLeave />
                <div className="or"></div>
                <Link to='/list' className='ui button positive'>Start</Link>
              </div>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    )
  }
};

export default Home;