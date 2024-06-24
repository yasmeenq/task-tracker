
/*---- Getting Elements ----*/
let taskInput = document.getElementById("new-task");
let addButton = document.getElementsByTagName("button")[0];
let incompleteTaskHolder = document.getElementById("incomplete-tasks");
let completedTasksHolder = document.getElementById("completed-tasks");


/*---- Part 1 ----*/
// create a new task li function
let createNewTaskLi = function (taskString) {
    // create li element + check box input
	let li = document.createElement("li");
	let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    // create task label
	let TaskLabel = document.createElement("label");
    TaskLabel.innerText = taskString;
    // create edit button
	let editButton = document.createElement("button");
    let editInput = document.createElement("input");
    editInput.type = "text";
    editButton.innerHTML = `<img src="assets/edit.png" alt="Edit" width="21" height="21">`;
	editButton.className = "edit";
    //create delete button 
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<img src="assets/delete.png" alt="Delete" width="21" height="21">`;
	deleteButton.className = "delete";

	// Append all elements to the li 
	li.appendChild(checkBox);
	li.appendChild(TaskLabel);
	li.appendChild(editInput);
	li.appendChild(editButton);
	li.appendChild(deleteButton);
	return li;
}

/*---- Part 2 ----*/
let addTask = function () {
    //append the input inner-value to the li function 
	let listItem = createNewTaskLi(taskInput.value);
	if (taskInput.value === "") {
		return;
	}
	// Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
    //in case of checkbox trigger send it to taskCompleted
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";
}
// Function to add task when Enter key is pressed
taskInput.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

/*---- Part 3 ----*/
let taskCompleted = function () {
    // Get the parentNode(li) of the element that triggered the event(this checkbox)
	let listItem = this.parentNode;
    //add it to the ul of completed tasks
	completedTasksHolder.appendChild(listItem);
    //in case you want to uncheck a completed task
	bindTaskEvents(listItem, taskIncomplete);
}

/*---- Part 4 ----*/
//in case we uncheck a completed task, and return it to inComplete tasks
let taskIncomplete = function () {
    // Get the parentNode(li) of the element that triggered the event(this checkbox)
	let listItem = this.parentNode;
    //add it to the ul of inCompleted tasks
	incompleteTaskHolder.appendChild(listItem);
    //in case you want to check an inCompleted task
	bindTaskEvents(listItem, taskCompleted);
}

/*---- Part 5 ----*/
let editTask = function () {
    // Get the parentNode(li) of the element that triggered the event(this edit button click)
	let listItem = this.parentNode;
    // Get the input element and label from li 
	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");

	let containsClass = listItem.classList.contains("editMode");
	// If class of the parent is .editmode
	if (containsClass) {
		label.innerText = editInput.value;
		listItem.classList.remove("editMode");
	} else {
		editInput.value = label.innerText;
		listItem.classList.add("editMode");

        // Focus on the editInput field
        editInput.focus();

        // Event listener for Enter key press to exit edit mode
        editInput.addEventListener("keypress", function(event) {
            if (event.key === 'Enter') {
                label.innerText = editInput.value;
                listItem.classList.remove("editMode");
            }
        });
	}
}

/*---- Part 6 ----*/
let deleteTask = function () {
    // Get the parentNode(li) of the element that triggered the event(this delete button click)
	let listItem = this.parentNode;
	let ul = listItem.parentNode;
	// Remove the parent list item from the ul.
	ul.removeChild(listItem);
}

/*---- Part 7 ----*/
let bindTaskEvents = function (taskListElement, checkBoxEventHandler) {

	// getting taskListElement's children (checkbox, edit, delete)
	let checkBox = taskListElement.querySelector("input[type=checkbox]");
	let editButton = taskListElement.querySelector("button.edit");
	let deleteButton = taskListElement.querySelector("button.delete");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
    // onchange: This property is used to assign an event handler function 
    //that will be executed when the change event occurs on the checkbox. 
}

/*---- Part 8 ----*/
// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
// (for asynchronous) addButton.addEventListener("click", ajaxRequest);

/*---- Part 9 ----*/
// Cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
	// bind events to list item's children (taskCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

/*---- Part 10 ----*/
// Cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
	// bind events to list item's children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
