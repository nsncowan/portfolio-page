import React from "react";
import PropTypes from "prop-types";

function Bio(props) {

  return (
    <React.Fragment>
      <h1>{props.bioName}</h1>
      <p>{props.bioText}</p>
    </React.Fragment>
  );
}

Bio.propTypes = {
  bioName: PropTypes.string,
  bioText: PropTypes.string
}

export default Bio;