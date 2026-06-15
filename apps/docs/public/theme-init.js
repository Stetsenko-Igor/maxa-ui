try {
  var t = localStorage.getItem('maxa-theme');
  var d = t || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', d);
  document.documentElement.style.colorScheme = d;
} catch(e) {}
