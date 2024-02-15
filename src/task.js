let idCounter = 0;

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

const taskEvent = () => {
    const addTaskBtn = document.querySelector('#add-new-task');
    addTaskBtn.addEventListener('click', showTaskForm);

    const submitTaskForm = document.querySelector('.task-submit-btn');
    submitTaskForm.addEventListener('click', processNewTask);

    const cancelTaskForm = document.querySelector('.task-cancel-btn');
    cancelTaskForm.addEventListener('click', hideTaskForm);
}

// const displayTask = (currentProject) => {
//     const todoDiv = document.querySelector('.todo-list');
//     todoDiv.textContent = '';
//     defaultProjects[currentProject].taskList.forEach(task => {
//         addTask(task.id, task.title, task.details, task.priority, task.dueDate, task.completed);
//     });
// }

const addTask = (taskId, taskTitle, priority, dueDate) => {
    const todoDiv = document.querySelector('.todo-list');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.id = taskId;

    const taskLeftDiv = document.createElement('div');
    taskLeftDiv.classList.add('task-left-div');

    // const checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    // taskLeftDiv.appendChild(checkbox);

    const priorityStatus = document.createElement('p');
    priorityStatus.setAttribute('class', `${priority.toLowerCase()}`);
    priorityStatus.textContent = priority;
    taskLeftDiv.appendChild(priorityStatus);

    const title = document.createElement('p');
    title.classList.add('task-title');
    title.textContent = taskTitle;
    taskLeftDiv.appendChild(title);

    const taskBtns = document.createElement('div');
    taskBtns.classList.add('task-btns');

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details');
    detailsBtn.textContent = 'Details';
    taskBtns.appendChild(detailsBtn);
    // add event for the button - dialog

    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = dueDate;
    taskBtns.appendChild(date);

    const editIcon = document.createElement('i');
    editIcon.setAttribute('class', 'task-icon fa-regular fa-pen-to-square');
    taskBtns.appendChild(editIcon);

    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'task-icon fa-solid fa-trash');
    taskBtns.appendChild(deleteIcon);

    taskDiv.appendChild(taskLeftDiv);
    taskDiv.appendChild(taskBtns);
    todoDiv.appendChild(taskDiv);
}

const showTaskForm = () => {
    const taskForm = document.querySelector('#task-form');
    taskForm.classList.remove('hidden');
    document.querySelector('#task-title').focus();
}

const hideTaskForm = () => {
    const taskForm = document.querySelector('#task-form');
    const taskTitleInput = document.querySelector('#task-title');
    const taskDetails = document.querySelector('#description');
    const dateInput = document.querySelector('#due-date');

    taskTitleInput.value = '';
    taskDetails.value = '';
    dateInput.value = '';
    taskForm.classList.add('hidden');
}

const processNewTask = (e) => {
    e.preventDefault();

    const title = document.querySelector('#task-title').value;
    const details = document.querySelector('#description').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const date = document.querySelector('#due-date').value;

    let currentProject = findCurrentProject();
    let taskId = idCounter;

    const newTask = new Task(currentProject, taskId, title, details, priority, date);
    defaultProjects[currentProject].taskList.push(newTask);
    idCounter++;

    addTask(taskId, title, priority, date);
    hideTaskForm();
}

const findCurrentProject = () => {
    const selectedProject = document.querySelector('.selected');
    return selectedProject.dataset.projectid;
}

export { taskEvent, addTask };