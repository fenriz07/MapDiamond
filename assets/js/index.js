import callMe from './components/callMe';


function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  

  
ready( () => {
    new callMe();
})