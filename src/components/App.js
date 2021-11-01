import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetechPosts } from '../actions/posts'; //coming from action post
import {
  Home,
  Navbar,
  Page404,
  Login,
  Register,
  Setting,
  UserProfile,
} from './'; //This is coming from index.js from components
import jwt_decode from 'jwt-decode';
import { authenticate_user } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  //Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    this.props.dispatch(fetechPosts());

    const token = getAuthTokenFromLocalStorage();

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
      this.props.dispatch(fetchUserFriends()); //if the user is logged in then fetch the friends list
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
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
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <PrivateRoute
              path="/setting"
              component={Setting}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    //connected to reducer
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.Prototype = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
//connect  will connect to the posts
//connected the app component with redux store
