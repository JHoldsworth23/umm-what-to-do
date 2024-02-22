import { defaultProjects } from "./project";
const { addDays, subDays } = require('date-fns');

const editTaskEvents = (editBtn, deleteBtn) => {
    editBtn.addEventListener('click', showEditTaskForm);
    deleteBtn.addEventListener('click', deleteTask);
}

const editTaskFormEvents = () => {
    const editTaskBtn = document.querySelector('.edit-submit-btn');

    const cancelBtn = document.querySelector('.edit-cancel-btn');
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
            <p class="blank-error">You can't make the task title blank</p>
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

}

const showEditTaskForm = (e) => {
    const editTaskButtons = e.target.parentNode;
    const taskDiv = editTaskButtons.parentNode;

    placeEditTaskForm(taskDiv);
    taskDiv.classList.add('hidden');
}

const placeEditTaskForm = (selectedTask) => {
    const rightPanel = document.querySelector('.right-panel');
    const todoListDiv = document.querySelector('.todo-list');
    const editTaskForm = document.querySelector('#edit-task-form');

    const taskName = selectedTask.querySelector('.task-title').textContent;
    const priority = selectedTask.querySelector('input + p').textContent;
    const taskDetails = selectedTask.querySelector('.details').textContent;
    const dueDate = selectedTask.querySelector('.date').textContent;
    
    const nameInput = editTaskForm.querySelector('#edit-task-title');
    nameInput.value = taskName;
    nameInput.focus();

    const priorityInput = Array.from(editTaskForm.querySelectorAll('input[type="radio"]'));
    priorityInput.forEach(input => {
        if (input.id === priority) input.checked = true
    });

    const formattedDate = findFormattedDate(dueDate);
    console.log(formattedDate);

    editTaskForm.classList.remove('hidden');
    rightPanel.insertBefore(editTaskForm, todoListDiv);
}

const findFormattedDate = (dueDateString) => {
    const days = dueDateString.replace(/\D+/g, '');
    if (dueDateString.includes('overdue')) return subDays(new Date(), days);
    if (dueDateString.includes('Today')) return new Date();
}

const displayHiddenTask = () => {

}

const deleteTask = (e) => {
    const task = e.target.closest('.task');
    const taskId = task.id;
    const taskToBeDeleted = findTaskInProject(taskId);
    const projectId = taskToBeDeleted.projectId;

    defaultProjects[projectId].taskList = defaultProjects[projectId].taskList.filter(task => task != taskToBeDeleted);
    task.remove();
}

const findTaskInProject = (id) => {
    const selectedTask = defaultProjects.reduce((obj, project) => {
        let currentTask = project.taskList.find(task => (task.id == id));
        if (currentTask != null) obj = currentTask;
        return obj;
    }, {});
    return selectedTask;
}

export { editTaskForm, editTaskEvents };