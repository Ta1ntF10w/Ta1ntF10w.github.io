const sitePreference=document.documentElement.getAttribute("data-default-appearance"),userPreference=localStorage.getItem("appearance");(sitePreference==="dark"&&userPreference===null||userPreference==="dark")&&document.documentElement.classList.add("dark"),document.documentElement.getAttribute("data-auto-appearance")==="true"&&(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&userPreference!=="light"&&document.documentElement.classList.add("dark"),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{e.matches?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}));var updateMeta,updateLogo,getTargetAppearance,updateMermaidTheme=()=>{if(typeof mermaid!="undefined"){const e=document.documentElement.classList.contains("dark"),t=document.querySelectorAll("pre.mermaid");t.forEach(e=>{e.getAttribute("data-processed")?(e.removeAttribute("data-processed"),e.innerHTML=e.getAttribute("data-graph")):e.setAttribute("data-graph",e.textContent)}),e?(initMermaidDark(),mermaid.run()):(initMermaidLight(),mermaid.run())}};window.addEventListener("DOMContentLoaded",e=>{const t=document.getElementById("appearance-switcher"),n=document.getElementById("appearance-switcher-mobile");updateMeta(),this.updateLogo?.(getTargetAppearance()),updateMermaidTheme(),t&&(t.addEventListener("click",()=>{document.documentElement.classList.toggle("dark");var e=getTargetAppearance();localStorage.setItem("appearance",e),updateMeta(),updateMermaidTheme(),this.updateLogo?.(e)}),t.addEventListener("contextmenu",e=>{e.preventDefault(),localStorage.removeItem("appearance")})),n&&(n.addEventListener("click",()=>{document.documentElement.classList.toggle("dark");var e=getTargetAppearance();localStorage.setItem("appearance",e),updateMeta(),updateMermaidTheme(),this.updateLogo?.(e)}),n.addEventListener("contextmenu",e=>{e.preventDefault(),localStorage.removeItem("appearance")}))}),updateMeta=()=>{var e=document.querySelector("body"),t=getComputedStyle(e);document.querySelector('meta[name="theme-color"]').setAttribute("content",t.backgroundColor)},updateLogo=e=>{var t=document.querySelectorAll("img.logo"),n=document.querySelectorAll("span.logo");targetLogoPath=e=="light"?"/img/taint-mark.svg":"/img/doraemon-mark.svg";for(const e of t)e.setAttribute("src",targetLogoPath);targetContent=e=="light"?`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Ta1ntF10w logo">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4d8ac5"/>
      <stop offset="100%" stop-color="#2f5f90"/>
    </linearGradient>
  </defs>
  <rect x="8" y="8" width="112" height="112" rx="24" fill="url(#g)"/>
  <path d="M31 36h66v12H70v44H58V48H31z" fill="#eef6ff"/>
  <circle cx="96" cy="96" r="8" fill="#d7ebff" opacity="0.85"/>
</svg>
`:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-label="Doraemon mark">
  <circle cx="64" cy="64" r="58" fill="#2f98ff"/>
  <circle cx="64" cy="70" r="45" fill="#ffffff"/>
  <ellipse cx="50" cy="50" rx="11" ry="14" fill="#ffffff"/>
  <ellipse cx="78" cy="50" rx="11" ry="14" fill="#ffffff"/>
  <circle cx="54" cy="54" r="4" fill="#1f2a3a"/>
  <circle cx="74" cy="54" r="4" fill="#1f2a3a"/>
  <circle cx="64" cy="66" r="8" fill="#ff4757"/>
  <rect x="63" y="74" width="2" height="18" fill="#1f2a3a"/>
  <path d="M38 82c9 10 20 15 26 15s17-5 26-15" stroke="#1f2a3a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M26 66h28M26 74h26M74 66h28M76 74h26" stroke="#1f2a3a" stroke-width="3" stroke-linecap="round"/>
  <path d="M30 36c9-14 21-22 34-22s25 8 34 22" stroke="#1f2a3a" stroke-opacity="0.2" stroke-width="4" fill="none"/>
</svg>
`;for(const e of n)e.innerHTML=targetContent},getTargetAppearance=()=>document.documentElement.classList.contains("dark")?"dark":"light",window.addEventListener("DOMContentLoaded",e=>{const t=document.getElementById("top-scroller"),n=document.getElementById("site-footer");t&&n&&t.getBoundingClientRect().top>n.getBoundingClientRect().top&&(t.hidden=!0)})