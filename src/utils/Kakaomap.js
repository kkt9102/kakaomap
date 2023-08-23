import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { searchKeywordState, searchResultState } from "../state/kakaomapState";
import currentIcon from "../resource/img/current.svg";
import markerIcon from "../resource/img/marker.svg";

const KakaoMap = () => {
  const [wid, setWid] = useState(window.innerWidth);
  const keyword = useRecoilValue(searchKeywordState)
  
  const resizeWindow = () => {
    setWid(window.innerWidth);
  };
  
  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  const [map, setMap] = useState(null);
  const container = useRef(null);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLat(lat);
        setUserLng(lng);
      });
    } else {
      alert("위치 정보를 사용할 수 없습니다.");
    }
  }, []);

  useEffect(() => {
    if (userLat !== null && userLng !== null) {
      const options = {
        center: new window.kakao.maps.LatLng(userLat, userLng),
        level: 4,
      };
      const map = new window.kakao.maps.Map(container.current, options);
      map.setMinLevel(3);
      map.setMaxLevel(7);
      setMap(map);

      const locPosition = new window.kakao.maps.LatLng(userLat, userLng);

      // User Position Marker
      const imageSrc = currentIcon,
        imageSize = new window.kakao.maps.Size(20, 20),
        imageOption = { offset: new window.kakao.maps.Point(0, 0) };
      const customMarker = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

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
    }
  }, [userLat, userLng, wid]);

  const Result = useRecoilValue(searchResultState);

  useEffect(() => {
    if (Result.item !== null) {
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      Result.item.forEach((list, index) => {
        const locPosition = new window.kakao.maps.LatLng(list.y, list.x);
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: locPosition,
          image: new window.kakao.maps.MarkerImage(
            markerIcon,
            new window.kakao.maps.Size(wid > 768 ? 20 : 17, wid > 768 ? 20 : 17)
          ),
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          displayInfowindow(marker, list.place_name);
          infowindow.open(map, marker);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });
      });

      function displayInfowindow(marker, title) {
        const content = '<div style="padding:5px;z-index:1;" class="test">' + title + "</div>";
        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      // function removeMarker(marker) {
      //   for ( let i = 0; i < marker.length; i++ ) {
      //     marker[i].setMap(null);
      //   }   
      //   marker = [];
      // }
      // if (Result.length > 1) {
      //   removeMarker()
      // }
    }
  }, [Result, map, wid, keyword]);

  return (
    <>
      <div id="map" ref={container}></div>
    </>
  );
};

export default KakaoMap;
