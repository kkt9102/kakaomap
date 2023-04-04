import React, { useState, useEffect, useRef } from "react";
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
  useEffect(() => {
    if (userLat && userLng) {
      const options = {
        center: new window.kakao.maps.LatLng(userLat, userLng),
        level: 4,
      };
      const map = new window.kakao.maps.Map(container.current, options);
      map.setMinLevel(3);
      map.setMaxLevel(8);
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
        radius: 300,
        strokeWeight: 1,
        strokeColor: "#6556ff",
        strokeOpacity: 0.2,
        strokeStyle: "solid",
        fillColor: "#6556ff",
        fillOpacity: 0.05,
      });
      circle.setMap(map);
    }  
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
    <div id="map" ref={container}></div>
  );
};

export default KakaoMap;
