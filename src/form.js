const createProjectForm = () => {
    const projectDiv = document.querySelector('.projects');
    const addNewBtn = document.querySelector('#add-new-project');
    const form = document.createElement('form');
    form.id = 'project-form';
    form.autocomplete = 'off';
    form.classList.add('hidden');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('project-inputs');

    inputDiv.innerHTML = `
        <input type="text" id="new-project" placeholder="Enter a New Project Name" maxlength="20" required>
        <p class="error-message hidden">You need to add a title for new project!</p>
        <div class="form-buttons">
            <input type="submit" class="submit-btn" value="Add">
            <input type="button" class="cancel-btn" value="Cancel">
        </div>
    `;

    form.appendChild(inputDiv);
    projectDiv.insertBefore(form, addNewBtn);
}

const projectFormButton = () => {
    const projectDiv = document.querySelector('.projects');
    const projectFormButton = document.createElement('button');
    projectFormButton.id = 'add-new-project';
    projectFormButton.innerHTML = '<i class="fa-solid fa-file-circle-plus"></i> Add a New Project';
    projectDiv.appendChild(projectFormButton);
}

const createTaskForm = () => {
    const taskDiv = document.querySelector('.right-panel');
    const addNewTaskBtn = document.querySelector('#add-new-task');
    const form = document.createElement('form');
    form.id = 'task-form';
    form.autocomplete = 'off';
    form.classList.add('hidden');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('task-inputs');

    inputDiv.innerHTML = `
        <div class="form-task-input">
            <label for="task-title">Task Title:</label>
            <input type="text" id="task-title" name="task" maxlength="25" required>
        </div>
        <div class="form-task-input">
            <label for="description">Details (Optional):</label>
            <textarea id="description" name="task-description" rows="5" cols="40" placeholder="A short description or a checklist..."></textarea>
        </div>
        <div class="form-task-input">
            <div>
                <input type="radio" id="low" name="priority" value="low" required>
                <label for="low">Low</label>
                <input type="radio" id="medium" name="priority" value="medium" required>
                <label for="medium">Medium</label>
                <input type="radio" id="high" name="priority" value="high" required>
                <label for="high">High</label>
            </div>
            <label for="due-date">Date:</label>
            <input type="date" id="due-date" name="deadline" required>
        </div>
        <div class="task-form-buttons">
            <input type="submit" class="task-submit-btn" value="Add">
            <input type="button" class="task-cancel-btn" value="Cancel">
        </div>
    `;
    form.appendChild(inputDiv);
    taskDiv.insertBefore(form, addNewTaskBtn);
}

const taskFormButton = () => {
    const taskDiv = document.querySelector('.right-panel');
    const taskFormButton = document.createElement('button');
    taskFormButton.id = 'add-new-task';
    taskFormButton.classList.add('hidden');
    taskFormButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add a New Task';
    taskDiv.appendChild(taskFormButton);
}

export { createProjectForm, projectFormButton, createTaskForm, taskFormButton };