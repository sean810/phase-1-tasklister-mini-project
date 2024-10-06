document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("create-task-form");
    const list = document.getElementById("tasks");
    let tasks = [];

    form.onsubmit = (e) => {
        e.preventDefault();
        const taskDescription = document.getElementById("new-task-description").value;
        const color = document.getElementById("select_colours").value;
        const dueDate = document.getElementById("due-date").value;

        const task = { description: taskDescription, color: color, dueDate: dueDate };
        tasks.push(task);
        list.appendChild(addTodoList(task));
        form.reset();
    }

    function addTodoList(todo) {
        const listItem = document.createElement("li");
        listItem.textContent = `${todo.description} (Due: ${todo.dueDate})`;
        listItem.style.color = todo.color;

        // Add edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        listItem.appendChild(editButton);
        
        editButton.onclick = () => {
        const newDescription = prompt("Edit task description:", todo.description);
        const newDueDate = prompt("Edit due date:", todo.dueDate);
        if (newDescription !== null && newDueDate !== null) {
            todo.description = newDescription;
            todo.dueDate = newDueDate;
            listItem.textContent = `${todo.description} (Due: ${todo.dueDate})`;
            listItem.style.color = todo.color; 
            listItem.appendChild(editButton); 
            listItem.appendChild(deleteButton); 
        }
    }

        // Add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        listItem.appendChild(deleteButton);
        
        deleteButton.onclick = () => {
            list.removeChild(listItem);
            tasks = tasks.filter(t => t !== todo); // Remove from tasks array
        }

        return listItem;
    }

    document.getElementById("sort-tasks").onclick = () => {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        list.innerHTML = ""; // Clear current list
        tasks.forEach(task => list.appendChild(addTodoList(task))); // Re-render tasks
    }
});
