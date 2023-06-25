import React from "react";
import PropTypes from "prop-types";

function ReusableProjectForm(props) {
  return (
    <React.Fragment>
      <form onSubmit = {props.projectFormSubmissionProp1}>
        <input
          type='text'
          name='link'
          placeholder='GitHub Link' />
        <input
          type='text'
          name='name'
          placeholder='Project Name' />
        {/* <input 
          type='image'
          name='image'
          placeholder='Project Splash Page' /> */}
        <input
          type='text'
          name='description'
          placeholder='Project Description' />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableProjectForm.propTypes = {
  projectFormSubmissionProp1: PropTypes.func
};

export default ReusableProjectForm;