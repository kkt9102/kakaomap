import { atom } from "recoil";

const kakaomapOptionState = atom({
  key: "options",
  default: {
    size: 4
  }
});

const searchKeywordState = atom({
  key: "keyword",
  default: ""
});

const saveKeywordState = atom({
  key: "savekeyword",
  default: [
    {
      title:"",
    },
    {
      title:"",
    },
    {
      title:"",
    },
    {
      title:"",
    },
    {
      title:"",
    }
  ]
});

const searchResultState = atom({
  key: "result",
  default: null
});

export { 
  kakaomapOptionState,
  searchKeywordState,
  saveKeywordState,
  searchResultState
};