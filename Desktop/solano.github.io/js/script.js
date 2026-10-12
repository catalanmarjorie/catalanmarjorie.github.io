console.log("fixed - no fetch version");

const projects = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio using GitHub Pages",
    github: "https://github.com/solanojenivee/solanojenivee.github.io"
  },
  {
    title: "Grade Calculator",
    description: "Simple JS calculator",
    github: "#"
  },
  {
    title: "Bookstore Database",
    description: "Database project",
    github: "#"
  },
];

const container = document.getElementById('project-container');
if (container) {
  container.innerHTML = ''; // clear Loading...
  projects.forEach(p => {
    container.innerHTML += `
      <div style="background:white;padding:15px;margin:10px;border-radius:10px;box-shadow:0 2px 5px rgba(0,0,0,0.1);">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <a href="${p.github}" target="_blank">View</a>
      </div>
    `;
  });
}