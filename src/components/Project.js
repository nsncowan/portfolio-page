import React from "react";
import PropTypes from "prop-types";

function Project(props) {
  const { onClickingEdit2, onClickingDelete2, onProjectSelection2 } = props;
  return (
    <React.Fragment>
      <h1>{props.name}</h1>
      <a href={props.link}>Github Repo</a>
      {/* Image of project splash page */}
      <h2>{props.description}</h2>
      <h3>date added</h3>
      <button onClick={()=> {onClickingEdit2(); onProjectSelection2(props.id)}}>Update Project</button>
      <button onClick={() => onClickingDelete2(props.id) }>Delete Project</button>
      <hr/>
    </React.Fragment>
  );
}

Project.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  onClickingDelete2: PropTypes.func,
  onClickingEdit2: PropTypes.func, 
  onProjectSelection2: PropTypes.func
    //image: 
};

export default Project;

