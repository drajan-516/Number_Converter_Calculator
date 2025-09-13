import {converter} from "./pages/converter/main.js";
import {mainPage} from "./pages/introduction.js";
import {addition} from "./pages/calculators/addition.js";
import {division} from "./pages/calculators/division.js";
import {subtraction} from "./pages/calculators/subtraction.js";
import {multiplication} from "./pages/calculators/multiplication.js";

const app = document.getElementById('app');

export function router(){
    const hash = window.location.hash || '#/mainPage';
    const parts = hash.slice(2).split('/');
    const route = parts[0];

    switch (route) {
        case 'mainPage':
            mainPage(app);
            break;
        case 'converter':
            converter(app);
            break;
        case 'addition':
            addition(app);
            break;
        case 'division':
            division(app);
            break;
        case 'multiplication':
            multiplication(app);
            break;
        case 'subtraction':
            subtraction(app);
            break;
        default:
            app.innerHTML = `<h2>404 Page Not Found</h2>`;
    }

}