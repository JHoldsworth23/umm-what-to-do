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

    const submitFormBtn = document.querySelector('.submit-btn');
    submitFormBtn.addEventListener('click', processNewProject);

    const cancelFormBtn = document.querySelector('.cancel-btn');
    cancelFormBtn.addEventListener('click', hideProjectForm);

    const leftPanel = document.querySelector('.left-panel');
    leftPanel.addEventListener('click', checkWhichPanel);

    displayProject(defaultProjects);
}

const displayProject = (projectArray) => {
    projectArray.forEach(project => {
        addProject(project.name);
    });
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

    const projectForm = document.querySelector('#project-form');
    project.insertBefore(projectContainer, projectForm);
}

const showProjectForm = () => {
    const projectForm = document.querySelector('#project-form');
    projectForm.classList.remove('hidden');
    document.querySelector('#new-project').focus();
}

const hideProjectForm = () => {
    const projectForm = document.querySelector('#project-form');
    const projectInput = document.querySelector('#new-project');
    const errorMessage = document.querySelector('.error-message');

    projectForm.classList.add('hidden');
    projectInput.value = '';
    errorMessage.classList.add('hidden');
}

const processNewProject = (e) => {
    e.preventDefault();

    const textInput = document.querySelector('#new-project');
    const errorMessage = document.querySelector('.error-message');
    if (textInput.checkValidity()) {
        errorMessage.classList.add('hidden');
        textInput.classList.remove('invalid');

        const projectName = textInput.value;
        const newProject = new Project(projectName);
        defaultProjects.push(newProject);
        addProject(projectName);
        hideProjectForm();    
    } else {
        errorMessage.classList.remove('hidden');
        textInput.classList.add('invalid');
    }
}

const checkWhichPanel = (e) => {
    const homePanels = e.target.closest('.home .panel');
    const projectPanels = e.target.closest('.projects .panel');
    console.log(homePanels);
    console.log(projectPanels);
}

createEventListener();