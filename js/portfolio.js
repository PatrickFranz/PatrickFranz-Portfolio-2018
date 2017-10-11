(function (){
  const menuItems    = Array.from(document.getElementsByClassName('menu-item'));
  const aboutHead    = document.getElementById('port--about-sec');
  const projectsHead = document.getElementById('port--project-sec');
  const skillsHead   = document.getElementById('port--skills-sec');
  const contactHead  = document.getElementById('port--contact-sec');
  const returnTopButton = document.getElementById('returnTop');
  const topNavBar       = document.getElementById('topNavbar');

  let socialSideBar = document.getElementById('social-sidebar');
  let resizeTimeout;

  window.addEventListener('scroll', function(event){
    if(window.pageYOffset > 200){
      returnTopButton.classList = 'fadeIn';   
      socialSideBar.style.position = 'fixed';
      // socialSideBar.classList.add('transition-bottom');
    } else {
      returnTopButton.classList = 'fadeOut';
      socialSideBar.style.position = 'absolute';
      socialSideBar.classList.remove('transition-bottom');
    }
  });

  window.addEventListener("resize", resizeThrottler, false);

  socialSideBar.addEventListener('click', function(e){
    if(socialSideBar.classList.contains('minimize')){
      socialSideBar.classList = "restore";
    } else {
      socialSideBar.classList = "minimize";
    }
  });

  function resizeThrottler(){
    if (!resizeTimeout){
      resizeTimeout = setTimeout(function(){
        resizeTimeout = null;
        sizeSidebar();
      }, 75);
    }
  }

  function sizeSidebar(){
    let isMedia960 = window.matchMedia("(max-width:960px)");
    if (isMedia960.matches){
      socialSideBar.classList = 'minimize';
    } else {
      socialSideBar.classList = "restore";
    }
  }
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

function isCookieSet(idString){
  if(document.cookie.length > 0){
    let cookieArray = document.cookie.split(";");
    return !!cookieArray.find( (element) => {
      return element === idString; 
    });
  }
}

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