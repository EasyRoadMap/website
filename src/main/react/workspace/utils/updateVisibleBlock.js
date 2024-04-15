const options = {
  // rootMargin: "0px 0px " + (-document.documentElement.clientHeight - 200) + "px 0px" ,
  rootMargin: "0px 0px -600px 0px" ,
  threshold: 0
}
export const observeBlocks = (targets) => {
  const observer = new IntersectionObserver(observerCallback, options);
  targets.forEach(t => observer.observe(t));

  function observerCallback (entries, observer) { 
    for (let i = 0; i < entries.length; i++) {
        targets.forEach(t => t.classList.remove('active'));
        entries[i].target.classList.add('active');
    };
  };
}