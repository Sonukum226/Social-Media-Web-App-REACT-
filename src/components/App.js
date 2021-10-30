import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetechPosts } from '../actions/posts'; //coming from action post
import { Home, Navbar, Page404, Login, Register } from './'; //This is coming from index.js from components
import jwt_decode from 'jwt-decode';
import { authenticate_user } from '../actions/auth';

//
const Logout = () => <div>LogOut</div>;

class App extends React.Component {
  //Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    this.props.dispatch(fetechPosts());

    const token = localStorage.getItem('token');

    if (token) {
      const user = jwt_decode(token);

      console.log('user', user);

      this.props.dispatch(
        //this will go in action fist and then reducer
        authenticate_user({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar /> {/*Navbar*/}
          <Switch>
            {' '}
            {/*Switch==>f any path found at first time it won't go for another Routes*/}
            {/* Route to Home Page */}
            <Route
              exact //return true if it exacty on the path
              path="/" //path to home page
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/signup" component={Register} />
            <Route component={Page404} />
          </Switch>
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
