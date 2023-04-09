import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import { searchKeywordState, searchResultState, saveKeywordState, resultPopupState } from "../state/kakaomapState";

const SearchBar = () => {
  const [keyword, setKeyword] = useRecoilState(searchKeywordState);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [result, setResult] = useRecoilState(searchResultState);
  const [save, setSave] = useRecoilState(saveKeywordState);
  const [resultPop, setResuultPop] = useRecoilState(resultPopupState);

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
    if (userLat && userLng) {
      const ps = new window.kakao.maps.services.Places();
      const searchOption = {
        location: new window.kakao.maps.LatLng(userLat, userLng),
        radius: 1000,
        size: 15,
        page: 45,
      };
      ps.keywordSearch(keyword, palceSearchDB, searchOption);
      function palceSearchDB(data, status, _pagination) {
        if (status === window.kakao.maps.services.Status.OK) {
          setSave((oldSave) => {
            const newSave = [...oldSave];
            newSave.push({ title: keyword });
            return newSave.slice(-5);
          });
          console.log(_pagination)
          setResuultPop(true);
          return setResult(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          return status
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          return status
        }
      };
     
    }
  };
  
  

  return (
    <div className="search_bar flex flex_ai_c">
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
  );
};

export default SearchBar;
