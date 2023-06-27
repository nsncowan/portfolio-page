import React from "react";
import Project from "./Project";
import PropTypes from "prop-types";

function ProjectList(props) {
  return (
    <React.Fragment>
      <hr/>
      {props.projectList.map((project) => 
        <Project
          onProjectSelection2 = { props.onProjectSelection1 }
          link={project.link}
          name={project.name}
          // image={project.img}
          description={project.description}
          id={project.id} 
          key={project.id}
          onClickingEdit2 = {props.onClickingEdit1}
          onClickingDelete2 = {props.onClickingDelete1}
          />
      )}
    </React.Fragment>
  );
}

ProjectList.propTypes = {
  projectList: PropTypes.array,
  onProjectSelection1: PropTypes.func,
  onClickingEdit1:PropTypes.func,
  onClickingDelete1:PropTypes.func
};

export default ProjectList;