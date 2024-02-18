import { hideAddTaskBtn, defaultProjects } from "./project";
import { updateTaskTitle } from "./task";

const editProjectEvents = (renameBtn, deleteBtn) => {
    renameBtn.addEventListener('click', showRenameForm);
    deleteBtn.addEventListener('click', deleteProject);
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

const deleteProject = (e) => {
    const panel = e.target.closest('.panel');
    const panelIndex = panel.dataset.projectid;

    if (panel.classList.contains('selected')) {
        const allTasks = document.querySelector('#all-tasks');
        const title = allTasks.querySelector('p');
        allTasks.classList.add('selected');
        updateTaskTitle(title.textContent);
        hideAddTaskBtn();
    }

    panel.remove();
    defaultProjects.splice(panelIndex, 1);
}

export { editProjectEvents, renameProjectForm };