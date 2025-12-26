import {format, formatISO, parseISO, compareAsc, compareDesc} from "date-fns";

// const userObject = {
//   //List of projects, the list has objects each being a project each containing a toDos which is a list of toDos
//   projects: [
//     { 
//       projectId: crypto.randomUUID(),
//       projectName: "Name Of Project",
//       toDos: [
//         {
//           toDoId: crypto.randomUUID(),
//           toDoTitle: "Title of the To Do",
//           toDoDescription: "Description of the to Do",
//           completionStatus: false,
//           dueDate: "dateString",
//           toDoList: [
//             {
//               itemName: "Wash Dishes",
//               completionStatus: true
//             },
//             {
//               itemName: "Do Odin",
//               completionStatus: true
//             },
//           ],
//           priority: 0 // Ranges from 0, 1, 2 higher = more urgent
//         }
//       ]
//     }
//   ]
// };

class toDoListItem {
  itemId;
  itemName;
  completionStatus;
  constructor(itemName) {
    this.itemName = itemName;
    this.completionStatus = false;
    this.itemId = crypto.randomUUID();
  }

  toggleCompletionStatus() {
    this.completionStatus = !this.completionStatus;
  }
}

const listItem = new toDoListItem("Lasagna Man");
console.log(listItem.itemId + " " + listItem.itemName + " " + listItem.completionStatus);


