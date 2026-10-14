const GITHUB_USERNAME = "catalanmarjorie";

async function loadProjects(){
  try{
    const res = await fetch('data/projects.json');
    console.log('projects.json request:', {method:'GET', status:res.status, type:res.headers.get('content-type')});
    const projects = await res.json();
    const container = document.getElementById('projects-container');
    container.innerHTML = projects.map(p=>`
      <div class="project-card" data-tech="${p.technologies.join(' ')}">
        <img src="${p.screenshot}" onerror="this.src='https://via.placeholder.com/600x400?text=My+Portfolio'">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <small>${p.technologies.join(' • ')}</small>
        <p><strong>Role:</strong> ${p.role}</p>
        <a href="${p.link}" target="_blank" class="btn secondary">View Live</a>
      </div>`).join('');
  }catch(e){
    document.getElementById('projects-error').textContent="Projects could not be loaded.";
    document.getElementById('projects-error').classList.remove('hidden');
  }
}

async function loadGitHubRepos(){
  try{
    const url=`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`;
    const res = await fetch(url);
    console.log('api.github.com request:', {method:'GET', status:res.status, type:res.headers.get('content-type')});
    const repos = await res.json();
    const container = document.getElementById('github-repos');
    if(Array.isArray(repos)){
      container.innerHTML = repos.map(r=>`
        <div class="repo-card">
          <a href="${r.html_url}" target="_blank"><strong>${r.name}</strong></a>
          <p>${r.description||'No description'}</p>
          <small>${r.language||'No language'} • Updated: ${new Date(r.updated_at).toLocaleDateString()}</small>
        </div>`).join('');
    }
  }catch(e){
    document.getElementById('github-error').textContent="GitHub data is unavailable.";
    document.getElementById('github-error').classList.remove('hidden');
  }
}

document.getElementById('contact-form').addEventListener('submit', e=>{
  e.preventDefault();
  const name=document.getElementById('name').value.trim();
  const email=document.getElementById('email').value.trim();
  const msg=document.getElementById('message').value.trim();
  const out=document.getElementById('form-message');
  if(!name||!msg||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    out.textContent="Empty fields and invalid email rejected."; out.style.color="red"; return;
  }
  out.textContent="Thank you! Message received (demo only)."; out.style.color="green";
  e.target.reset();
});

window.addEventListener('scroll', ()=> document.getElementById('back-to-top').classList.toggle('show', scrollY>300));
document.getElementById('back-to-top').onclick=()=>scrollTo({top:0,behavior:'smooth'});
document.getElementById('theme-toggle').onclick=()=>{
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme')?'dark':'light');
};
if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark-theme');
document.getElementById('menu-toggle').onclick=()=> document.querySelector('.nav-links').classList.toggle('show');
document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click', ()=>{
  document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  document.querySelectorAll('.project-card').forEach(c=> c.style.display = b.dataset.filter==='all'||c.dataset.tech.includes(b.dataset.filter) ? 'block':'none');
}));
const full="Aspiring Software Developer | BSIT Student"; let i=0; const el=document.getElementById('tagline'); el.textContent="";
(function type(){ if(i<=full.length){ el.textContent=full.substring(0,i++); setTimeout(type,60);} })();
loadProjects(); loadGitHubRepos();