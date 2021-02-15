import React from "react";
import { connect } from "react-redux";

const NameUser = (props) => {
  return <div className="item">{props.name}</div>;
};

const mapToStateToPros = ({ auth }) => {
  return { name: auth.nameUser };
};
export default connect(mapToStateToPros)(NameUser);
