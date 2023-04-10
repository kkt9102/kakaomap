import { useRecoilValue } from "recoil";

import { searchKeywordState, saveKeywordState } from "../state/kakaomapState";

const SearchArchive = () => {
  const keywordArchive = useRecoilValue(saveKeywordState);
  console.log(keywordArchive);
  return(
    <div className="archive_section">
      <div className="title flex flex_jc_c">검색한 키워드</div>
      <div className="list">
        <ul>
          {
            keywordArchive.length !== 0 ?
            keywordArchive.map((item, index) =>
              <li key={index} className="mar_top_20">
                <div className="title">{item.title}</div>
                <div>{item.reg_dt}</div>
              </li>
            ).reverse()
            :
            <li>
              <div className="title">검색한 기록이 없습니다.</div>
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default SearchArchive;