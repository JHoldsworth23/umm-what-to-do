import { createProjectForm, projectFormButton, createTaskForm, taskFormButton } from "./form";
import { renameProjectForm } from "./editProject";
import { editTaskForm, editTaskFormEvents } from "./editTask";

const createMainComponent = () => {
    const content = document.querySelector('#content');
    const header = document.createElement('header');

    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left-panel');

    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right-panel');

    const footer = document.createElement('footer');

    content.appendChild(header);
    content.appendChild(leftPanel);
    content.appendChild(rightPanel);
    content.appendChild(footer);
}

const createHeader = () => {
    const header = document.querySelector('header');
    const title = document.createElement('h1');

    title.textContent = 'Umm What To Do?';

    header.appendChild(title);
}

const createProjectsDiv = () => {
    const sidebar = document.querySelector('.left-panel');
    const homeProjects = document.createElement('div');
    homeProjects.classList.add('home');
    homeProjects.innerHTML = '<h2>Home</h2>'

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('projects');
    projectDiv.innerHTML = '<h2>Projects</h2>';

    const homePanels = [
        {id: 'all-tasks', html: '<i class="fa-solid fa-list-ul"></i><p>All Tasks</p>'},
        {id: 'today-tasks', html: '<i class="fa-solid fa-calendar-day"></i><p>Today</p>'},
        {id: 'seven-days', html: '<i class="fa-solid fa-calendar-week"></i><p>In 7 Days</p>'},
        {id: 'overdue-tasks', html: '<i class="fa-solid fa-triangle-exclamation"></i><p>Overdue Tasks</p>'},
        {id: 'high-priority', html: '<i class="fa-solid fa-circle-exclamation"></i><p>High Priority Tasks</p>'}
    ];

    homePanels.forEach(panel => {
        createHomePanels(homeProjects, panel.id, panel.html);
    });

    sidebar.appendChild(homeProjects);
    sidebar.appendChild(projectDiv);
    projectFormButton();
}

const createHomePanels = (home, id, html) => {
    const panel = document.createElement('div');
    panel.classList.add('panel');
    if (id === 'all-tasks') panel.classList.add('selected');
    panel.id = id;
    panel.innerHTML = html;
    home.appendChild(panel);
}

const createTaskDiv = () => {
    const rightPanel = document.querySelector('.right-panel');
    const currentProjectTitle = document.createElement('div');
    currentProjectTitle.innerHTML = '<h1 class="project-title">All Tasks</h1>';

    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');

    rightPanel.appendChild(currentProjectTitle);
    rightPanel.appendChild(todoList);
    taskFormButton();
}

const createFooter = () => {
    const footer = document.querySelector('footer');
    
    const date = new Date();
    footer.innerHTML = `
        <p>Copyright ©️ ${date.getFullYear()} JHoldsworth23</p>
        <a href="https://github.com/JHoldsworth23" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-github"></i>
        </a>
    `;
}

const loadWebpage = () => {
    createMainComponent();
    createHeader();
    createProjectsDiv();
    createProjectForm();
    renameProjectForm();
    createTaskDiv();
    createTaskForm();
    editTaskForm();
    editTaskFormEvents();
    createFooter();
}

export default loadWebpage;