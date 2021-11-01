import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUSerProfile } from '../actions/profile';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      //dispatch an action
      this.props.dispatch(fetchUSerProfile(match.params.userId));
    }
  }
  render() {
    const {
      match: { params },
      profile,
    } = this.props;

    const user = profile.user;

    console.log('this.props', params);

    if (profile.inProgress) {
      return <h1>Loading!</h1>;
    }

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
          <button className="button save-btn">Add Friend</button>
        </div>
      </div>
    );
  }
}

function mapStatetoProps({ profile }) {
  return {
    profile,
  };
}

export default connect(mapStatetoProps)(UserProfile);
