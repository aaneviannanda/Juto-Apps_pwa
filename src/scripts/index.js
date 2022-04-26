// Import Regenator
import 'regenerator-runtime';
// Import Lazysizes
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
// import Css
import '../styles/main.css';
import '../styles/detail.css';
import '../styles/responsive.css';
// Import file Js
import App from './views/app';
import serviceWorkerRegister from './utils/sw-register';
import CONFIG from './global/config';
import { WebSocketInitiator } from './utils/websocket-initiator';
// Import Component
import './components/nav-bar';
import './components/hero';
import './components/footer';

const app = new App({
    button: document.querySelector('#menu__mobile'),
    drawer: document.querySelector('#drawer'),
    content: document.querySelector('#main__content'),
});
// hashchange (ketika url hash diubah),
window.addEventListener('hashchange', () => {
    app.renderPage();
});
//  load (ketika halaman dimuat)
window.addEventListener('load', () => {
    app.renderPage();
    serviceWorkerRegister();
    WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
