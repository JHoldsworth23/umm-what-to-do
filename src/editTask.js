const editTaskForm = () => {
    const rightPanel = document.querySelector('.right-panel');
    const editTaskForm = document.createElement('form');
    editTaskForm.id = 'edit-task-form';
    editTaskForm.classList.add('hidden');
    editTaskForm.autocomplete = 'off';

    editTaskForm.innerHTML = `
        <div class="edit-form-task-input">
            <label for="edit-task-title">New Task Title:</label>
            <input type="text" id="edit-task-title" name="new-task" maxlength="25">
            <p class="blank-error">You can't make the task title blank</p>
        </div>
        <div class="edit-form-task-input">
            <label for="edit-description">New Details (Optional):</label>
            <textarea id="edit-description" name="edit-description" rows="1" cols="40" placeholder="A short description or a checklist..."></textarea>
        </div>
        <div class="edit-form-task-input">
                <input type="radio" id="low" name="priority" value="low" required>
                <label for="low">Low</label>
                <input type="radio" id="medium" name="priority" value="medium" required>
                <label for="medium">Medium</label>
                <input type="radio" id="high" name="priority" value="high" required>
                <label for="high">High</label>
        </div>
        <div class="edit-form-task-input">
            <label for="due-date">New Date:</label>
            <input type="date" id="due-date" name="deadline" required>
        </div>
        <div class="edit-task-form-buttons">
            <input type="button" class="edit-submit-btn" value="Edit Task">
            <input type="button" class="edit-cancel-btn" value="Cancel">
        </div>
    `;

    rightPanel.appendChild(editTaskForm);
}

export default editTaskForm;