import { useRecoilValue } from "recoil";

import { searchResultState } from "../state/kakaomapState";

const ResultPopup = () => {
  const Result = useRecoilValue(searchResultState);
  return(
    <div className="result_pop fixed">
      <ul>
        {Result.map((item, index) =>
          <li key={index}>{item.place_name}</li>
        )}
      </ul>
    </div>
  )
}

export default ResultPopup;