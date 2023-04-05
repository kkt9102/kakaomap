import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { searchKeywordState, searchResultState } from "../state/kakaomapState";
import imageAdd from "../resource/img/logo512.png";

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const container = useRef(null);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  const [options, setOptions] = useState({
    center: new window.kakao.maps.LatLng(userLat, userLng),
    level: 4,
  });
  // getKeyword
  const keywordString = useRecoilValue(searchKeywordState);
  // search result
  const [ result, setResult ] = useRecoilState(searchResultState);
  useEffect(() => {
    if (userLat && userLng) {
      const options = {
        center: new window.kakao.maps.LatLng(userLat, userLng),
        level: 4,
      };
      const map = new window.kakao.maps.Map(container.current, options);
      // window.kakao.maps.event.addListener(map, 'zoom_changed', function() {
      //   const getSize = map.getLevel();
      //   setAtomValue({
      //     size:getSize
      //   })
      // });
      map.setMinLevel(3);
      map.setMaxLevel(7);
      setMap(map);

      const locPosition = new window.kakao.maps.LatLng(userLat, userLng);
      
      // User Position Marker
      const imageSrc  = imageAdd,
            imageSize = new window.kakao.maps.Size(20,20),
            imageOption = {offset: new window.kakao.maps.Point(0, 0)};
      const customMarker = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      
      const marker = new window.kakao.maps.Marker({
        map: map,
        image: customMarker,
        position: locPosition,
      });

      // User Position Range
      let circle = new window.kakao.maps.Circle({
        center: locPosition,
        radius: 500,
        strokeWeight: 1,
        strokeColor: "#6556ff",
        strokeOpacity: 0.2,
        strokeStyle: "solid",
        fillColor: "#6556ff",
        fillOpacity: 0.05,
      });
      circle.setMap(map);
    };

    // const ps = new window.kakao.maps.services.Places();
    // const searchOption = {
    //   location: new window.kakao.maps.LatLng(userLat, userLng),
    //   radius: 1000,
    //   size: 15,
    //   page: 45,
    // };
    // ps.keywordSearch(keywordString, palceSearchDB, searchOption);
    // console.log(keywordString)
    // // keywordString
    // function palceSearchDB(data, status, _pagination) {
    //   if (status === window.kakao.maps.services.Status.OK) {
    //     // 정상적으로 검색이 완료됐으면
    //     // 검색 목록과 마커를 표출합니다
    //     // displayPlacesOnSidebar(data);
    //     // 페이지 번호를 표출합니다
    //     // displayPagination(_pagination);
    //     setResult(data);
    //   } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
    //     console.log(status)
    //     return;
    //   } else if (status === window.kakao.maps.services.Status.ERROR) {
    //     return;
    //   }
    // };
  }, [userLat, userLng, options]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat,lng);
        setUserLat(lat);
        setUserLng(lng);
      });
    } else {
      alert("위치 정보를 사용할 수 없습니다.");
    };
  }, []);

  return(
    <>
      <div id="map" ref={container}></div>
    </>
  );
};

export default KakaoMap;
