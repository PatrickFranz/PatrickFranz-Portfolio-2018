(function scrollToFeature(){
  const menuItems = Array.from(document.getElementsByClassName('menu-item'));
  
  const aboutHead    = document.getElementById('port--about-sec');
  const projectsHead = document.getElementById('port--project-sec');
  const skillsHead   = document.getElementById('port--skills-sec');
  const contactHead  = document.getElementById('port--contact-sec');

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
  const THRESHOLD = 20;
  let currentLoc = window.pageYOffset;
  if(Math.abs(y - currentLoc) > THRESHOLD){
    var direction = y - currentLoc < 1 ? -1 : 1;
    window.scrollTo(0, currentLoc + (direction * SCROLL_SPEED));
    setTimeout(function(){
      scrollWindowTo(y);
    }, 10);
  }
}