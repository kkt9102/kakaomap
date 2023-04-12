import React, { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { searchKeywordState, searchResultState } from "../state/kakaomapState";
import currentIcon from "../resource/img/current.svg";
import markerIcon from "../resource/img/marker.svg";

const KakaoMap = () => {
  const [ wid, setWid ] = useState(Number);
  const resizeWindow = () => {
    setWid(window.innerWidth)
  };
  useEffect(() => {
    setWid(window.innerWidth)
      window.addEventListener("resize", resizeWindow)
      return () => {
          window.removeEventListener("resize", resizeWindow)
      };
  },[wid]);
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
  const Result = useRecoilValue(searchResultState);
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
      const imageSrc  = currentIcon,
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
        radius: wid > 768 ? 500 : 300,
        strokeWeight: 1,
        strokeColor: "#6556ff",
        strokeOpacity: 0.2,
        strokeStyle: "solid",
        fillColor: "#6556ff",
        fillOpacity: 0.15,
      });
      circle.setMap(map);
    };
    
  }, [userLat, userLng, options]);



    let infowindow = new window.kakao.maps.InfoWindow({zIndex:1});
    if (Result.item !== null) {
      Result.item.forEach((list, index) => {
        const locPosition = new window.kakao.maps.LatLng(list.y, list.x);
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: locPosition,
          // 마커 아이콘을 설정합니다.
          image: new window.kakao.maps.MarkerImage(markerIcon , new window.kakao.maps.Size(wid > 768 ? (20,20) : (17,17))),
        });
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          displayInfowindow(marker, list.place_name);
        });
        window.kakao.maps.event.addListener(marker, 'mouseout', function() {
          infowindow.close();
        });
      });
    };
    function displayInfowindow(marker, title) {
      let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
      infowindow.setContent(content);
      infowindow.open(map, marker);
    };


  useEffect(() => {

  },[Result.page])
  // SearchResult




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
