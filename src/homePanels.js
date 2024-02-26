import { defaultProjects, hideAddTaskBtn } from "./project";
import { addTask } from "./task";

const selectedHomePanel = (homePanel) => {
    if (homePanel.matches('#all-tasks')) displayAllTasks();
    if (homePanel.matches('#today-tasks')) console.log('Display Today Tasks');
    if (homePanel.matches('#seven-days')) console.log('Display Week Tasks');
    if (homePanel.matches('#overdue-tasks')) console.log('Display Overdue Tasks');
    if (homePanel.matches('#high-priority')) console.log('Display Important Tasks');
}

const clearList = () => {
    const todoList = document.querySelector('.todo-list');
    todoList.textContent = '';
}

const displayAllTasks = () => {
    clearList();
    defaultProjects.forEach(project => {
        project.taskList.forEach(task => {
            addTask(task.id, task.title, task.details, task.priority, task.dueDate);
        });
    });
}

export { selectedHomePanel };