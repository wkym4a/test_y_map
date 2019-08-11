
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "bbbb" ]

  // var map

  // window.onload = function(){
  //    var ymap = new Y.Map("map");
  //    ymap.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);
  // }

  change() {

       $("#aaaa").remove();

    //「最終結果」のラベルを挿入
    $('#bbbb').append(`<input type="button" id="aaaa" value="書き換えました" >`);

    $('#aaaa').click(function() {
          console.log("っっっｂ");
        });

  }




}
