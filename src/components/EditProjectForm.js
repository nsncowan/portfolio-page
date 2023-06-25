import React from "react";
import PropTypes from "prop-types";
import ReusableProjectForm from "./ReusableProjectForm";

function EditProjectForm(props) {
  const { project } = props;

  function projectFormSubmissionOrigin(event) {
    event.preventDefault();
    props.editProjectProp1({
      name: event.target.name.value,
      description: event.target.description.value,
      link: event.target.link.value,
      id: project.id
    });
  }

  return (
    <React.Fragment>
      <ReusableProjectForm 
        projectFormSubmissionProp1={projectFormSubmissionOrigin}
        buttonText="Update Project" />
    </React.Fragment>
  );
};

EditProjectForm.propTypes = {
  editProjectProp1: PropTypes.func,
  project: PropTypes.object
};

export default EditProjectForm;