const projectList = Array.from(document.querySelectorAll('.project-item'));
const scrollButtons = document.querySelectorAll('.scroll');
const SHOW_ELEMENTS = 6;
let pageNumber = 1;
scrollButtons.forEach(btn => btn.addEventListener('click', handleScroll));

addPageDots();
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
    if(pageNumber < pagesRequired){
      pageNumber++;

    }
  } else {
    if(pageNumber > 1){
      pageNumber--;
    }
  }
  showProjects();
}