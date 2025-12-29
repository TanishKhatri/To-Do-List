import { parseISO, format } from "date-fns";
import { userObject } from "./userObjectManipulator";

addProjectsToDisplay();

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
    input.value = "";
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
  const contentHeader = document.querySelector(".contentHeader");
  h1.textContent = project.projectName;
  contentHeader.classList.remove("noProjectsInContainer");
  const addToDoButton = document.querySelector(".addToDo");
  addToDoButton.dataset.projectId = project.projectId;

  toDoContainer.innerHTML = `<div class="showIfNoToDos">
    <svg class="noProjectSelected" width="250" height="250" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>emoji_tongue_sticking_out _square_round [#442]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-300.000000, -6199.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M258,6051 L259,6051 C259.552,6051 260,6051.247 260,6051.799 L260,6051.598 C260,6052.15 260,6052.611 259,6052.611 L259,6052.637 C258,6052.637 258,6053.136 258,6053.689 L258,6053.792 C258,6054.345 257.552,6055 257,6055 L255,6055 C254.448,6055 254,6054.449 254,6053.896 L254,6053.792 C254,6053.24 253.552,6053 253,6053 L249,6053 C248.448,6053 248,6052.449 248,6051.896 L248,6051.792 C248,6051.24 248.448,6051 249,6051 L254,6051 L258,6051 Z M260,6046 C260,6046.552 259.552,6047 259,6047 L257,6047 C256.448,6047 256,6046.552 256,6046 C256,6045.448 256.448,6045 257,6045 L259,6045 C259.552,6045 260,6045.448 260,6046 L260,6046 Z M252,6046 C252,6046.552 251.552,6047 251,6047 L249,6047 C248.448,6047 248,6046.552 248,6046 C248,6045.448 248.448,6045 249,6045 L251,6045 C251.552,6045 252,6045.448 252,6046 L252,6046 Z M262,6056 C262,6056.552 261.552,6057 261,6057 L247,6057 C246.448,6057 246,6056.552 246,6056 L246,6042 C246,6041.448 246.448,6041 247,6041 L261,6041 C261.552,6041 262,6041.448 262,6042 L262,6056 Z M264,6041 C264,6039.895 263.105,6039 262,6039 L246,6039 C244.895,6039 244,6039.895 244,6041 L244,6057 C244,6058.105 244.895,6059 246,6059 L262,6059 C263.105,6059 264,6058.105 264,6057 L264,6041 Z" id="emoji_tongue_sticking_out-_square_round-[#442]"> </path> </g> </g> </g> </g></svg>
    <h2 class="noProjects">OOPS! Nothing is Here!</h2>
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
    const toDoContainerWithDescription = document.createElement("div");
    toDoContainerWithDescription.classList.add("toDoContainerWithDescription");
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("toDo");
    const priorityClass = "priority" + td.priority;
    toDoDiv.classList.add(priorityClass);

    const flexContainer = document.createElement("div");
    flexContainer.classList.add("toDoFlexContainer");
    const tickBoxEmptySVG =  `<svg fill="#000000" width="30" height="30" viewBox="0 0 24 24" id="check-circle" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle id="primary" cx="12" cy="12" r="10" style="fill: #ffffff;"></circle></g></svg>`;
    const tickBoxFilledSVG = `<svg fill="#000000" width="30" height="30" viewBox="0 0 24 24" id="check-circle" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle id="primary" cx="12" cy="12" r="10" style="fill: #ffffff;"></circle><path id="secondary" d="M11,16a1,1,0,0,1-.71-.29l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42l-5,5A1,1,0,0,1,11,16Z" style="fill: #000000;"></path></g></svg>`
    const tickBoxContainer = document.createElement("div");
    tickBoxContainer.classList.add("toDoTickBox");
    flexContainer.appendChild(tickBoxContainer);
    if (td.completionStatus) {
      tickBoxContainer.innerHTML = tickBoxFilledSVG;
    } else {
      tickBoxContainer.innerHTML = tickBoxEmptySVG;
    }
    tickBoxContainer.addEventListener("click", () => {
      td.toggleCompletionStatus();
      if (td.completionStatus) {
        tickBoxContainer.innerHTML = tickBoxFilledSVG;
      } else {
        tickBoxContainer.innerHTML = tickBoxEmptySVG;
      }
    });

    const toDoTask = document.createElement("p");
    toDoTask.classList.add("toDoTask");
    toDoTask.textContent = td.toDoTitle;
    flexContainer.appendChild(toDoTask);
    toDoDiv.appendChild(flexContainer);

    const toDoRightSide = document.createElement("div");
    toDoRightSide.classList.add("toDoRightSide");
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("dueDate");
    const date = parseISO(td.dueDate);
    dueDateDiv.textContent = format(date, "h:mm a, do MMMM yyyy");
    toDoRightSide.appendChild(dueDateDiv);

    const dropDownSVG = `<svg fill="#000000" width="25" height="25" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dropdown</title> <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path> </g></svg>`;
    const dropdownUpSVG = `<svg fill="#000000" width="25" height="25" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dropdown</title> <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path> </g></svg>`;
    const dropdownContainer = document.createElement("div");
    dropdownContainer.classList.add("dropDownContainer");
    dropdownContainer.innerHTML = dropDownSVG;

    dropdownContainer.addEventListener("click", () => {
      if (dropdownContainer.innerHTML === dropDownSVG) {
        dropdownContainer.innerHTML = dropdownUpSVG;
        belowToDo.classList.remove("hidden");
      } else {
        dropdownContainer.innerHTML = dropDownSVG;
        belowToDo.classList.add("hidden");
      }
    }); 

    toDoRightSide.appendChild(dropdownContainer);

    toDoDiv.appendChild(toDoRightSide);
    toDoDiv.dataset.projectId = project.projectId;
    toDoDiv.dataset.toDoId = td.toDoId;

    const belowToDo = document.createElement("div");
    function createBelowToDo(){
      belowToDo.classList.add("belowToDo", "hidden");
      const descriptionTag = document.createElement("h2");
      descriptionTag.classList.add("descriptionTag");
      descriptionTag.textContent = "Description";
      belowToDo.appendChild(descriptionTag);

      const descriptionContent = document.createElement("p");
      descriptionContent.classList.add("descriptionContent");
      descriptionContent.textContent = td.toDoDescription;
      belowToDo.appendChild(descriptionContent);

      const belowItemList = document.createElement("div");
      belowItemList.classList.add("belowItemList");

      const toggleOffSVG = `<svg fill="#000000" height="30px" width="30px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="Icons" x="-64" y="-320" width="1280" height="800" style="fill:none;"></rect> <g id="Icons1" serif:id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif:id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <g id="toggle-off"> <path d="M41.309,17.112c9.416,0.179 17.545,10.374 13.732,20.395c-2.105,5.532 -7.689,9.487 -13.732,9.602c-6.201,0.04 -12.402,0.04 -18.603,0c-9.653,-0.183 -17.944,-11.153 -13.383,-21.233c2.32,-5.128 7.685,-8.656 13.383,-8.764c6.201,-0.04 12.402,-0.04 18.603,0Zm-18.398,3.998c-7.151,0.046 -13.348,8.061 -9.944,15.586c1.694,3.744 5.614,6.334 9.789,6.413c6.168,0.039 12.335,0.039 18.503,0c6.934,-0.131 12.825,-7.661 10.043,-14.973c-1.54,-4.049 -5.615,-6.941 -10.044,-7.025c-6.115,-0.039 -12.231,-0.001 -18.347,-0.001Z" style="fill-rule:nonzero;"></path> <circle cx="41.117" cy="32.11" r="10.015"></circle> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif:id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif:id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g></svg>`
      const toggleOnSVG = `<svg fill="#000000" height="30px" width="30px" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect id="Icons" x="0" y="-320" width="1280" height="800" style="fill:none;"></rect> <g id="Icons1" serif:id="Icons"> <g id="Strike"> </g> <g id="H1"> </g> <g id="H2"> </g> <g id="H3"> </g> <g id="list-ul"> </g> <g id="hamburger-1"> </g> <g id="hamburger-2"> </g> <g id="list-ol"> </g> <g id="list-task"> </g> <g id="trash"> </g> <g id="vertical-menu"> </g> <g id="horizontal-menu"> </g> <g id="sidebar-2"> </g> <g id="Pen"> </g> <g id="Pen1" serif:id="Pen"> </g> <g id="clock"> </g> <g id="external-link"> </g> <g id="hr"> </g> <g id="info"> </g> <g id="warning"> </g> <g id="plus-circle"> </g> <g id="minus-circle"> </g> <g id="vue"> </g> <g id="cog"> </g> <g id="logo"> </g> <g id="radio-check"> </g> <g id="eye-slash"> </g> <g id="eye"> </g> <path id="toggle-on" d="M25.022,17.099c2.715,-0.012 12.015,0.058 13.952,0c22.08,-0.662 22.961,30.643 0,30.023c-3.488,0.015 -12.792,-0.064 -13.952,0c-10.359,0.572 -17.04,-6.822 -16.997,-15.272c0.042,-8.451 7.53,-15.72 16.997,-14.751Zm7.882,15.011c0.143,-5.363 -4.664,-10.096 -10.015,-10.015c-7.31,0.111 -10.482,6.7 -10.016,10.947c0.625,5.691 5.193,9.06 10.016,9.084c5.536,0.026 9.862,-4.308 10.015,-10.016Z" style="fill-rule:nonzero;"></path> <g id="toggle-off"> </g> <g id="shredder"> </g> <g id="spinner--loading--dots-" serif:id="spinner [loading, dots]"> </g> <g id="react"> </g> <g id="check-selected"> </g> <g id="turn-off"> </g> <g id="code-block"> </g> <g id="user"> </g> <g id="coffee-bean"> </g> <g id="coffee-beans"> <g id="coffee-bean1" serif:id="coffee-bean"> </g> </g> <g id="coffee-bean-filled"> </g> <g id="coffee-beans-filled"> <g id="coffee-bean2" serif:id="coffee-bean"> </g> </g> <g id="clipboard"> </g> <g id="clipboard-paste"> </g> <g id="clipboard-copy"> </g> <g id="Layer1"> </g> </g> </g></svg>`
      
      const itemDivFlexContainer = document.createElement("div");
      const listItemsContainer = document.createElement("div");
      listItemsContainer.classList.add("listItemsContainer");
      itemDivFlexContainer.classList.add("itemDivFlexContainer");
      td.toDoList.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("belowListItemDiv");
        itemDiv.dataset.itemId = item.itemId;

        const svgContainer = document.createElement("div");
        svgContainer.classList.add("toggleSwitchSvgDiv");
        if (item.completionStatus) {
          svgContainer.innerHTML = toggleOnSVG;
        } else {
          svgContainer.innerHTML = toggleOffSVG;
        }
        itemDiv.appendChild(svgContainer);
        
        svgContainer.addEventListener("click", () => {
          if (svgContainer.innerHTML === toggleOffSVG) {
            svgContainer.innerHTML = toggleOnSVG;
          } else {
            svgContainer.innerHTML = toggleOffSVG;
          }
          item.toggleCompletionStatus();
        });

        const itemContent = document.createElement("p");
        itemContent.classList.add("belowListItemContent");
        itemContent.textContent  = item.itemName;
        itemDiv.appendChild(itemContent);

        listItemsContainer.appendChild(itemDiv);
      });

      itemDivFlexContainer.appendChild(listItemsContainer);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete List";
      deleteButton.classList.add("toDoDeleteButton");
      deleteButton.addEventListener("click", () => {
        project.deleteToDo(toDoDiv.dataset.toDoId);
        loadProjectInContentDiv(project.projectId);
      });

      itemDivFlexContainer.appendChild(deleteButton);
      belowToDo.appendChild(itemDivFlexContainer);
    }
    createBelowToDo();

    toDoContainerWithDescription.appendChild(toDoDiv);
    toDoContainerWithDescription.appendChild(belowToDo);
    toDoContainer.appendChild(toDoContainerWithDescription);

  });
  
  const projectDeleteButton = document.createElement("button");
  projectDeleteButton.classList.add("projectDeleteButton");
  projectDeleteButton.textContent = "Delete Project";
  projectDeleteButton.addEventListener("click", () => {
    userObject.deleteProject(project.projectId);
    const sidebarProjects = document.querySelectorAll(".projectButton");
    sidebarProjects.forEach((p) => {
      if (p.dataset.projectId === project.projectId) {
        p.remove();
      }
    })
    returnNoProjectsSelected();
  });

  toDoContainer.appendChild(projectDeleteButton);
}

