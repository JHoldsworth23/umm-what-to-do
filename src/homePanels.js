import { format, isWithinInterval } from "date-fns";
import { defaultProjects } from "./project";
import { addTask } from "./task";
import { findFormattedDate } from "./editTask";

const selectedHomePanel = (homePanel) => {
    if (homePanel.matches('#all-tasks')) displayAllTasks();
    if (homePanel.matches('#today-tasks')) displayTodayTasks();
    if (homePanel.matches('#seven-days')) displayWeekTasks();
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

const displayTodayTasks = () => {
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

const displayWeekTasks = () => {
    clearList();
    defaultProjects.forEach(project => {
        project.taskList.forEach(task => {
            const date = findFormattedDate(task.dueDate);
            if (checkNextWeek(date)) {
                addTask(task.id, task.title, task.details, task.priority, task.dueDate);
            } else {
                return;
            }
        });
    });
}

const checkNextWeek = (taskDate) => {
    const today = new Date();
    const nextWeekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    return isWithinInterval(taskDate, {start: today, end: nextWeekDate});
}

export { selectedHomePanel };