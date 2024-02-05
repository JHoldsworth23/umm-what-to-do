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

const createFooter = () => {
    const footer = document.querySelector('footer');
    
    const date = new Date();
    footer.innerHTML = `
        <p>Copyright ©️ 2024 JHoldsworth23</p>
        <a href="https://github.com/JHoldsworth23" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-github"></i>
        </a>
    `;
}

const loadWebpage = () => {
    createMainComponent();
    createHeader();
    createFooter();
}

loadWebpage();