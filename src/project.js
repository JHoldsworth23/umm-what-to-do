let defaultProjects = [];

class Project {
    constructor(projectId, projectName) {
        this.id = projectId;
        this.name = projectName;
        this.taskList = [];
    }
}

defaultProjects.push(new Project(0, 'Gym'));
defaultProjects.push(new Project(1, 'Study'));

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
        addProject(project.id, project.name);
    });
}

const addProject = (projectId, projectInput) => {
    const project = document.querySelector('.projects');
    
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('panel');
    projectContainer.setAttribute('data-projectid', `${projectId}`);

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

const getNextIdNum = () => {
    const allProjects = document.querySelectorAll('[data-projectid]');
    return allProjects.length;
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
    const projectIdNum = getNextIdNum();
    if (textInput.checkValidity()) {
        errorMessage.classList.add('hidden');
        textInput.classList.remove('invalid');

        const projectName = textInput.value;
        const newProject = new Project(projectName);
        defaultProjects.push(newProject);
        addProject(projectIdNum, projectName);
        hideProjectForm();    
    } else {
        errorMessage.classList.remove('hidden');
        textInput.classList.add('invalid');
    }
}

const selectPanel = (panelNode) => {
    const selectedPanel = document.querySelector('.selected');
    selectedPanel.classList.remove('selected');
    panelNode.classList.add('selected');
}

const checkWhichPanel = (e) => {
    const homePanels = e.target.closest('.home .panel');
    const projectPanels = e.target.closest('.projects .panel');
    
    if (homePanels) {
        selectPanel(homePanels);
    }
    
    if (projectPanels) {
        selectPanel(projectPanels);
    }
}

createEventListener();