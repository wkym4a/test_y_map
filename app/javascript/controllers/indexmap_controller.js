
import { Controller } from "stimulus"

var markers = [];

export default class extends Controller {
  static targets = [ "map","latitude","longitude" ]


  initialize() {

    // // geocoderを初期化
    // this.geocoder = new google.maps.Geocoder()

    this.map = new Y.Map(this.mapTarget.id,{
      configure : {
       scrollWheelZoom : true,
       }
    });

    this.map.drawMap(new Y.LatLng(35.66572, 139.73100), 12, Y.LayerSetId.NORMAL);
    // this.map.drawMap(new Y.LatLng(35.66572, 139.73100), 8);

           var center = new Y.CenterMarkControl
           var control = new Y.LayerSetControl();
           var sliderzoom = new Y.SliderZoomControlVertical();
           var searchcontrol = new Y.SearchControl();
           this.map.addControl(center);
           this.map.addControl(control);
           this.map.addControl(sliderzoom);
           this.map.addControl(searchcontrol);
  }


  // 登録済みの一覧情報を選択すると、その情報の位置に移動する
  move(el) {

    // 押下したボタンが何番目のものなのかを「this.index_num」に保存
    this.index_num = el.target.dataset.actionIndexNum

    // 座標（＝緯度経度）を取得……↑で取得した「this.index_num」に該当するターゲットがtextcontentに持つ値をハッシュで獲得
    var cordinate = this.get_cordinate_from_textcontent;

    var current_location = new Y.LatLng(cordinate["lat"],cordinate["lng"])

        this.map.panTo(current_location, true);
    // this.map.panTo(new Y.LatLng(cordinate["lat"],cordinate["lng"]), true);

    if(markers.length > 0){
      for (var i = 0; i < markers.length; i++) {
    
          this.map.removeFeature(markers[i]);
					// markers[i].setMap(null);
			}
		  	markers = [];	//参照を開放
    }

    var marker = new Y.Marker(current_location);
    this.map.addFeature(marker);


// this.map.addFeature(new Y.LatLng(cordinate["lat"],cordinate["lng"]));

    // this.map.addFeature(current_location);
    // // google.maps.MarkerでGoogleMap上の指定位置にマーカが立つ
    // var marker = new google.maps.Marker({
    //     map: this.map,
    //     position: latlng
    // });
    //


    // // 作成したマーカーを保存
    markers.push(marker);

  }


  // // テキストボックス（to）に入力した値から座標情報を取得し、その座標に移動する
  // move_new(){
  //
  //   var map_set=this.map;//[function]内だと「this.〜」はundefine(定義されていない)になるので、他の変数に移しておく
  //   let inputAddress = this.toTarget.value;
  //   // geocodingしたあとmapを移動
  //   this.geocoder.geocode( { 'address': inputAddress},
  //           function(results, status) {
  //             if (status == 'OK') {
  //
  //             map_set.setCenter(results[0].geometry.location);
  //
  //             // google.maps.MarkerでGoogleMap上の指定位置にマーカが立つ
  //             var marker = new google.maps.Marker({
  //                 map: map_set,
  //                 position: results[0].geometry.location
  //             });
  //
  //             // 作成したマーカーを保存
  //             markers.push(marker);
  //
  //             } else {
  //               alert('Geocode was not successful for the following reason: ' + status);
  //             }
  //           }
  //   );
  // }



    get get_cordinate_from_textcontent(){
       return {lat: this.latitudeTargets[this.index_num].textContent,
                lng: this.longitudeTargets[this.index_num].textContent}
    }
}
