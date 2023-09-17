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

  // 마커 객체들을 저장할 배열
  const markers = useRef([]);

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
  const Result = useRecoilValue(searchResultState);
  const pageNum = Result.page?.current
  console.log(Result)

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

      // 마커 배열에 추가
      markers.current.push(marker);
    }

  }, [userLat, userLng, wid, container]);

  useEffect(() => {
    if (Result.item !== null) {
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      // 이전 마커 제거
      markers.current.forEach((marker) => {
        marker.setMap(null);
      });

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

        markers.current.push(marker);

        window.kakao.maps.event.addListener(marker, "click", function () {
          displayInfowindow(marker, list.place_name);
          infowindow.open(map, marker);
        });
      });

      function displayInfowindow(marker, title) {
        const content = '<div class="info_window" style="white-space:nowrap">' + title + "</div>";
        infowindow.setContent(content);
        infowindow.open(map, marker);
      }
    }
    
  }, [Result, map, wid, keyword, pageNum]);

  return (
    <>
      <div id="map" ref={container}></div>
    </>
  );
};

export default KakaoMap;
