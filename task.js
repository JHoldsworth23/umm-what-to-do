class Task {
    constructor(projectId, taskId, title, details, priority, dueDate) {
        this.projectId = projectId;
        this.id = taskId;
        this.title = title;
        this.details = details;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

// const displayTask = (currentProject) => {
//     const todoDiv = document.querySelector('.todo-list');
//     todoDiv.textContent = '';
//     defaultProjects[currentProject].taskList.forEach(task => {
//         addTask(task.id, task.title, task.details, task.priority, task.dueDate, task.completed);
//     });
// }

const addTask = (taskId, taskTitle, details, priority, dueDate, completed) => {
    const todoDiv = document.querySelector('.todo-list');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.id = taskId;

    // const checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    // taskDiv.appendChild(checkbox);

    const priorityStatus = document.createElement('p');
    priorityStatus.setAttribute('class', `${priority.toLowerCase()}`);
    priorityStatus.textContent = priority;
    taskDiv.appendChild(priorityStatus);

    const title = document.createElement('p');
    title.classList.add('task-title');
    title.textContent = taskTitle;
    taskDiv.appendChild(title);

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details');
    detailsBtn.textContent = 'Details';
    taskDiv.appendChild(detailsBtn);

    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = dueDate;
    taskDiv.appendChild(date);

    const editIcon = document.createElement('i');
    editIcon.setAttribute('class', 'task-icon fa-regular fa-pen-to-square');
    taskDiv.appendChild(editIcon);

    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'task-icon fa-solid fa-trash');
    taskDiv.appendChild(deleteIcon);

    todoDiv.appendChild(taskDiv);
}

addTask(0, 'Lift Weights', '', 'Medium', '6th Feb', false);