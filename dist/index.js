(()=>{window.Webflow||=[];window.Webflow.push(()=>{console.log("hello webflow"),gsap.registerPlugin(ScrollTrigger),gsap.registerPlugin(Flip);let g=function(e,s,t="section-mode",a=["1","2","3","4"]){let o=e.getAttribute(t);a.includes(o)&&s.setAttribute("section-mode",o)};(function(){let e=document.querySelector("[navbar-bg]");!e||document.addEventListener("scroll",s=>{window.scrollY!==0&&e.classList.add("is-active"),window.scrollY===0&&e.classList.remove("is-active")})})(),function(){document.querySelectorAll("[work-item]").forEach((s,t)=>{if(!s)return;let a=t%3===0?2:t%3===1?3:4;s.setAttribute("section-mode",a.toString())})}();function b(){let e=document.querySelectorAll("[cr-split-link]"),s=document.querySelectorAll("[cr-split-content]"),t=document.querySelectorAll("[cr-split-image]"),a=document.querySelectorAll("[cr-split-tab]"),o=document.querySelector("[cr-split-wrap]"),d=document.querySelector("[navbar]"),n="is-active",m="em0-2";console.log(t),e.forEach(l=>{l.addEventListener("click",c=>{c.preventDefault();let r=c.target.closest("[cr-split-link]");if(!r)return;let i=r.getAttribute("cr-split-link");document.querySelector(`[cr-split-content="${i}"`).scrollIntoView({behavior:"smooth",block:"center"})})}),t.forEach(l=>l.classList.remove(n)),t[0].classList.add(n),s.forEach((l,c)=>{let r=l.getAttribute("cr-color-mode"),i=t[c],u=a[c],A=gsap.timeline({scrollTrigger:{trigger:l,start:"top center",end:"bottom center",scrub:1,onEnter:()=>{i.classList.add(n),u.classList.add(m),o.setAttribute("section-mode",r),d.setAttribute("section-mode",r)},onLeave:()=>{c!==t.length-1&&i.classList.remove(n),u.classList.remove(m)},onEnterBack:()=>{i.classList.add(n),u.classList.add(m),o.setAttribute("section-mode",r),d.setAttribute("section-mode",r)},onLeaveBack:()=>{c!==0&&i.classList.remove(n),u.classList.remove(m)}}})});let f=gsap.timeline({scrollTrigger:{trigger:o,start:"top top",end:"bottom center",scrub:1,onEnter:()=>{},onLeave:()=>{console.log("leave"),g(o,d)},onEnterBack:()=>{},onLeaveBack:()=>{console.log("leave back"),g(o,d)}}})}b();let L=function(){}});})();
