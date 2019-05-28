
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
