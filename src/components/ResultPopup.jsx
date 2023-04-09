import { useRecoilValue, useRecoilState } from "recoil";

import { searchResultState, resultPopupState } from "../state/kakaomapState";

const ResultPopup = () => {
  const [resultPop, setResuultPop] = useRecoilState(resultPopupState);
  const Result = useRecoilValue(searchResultState);
  console.log(Result)

  const handleClosePopup = () => {
    setResuultPop(false)
  }
  return(
    <div className="result_pop fixed">
      <div className="close_btn cursor_p" onClick={handleClosePopup}>
        <i className="xi-close"></i>
      </div>
      <ul>
        {Result.map((item, index) =>
          <li key={index}>
            <div className="place_name flex flex_jc_s flex_ai_c">
              <div>{item.place_name}</div>
            </div>
            <div className="place_addr flex flex_jc_s flex_ai_c">
              <i className="xi-home-o"></i>
              <div>{item.road_address_name}</div>
            </div>
            <div className="place_tel flex flex_jc_s flex_ai_c">
              <i className="xi-call"></i>
              <div>{item.phone}</div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default ResultPopup;