import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="left-div">
          <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt="logo"
          />
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          />
          <input placeholder="search" />
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                />
                <span>Rock</span>
              </li>

              <li className="search-results-row">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                />
                <span>Rock</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          <div className="user">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-dp"
              id="user-dp"
            />
            <span>Sonu Kumar</span>
          </div>
          <div className="nav-links">
            <ul>
              <li>Login</li>
              <li>LogOut</li>
              <li>Register</li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
