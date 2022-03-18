import StartPage from './pages/StartPage.js';
import ProfilPage from './pages/ProfilPage.js';
import ImagePage from './pages/ImagePage.js';

import u from "./utils.js"

u.getMenueClicks();






// LOAD ROUTER
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);

function router() {

    let page = u.getHashFromURL();
    switch (page) {

        case '/':
            StartPage.render();
            break;

        case 'profil':
            ProfilPage.render();
            break;

        case 'images':
            ImagePage.render();
            break;

        default:
            StartPage.render();
            break;
    }


}