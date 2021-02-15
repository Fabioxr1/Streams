import React from "react";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY_AUTH = '200';
;

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:API_KEY,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    console.log(this.auth.currentUser.de.Es.sd)
  };

  onSingInClick = () => {
    this.auth.signIn();
  }
  onSignOutClick = ()  => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button
        onClick={this.onSignOutClick}
        className="ui google plus button">
          <i className="google plus icon"></i>
          Esci
        </button>
      );
    } else {
      return (
        <button
        onClick={this.onSingInClick}
        className="ui google plus button">
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

export default GoogleAuth;
