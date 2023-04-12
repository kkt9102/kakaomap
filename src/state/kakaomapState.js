import { atom, selector  } from "recoil";

const searchKeywordState = atom({
  key: "keyword",
  default: ""
});

const saveKeywordState = atom({
  key: "savekeyword",
  default: []
});

const searchResultState = atom({
  key: "result",
  default: {
    item: null,
    page: 1
  }
});

const resultPopupState = atom({
  key: "popup",
  default: false
})

export { 
  searchKeywordState,
  saveKeywordState,
  searchResultState,
  resultPopupState
};