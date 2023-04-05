import { useRecoilValue } from "recoil";

import { searchResultState } from "../state/kakaomapState";

import KakaoMap from "../utils/Kakaomap";
import ResultPopup from "../components/ResultPopup";

const Main = () => {
  const Result = useRecoilValue(searchResultState);
  return(
    <>
      <KakaoMap/>
      {Result !== null ?
        <ResultPopup/>
        :
        null
      }
    </>
  )
}

export default Main;