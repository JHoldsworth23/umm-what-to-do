import { format } from "date-fns";
import { defaultProjects } from "./project";
import { addTask } from "./task";
import { findFormattedDate } from "./editTask";

const selectedHomePanel = (homePanel) => {
    if (homePanel.matches('#all-tasks')) displayAllTasks();
    if (homePanel.matches('#today-tasks')) todayTasks();
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

const todayTasks = () => {
    clearList();
    const today = format(new Date(), 'yyyy-MM-dd');
    defaultProjects.forEach(project => {
        project.taskList.forEach(task => {
            if (findFormattedDate(task.dueDate) === today) {
                addTask(task.id, task.title, task.details, task.priority, task.dueDate);
            } else {
                return;
            }
        });
    });
}

export { selectedHomePanel };