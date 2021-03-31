import loadGoogleMapsApi from '../../../lib/GoogleMapApi'

export default (selector = 'Map-Contact',coords,that) => {

  return loadGoogleMapsApi().then(function (google) {

      console.log("Epa");

      const markers = new Array();
      const myLatlng = new google.LatLng(coords.lat, coords.lng);
      const mapOptions = {
        zoom: 7,
        center: myLatlng,
        mapTypeId: google.MapTypeId.TERRAIN,
        //disableDefaultUI: true,
      };

      const map = new google.Map(document.getElementById(selector), mapOptions);

      return {google,map,that}; 

  }).catch(function (error) {
    console.error(error)
  })

}
