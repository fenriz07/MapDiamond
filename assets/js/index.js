import React from 'react';
import ReactDOM from 'react-dom'
import Locations from './components/Locations';


function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  

  
ready( () => {


  let mapdiamond = document.getElementById('map-diamond');


  if( mapdiamond ){
    ReactDOM.render(<Locations/>,mapdiamond);
  }


})