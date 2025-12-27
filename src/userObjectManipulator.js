"use strict";

class ToDoListItem {
  itemId;
  itemName;
  completionStatus;
  constructor({itemId = crypto.randomUUID(), itemName, completionStatus = false}) {
    this.itemName = itemName;
    this.completionStatus = completionStatus;
    this.itemId = itemId;
  }

  toggleCompletionStatus() {
    this.completionStatus = !this.completionStatus;
    userObject.saveToLocalStorage();
  }

  static fromJSON(obj) {
    return new ToDoListItem(obj);
  }
}

class ToDo {
  toDoId;
  toDoTitle;
  toDoDescription;
  completionStatus;
  dueDate;
  toDoList;
  priority;

  constructor({
    toDoId = crypto.randomUUID(),
    toDoTitle,
    toDoDescription,
    completionStatus = false,
    dueDate,
    toDoList = [],
    priority
  }) {
    this.toDoId = toDoId;
    this.toDoTitle = toDoTitle;
    this.toDoDescription = toDoDescription;
    this.completionStatus = completionStatus;
    this.dueDate = dueDate;
    this.toDoList = toDoList.map(ToDoListItem.fromJSON);
    this.priority = priority;
  }

  toggleCompletionStatus() {
    this.completionStatus = !this.completionStatus;
    userObject.saveToLocalStorage();
  }

  addListItem(itemName) {
    this.toDoList.push(new ToDoListItem({itemName}));
    userObject.saveToLocalStorage();
  }

  static fromJSON(obj) {
    return new ToDo(obj);
  }
}

class Project {
  projectId;
  projectName;
  toDos;

  constructor({projectId = crypto.randomUUID(), projectName, toDos = []}) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.toDos = toDos.map(ToDo.fromJSON);
  }

  addToDo(toDoTitle, toDoDescription, dueDate, priority) {
    this.toDos.push(new ToDo({toDoTitle, toDoDescription, dueDate, priority}));
    userObject.saveToLocalStorage();
  }

  static fromJSON(obj) {
    return new Project(obj);
  }
}

class UserObject {
  projects;
  
  constructor({projects = []} = {}) {
    this.projects = projects.map(Project.fromJSON);
  }

  addProject(projectName) {
    this.projects.push(new Project({projectName}));
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("userObject", JSON.stringify(this));
  }

  static fromJSON(object) {
    return new UserObject(object);
  }
}

let userObject = new UserObject();

function copyFromStorage() {
  userObject = UserObject.fromJSON(JSON.parse(localStorage.getItem("userObject")));
}

if (localStorage.getItem("userObject")) {
  copyFromStorage();
  console.log({...userObject});
}

export {userObject};