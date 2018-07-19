const projectList = Array.from(document.querySelectorAll('.project-item'));
const scrollButtons = document.querySelectorAll('.scroll');
const SHOW_ELEMENTS = 3;
let pageNumber = 1;
scrollButtons.forEach(btn => btn.addEventListener('click', handleScroll));

showProjects();

function showProjects(){
  projectList.forEach((project, index)=> {
    if(index < (SHOW_ELEMENTS * pageNumber) 
        && index > (SHOW_ELEMENTS * pageNumber) - SHOW_ELEMENTS -1){
          project.classList.remove('hide')
    } else {
          project.classList.add('hide');
    }
  });
}

function handleScroll(e){
  const pagesRequired = Math.ceil(projectList.length / SHOW_ELEMENTS);
  if(this.dataset.dir === 'right'){
    if(pageNumber < pagesRequired){
      pageNumber++;
    }
  } else {
    if(pageNumber > 1){
      pageNumber--;
    }
  }
  console.log('pageNumber: ', pageNumber)
  showProjects();
}