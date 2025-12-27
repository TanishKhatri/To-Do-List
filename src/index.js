"use strict";

import "./styles.css";
import {DOMController} from "./DOMController";
import { userObject } from "./userObjectManipulator";


console.log(userObject);

userObject.addProject("Charlie Chaplin");

userObject.projects[0].addToDo("Hoola Hoop Dancer", "Yo mama so fat", "Some time ago", 2);
