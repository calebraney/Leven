import { attr } from './utilities';
import { transferColorMode } from './utilities';

// Webflow is initialized
window.Webflow ||= [];
window.Webflow.push(() => {
  // global selectors
  const navbar = document.querySelector('[navbar]');
  const pageWrap = document.querySelector('.page_wrap');

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Flip);
  let mm = gsap.matchMedia();

  const moveNavbarBg = function () {
    const navbarBg = document.querySelector('[navbar-bg]');
    if (!navbarBg || !pageWrap) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pageWrap,
        start: 'top top',
        end: '1px top',
        scrub: 0.2,
        onEnter: () => {
          navbarBg.classList.remove('is-active');
        },
        onEnterBack: () => {
          navbarBg.classList.remove('is-active');
        },
        onLeave: () => {
          navbarBg.classList.add('is-active');
        },
      },
    });
  };

  const matchSectionNavColor = function (isMobile) {
    const sections = gsap.utils.toArray(':is(section, footer, [update-nav-mode])');
    let MatchColors = attr(true, navbar.getAttribute('match-section-color'));
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
    const workItems = gsap.utils.toArray('[work-item="preview"]');
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

  const clearFiltersOnClick = function () {
    const ACTIVE_CLASS = 'em0-2';
    const clearBtn = document.querySelector('[fs-cmsfilter-element="clear"]');
    const form = document.querySelector('[fs-cmsfilter-element="filters"]');
    if (!clearBtn || !form) return;
    const filters = form.querySelectorAll('[class*="em0-1"]');
    clearBtn.addEventListener('click', (e) => {
      filters.forEach((item) => {
        if (!item || !item.classList.contains(ACTIVE_CLASS)) return;
        item.classList.remove(ACTIVE_CLASS);
      });
    });
  };

  const solutionsScroll = function () {
    const tabLinks = gsap.utils.toArray('[cr-split-link]');
    const processItems = gsap.utils.toArray('[cr-split-content]');
    const processImages = gsap.utils.toArray('[cr-split-image]');
    const processTabs = gsap.utils.toArray('[cr-split-tab]');
    const section = document.querySelector('[cr-split-wrap]');
    const ACTIVE_CLASS_IMAGE = 'is-active';
    const ACTIVE_CLASS_TAB = 'em0-2';
    // for each tab link add an event listener that will scroll to the correct id
    if (tabLinks.length === 0 || processItems.length === 0 || processImages.length === 0) return;
    tabLinks.forEach((button) => {
      if (!button) return;
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
      if (!item || !image || !tab) return;
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
  };

  const cursor = function () {
    // select the items
    const cursorWrap = document.querySelector('[cursor="component"]');
    const cursorInner = document.querySelector('[cursor="inner"]');
    const cursorDot = document.querySelector('[cursor="dot"]');
    const HOVER_CLASS = 'is-hover';

    // return if items are null
    if (!cursorWrap || !cursorInner) return;

    const cursorHover = function () {
      // get all links without a no-hover attribute and any other elements with a hover attribute into an array
      const hoverElements = gsap.utils.toArray(
        '[cursor="hover"], :is(a, button):not([cursor="no-hover"])'
      );
      hoverElements.forEach((item) => {
        if (!item || !cursorDot) return;
        item.addEventListener('mouseover', function (e) {
          cursorDot.classList.add(HOVER_CLASS);
        });
        item.addEventListener('mouseleave', function (e) {
          cursorDot.classList.remove(HOVER_CLASS);
        });
      });
    };
    cursorHover();
    const cursorClick = function () {
      if (!cursorDot) return;
      document.addEventListener('click', function (e) {
        let tl = gsap.timeline({});
        tl.fromTo(cursorDot, { rotateZ: -45 }, { rotateZ: 45, ease: 'power1.out', duration: 0.3 });
      });
    };
    cursorClick();

    //handle cursor movement
    const cursorMove = function () {
      // object that stores the value of the progress so it can be animated
      let progressObject = { x: 0, y: 0 };

      // Create X timeline
      let cursorXTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      cursorXTimeline.fromTo(cursorInner, { x: '-50vw' }, { x: '50vw' });
      // Create Y Timeline
      let cursorYTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      cursorYTimeline.fromTo(cursorInner, { y: '-50vh' }, { y: '50vh' });

      // Function to update timeline progress based on an inputted value
      function setTimelineProgress(xValue, yValue) {
        // animate the timeline progress value and keep the timeline in sync onUpdate
        gsap.to(progressObject, {
          x: xValue,
          y: yValue,
          ease: 'none',
          duration: 0,
          onUpdate: () => {
            cursorXTimeline.progress(progressObject.x);
            cursorYTimeline.progress(progressObject.y);
          },
        });
        // an alternate option if you want the timeline progress to jump immediately without easing (will be choppier)
        // tl.progress(progressValue)
      }

      // Mouse events
      document.addEventListener('mousemove', function (e) {
        // getting the horizontal and vertical positions of the mouse and dividing it by the total screen width
        let mousePercentX = e.clientX / window.innerWidth;
        let mousePercentY = e.clientY / window.innerHeight;
        // call function to animate the timeline progress
        setTimelineProgress(mousePercentX, mousePercentY);
      });
    };
    cursorMove();
  };

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
      clearFiltersOnClick();
      let { isMobile, isTablet, isDesktop, reduceMotion } = context.conditions;
      updateProjectColors();
      moveNavbarBg();
      matchSectionNavColor(isMobile);
      solutionsScroll();
      //Run if reduce motion is off
      if (!reduceMotion) {
      }
      if (isDesktop || isTablet) {
        cursor();
      }
    }
  );
  // };
  // gsapInit();
});
