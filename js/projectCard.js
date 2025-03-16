class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const imgSrc = this.querySelector("project-img-src").textContent.trim();
        const imgSrcMedium = this.querySelector("project-img-src-medium").textContent.trim() || imgSrc;
        const imgSrcSmall = this.querySelector("project-img-src-small").textContent.trim() || imgSrc;
        const title = this.querySelector("project-title").textContent.trim() || "Untitled Project";
        const description = this.querySelector("project-description").textContent.trim() || title + " description";
        const link = this.querySelector("project-link").textContent.trim() || "#";

        this.innerHTML = `
             <figure class="project-card">
                <picture class="project-img">
                    <source srcset="${imgSrcSmall}" media="(max-width: 480px)">
                    <source srcset="${imgSrcMedium}" media="(max-width: 1024px)">
                    <img src="${imgSrc}" alt="${title} Preview" loading="lazy">
                </picture>
                <figcaption>
                    <h2>${title}</h2>
                    <p>${description}</p>
                    <a href="${link}">View Project</a>
                </figcaption>
            </figure>
        `;
    }
}

customElements.define("project-card", ProjectCard);



