import { hideAddTaskBtn, defaultProjects } from "./project";
import { updateTaskTitle } from "./task";

const editProjectEvents = (editBtn, deleteBtn) => {
    editBtn.addEventListener('click', showRenameForm);
    deleteBtn.addEventListener('click', deleteProject);
}

const renameProjectEvents = () => {
    const renameBtn = document.querySelector('.rename-btn');
    renameBtn.addEventListener('click', (e) => {
        processRenameInput();
        e.preventDefault();
    });

    const cancelBtn = document.querySelector('.cancel-rename');
    cancelBtn.addEventListener('click', () => {
        const project = document.querySelector('.selected.hidden');
        project.classList.remove('hidden');
        hideRenameForm();
    });
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
            <input type="button" class="rename-btn" value="Rename">
            <input type="button" class="cancel-rename" value="Cancel">
        </div>
    `;

    projectDiv.appendChild(renameForm);
}

const processRenameInput = () => {
    const selectedPanel = document.querySelector('.panel.hidden');
    const projectName = selectedPanel.querySelector('.project-name');
    const renameInput = document.querySelector('#rename-project').value;
    projectName.textContent = renameInput;

    const projectId = selectedPanel.dataset.projectid;
    defaultProjects[projectId].name = renameInput;

    selectedPanel.classList.remove('hidden');
    updateTaskTitle(projectName.textContent);
    hideRenameForm()
}

const showRenameForm = (e) => {
    const editProjectOption = e.target.parentNode;
    const panel = editProjectOption.parentNode;

    if (checkRenameFormExist()) {
        hideRenameForm();
        // displayHiddenPanel();
    }

    panel.classList.add('hidden');
    locateRenameForm(panel);
}

const hideRenameForm = () => {
    const renameForm = document.getElementById('rename-project-form');
    renameForm.classList.add('hidden');
}

const checkRenameFormExist = () => {
    const renameForm = document.getElementById('rename-project-form');
    return renameForm.classList.contains('hidden') ? true : false;
}

const locateRenameForm = (selectedPanel) => {
    const projectDiv = document.querySelector('.projects');
    const renameForm = document.querySelector('#rename-project-form');
    const projectName = selectedPanel.querySelector('.project-name').textContent;

    const textInput = renameForm.querySelector('input');
    textInput.value = projectName;
    textInput.focus();

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
    resetIndex();
    defaultProjects.splice(panelIndex, 1);
}

const resetIndex = () => {
    let index = 0;
    const panels = document.querySelectorAll('.projects .panel');

    panels.forEach(panel => {
        const projectId = panel.dataset.projectid;
        panel.dataset.projectid = index;
        defaultProjects[projectId].id = index;
        index++;
    });

    defaultProjects.sort((a, b) => a.id - b.id);
}

export { editProjectEvents, renameProjectEvents, renameProjectForm };