function returnNoProjectsSelected() {
  const contentHeader = document.querySelector(".contentHeader");
  const toDoContainer = document.querySelector(".toDoContainer");
  const showIfNoToDos = document.querySelector(".showIfNoToDos");
  contentHeader.classList.add("noProjectsInContainer");
  toDoContainer.classList.add("noProjectsInContainer");
  showIfNoToDos.classList.remove("hidden");
}

function toDoDialogEventListeners() {
  const addToDoButton = document.querySelector(".addToDo");
  const toDoDialog = document.querySelector(".addToDoDialog");
  const closeButton = document.querySelector(".addToDoCloseButton");
  const submitButton = document.querySelector(".addToDoSubmitButton");
  const addListItemButton = document.querySelector(".addListItem");
  const priorityCircles = document.querySelector(".priorityCircles");
    let childrenArray = [...priorityCircles.children];
    childrenArray.forEach((circle) => {
      circle.addEventListener("click", () => {
        childrenArray.forEach((child) => {
          child.classList.remove("highlightedCircle");
        });
        circle.classList.add("highlightedCircle");
      });
  });

  function resetPriority() {
    const redCircle = document.querySelector(".redCircle");
    redCircle.classList.add("highlightedCircle");
    const yellowCircle = document.querySelector(".yellowCircle");
    yellowCircle.classList.remove("highlightedCircle");
    const greenCircle = document.querySelector(".greenCircle");
    greenCircle.classList.remove("highlightedCircle");
  }

  resetPriority();
  addListItemButton.addEventListener("click", () => {
    const newInput = document.createElement("input");
    newInput.classList.add("listItemInput");
    newInput.type = "text";
    newInput.placeholder = "Item Name";
    addListItemButton.before(newInput);
  });

  addToDoButton.addEventListener("click", () => {
    toDoDialog.showModal();
  })


  submitButton.addEventListener("click", () => {
    const project = userObject.projects.find((element) => addToDoButton.dataset.projectId === element.projectId);
    const title = document.querySelector("#titleInput");
    const description = document.querySelector("#descriptionInput");
    const dueDate = document.querySelector("#dueDateInput");
    const listItemList = document.querySelectorAll(".listItemInput");
    const priority = returnPriorityNumber();
    
    function returnPriorityNumber() {
      const redCircle = document.querySelector(".redCircle");
      const yellowCircle = document.querySelector(".yellowCircle");

      if (redCircle.classList.contains("highlightedCircle")) {
        return 2;
      } else if (yellowCircle.classList.contains("highlightedCircle")) {
        return 1;
      } else {
        return 0;
      }
    }

    project.addToDo(title.value, description.value, dueDate.value, priority);
    const currToDo = project.toDos[project.toDos.length - 1];
    listItemList.forEach((item) => {
      currToDo.addListItem(item.value);
    });

    loadProjectInContentDiv(project.projectId);

    title.value = "";
    description.value = "";
    dueDate.value = "";
    const allListItems = document.querySelectorAll(".listItemInput");
    allListItems.forEach((item) => {
      item.remove();
    });
    resetPriority();
  });

  closeButton.addEventListener("click", () => {
    toDoDialog.close();
  });
}

toDoDialogEventListeners();
openProjectEventListener();
projectDialogEventListeners();


export const DOMController = {};