import { selectedHomePanel } from "./homePanels";
import { personalProjects, saveLocalStorage } from "./project";
import { checkDate, displayTask } from "./task";
const { subDays, formatISO } = require('date-fns');

const editTaskEvents = (checkbox, showDetailsBtn, editBtn, deleteBtn) => {
    checkbox.addEventListener('click', (e) => {
        styleCompletedTask(e);
        updateCompletedTask(e);
    });
    showDetailsBtn.addEventListener('click', showOrHideDescription);
    editBtn.addEventListener('click', showEditTaskForm);
    deleteBtn.addEventListener('click', deleteTask);
}

const editTaskFormEvents = () => {
    const editTaskBtn = document.querySelector('.edit-submit-btn');
    editTaskBtn.addEventListener('click', (e) => {
        processTaskInputs();
        e.preventDefault();
    });

    const cancelBtn = document.querySelector('.edit-cancel-btn');
    cancelBtn.addEventListener('click', () => {
        hideEditTaskForm();
        displayHiddenTask();
    });
}

const styleCompletedTask = (e) => {
    const uncompletedTask = e.target;
    const task = e.target.closest('.task');
    const taskDetails = task.querySelector('.task-text');

    taskDetails.classList.toggle('strike-through');
    task.classList.toggle('completed');
    uncompletedTask.classList.toggle('checked');
}

const updateCompletedTask = (e) => {
    const taskId = e.target.closest('.task').id;
    const selectedTask = findTaskInProject(taskId);
    selectedTask.completed = !selectedTask.completed;

    saveLocalStorage();
}

const editTaskForm = () => {
    const rightPanel = document.querySelector('.right-panel');
    const editTaskForm = document.createElement('form');
    editTaskForm.id = 'edit-task-form';
    editTaskForm.classList.add('hidden');
    editTaskForm.autocomplete = 'off';

    editTaskForm.innerHTML = `
        <div class="edit-form-task-input">
            <label for="edit-task-title">New Task Title:</label>
            <input type="text" id="edit-task-title" maxlength="25">
            <span class="blank-error hidden">You can't leave the blank task title</span>
        </div>
        <div class="edit-form-task-input">
            <label for="edit-description">New Details (Optional):</label>
            <textarea id="edit-description" rows="1" cols="40" placeholder="A short description or a checklist..."></textarea>
        </div>
        <div class="edit-form-task-input">
                <input type="radio" name="edit-priority" id="low" value="low" required>
                <label for="low">Low</label>
                <input type="radio" name="edit-priority" id="medium" value="medium" required>
                <label for="medium">Medium</label>
                <input type="radio" name="edit-priority" id="high" value="high" required>
                <label for="high">High</label>
        </div>
        <div class="edit-form-task-input">
            <label for="edit-due-date">New Date:</label>
            <input type="date" id="edit-due-date" required>
        </div>
        <div class="edit-task-form-buttons">
            <input type="button" class="edit-submit-btn" value="Edit Task">
            <input type="button" class="edit-cancel-btn" value="Cancel">
        </div>
    `;

    rightPanel.appendChild(editTaskForm);
}

const processTaskInputs = () => {
    const selectedTask = document.querySelector('.task.hidden');
    const blankError = document.querySelector('.blank-error');

    const taskTitleInput = document.querySelector('#edit-task-title').value;
    const detailsInput = document.querySelector('#edit-description');
    const dateInput = document.querySelector('#edit-due-date').value;
    const priorityInput = document.querySelector('input[name="edit-priority"]:checked').value;
    const taskId = selectedTask.id;
    const taskToBeEdited = findTaskInProject(taskId);

    if (taskTitleInput) {
        taskToBeEdited.title = taskTitleInput;
        taskToBeEdited.details = detailsInput ? detailsInput.value : "";
        taskToBeEdited.priority = priorityInput;
        taskToBeEdited.dueDate = checkDate(dateInput);

        saveLocalStorage();
        displayHiddenTask();
        hideEditTaskForm();

        const projectId = taskToBeEdited.projectId;
        refreshTaskDisplay(projectId);
    } else {
        blankError.classList.remove('hidden');
    }
}

