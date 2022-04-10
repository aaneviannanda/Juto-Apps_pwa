class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <footer>
            <a target="_blank" rel="noopener" href="https://aaneviannanda.github.io/">Copyright © 2022 | Juto Apps</a>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
