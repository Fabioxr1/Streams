import React, { Fragment } from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStream, fetchStreamId } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStreamId(this.props.match.params.id);
  }

  renderAction() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button ">
          Cancel
        </Link>
      </Fragment>
    );
  }
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want delete this stream with title ${this.props.stream.title}`;
  }
  render() {
    return (
      <Modal
        title="Delete Streams"
        content={this.renderContent()}
        actions={this.renderAction()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { deleteStream, fetchStreamId })(
  StreamDelete
);
