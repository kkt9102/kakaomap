import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { searchResultState, resultPopupState } from "../state/kakaomapState";

const ResultPopup = () => {
  const [resultPop, setResuultPop] = useRecoilState(resultPopupState);
  const Result = useRecoilValue(searchResultState);
  console.log(Result)

  const handleClosePopup = () => {
    setResuultPop(false);
  }

  const handleFocusMarker = (e) => {
    
  }
  function handlePaginationClick(page) {
    // 페이지 번호를 클릭하면 이 함수가 호출되어 해당 페이지로 이동
  }
  function displayPagination(pagination) {
    var paginationEl = document.getElementById("pagination"),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  // pagination UI를 업데이트
  useEffect(() => {
    if (Result.page) {
      displayPagination(Result.page);
    }
  },[Result.page]);

  return(
    <div className="result_pop fixed">
      <div className="close_btn cursor_p" onClick={handleClosePopup}>
        <i className="xi-close"></i>
      </div>
      <ul>
        {Result.item.map((item, index) =>
          <li key={index}>
            <div className="place_name flex flex_jc_s flex_ai_c">
              <div>{item.place_name}</div>
            </div>
            <div className="place_addr flex flex_jc_s flex_ai_c">
              <i className="xi-home-o"></i>
              <div>{item.road_address_name}</div>
            </div>
            {item.phone.length !== 0 ? 
            <div className="place_tel flex flex_jc_s flex_ai_c">
              <i className="xi-call"></i>
              <div>{item.phone}</div>
            </div>
            :
            null
            }
          </li>
        )}
      </ul>
      <div id="pagination" className="flex flex_jc_c flex_ai_c"></div>
    </div>
  )
}

export default ResultPopup;