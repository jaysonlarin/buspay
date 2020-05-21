import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary menu">
      <Link className="item" to='/' className="ui primary"> Home </Link>
    </div>
  );
};

export default Header;