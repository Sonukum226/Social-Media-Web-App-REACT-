import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostsList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-pic"
                />

                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a hour ago</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>

              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>
                <div className="post-comments-icon">
                  <img
                    src="https://cdn-icons.flaticon.com/png/512/2076/premium/2076218.png?token=exp=1635564836~hmac=c454c4209bcf05c1f016fdd63ef33508"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="comments" />
              </div>

              <div className="post-comments-list">
                <div className="post-comments-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author"> Sonu</span>
                    <span className="post-comment-time"> a second ago</span>
                    <span className="post-comment-likes">30</span>
                  </div>
                  <div className="post-comment-content">XYZ content</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
PostsList.Prototype = {
  posts: PropTypes.array.isRequired,
};
export default PostsList;
