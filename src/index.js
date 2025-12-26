"use strict";

import "./styles.css";
import { userObject } from "./userObjectManipulator";

//Testing

console.log(userObject);

userObject.addProject("MyProject1");

console.log(userObject);

userObject.addProject("MyProject 2");

console.log(userObject);

userObject.addProject("MyProject 5");

console.log(userObject);

userObject.projects[1].addToDo("Title of the ToDo", "This is the description", "This is the dueDate stringing to be done", 2);

console.log(userObject);

userObject.projects[1].toDos[0].toggleCompletionStatus();

console.log(userObject);

userObject.projects[1].toDos[0].addListItem("Wash Dishes");

console.log(userObject);

userObject.projects[1].toDos[0].toDoList[0].toggleCompletionStatus();

console.log(userObject);