import { useRecoilState } from "recoil";

import { menuState } from "../../state/commonState";
import SideMenu from "../SideMenu";
import { useState } from "react";

const Header = () => {
  const [ menu, setMenu ] = useRecoilState(menuState);
  const [ isWorking, setIsWorking ] = useState(false);

  const handleToggleSideMenu = () => {
    if (!isWorking) {
      setMenu(menu=>!menu);
      setIsWorking(true);
      setTimeout(() => {
        setIsWorking(false)
      },500);
    }
  }

  return(
    <div className="header fixed flex flex_jc_sb flex_ai_c">
      <div className="title">KakaoMap Toy Project</div>
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