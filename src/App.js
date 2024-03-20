import { Route, Routes } from "react-router-dom";
import Header from "./components/include/Header";
import Main from "./pages/Main";
import SearchArchive from "./pages/SearchArchive";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="kakaomap" element={<Main />} />
        <Route path="archive" element={<SearchArchive />} />
      </Routes>
    </div>
  );
};

export default App;
