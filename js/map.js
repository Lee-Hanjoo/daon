document.addEventListener("DOMContentLoaded", () => {
    // KAKAO MAP
    const kakaoLoad = document.createElement("script");
    kakaoLoad.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=968c94e07185af1f9c1b59c3f1b85383"
    document.head.appendChild(kakaoLoad);

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div

    kakaoLoad.onload = () =>{
        kakao.maps.load(()=>{
            if(mapContainer){ 
                let mapOption = { 
                    center: new kakao.maps.LatLng(37.83117086809958, 127.46889840605908), // 지도의 중심좌표
                    level: 1 // 지도의 확대 레벨
                };

                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 마커가 표시될 위치입니다 
                var markerPosition  = new kakao.maps.LatLng(37.83117086809958, 127.46889840605908); 

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: markerPosition
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);

                var iwContent = '<div style="padding:10px; margin-left:30px; font-weight:700; color:#111">다온펜션</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwPosition = new kakao.maps.LatLng(37.83117086809958, 127.46889840605908); //인포윈도우 표시 위치입니다

                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    position : iwPosition, 
                    content : iwContent 
                });
    
                // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
                infowindow.open(map, marker); 
            }
        })
    }

})