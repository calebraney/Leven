(()=>{window.Webflow||=[];window.Webflow.push(()=>{console.log("hello webflow"),gsap.registerPlugin(ScrollTrigger),gsap.registerPlugin(Flip),function(){let r=document.querySelector("[navbar-bg]");!r||document.addEventListener("scroll",l=>{window.scrollY!==0&&r.classList.add("is-active"),window.scrollY===0&&r.classList.remove("is-active")})}(),function(){document.querySelectorAll("[work-item]").forEach((l,e)=>{if(!l)return;let d=e%3===0?2:e%3===1?3:4;l.setAttribute("section-mode",d.toString())})}();function g(){let r=document.querySelectorAll("[cr-split-link]"),l=document.querySelectorAll("[cr-split-content]"),e=document.querySelectorAll("[cr-split-image]"),d=document.querySelectorAll("[cr-split-tab]"),a=document.querySelector("[cr-split-wrap]"),m=document.querySelector("[navbar]"),c="is-active",u="em0-2";console.log(e),r.forEach(t=>{t.addEventListener("click",o=>{o.preventDefault();let s=o.target.closest("[cr-split-link]");if(!s)return;let n=s.getAttribute("cr-split-link");document.querySelector(`[cr-split-content="${n}"`).scrollIntoView({behavior:"smooth",block:"center"})})}),e.forEach(t=>t.classList.remove(c)),e[0].classList.add(c),l.forEach((t,o)=>{let s=t.getAttribute("cr-color-mode"),n=e[o],i=d[o],f=gsap.timeline({scrollTrigger:{trigger:t,start:"top center",end:"bottom center",scrub:1,onEnter:()=>{n.classList.add(c),i.classList.add(u),a.setAttribute("section-mode",s),m.setAttribute("section-mode",s)},onLeave:()=>{o!==e.length-1&&n.classList.remove(c),i.classList.remove(u)},onEnterBack:()=>{n.classList.add(c),i.classList.add(u),a.setAttribute("section-mode",s),m.setAttribute("section-mode",s)},onLeaveBack:()=>{o!==0&&n.classList.remove(c),i.classList.remove(u)}}})});let b=function(){let t=a.getAttribute("[cr-split-navbar-color]");!t||m.setAttribute("section-mode",t)},L=gsap.timeline({scrollTrigger:{trigger:a,start:"top center",end:"bottom center",scrub:1,onEnter:()=>{},onLeave:()=>{b()},onEnterBack:()=>{},onLeaveBack:()=>{b()}}})}g()});})();
