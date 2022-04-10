class HeroSection extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <!-- Jumbotron -->
            <div class="jumbotron">
                <div class="jumbotron__text">
                    <h1>Juto Apps</h1>
                    <p>- You are satisfied we are happy -</p>
                </div>
            </div>
         `;
    }
}

customElements.define('hero-section', HeroSection);
