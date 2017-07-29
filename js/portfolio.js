(function addEventListeners(){
  const menuItems = Array.from(document.getElementsByClassName('menu-item'));
  const aboutHead    = document.getElementById('port--about-sec');
  const projectsHead = document.getElementById('port--project-sec');
  const skillsHead   = document.getElementById('port--skills-sec');
  const contactHead  = document.getElementById('port--contact-sec');
  const returnTopButton = document.getElementById('returnTop');

  const socialSideBar = document.getElementById('social-sidebar');

  window.addEventListener('scroll', function(event){
    if(window.pageYOffset > 200){
      returnTopButton.classList = 'fadeIn';   
      socialSideBar.style.position = 'fixed';
      socialSideBar.classList.add('transition-bottom');
    } else {
      returnTopButton.classList = 'fadeOut';
      socialSideBar.style.position = 'absolute';
      socialSideBar.classList.remove('transition-bottom');
      
    }
  });

  menuItems.forEach(function(item){
    item.addEventListener('click', function(e){
      switch(item.dataset.target){

        case aboutHead.id:{
          scrollWindowTo(aboutHead.offsetTop);
          break;
        }
        case projectsHead.id: {
          scrollWindowTo(projectsHead.offsetTop);
          break;
        }
        case skillsHead.id: {
          scrollWindowTo(skillsHead.offsetTop);
          break;
        }
        case contactHead.id: {
         scrollWindowTo(contactHead.offsetTop);
          break;
        }
      };
    })
  });
})();

function scrollWindowTo(y){
  const SCROLL_SPEED = 50;
  const THRESHOLD = 30; //Small values can cause a jittering.
  let currentLoc = window.pageYOffset;
  if(Math.abs(y - currentLoc) > THRESHOLD){
    var direction = y - currentLoc < 1 ? -1 : 1;
    window.scrollTo(0, currentLoc + (direction * SCROLL_SPEED));
    setTimeout(function(){
      scrollWindowTo(y);
    }, 10);
  }
}