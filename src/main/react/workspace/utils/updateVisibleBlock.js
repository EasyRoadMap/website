const options = {
  rootMargin: '0px',
  threshold: 0.7
}
export const observeBlocks = (targets) => {
  const observer = new IntersectionObserver(observerCallback, options);
  targets.forEach(t => observer.observe(t))

  function observerCallback (entries, observer) { 
    for (let i = entries.length - 1; i >= 0 ; i--) {
        targets.forEach(t => t.classList.remove('active'))
        entries[i].target.classList.add('active')
    };
  };
}