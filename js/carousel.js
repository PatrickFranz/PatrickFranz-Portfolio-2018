
function loadCarousel(){
  window.projectList = [];
  window.SHOW_ELEMENTS = 6;
  window.pageNumber = 1;
  const scrollButtons = document.querySelectorAll('.scroll');
  scrollButtons.forEach(btn => btn.addEventListener('click', handleScroll));
  getProjectData();
}

function getProjectData(){
  if(sessionStorage.getItem('carouselData')){
    populateProjectList(JSON.parse(sessionStorage.getItem('carouselData')))
  } else {
  fetch(`${window.location.origin}/js/carouselData.json`)
    .then(result => result.json())
    .then(data => {
      sessionStorage.setItem('carouselData', JSON.stringify(data.projects));
      populateProjectList(JSON.parse(sessionStorage.getItem('carouselData')))
    })
    .catch(err => console.log(err));
  }
}

function showModal(e){
  const carouselData = JSON.parse(sessionStorage.carouselData);
  const projectData = carouselData.find(project => project.id == this.dataset.id);
  const modal = document.querySelector('.modal');
  
  modal.querySelector('.modal-close').addEventListener('click', e => modal.classList.add('hide'));
  modal.classList.remove('hide');
  modal.querySelector('.image').src = projectData.img_large;
  modal.querySelector('.image').alt = `${projectData.title} screenshot`;
  modal.querySelector('.title').innerHTML = `<h1>${projectData.title}</h1>`;
  modal.querySelector('.desc').innerHTML = projectData.desc;
  modal.querySelector('.date').innerHTML = `Last Updated: ${projectData.date}`;
  modal.querySelector('.tech').innerHTML = `Technology: ` + projectData.techUsed.join(', ');
  modal.querySelector('.demo').innerHTML = `<a href="${projectData.demoUrl}" target="_blank">Live Demo</a>`;
  modal.querySelector('.repo').innerHTML = `<a href="${projectData.repoUrl}" target="_blank">Github Repo</a>`;
 
}

function populateProjectList(projects){
  projects
  .sort( (a, b) => new Date(b.date) - new Date(a.date) )
  .map(project => {
    const template = document.createElement('template');
    const html =
      `<div class="project-item" data-id='${project.id}'>
        <div class='project-item--wrapper'>
          <a>
            <img src="${project.img_thumb}">
          </a>
          <span class='title'>${project.title}</span>
        </div>
      </div>`;
    template.innerHTML = html.trim();
    document.querySelector('.project-list').appendChild(template.content.firstChild)
  })
  projectList = Array.from(document.querySelectorAll('.project-item'));
  projectList.forEach(project => project.addEventListener('click', showModal));
  addPageDots();
  showProjects();
}

function showProjects(){
  projectList.forEach((project, index)=> {
    if(index < (SHOW_ELEMENTS * pageNumber) 
        && index > (SHOW_ELEMENTS * pageNumber) - SHOW_ELEMENTS - 1){
          project.classList.remove('hide')
    } else {
          project.classList.add('hide');
    }
  });
  handleDotState();
}

function handleDotState(){
  const dots = Array.from(document.querySelectorAll('.dot'));
  dots.forEach((dot, index )=> {
    index === pageNumber -1 ? dot.classList.add('dot-selected') : dot.classList.remove('dot-selected');
  })
}

function addPageDots(){
  const numDots = Math.ceil(projectList.length / SHOW_ELEMENTS);
  const pageDotsElement = document.querySelector('.page-dots');
  for(let i=0; i < numDots; i++){
    const dot = document.createElement('span');
    dot.className = 'dot';
    pageDotsElement.appendChild(dot);
  }
  Array.from(pageDotsElement.querySelectorAll('.dot'))
    .forEach((dot, i) => {
      dot.addEventListener('click', e => {
        pageNumber = i + 1;
        showProjects();
      })
  });
}

function handleScroll(e){
  const pagesRequired = Math.ceil(projectList.length / SHOW_ELEMENTS);
  if(this.dataset.dir === 'right'){
    pageNumber < pagesRequired ? pageNumber++ : pageNumber = 1;
  } else { //Handle Left scroll
    pageNumber > 1 ? pageNumber-- : pageNumber = pagesRequired;
  }
  showProjects();
}