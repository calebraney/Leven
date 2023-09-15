import { attr } from './utilities';
import { transferColorMode } from './utilities';

// Webflow is initialized
window.Webflow ||= [];
window.Webflow.push(() => {
  // global selectors
  const navbar = document.querySelector('[navbar]');
  const pageWrap = document.querySelector('.page_wrap');

  // Run code once webflow is initialized
  console.log('hello webflow');

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Flip);
  let mm = gsap.matchMedia();

  const moveNavbarBg = function () {
    const navbarBg = document.querySelector('[navbar-bg]');
    if (!navbarBg) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pageWrap,
        start: 'top top',
        end: '1px top',
        scrub: 0.2,
        onEnter: () => {
          navbarBg.classList.remove('is-active');
        },
        onLeave: () => {
          navbarBg.classList.add('is-active');
        },
      },
    });
  };

  const matchSectionNavColor = function (isMobile) {
    const sections = document.querySelectorAll(':is(section, [update-nav-mode])');
    let MatchColors = attr(true, navbar.getAttribute('match-section-color'));
    console.log(MatchColors);
    if (!MatchColors) return;
    sections.forEach((section) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: isMobile ? 'top 5rem' : 'top 4.5rem',
          end: isMobile ? 'bottom 5rem' : 'bottom 4.5rem',
          scrub: 0.2,
          onEnter: () => {
            transferColorMode(section, navbar);
          },
          onEnterBack: () => {
            transferColorMode(section, navbar);
          },
        },
      });
    });
  };

  const updateProjectColors = function () {
    // Get all div elements with the attribute 'work-item'
    const workItems = document.querySelectorAll('[work-item="preview"]');
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

  function solutionsScroll() {
    const tabLinks = document.querySelectorAll('[cr-split-link]');
    const processItems = document.querySelectorAll('[cr-split-content]');
    const processImages = document.querySelectorAll('[cr-split-image]');
    const processTabs = document.querySelectorAll('[cr-split-tab]');
    const section = document.querySelector('[cr-split-wrap]');
    const ACTIVE_CLASS_IMAGE = 'is-active';
    const ACTIVE_CLASS_TAB = 'em0-2';
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
            transferColorMode(item, section, 'cr-color-mode');
            transferColorMode(item, navbar, 'cr-color-mode');
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
            transferColorMode(item, section, 'cr-color-mode');
            transferColorMode(item, navbar, 'cr-color-mode');
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
    // set navbar to match each item
    // const navbarResetTL = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: section,
    //     start: 'top top',
    //     end: 'bottom center',
    //     scrub: 1,
    //     onLeave: () => {
    //       transferColorMode(section, navbar, 'cr-split-navbar-color');
    //     },
    //     onLeaveBack: () => {
    //       transferColorMode(section, navbar, 'cr-split-navbar-color');
    //     },
    //   },
    // });
  }

  // const gsapInit = function () {
  mm.add(
    {
      //This is the conditions object
      isMobile: '(max-width: 767px)',
      isTablet: '(min-width: 768px)  and (max-width: 991px)',
      isDesktop: '(min-width: 992px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      let { isMobile, isTablet, isDesktop, reduceMotion } = context.conditions;
      updateProjectColors();
      moveNavbarBg();
      matchSectionNavColor(isMobile);
      solutionsScroll();
      //Run if reduce motion is off
      if (!reduceMotion) {
      }
    }
  );
  // };
  // gsapInit();
});
