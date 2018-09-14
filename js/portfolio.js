function init(){
  const COOKIE__NOTIFY_STRING = `cookieNotify=true;`;

  const menuItems    = Array.from(document.getElementsByClassName('menu-item'));
  const aboutHead    = document.getElementById('port--about-sec');
  const projectsHead = document.getElementById('port--project-sec');
  const skillsHead   = document.getElementById('port--skills-sec');
  const contactHead  = document.getElementById('port--contact-sec');
  const returnTopButton = document.getElementById('returnTop');
  const topNavBar       = document.getElementById('topNavbar');
  let isCookieAware = isCookieSet(COOKIE__NOTIFY_STRING);
  const socialSideBar = document.getElementById('social-sidebar');
  const cookieAlert = document.getElementById('cookie-alert');
  let resizeTimeout;

  checkCookieNotified();

  window.addEventListener('scroll', function(event){
    if(window.pageYOffset > 200){
      returnTopButton.classList = 'fadeIn';   
      socialSideBar.classList.add('minimize');
      socialSideBar.classList.remove('restore');
      socialSideBar.classList.add('transition-bottom');
    } else {
      returnTopButton.classList = 'fadeOut';
      socialSideBar.classList.remove('transition-bottom');
    }
  });

  document.getElementById("ok-cookie").addEventListener("click", function(){
    setCookie(COOKIE__NOTIFY_STRING);
    isCookieAware = true;
    checkCookieNotified();
  });

  window.addEventListener("resize", resizeThrottler, false);


  socialSideBar.addEventListener('click', function(e){
    if(socialSideBar.classList.contains('minimize')){
      socialSideBar.classList.add("restore");
      socialSideBar.classList.remove('minimize');
      socialSideBar.classList.remove('transition-bottom');
    } else {
      socialSideBar.classList.add("minimize");
      socialSideBar.classList.remove('restore');
      socialSideBar.classList.add('transition-bottom');
    }
  });

  function checkCookieNotified(){
    if(!isCookieAware){
      slideUp(cookieAlert, 0);
    } else {
      if(cookieAlert.style.bottom === "0px"){
        slideUp(cookieAlert, "-200px");
        setTimeout(function(timestamp){
          cookieAlert.style.display = "none";
        }, 700);
        
      }
      cookieAlert.style.display = "none";
    }
  }

  function resizeThrottler(){
    if (!resizeTimeout){
      resizeTimeout = setTimeout(function(){
        resizeTimeout = null;
        sizeSidebar();
      }, 75);
    }
  }

  function sizeSidebar(){
      socialSideBar.classList = 'minimize';
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


  function isCookieSet(idString){
    if(document.cookie.length > 0){
      let cookieArray = document.cookie.split(";");
      return !!cookieArray.find( (element) => {
        return element.trim() === idString.split(';')[0].trim(); 
      });
    }
  }

  function setCookie(cookie){
    let today = new Date(),
        expires = today.setMonth(today.getMonth() + 6);
    document.cookie = cookie + `expires=${new Date(expires)};`;
  }
  
  function slideUp(element, slideTo){
    element.style.bottom = slideTo;
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
}