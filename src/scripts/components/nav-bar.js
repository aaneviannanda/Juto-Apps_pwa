/* eslint-disable linebreak-style */
class Navbar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <!-- Navbar Dekstop -->
        <nav class="navbar">
            <a class="logo" href="#/">Juto Apps</a>
            <ul class="nav__list">
                <li class="nav__item"><a href="#/">Home</a></li>
                <li class="nav__item"><a href="#/favorite">Favorite</a></li>
                <li class="nav__item"><a target="_blank" rel="noopener" href="https://aaneviannanda.github.io/">About Us</a></li>
            </ul>
        </nav>
        <!-- Navbar Mobile -->
        <nav class="mobile__menu">
            <div aria-label="logo">Juto Apps</div>
            <div class="icon__menu" id="menu__mobile">
                <button aria-label="button menu dropdown on mobile device" type="button">
                    <span class="fa fa-bars fa-lg"></span>
                </button>
            </div>
        </nav>
        <nav id="drawer" class="navbar__mobile">
            <ul class="list__mobile">
                <li class="item__mobile"><a href="#/">Home</a></li>
                <li class="item__mobile"><a href="#/favorite">Favorite</a></li>
                <li class="item__mobile"><a target="_blank" rel="noopener" href="https://aaneviannanda.github.io/">About Us</a></li>
            </ul>
        </nav>
          `;
    }
}

customElements.define('nav-bar', Navbar);
