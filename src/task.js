import { editTaskEvents } from "./editTask";
import { personalProjects, saveLocalStorage } from "./project";

let defaultId = 0;
let TASKID = Number(localStorage.getItem('currentTaskId')) || defaultId;

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

const displayTask = (currentProject) => {
    const todoDiv = document.querySelector('.todo-list');
    todoDiv.textContent = '';
    personalProjects[currentProject].taskList.forEach(task => {
        addTask(task.id, task.title, task.details, task.priority, task.dueDate, task.completed);
    });
}

const addTask = (taskId, taskTitle, details, priority, dueDate, taskCompleted) => {
    const todoDiv = document.querySelector('.todo-list');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.id = taskId;

    const taskLeftDiv = document.createElement('div');
    taskLeftDiv.classList.add('task-left-div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    taskLeftDiv.appendChild(checkbox);

    const priorityStatus = document.createElement('p');
    priorityStatus.setAttribute('class', `${priority.toLowerCase()}`);
    priorityStatus.textContent = priority;
    taskLeftDiv.appendChild(priorityStatus);

    const textDiv = document.createElement('div');
    textDiv.classList.add('task-text');

    const title = document.createElement('p');
    title.classList.add('task-title');
    title.textContent = taskTitle;
    textDiv.appendChild(title);

    const description = document.createElement('p');
    description.classList.add('task-description');
    description.classList.add('hidden');
    description.textContent = details;
    textDiv.appendChild(description);
    taskLeftDiv.appendChild(textDiv);

    const taskBtns = document.createElement('div');
    taskBtns.classList.add('task-btns');

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details')
    if (!details) detailsBtn.classList.add('hidden'); ;
    detailsBtn.textContent = 'Show this Description';
    taskBtns.appendChild(detailsBtn);

    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = dueDate;
    if (dueDate.includes("overdue")) date.classList.add('overdue');
    taskBtns.appendChild(date);

    const editIcon = document.createElement('i');
    editIcon.setAttribute('class', 'task-icon fa-regular fa-pen-to-square');
    taskBtns.appendChild(editIcon);

    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'task-icon fa-solid fa-trash');
    taskBtns.appendChild(deleteIcon);

    editTaskEvents(checkbox, taskBtns, editIcon, deleteIcon);

    if (taskCompleted) {
        taskDiv.classList.toggle('completed');
        textDiv.classList.toggle('strike-through');
        checkbox.classList.toggle('checked');
        checkbox.checked = true;
    }

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
    const priority = document.querySelector('input[name="priority"]:checked');
    const dateInput = document.querySelector('#due-date');

    taskTitleInput.value = '';
    taskDetails.value = '';
    if (priority) priority.checked = false;
    dateInput.value = '';

    hideErrorMessage();
    taskForm.classList.add('hidden');
}

const showErrorMessage = (title, priorityArray, date) => {
    const titleError = document.querySelector('#task-title + span');
    const priorityError = document.querySelector('label[for="high"] + span');
    const dateError = document.querySelector('#due-date + span');

    !title.value ? titleError.classList.remove('hidden') : titleError.classList.add('hidden');
    !priorityArray.some(radioInputsCheck) ? priorityError.classList.remove('hidden') : priorityError.classList.add('hidden');        
    !date.value ? dateError.classList.remove('hidden') : dateError.classList.add('hidden');
}

const hideErrorMessage = () => {
    const titleError = document.querySelector('#task-title + span');
    const priorityError = document.querySelector('label[for="high"] + span');
    const dateError = document.querySelector('#due-date + span');

    titleError.classList.add('hidden');
    priorityError.classList.add('hidden');
    dateError.classList.add('hidden');
}

function radioInputsCheck(input) {
    return input.checked;
}

const checkDate = (input) => {
    const inputDate = new Date(input);
    const currentDate = new Date();
    const differenceInDays = Math.floor((inputDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)) + 1;

    return differenceInDays === 0 ? "Due Today" : differenceInDays > 0 ? `Due in ${differenceInDays} day(s)` : `${Math.abs(differenceInDays)} day(s) overdue`;
}

const processNewTask = (e) => {
    e.preventDefault();

    const taskInputs = document.querySelector('#task-form');
    const title = document.querySelector('#task-title');
    const details = document.querySelector('#description');
    const priorityArray = Array.from(document.querySelectorAll('input[name="priority"]'));
    const dueDate = document.querySelector('#due-date');

    if (taskInputs.checkValidity()) {
        const priority = document.querySelector('input[name="priority"]:checked');

        let currentProject = findCurrentProject();
        let taskId = TASKID;

        const date = checkDate(dueDate.value);
        const newTask = new Task(currentProject, taskId, title.value, details.value, priority.value, date);
        personalProjects[currentProject].taskList.push(newTask);
        TASKID++;

        saveLocalStorage();
        addTask(taskId, title.value, details.value, priority.value, date, false);
        hideErrorMessage();
        hideTaskForm();
    } else {
        showErrorMessage(title, priorityArray, dueDate);
    }
}

const findCurrentProject = () => {
    const selectedProject = document.querySelector('.selected');
    return selectedProject.dataset.projectid;
}

const updateTaskTitle = (newTitle) => {
    const title = document.querySelector('.project-title');
    title.textContent = newTitle;
}

export { taskEvent, displayTask, addTask, updateTaskTitle, checkDate, TASKID };