import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { menuState } from "../state/commonState";

import MenuItem from "../json/menu.json";

const SideMenu = () => {
  const menu = useRecoilValue(menuState);

  return(
    <div className={`${menu !== true ? "" : "open"} sidemenu fixed `}>
      <ul className="flex flex_dir_c">
        {MenuItem.menu.map((item, index) =>
          <li key={index} className="flex flex_jc_s flex_ai_c flex_basis_100">
            <Link to={item.link} className="relative flex flex_basis_100">{item.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SideMenu;