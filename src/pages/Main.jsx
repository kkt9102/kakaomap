import { useRecoilValue } from "recoil";

import { resultPopupState } from "../state/kakaomapState";

import KakaoMap from "../utils/Kakaomap";
import ResultPopup from "../components/ResultPopup";

const Main = () => {
  const ResultPop = useRecoilValue(resultPopupState);
  return (
    <>
      <KakaoMap />
      {ResultPop !== false ? <ResultPopup /> : null}
    </>
  );
};

export default Main;
