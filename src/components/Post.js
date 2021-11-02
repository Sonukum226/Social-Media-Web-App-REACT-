import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addLike, createComment } from '../actions/posts';
import { Link } from 'react-router-dom';
import { Comment } from './';
import { connect } from 'react-redux';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  handleAddComment = (e) => {
    const { comment } = this.state;
    const { post } = this.props;

    if (e.key === 'Enter') {
      this.props.dispatch(createComment(comment, post._id));

      //clear comment
      this.setState({
        comment: '',
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  //for liking the post
  handlePostLike = () => {
    const { post, user } = this.props;

    this.props.dispatch(addLike(post._id, 'Post', user._id));
  };

  render() {
    const { post, user } = this.props;
    const { comment } = this.state;

    const isPostLikedByUSer = post.likes.includes(user._id);

    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              {/* Link to go for user profile */}
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg" //user avatar
                alt="user-pic"
              />
            </Link>

            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">a hour ago </span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostLikedByUSer ? (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
                  alt="likes-post"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                  alt="likes-icon"
                />
              )}
              <span>{post.likes.length}</span>
            </button>
            <div className="post-comments-icon">
              <img
                src="https://cdn-icons.flaticon.com/png/512/2076/premium/2076218.png?token=exp=1635564836~hmac=c454c4209bcf05c1f016fdd63ef33508"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Write a Comment!"
              onChange={this.handleOnCommentChange}
              onKeyPress={this.handleAddComment}
              value={comment}
            />
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} postId={post._id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Post.protoTypes = {
  post: PropTypes.object.isRequired,
};

function mapStateTPoros({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateTPoros)(Post);
