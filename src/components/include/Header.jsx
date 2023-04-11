import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import { menuState } from "../../state/commonState";
import SideMenu from "../SideMenu";
import SearchBar from "../SearchBar";

const Header = () => {
  const location = useLocation();

  const [ menu, setMenu ] = useRecoilState(menuState);
  const [ isWorking, setIsWorking ] = useState(false);
  const path_name = location.pathname;

  const handleToggleSideMenu = () => {
    if (!isWorking) {
      setMenu(menu=>!menu);
      setIsWorking(true);
      setTimeout(() => {
        setIsWorking(false)
      },500);
    }
  };

  return(
    <div className="header fixed flex flex_jc_sb flex_ai_c">
      <div className="title">
        <i className="xi-map-o"></i>
      </div>
      {
        path_name === "/kakaomap/" ? 
          <SearchBar/>
        :
        <p>{path_name === "/archive" ? "검색기록" : "사용법"}</p>
      }
      <div className={`${menu !== true ? "" : "active"} bars_btn relative flex cursor_p`} onClick={handleToggleSideMenu}>
        <div className="absolute"></div>
        <div className="absolute"></div>
        <div className="absolute"></div>
      </div>
      <SideMenu/>
    </div>
  )
}

export default Header;