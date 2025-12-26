"use strict";
import {format, formatISO, parseISO, compareAsc, compareDesc} from "date-fns";

class toDoListItem {
  itemId;
  itemName;
  completionStatus;
  constructor(itemName) {
    this.itemName = itemName;
    this.completionStatus = false;
    this.itemId = crypto.randomUUID();
    saveToLocalStorage();
  }

  toggleCompletionStatus() {
    this.completionStatus = !this.completionStatus;
    saveToLocalStorage();
  }
}

class toDo {
  toDoId;
  toDoTitle;
  toDoDescription;
  completionStatus;
  dueDate;
  toDoList;
  priority;

  constructor(toDoTitle, toDoDescription, dueDate, priority) {
    this.toDoId = crypto.randomUUID();
    this.toDoTitle = toDoTitle;
    this.toDoDescription = toDoDescription;
    this.completionStatus = false;
    this.dueDate = dueDate;
    this.toDoList = [];
    this.priority = priority;
    saveToLocalStorage();
  }

  toggleCompletionStatus() {
    this.completionStatus = !this.completionStatus;
    saveToLocalStorage();
  }

  addListItem(itemName) {
    this.toDoList.push(new toDoListItem(itemName));
    saveToLocalStorage();
  }
}

class project {
  projectId;
  projectName;
  toDos;

  constructor(projectName) {
    this.projectId = crypto.randomUUID();
    this.projectName = projectName;
    this.toDos = [];
    saveToLocalStorage();
  }

  addToDo(toDoTitle, toDoDescription, dueDate, priority) {
    this.toDos.push(new toDo(toDoTitle, toDoDescription, dueDate, priority));
    saveToLocalStorage();
  }
}

const userObject = {
  projects: [], 
  addProject: function(projectName) {
    this.projects.push(new project(projectName));
  }
}

function saveToLocalStorage() {
  localStorage.setItem("userObject", JSON.stringify(userObject));
}

export {userObject};