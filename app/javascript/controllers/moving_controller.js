
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "map" ]

  // var map

  // window.onload = function(){
  //    var ymap = new Y.Map("map");
  //    ymap.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);
  // }

  initialize() {

       this.map = new Y.Map(this.mapTarget.id);
       this.map.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);

       var center = new Y.CenterMarkControl
       var control = new Y.LayerSetControl();
       this.map.addControl(center);
       this.map.addControl(control);
     // var ymap = new Y.Map(this.mapTarget.id);
     // ymap.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);

      // var style = new Y.Style("00ff00", 8, 0.5);
      // var latlngs = [
      //    new Y.LatLng(35.650876676313125,139.72215675687852),
      //    new Y.LatLng(35.65078295694602,139.72216212129663),
      //    new Y.LatLng(35.650713212229476,139.72212188816138),
      //    new Y.LatLng(35.65043205322328,139.72116165733408),
      //    new Y.LatLng(35.64999832537358,139.72135209417374)
      // ];
      // var polyline = new Y.Polyline(latlngs, {strokeStyle: style});
      // this.map.addFeature(polyline);

  }

  tokyo() {
    this.map.panTo(new Y.LatLng(35.680865,139.767036), true);
  }

  sinbasi() {
    this.map.panTo(new Y.LatLng(35.666397,139.758153), true);
  }

  sinagawa() {
    this.map.panTo(new Y.LatLng(35.629867,139.74015), true);
  }


}
