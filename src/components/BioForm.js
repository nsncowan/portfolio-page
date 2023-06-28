import React from "react";
import PropTypes from "prop-types"; 

function BioForm(props) {

  // form submission function
  function newBioFormSubmission(event) {
    event.preventDefault();
    props.addNewBioProp1({
      bioName: event.target.bioName.value,
      bioText: event.target.bioText.value
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={newBioFormSubmission}>
        <input 
          type="text" 
          name="bioName" 
          placeholder="Enter your name" />
        <textarea 
          name="bioText" 
          placeholder="Write your bio here" />
        <button type="submit">Submit Your Bio</button>
      </form>
    </React.Fragment>
  );
}

// PropTypes
BioForm.propTypes = {
  addNewBioProp1: PropTypes.func
};

export default BioForm;