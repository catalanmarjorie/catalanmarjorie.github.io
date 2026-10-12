const githubList = document.getElementById('githubList');

async function loadRepos(){
  try{
    const res = await fetch('https://api.github.com/users/sjenivee/repos?sort=updated&per_page=10');
    const repos = await res.json();
    
    console.log("Repos found:", repos); // for debug
    
    githubList.innerHTML = '';

    if(!Array.isArray(repos) || repos.length === 0){
      githubList.innerHTML = '<p>No public repositories yet. Create more repos to show here.</p>';
      return;
    }

    repos.forEach(repo => {
      githubList.innerHTML += `
        <div style="background:white;padding:15px;margin:10px 0;border-radius:10px;box-shadow:0 2px 5px rgba(0,0,0,0.1)">
          <h4 style="margin:0">${repo.name}</h4>
          <p style="margin:5px 0">${repo.description || 'No description'}</p>
          <a href="${repo.html_url}" target="_blank">View Code</a>
        </div>
      `;
    });
  }catch(e){
    console.log(e);
    githubList.innerHTML = '<p>Could not load repos. GitHub API limit reached, try again later.</p>';
  }
}
loadRepos();