import _ from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStreamId, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  const { match, fetchStreamId } = props;
  useEffect(() => {
    fetchStreamId(match.params.id);
  }, [match,fetchStreamId]);

  const onSubmit = (formValue) => {
    props.editStream(match.params.id, formValue);
  };

  if (!props.stream) {
    return <div>Any stream find</div>;
  }
  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={_.pick(props.stream, "title", "description")}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return { stream: state.streams[id] };
};
export default connect(mapStateToProps, { fetchStreamId, editStream })(
  StreamEdit
);
