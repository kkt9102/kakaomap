import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { searchKeywordState, searchResultState, saveKeywordState, resultPopupState } from "../state/kakaomapState";
import { menuState } from "../state/commonState";
import * as Date from "../utils/datetime";

const SearchBar = () => {
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [result, setResult] = useRecoilState(searchResultState);
  const [save, setSave] = useRecoilState(saveKeywordState);
  const [resultPop, setResuultPop] = useRecoilState(resultPopupState);

  const menuBg = useRecoilValue(menuState);
  
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
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      pushKeyword();
    }
  };

  const pushKeyword = () => {
    if (keyword >= 0) {
      alert("검색어가 없어요.")
    } else {
      if (userLat && userLng) {
        const ps = new window.kakao.maps.services.Places();
        const searchOption = {
          location: new window.kakao.maps.LatLng(userLat, userLng),
          radius: 1000,
          size: 15,
          page: 1,
        };
        // SEARCH FUNCTION
        ps.keywordSearch(keyword, palceSearchDB, searchOption);
        function palceSearchDB(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            setSave((oldSave) => {
              const newSave = [...oldSave];
              console.log(Date.nowdate)
              newSave.push({ 
                title: keyword,
                reg_dt: Date.year + "-" + Date.LengthMonth + "-" + Date.LengthDate
                        + " " + Date.LenghtHours + ":" + Date.LengthMin + ":" + Date.LengthSec
              });
              return newSave.slice(-5);
            });

            setResuultPop(true);
            setResult({
              item: data,
              page: pagination
            });
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            return status
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            return status
          }

        };
      }
    }
  };
  
  useEffect(() => {},[result,keyword])

  return (
    <>
      <div className="search_bar relative flex flex_ai_c">
        <input
          type="text"
          placeholder="검색어를 입력해주세요!"
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleEnterKeyPress}
          value={keyword}
        />
        <label htmlFor=""></label>
        <button onClick={pushKeyword}>
          <i className="xi-search"></i>
        </button>
      </div>
      <div className={`${menuBg === true ? "active" : ""} menu_bg fixed`}></div>
    </>
  );
};

export default SearchBar;
