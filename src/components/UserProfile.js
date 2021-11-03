import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend, removeFriend } from '../actions/friends';
import { fetchUSerProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      //dispatch an action
      this.props.dispatch(fetchUSerProfile(match.params.userId));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;

    const {
      match: { params: currentParams },
    } = this.props;

    if (
      prevParams &&
      currentParams &&
      prevParams.userId !== currentParams.userId
    ) {
      this.props.dispatch(fetchUSerProfile(currentParams.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    console.log('this.props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    //this will grab the index of user id if the user is friend
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  //this function work when user click in add friend
  handleAddFriendClick = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };
    const response = await fetch(url, options);

    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added Friend SuccessFully!',
      });

      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  // this function works when user click on Remove friend
  handleRemoveFriendClick = async () => {
    const { match } = this.props;

    const userId = this.props.match.params.userId; //getting the user id
    const url = APIUrls.RemoveFriend(userId); // gettingh the url

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);

    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Friend Removed SuccessFully!',
      });

      this.props.dispatch(removeFriend(match.params.userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    console.log('this.props', params);
    const user = profile.user;

    if (profile.inprogres) {
      return <h1>Loading!</h1>;
    }
    //this will get a boolena value
    const isUserAFriend = this.checkIfUserIsAFriend();

    //this is comeing from state
    const { success, error, successMessage } = this.state;

    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
            id="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriendClick}
            >
              Remove friend
            </button>
          )}

          {success && (
            <div className="alert success-dialog">{successMessage}</div>
          )}
          {error && <div className="alert error-dialog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStatetoProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}

export default connect(mapStatetoProps)(UserProfile);
