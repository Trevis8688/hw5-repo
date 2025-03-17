class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const imgSrcElement = this.querySelector("project-img-src");
        const imgSrcMediumElement = this.querySelector("project-img-src-medium");
        const imgSrcSmallElement = this.querySelector("project-img-src-small");

        const imgSrc = imgSrcElement ? imgSrcElement.textContent.trim() : "";
        const imgSrcMedium = imgSrcMediumElement ? imgSrcMediumElement.textContent.trim() : imgSrc;
        const imgSrcSmall = imgSrcSmallElement ? imgSrcSmallElement.textContent.trim() : imgSrc;


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

function loadLocalProjects() {
    const projectsContainer = document.querySelector(".projects");
    projectsContainer.innerHTML = ""; // Clear existing cards

    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

    storedProjects.forEach(proj => {
        const card = document.createElement("project-card");

        card.innerHTML = `
            <project-img-src>${proj.imgSrc}</project-img-src>
            <project-img-src-medium>${proj.imgSrcMedium}</project-img-src-medium>
            <project-img-src-small>${proj.imgSrcSmall}</project-img-src-small>
            <project-title>${proj.title}</project-title>
            <project-description>${proj.description}</project-description>
            <project-link>${proj.link}</project-link>
        `;

        projectsContainer.appendChild(card);
    });
}

document.getElementById("loadLocal").addEventListener("click", loadLocalProjects);

customElements.define("project-card", ProjectCard);


const JSONBIN_URL = "https://api.jsonbin.io/v3/b/67d798c58960c979a573047f";
const API_KEY = "$2a$10$wjtyNyTC2xz5Or0nFLEx0ODM59ubfhmXmKP3X6oluQnBTpGdz6IIO";

function loadRemoteProjects() {
    const projectsContainer = document.querySelector(".projects");
    projectsContainer.innerHTML = "";

    fetch(JSONBIN_URL, {
        method: "GET",
        headers: {
            "X-Master-Key": API_KEY
        }
    })
        .then(response => response.json())
        .then(data => {
            const projects = data.record;

            projects.forEach(proj => {
                const card = document.createElement("project-card");

                card.innerHTML = `
                <project-img-src>${proj.imgSrc}</project-img-src>
                <project-img-src-medium>${proj.imgSrcMedium}</project-img-src-medium>
                <project-img-src-small>${proj.imgSrcSmall}</project-img-src-small>
                <project-title>${proj.title}</project-title>
                <project-description>${proj.description}</project-description>
                <project-link>${proj.link}</project-link>
            `;

                projectsContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching remote data:", error));
}

document.getElementById("loadRemote").addEventListener("click", loadRemoteProjects);



