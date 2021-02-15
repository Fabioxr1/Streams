import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY_AUTH;

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: API_KEY,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const auth = {
        id : this.auth.currentUser.get().getId(),
        name: this.auth.currentUser.get().getBasicProfile().sd
      }
      this.props.signIn(auth);
    } else {
      this.props.signOut();
    }
  };

  onSingInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui google plus button">
          <i className="google plus icon"></i>
          Esci
        </button>
      );
    } else {
      return (
        <button onClick={this.onSingInClick} className="ui google plus button">
          <i className="google plus icon"></i>
          Accedi Con Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