const refreshTaskDisplay = (project) => {
    const homePanel = document.querySelector('.home .selected');
    const selectedProjectPanel = document.querySelector('.projects .selected');
    if (selectedProjectPanel) displayTask(project);
    if (homePanel) selectedHomePanel(homePanel);
}

const displayHiddenTask = () => {
    const selectedTask = document.querySelector('.task.hidden');
    selectedTask.classList.remove('hidden');
}

const showOrHideDescription = (e) => {
    const selectedTask = e.target.closest('.task');
    const editTaskForm = document.querySelector('#edit-task-form');
    const descriptionPara = selectedTask.querySelector('.task-description');

    if (editTaskForm.classList.contains('hidden')) {
        descriptionPara.classList.toggle('hidden');

        const descriptionBtn = selectedTask.querySelector('.details');
        descriptionBtn.textContent = descriptionBtn.textContent.includes('Show') 
            ? 'Close this Description' 
            : 'Show this Description';
    }
}

const checkEditTaskFormExist = () => {
    const editTaskForm = document.querySelector('#edit-task-form');
    return editTaskForm.classList.contains('hidden') ? false : true;
}

const showEditTaskForm = (e) => {
    const editTaskButtons = e.target.parentNode;
    const taskDiv = editTaskButtons.parentNode;

    if (checkEditTaskFormExist()) {
        hideEditTaskForm();
        displayHiddenTask();
    }

    placeEditTaskForm(taskDiv);
    taskDiv.classList.add('hidden');
}

const hideEditTaskForm = () => {
    const editTaskForm = document.querySelector('#edit-task-form');
    editTaskForm.classList.add('hidden');

    const blankError = document.querySelector('.blank-error');
    if (!blankError.classList.contains('hidden')) blankError.classList.add('hidden');
}

const placeEditTaskForm = (selectedTask) => {
    const rightPanel = document.querySelector('.right-panel');
    const todoListDiv = document.querySelector('.todo-list');
    const editTaskForm = document.querySelector('#edit-task-form');

    const taskName = selectedTask.querySelector('.task-title').textContent;
    const priority = selectedTask.querySelector('input + p').textContent;
    const taskDetails = selectedTask.querySelector('.task-description').textContent;
    const dueDate = selectedTask.querySelector('.date').textContent;
    
    const nameInput = editTaskForm.querySelector('#edit-task-title');
    nameInput.value = taskName;
    nameInput.focus();

    const priorityInput = Array.from(editTaskForm.querySelectorAll('input[type="radio"]'));
    priorityInput.forEach(input => {
        if (input.id === priority) input.checked = true
    });

    const detailsInput = editTaskForm.querySelector('#edit-description');
    detailsInput.value = taskDetails;

    const dueDateInput = editTaskForm.querySelector('#edit-due-date');
    dueDateInput.value = findFormattedDate(dueDate);

    editTaskForm.classList.remove('hidden');
    rightPanel.insertBefore(editTaskForm, todoListDiv);
}

const findFormattedDate = (dueDateString) => {
    const days = dueDateString.replace(/\D+/g, '');
    const today = new Date();
    let date = today;
    if (dueDateString.includes('overdue')) date = subDays(today.toISOString(), days);
    if (dueDateString.includes('in')) {
        const futureDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + +days);
        date = futureDate.toISOString();
    }
    return formatISO(date).split('T')[0];
}

const deleteTask = (e) => {
    const task = e.target.closest('.task');
    const taskId = task.id;
    const taskToBeDeleted = findTaskInProject(taskId);
    const projectId = taskToBeDeleted.projectId;

    personalProjects[projectId].taskList = personalProjects[projectId].taskList.filter(task => task != taskToBeDeleted);
    saveLocalStorage();
    task.remove();
}

const findTaskInProject = (id) => {
    const selectedTask = personalProjects.reduce((obj, project) => {
        let currentTask = project.taskList.find(task => (task.id == id));
        if (currentTask != null) obj = currentTask;
        return obj;
    }, {});
    return selectedTask;
}

export { editTaskForm, editTaskEvents, editTaskFormEvents, findFormattedDate };