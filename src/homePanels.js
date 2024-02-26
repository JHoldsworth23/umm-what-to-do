const selectedHomePanel = (homePanel) => {
    if (homePanel.matches('#all-tasks')) console.log('Display All Tasks');
    if (homePanel.matches('#today-tasks')) console.log('Display Today Tasks');
    if (homePanel.matches('#seven-days')) console.log('Display Week Tasks');
    if (homePanel.matches('#overdue-tasks')) console.log('Display Overdue Tasks');
    if (homePanel.matches('#high-priority')) console.log('Display Important Tasks');
}

export { selectedHomePanel };