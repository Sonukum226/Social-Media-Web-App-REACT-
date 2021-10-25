import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetechPosts } from '../actions/posts';
import { PostsList, Navbar } from './'; //This is coming from index.js from components

//dummy Routes

const Login = () => <div>Login</div>;
const SignUp = () => <div>SignUp</div>;
const Home = () => <div>Home</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetechPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
          </ul>

          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
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
