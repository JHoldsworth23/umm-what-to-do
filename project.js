let defaultProjects = [];

class Project {
    constructor(projectName) {
        this.name = projectName;
        this.taskList = [];
    }
}

defaultProjects.push(new Project('Gym'));
defaultProjects.push(new Project('Study'));

const displayProject = (projectArray) => {
    projectArray.forEach(project => {
        addProject(project.name);
    });
}

const addProject = (projectInput) => {
    const project = document.querySelector('.left-panel');
    
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

displayProject(defaultProjects);