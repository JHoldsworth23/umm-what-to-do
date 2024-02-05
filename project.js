let defaultProjects = [];

class Project {
    constructor(projectName) {
        this.name = projectName;
        this.taskList = [];
    }
}

defaultProjects.push(new Project('Gym'));
defaultProjects.push(new Project('Study'));