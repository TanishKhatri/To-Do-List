import { userObject } from "./userObjectManipulator";

userObject.addProject("Test Project1");
userObject.projects[userObject.projects.length-1].addToDo("Test Title1", "Test Description", "Test Due Date", 2);
userObject.projects[userObject.projects.length-1].addToDo("Test Title2", "Test Description", "Test Due Date", 1);
userObject.projects[userObject.projects.length-1].addToDo("Test Title3", "Test Description", "Test Due Date", 0);
userObject.projects[userObject.projects.length-1].addToDo("Test Title4", "Test Description", "Test Due Date", 2);
userObject.addProject("Test Project2");
userObject.projects[userObject.projects.length-1].addToDo("Test Title2", "Test Description", "Test Due Date", 1);
userObject.addProject("Test Project3");
userObject.projects[userObject.projects.length-1].addToDo("Test Title3", "Test Description", "Test Due Date", 0);
userObject.addProject("Test Project4");
userObject.projects[userObject.projects.length-1].addToDo("Test Title4", "Test Description", "Test Due Date", 2);

addProjectsToDisplay();

window.debug = {
  userObject
}

function projectDialogEventListeners() {
  const addAProjectButton = document.querySelector("Button.addAProject");
  const projectDialog = document.querySelector("dialog.addProjectDialog");
  const input = document.querySelector("#projectNameInput");
  const submitButton = document.querySelector(".addProjectSubmitButton");

  addAProjectButton.addEventListener("click", () => {
    projectDialog.showModal();
  });
  
  submitButton.addEventListener("click", () => {
    userObject.addProject(input.value);
    addProjectsToDisplay();
    projectDialog.close();
  });
}

function addProjectsToDisplay() {
  const projectsDiv = document.querySelector(".projects");
  projectsDiv.innerHTML = "";
  userObject.projects.forEach((project) => {
    const newProjectButton = document.createElement("button");
    newProjectButton.classList.add("projectButton");
    newProjectButton.textContent = project.projectName;
    newProjectButton.dataset.projectId = project.projectId; 
    projectsDiv.appendChild(newProjectButton);
    openProjectEventListener();
  });
}


function openProjectEventListener() {
  const projectsDiv = document.querySelector(".projects");
  let childrenArray = [...projectsDiv.children];
  childrenArray.forEach((button) => {
    button.addEventListener("click", () => {
      childrenArray.forEach((child) => {
        child.classList.remove("selectedProject");
      });
      button.classList.add("selectedProject");
      loadProjectInContentDiv(button.dataset.projectId);
    });
  });
}

function loadProjectInContentDiv(projectId) {
  const project = userObject.projects.find((element) => projectId === element.projectId);
  const toDoContainer = document.querySelector(".toDoContainer");
  const h1 = document.querySelector(".contentH1");
  h1.textContent = project.projectName;

  toDoContainer.innerHTML = `<div class="showIfNoToDos">
    <svg class="noProjectSelected" width="250" height="250" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>emoji_tongue_sticking_out _square_round [#442]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -6199.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M258,6051 L259,6051 C259.552,6051 260,6051.247 260,6051.799 L260,6051.598 C260,6052.15 260,6052.611 259,6052.611 L259,6052.637 C258,6052.637 258,6053.136 258,6053.689 L258,6053.792 C258,6054.345 257.552,6055 257,6055 L255,6055 C254.448,6055 254,6054.449 254,6053.896 L254,6053.792 C254,6053.24 253.552,6053 253,6053 L249,6053 C248.448,6053 248,6052.449 248,6051.896 L248,6051.792 C248,6051.24 248.448,6051 249,6051 L254,6051 L258,6051 Z M260,6046 C260,6046.552 259.552,6047 259,6047 L257,6047 C256.448,6047 256,6046.552 256,6046 C256,6045.448 256.448,6045 257,6045 L259,6045 C259.552,6045 260,6045.448 260,6046 L260,6046 Z M252,6046 C252,6046.552 251.552,6047 251,6047 L249,6047 C248.448,6047 248,6046.552 248,6046 C248,6045.448 248.448,6045 249,6045 L251,6045 C251.552,6045 252,6045.448 252,6046 L252,6046 Z M262,6056 C262,6056.552 261.552,6057 261,6057 L247,6057 C246.448,6057 246,6056.552 246,6056 L246,6042 C246,6041.448 246.448,6041 247,6041 L261,6041 C261.552,6041 262,6041.448 262,6042 L262,6056 Z M264,6041 C264,6039.895 263.105,6039 262,6039 L246,6039 C244.895,6039 244,6039.895 244,6041 L244,6057 C244,6058.105 244.895,6059 246,6059 L262,6059 C263.105,6059 264,6058.105 264,6057 L264,6041 Z" id="emoji_tongue_sticking_out-_square_round-[#442]"> </path> </g> </g> </g> </g></svg>
    <h2 class="noProjects">OOPS! No Projects are selected!</h2>
  </div>`;

  const smilyFace = document.querySelector(".showIfNoToDos");

  if (project.toDos.length === 0) {
    smilyFace.classList.remove("hidden");
    toDoContainer.classList.add("noProjectsInContainer");
  } else {
    smilyFace.classList.add("hidden");
    toDoContainer.classList.remove("noProjectsInContainer");
  }

  project.toDos.forEach((td) => {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("toDo");
    const priorityClass = "priority" + td.priority;
    toDoDiv.classList.add(priorityClass);

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("toDoFlexContainer");
    flexContainer.innerHTML = `<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet" fill="#000000"><circle cx="50" cy="50" r="40" fill="white" /></svg>`;
    const toDoTask = document.createElement("p");
    toDoTask.classList.add("toDoTask");
    toDoTask.textContent = td.toDoTitle;
    flexContainer.appendChild(toDoTask);
    toDoDiv.appendChild(flexContainer);

    const toDoRightSide = document.createElement("div");
    toDoRightSide.classList.add("toDoRightSide");
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("dueDate");
    dueDateDiv.textContent = td.dueDate;
    toDoRightSide.appendChild(dueDateDiv);
    toDoRightSide.innerHTML += `<svg fill="#000000" width="25" height="25" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dropdown</title> <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path> </g></svg>`;
    toDoDiv.appendChild(toDoRightSide);

    toDoContainer.appendChild(toDoDiv);
  });
}

openProjectEventListener();
projectDialogEventListeners();


export const DOMController = {};