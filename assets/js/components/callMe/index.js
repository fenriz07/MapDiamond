
import Swal from 'sweetalert2'
import formComponent from '../formComponent';
import form from './views/form';
require('jquery.rut');
require('./style.css');

export default class {

   constructor()
   {
        let iconList = document.querySelectorAll('.elementor-icon-list-item.elementor-inline-item'); 

        let callMe   = iconList[2]; 

        callMe.addEventListener('click',this,false);
   }

   handleEvent( evt )
   {
        Swal.fire({
            title: 'Nosotros te llamamos',
            showConfirmButton: false,
            html : form(),
            showCloseButton: true,
        })

        new formComponent()
   }
}