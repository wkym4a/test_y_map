
import { Controller } from "stimulus"

var markers = [];

export default class extends Controller {
  static targets = [ "map","latitude","longitude","maps_data","maps_data2" ]


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

//20190730add_経路表示②
//経路探索レイヤーを生成・追加します。
   var route = new Y.RouteSearchLayer();
   this.map.addLayer(route);
   //経路探索を実行します。
   var latlngs = [
           new Y.LatLng(35.6617797	,139.7040531),  //東京駅
           new Y.LatLng(34.681075	,135.5097871),  //東京ミッドタウン
           new Y.LatLng(34.81075	,135.5097871),  //東京ミッドタウン
           new Y.LatLng(35.69073464614311, 139.6998272943479)   //新宿駅
       ];
   route.execute( latlngs, {"useCar": false });

   //addadd
      var route2 = new Y.RouteSearchLayer();
      this.map.addLayer(route2);
   var latlngs2 = [
           new Y.LatLng(43.76271340662406	,142.3831682739259),  //東京駅
           new Y.LatLng(43.06040960783925	,141.4537935791017),  //東京ミッドタウン
           new Y.LatLng(42.72234951079091, 141.6889696655275),  //東京ミッドタウン
           new Y.LatLng(42.69073464614311, 141.6998272943479)   //新宿駅
       ];
   route2.execute( latlngs2, {"useCar": false });

//20190730add_経路表示②

          //  //20190730add_経路表示①
          //  var configs = {
          //       "latlngs": [
          //           new Y.LatLng(35.68156404067264,139.76721008431142),  //東京駅
          //           new Y.LatLng(35.6657214,139.7310058),  //東京ミッドタウン
          //           new Y.LatLng(35.69073464614311,139.6998272943479)   //新宿駅
          //       ]
          //   };
          //
          //      //経路探索プラグインを生成します。
          //      var plugin = new Y.RouteSearchPlugin(configs);
          //      //Mapオブジェクトにプラグインを追加します。
          //      this.map.addPlugin(plugin);
          // //20190730add_経路表示①

           this.pin_data = JSON.parse(this.maps_dataTarget.value)

           //20190730add_線を引くため
           var line_style = new Y.Style("0000FF", 1.6, 0.8);
           var line_latlngs = []
           //20190730add_線を引くため

           if(this.pin_data.length > 0){
             for (var i = 0; i < this.pin_data.length; i++) {

              var current_location = new Y.LatLng(this.pin_data[i].latitude,this.pin_data[i].longitude);

              // タイトルを付けるように変更
              var marker = new Y.Marker(current_location,{title: this.pin_data[i].name});
              // var marker = new Y.Marker(current_location);

              //クリックすると詳細を表示
marker.bindInfoWindow(this.pin_data[i].address);

              this.map.addFeature(marker);

               // // 作成したマーカーを保存
               markers.push(marker);

               //20190730add_線を引くため
               line_latlngs.push(new Y.LatLng(this.pin_data[i].latitude,this.pin_data[i].longitude))
               //20190730add_線を引くため

       			}


           //20190730add_線を引くため
            var polyline = new Y.Polyline(line_latlngs, {strokeStyle: line_style});this.map.addFeature(polyline);
           //20190730add_線を引くため

           }

//↓作成したマーカーをまとめる（Yahoo! Map Cluster

new YmapCluster(this.map, markers);
//↑作成したマーカーをまとめる（Yahoo! Map Cluster



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

    // if(markers.length > 0){
    //   for (var i = 0; i < markers.length; i++) {
    //
    //       this.map.removeFeature(markers[i]);
		// 			// markers[i].setMap(null);
		// 	}
		//   	markers = [];	//参照を開放
    // }
    //
    // var marker = new Y.Marker(current_location);
    // this.map.addFeature(marker);


// this.map.addFeature(new Y.LatLng(cordinate["lat"],cordinate["lng"]));

    // this.map.addFeature(current_location);
    // // google.maps.MarkerでGoogleMap上の指定位置にマーカが立つ
    // var marker = new google.maps.Marker({
    //     map: this.map,
    //     position: latlng
    // });
    //


    // // // 作成したマーカーを保存
    // markers.push(marker);

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
