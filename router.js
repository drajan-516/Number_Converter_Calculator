import {mainPage} from "./pages/converter/main.js";

const app = document.getElementById('app');

export function router(){
    const hash = window.location.hash || '#/home';
    const parts = hash.slice(2).split('/');
    const route = parts[0];

    switch (route) {
        case 'mainPage':
            mainPage(app);
            break;
        default:
            app.innerHTML = `<h2>404 Page Not Found</h2>`;
    }

}