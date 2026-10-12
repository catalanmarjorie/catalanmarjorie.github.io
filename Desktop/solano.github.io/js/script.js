const projects = [
  {
    title: "Portfolio Website",
    description: "My personal portfolio using GitHub Pages",
    github: "https://github.com/sjenivee/sjenivee.github.io"
  }
];

const container = document.getElementById('project-container');
if(container){ container.style.display='none'; } 

const githubList = document.getElementById('githubList');

async function loadRepos(){
  try{
    const res = await fetch('https://api.github.com/users/sjenivee/repos?sort=updated&per_page=6');
    const repos = await res.json();
    if(!githubList) return;
    githubList.innerHTML = '';
    repos.forEach(repo => {
      if(repo.name === 'sjenivee.github.io') return;
      githubList.innerHTML += `
        <div style="background:white;padding:15px;margin:10px;border-radius:10px;box-shadow:0 2px 5px rgba(0,0,0,0.1)">
          <h4>${repo.name}</h4>
          <p>${repo.description || ''}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a> | 
          <a href="https://sjenivee.github.io/${repo.name}/" target="_blank">Live Demo</a>
        </div>
      `;
    });
    if(githubList.innerHTML === ''){
      githubList.innerHTML = '<p>No other repositories yet.</p>';
    }
  }catch(e){
    githubList.innerHTML = '<p>Could not load repos. Check internet.</p>';
  }
}
loadRepos();