const renameProjectEvent = () => {
    const projectOptions = document.querySelector('.edit-project');

    projectOptions.firstChild.addEventListener('click', ); // Rename the project
    projectOptions.lastChild.addEventListener('click', ); // Delete the project
}

const renameProjectForm = () => {
    const projectDiv = document.querySelector('.projects');
    const renameForm = document.createElement('form');
    renameForm.id = 'rename-project-form';
    renameForm.autocomplete = 'off';

    renameForm.innerHTML = `
        <div>
            <i class="fa-solid fa-list"></i>
            <input type="text" id="rename-project" maxlength="20">
        </div>
        <div class="rename-buttons">
            <input type="submit" class="rename-btn" value="Rename">
            <input type="button" class="cancel-rename" value="Cancel">
        </div>
    `;

    projectDiv.appendChild(renameForm);
}

export { renameProjectEvent, renameProjectForm };