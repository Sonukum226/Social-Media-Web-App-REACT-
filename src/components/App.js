import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetechPosts } from '../actions/posts';
import { PostsList } from './';
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetechPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
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
        <PostsList posts={posts} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.Prototype = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
//connect  will connect to the posts
//connected the app component with redux store
