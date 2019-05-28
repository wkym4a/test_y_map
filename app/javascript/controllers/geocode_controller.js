// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "address","latitude","longitude" ]

  get_lat_lng() {

    //住所から、緯度経度を求めるジオコーディングのサンプルです。
var address = this.addressTarget.value;
var latitude = this.latitudeTarget
var longitude = this.longitudeTarget;

var request = { query : address };

var geocoder = new Y.GeoCoder();
geocoder.execute( request , function( ydf ) {
    if ( ydf.features.length > 0 ) {

      latitude.value =ydf.features[0]["latlng"]["Lat"];
      longitude.value =ydf.features[0]["latlng"]["Lon"];
        // var latlng = ydf.features[0].latlng;
        // alert(latlng.lat() + "," + latlng.lng());
    }
} );

  }
}
