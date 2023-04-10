import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { menuState } from "../state/commonState";

import MenuItem from "../json/menu.json";

const SideMenu = () => {
  const [menu, setMenu] = useRecoilState(menuState);

  const handleCloseMenu = () => {
    setMenu(false)
  }
  return(
    <div className={`${menu !== true ? "" : "open"} sidemenu fixed `}>
      <ul className="flex flex_dir_c">
        {MenuItem.menu.map((item, index) =>
          <li key={index} className="flex flex_jc_s flex_ai_c flex_basis_100">
            <Link to={item.link} onClick={handleCloseMenu} className="relative flex flex_basis_100">{item.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SideMenu;