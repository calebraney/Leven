// Webflow is initialized
window.Webflow ||= [];
window.Webflow.push(() => {
  // Run code once webflow is initialized
  console.log('hello webflow');

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Flip);

  const setNavbar = function () {
    const navbar = document.querySelector('[navbar-bg]');
    if (!navbar) return;
    document.addEventListener('scroll', (event) => {
      if (window.scrollY !== 0) {
        navbar.classList.add('is-active');
      }
      if (window.scrollY === 0) {
        navbar.classList.remove('is-active');
      }
    });
  };
  setNavbar();

  const updateProjectColors = function () {
    // Get all div elements with the attribute 'work-item'
    const workItems = document.querySelectorAll('[work-item]');
    // Loop through the work items and update the 'color-mode' attribute
    workItems.forEach((item, index) => {
      if (!item) return;
      // Calculate the color mode based on the index
      // Every 1 of 3 = 2, 2 of 3 = 3 etc
      const colorMode = index % 3 === 0 ? 2 : index % 3 === 1 ? 3 : 4;
      // Set the 'color-mode' attribute for the current item
      item.setAttribute('section-mode', colorMode.toString());
    });
  };
  updateProjectColors();

  function solutionsScroll() {
    const tabLinks = document.querySelectorAll('[cr-split-link]');
    const processItems = document.querySelectorAll('[cr-split-content]');
    const processImages = document.querySelectorAll('[cr-split-image]');
    const processTabs = document.querySelectorAll('[cr-split-tab]');
    const section = document.querySelector('[cr-split-wrap]');
    const navbar = document.querySelector('[navbar]');
    const ACTIVE_CLASS_IMAGE = 'is-active';
    const ACTIVE_CLASS_TAB = 'em0-2';
    console.log(processImages);

    // for each tab link add an event listener that will scroll to the correct id
    tabLinks.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const clicked = e.target.closest('[cr-split-link]');
        if (!clicked) return;
        // get the DOM element by the text content (scroll-target value)
        const target = clicked.getAttribute('cr-split-link');
        //click the element with an id matching the target
        const el = document.querySelector(`[cr-split-content="${target}"`);
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    });

    // remove all active classes
    processImages.forEach((item) => item.classList.remove(ACTIVE_CLASS_IMAGE));
    //set first item to be active
    processImages[0].classList.add(ACTIVE_CLASS_IMAGE);
    // animate each item
    processItems.forEach((item, index) => {
      const colorMode = item.getAttribute('cr-color-mode');
      const image = processImages[index];
      const tab = processTabs[index];
      const imageTL = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onEnter: () => {
            image.classList.add(ACTIVE_CLASS_IMAGE);
            tab.classList.add(ACTIVE_CLASS_TAB);
            section.setAttribute('section-mode', colorMode);
            navbar.setAttribute('section-mode', colorMode);
          },
          onLeave: () => {
            // don't remove class on leave of the last item
            if (index !== processImages.length - 1) {
              image.classList.remove(ACTIVE_CLASS_IMAGE);
            }
            tab.classList.remove(ACTIVE_CLASS_TAB);
          },
          onEnterBack: () => {
            image.classList.add(ACTIVE_CLASS_IMAGE);
            tab.classList.add(ACTIVE_CLASS_TAB);
            section.setAttribute('section-mode', colorMode);
            navbar.setAttribute('section-mode', colorMode);
          },
          onLeaveBack: () => {
            // don't remove class on leaveback of the first item
            if (index !== 0) {
              image.classList.remove(ACTIVE_CLASS_IMAGE);
            }
            tab.classList.remove(ACTIVE_CLASS_TAB);
          },
        },
      });
    });
    const resetNavbarColor = function () {
      const navbarResetColor = section.getAttribute('[cr-split-navbar-color]');
      if (!navbarResetColor) return;
      navbar.setAttribute('section-mode', navbarResetColor);
    };
    const navbarResetTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        onEnter: () => {},
        onLeave: () => {
          resetNavbarColor();
        },
        onEnterBack: () => {},
        onLeaveBack: () => {
          resetNavbarColor();
        },
      },
    });
  }
  solutionsScroll();
});
