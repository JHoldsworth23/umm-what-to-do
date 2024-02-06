let defaultProjects = [];

class Project {
    constructor(projectName) {
        this.name = projectName;
        this.taskList = [];
    }
}

defaultProjects.push(new Project('Gym'));
defaultProjects.push(new Project('Study'));

const createEventListener = () => {
    const addProjectBtn = document.querySelector('#add-new-project');
    addProjectBtn.addEventListener('click', showProjectForm);

    const cancelFormBtn = document.querySelector('.cancel-btn');
    cancelFormBtn.addEventListener('click', hideProjectForm);
}

const displayProject = (projectArray) => {
    projectArray.forEach(project => {
        addProject(project.name);
    });
    projectFormButton();
}

const addProject = (projectInput) => {
    const project = document.querySelector('.projects');
    
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('panel');

    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-list');
    projectContainer.appendChild(icon);

    const projectName = document.createElement('p');
    projectName.classList.add('project-name');
    projectName.textContent = projectInput;
    projectContainer.appendChild(projectName);

    const editProjectDiv = document.createElement('div');
    editProjectDiv.classList.add('edit-div');
    const editIcon = document.createElement('i');
    editIcon.setAttribute('class', 'fa-regular fa-pen-to-square');
    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'fa-solid fa-trash');

    editProjectDiv.appendChild(editIcon);
    editProjectDiv.appendChild(deleteIcon);
    projectContainer.appendChild(editProjectDiv);

    project.appendChild(projectContainer);
}

const projectFormButton = () => {
    const projectDiv = document.querySelector('.projects');
    const projectFormButton = document.createElement('button');
    projectFormButton.id = 'add-new-project';
    projectFormButton.innerHTML = '<i class="fa-solid fa-file-circle-plus"></i> Add a New Project';
    projectDiv.appendChild(projectFormButton);
}

const showProjectForm = () => {
    const projectForm = document.querySelector('#project-form');
    projectForm.classList.remove('hidden');
    document.querySelector('.project-inputs').focus();
}

const hideProjectForm = () => {
    const projectForm = document.querySelector('#project-form');
    const projectInputs = document.querySelector('.project-inputs');
    projectInputs.value = '';
    projectForm.classList.add('hidden');
}

displayProject(defaultProjects);
createEventListener();