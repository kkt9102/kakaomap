import { useRecoilValue } from "recoil";

import { menuState } from "../state/commonState";

import MenuItem from "../json/menu.json";

const SideMenu = () => {
  const menu = useRecoilValue(menuState);

  console.log(MenuItem.menu)
  return(
    <div className={`${menu !== true ? "" : "open"} sidemenu fixed `}>
      <ul className="flex flex_dir_c">
        {MenuItem.menu.map((item, index) =>
          <li key={index}>{item.title}</li>
        )}
      </ul>
    </div>
  )
}

export default SideMenu;