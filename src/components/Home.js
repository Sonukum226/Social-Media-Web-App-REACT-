import React, { Component } from 'react';
import { PostsList, FriendList } from './';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;

    return (
      <div className="home">
        <PostsList posts={posts} />
        {isLoggedin && <FriendList friends={friends} />}
      </div>
    );
  }
}

export default Home;
