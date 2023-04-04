const SearchBar = () => {
  return(
    <div className="search_bar flex flex_ai_c">
      <input type="text" placeholder="검색어를 입력해주세요!" />
      <label htmlFor=""></label>
      <button>
        <i className="xi-search"></i>
      </button>
    </div>
  )
}

export default SearchBar;