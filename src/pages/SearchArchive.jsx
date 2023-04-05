import { useRecoilValue } from "recoil";

import { searchKeywordState, saveKeywordState } from "../state/kakaomapState";

const SearchArchive = () => {
  const keywordArchive = useRecoilValue(saveKeywordState);
  console.log(keywordArchive);
  return(
    <div className="archive_section">
      <div className="title"></div>
      <div>
        <ul>
          {
            keywordArchive.length === 0 ?
            <li>검색한 기록이 없어요!</li>
            :
            keywordArchive.map((item, index) =>
              <li key={index}>{item}</li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default SearchArchive;