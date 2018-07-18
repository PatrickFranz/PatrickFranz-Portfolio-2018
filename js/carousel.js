const projectList = Array.from(document.querySelectorAll('.project-item'));
const scrollButtons = document.querySelectorAll('.scroll');
const SHOW_ELEMENTS = 3;
let pageNumber = 1;

scrollButtons.forEach(btn => btn.addEventListener('click', handleScroll));

projectList.forEach((project, index)=> {
  if(index < (SHOW_ELEMENTS * pageNumber)){
    project.style.display = "block"
  } else {
    project.style.display = "none"
  }
})

function handleScroll(e){
  const pagesRequired = Math.ceil(projectList.length / SHOW_ELEMENTS);
  
  console.log(pagesRequired)
  if(this.dataset.dir === 'right'){
    pageNumber < pagesRequired && pageNumber++
  } else {
    pageNumber > 1 && pageNumber--;
  }
  console.log('current page: ', pageNumber )
}