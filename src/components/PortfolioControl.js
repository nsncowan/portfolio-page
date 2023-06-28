import React, { useState, useEffect } from 'react';
import NewProjectForm from "./NewProjectForm";
import EditProjectForm from"./EditProjectForm";
//import Project from "./Project";
import ProjectList from "./ProjectList";
import BioForm from './BioForm';
import Bio from './Bio';
import { db, auth } from './../firebase.js';
import { collection, addDoc, doc, updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

function PortfolioControl() {

//Information States
  const [userBio, setUserBio] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [mainProjectList, setMainProjectList] = useState([]);

//Display States
  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editing, setEditing] = useState(false); // how can we repurpose editing for skills, projects, and bio?
  const [error, setError] = useState(null);
  const [project, setProject] = useState(true);

  useEffect(() => {
    const unSubscribeProjects = onSnapshot(
      collection(db, 'projects'),
      (collectionSnapshot) => {
        const projects = [];
        collectionSnapshot.forEach((doc) => {
          projects.push({
            name: doc.data().name,
            description: doc.data().description,
            link: doc.data().link,
            id: doc.id
          });
        });
        setMainProjectList(projects);
      },
      (error) => {
      }
    );
    const unSubscribeBio = onSnapshot(
      collection(db, 'userBio'),
      (collectionSnapshot) => {
        const userBio = [];
        collectionSnapshot.forEach((doc) => {
          userBio.push({
            bioName: doc.data().bioName,
            bioText: doc.data().bioText
            //id: doc.id
          });
        });
        setUserBio(userBio);
      },
      (error) => {
      }
    );
    const unSubscribeSkillsList = onSnapshot(
      collection(db, 'skillslist'),
      (collectionSnapshot) => {
        const userSkills = [];
        collectionSnapshot.forEach((doc) => {
          userSkills.push({
            skill: doc.data().skill,
            id: doc.id
          });
        });
        setSkillsList(userSkills);
      },
      (error) => {
      }
    );

    //Run the functions
    const initialize = () => {
      unSubscribeProjects();
      unSubscribeBio();
      unSubscribeSkillsList();
      // console.log("Hello World");
    }
    return initialize;
  }, []);
  
  const handleDeletingProject = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    setSelectedProject(null);
  }

  const handleEditingProject = async (projectToEdit) => {
    const projectRef = doc(db, "projects", projectToEdit.key);
    await updateDoc(projectRef, projectToEdit);
    setEditing(false);
    setSelectedProject(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleAddingProject = async (newProject) => {
    await addDoc(collection(db, "projects"), newProject);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedProject = (id) => {
    const selectedProject = mainProjectList.filter(project => project.id === id)[0];
    setSelectedProject(selectedProject);
  }

  const handleAddBioClick = () => {
    setProject(false);
  }

  const handleAddingBio = async (newBio) => {
    await addDoc(collection(db, "userBio"), newBio);
    setFormVisibleOnPage(false);
    setProject(true);
  }

  const handleClick = () => {
    if (selectedProject != null) {
      setFormVisibleOnPage(false);
      setSelectedProject(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the queue.</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {

  let currentlyVisibleState = null;
  let otherCurrentlyVisibleState = null;
  let buttonText = null;
  let otherButtonText = null;

  if(error) {
    currentlyVisibleState = <p>There was an error:{error}</p>
  } 
  else if (editing && project) {
    currentlyVisibleState = <EditProjectForm project = {selectedProject} editProjectProp1 = {handleEditingProject} />;
    buttonText = "Return to Project List";
  } 
  else if (formVisibleOnPage && project) {
    currentlyVisibleState = <NewProjectForm createNewProjectProp1 = {handleAddingProject} />;
    buttonText = "Return to Project List";
  } 
/*   else if (editing && !project) {
    currentlyVisibleState = <EditProjectForm project = {selectedProject} editProjectProp1 = {handleEditingProject} />;
    buttonText = "Return to Project List";
  }  */
  else if (!formVisibleOnPage && !project) {
    currentlyVisibleState = <BioForm addNewBioProp1 = {handleAddingBio} />;
  } 
  else {
    currentlyVisibleState = 
      <ProjectList 
      projectList = {mainProjectList} 
      onClickingEdit1 = {handleEditClick} 
      onClickingDelete1 ={handleDeletingProject} 
      onProjectSelection1 = {handleChangingSelectedProject} />;
    buttonText = "Add Project";
    otherCurrentlyVisibleState = 
      <Bio 
      bioName = {userBio[0].bioName}
      bioText = {userBio[0].bioText} 
      onClickingAddBio = {handleAddBioClick} />;
    otherButtonText = "Add Bio";
  }

    return (
      <React.Fragment>
        {otherCurrentlyVisibleState}
        {currentlyVisibleState}
        {error ? null : <button onClick={handleClick}>{buttonText}</button>}
        {error ? null : <button onClick={handleAddBioClick}>{otherButtonText}</button>}
      </React.Fragment>
      );
    }
  }
    
    export default PortfolioControl;
    
    