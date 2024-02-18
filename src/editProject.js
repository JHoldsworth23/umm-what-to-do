const renameProjectEvent = () => {
    const projectOptions = document.querySelectorAll('.edit-project');

    projectOptions.forEach(project => {
        project.firstChild.addEventListener('click', showRenameForm);
    });
//     projectOptions.lastChild.addEventListener('click', ); // Delete the project
}

const renameProjectForm = () => {
    const projectDiv = document.querySelector('.projects');
    const renameForm = document.createElement('form');
    renameForm.id = 'rename-project-form';
    renameForm.classList.add('hidden');
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

const showRenameForm = (e) => {
    const editProjectOption = e.target.parentNode;
    const panel = editProjectOption.parentNode;

    locateRenameForm(panel);
    panel.classList.add('rename');
}

const locateRenameForm = (selectedPanel) => {
    const projectDiv = document.querySelector('.projects');
    const renameForm = document.querySelector('#rename-project-form');
    const projectName = selectedPanel.querySelector('.project-name').textContent;

    const textInput = renameForm.querySelector('input');
    textInput.value = projectName;

    renameForm.classList.remove('hidden');
    projectDiv.insertBefore(renameForm, selectedPanel);
}

export { renameProjectEvent, renameProjectForm };