import React from "react";
import PropTypes from "prop-types";
import ReusableProjectForm from "./ReusableProjectForm";

function NewProjectForm(props) {

  function projectFormSubmissionOrigin(event) {
    event.preventDefault();
    props.createNewProjectProp1({
      name: event.target.name.value,
      description: event.target.description.value,
      link: event.target.link.value
    });
  }

  return (
    <React.Fragment>
      <ReusableProjectForm 
        projectFormSubmissionProp1={projectFormSubmissionOrigin}
        buttonText="Add Project" />
    </React.Fragment>
  );
}

NewProjectForm.propTypes = {
  createNewProjectProp1: PropTypes.func
};

export default NewProjectForm;