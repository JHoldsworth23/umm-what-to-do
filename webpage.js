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

createMainComponent();