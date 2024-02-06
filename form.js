const createProjectForm = () => {
    const projectDiv = document.querySelector('.projects');
    const form = document.createElement('form');
    form.id = 'project-form';
    form.autocomplete = 'off';

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('project-inputs');

    inputDiv.innerHTML = `
        <input type="text" id="new-project" placeholder="Enter a New Project Name" maxlength="20">
        <div class="form-buttons">
            <button class="submit-btn">Add</button>
            <button class="cancel-btn">Cancel</button>
        </div>    
    `;

    form.appendChild(inputDiv);
    projectDiv.appendChild(form);
}

const createTaskForm = () => {

}