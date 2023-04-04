import { Route, Routes } from "react-router-dom";
import Header from "./components/include/Header";
import Kakaomap from "./utils/Kakaomap";
import SearchArchive from "./pages/SearchArchive";
import Help from "./pages/Help";

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Kakaomap/>}/>
        <Route path="archive" element={<SearchArchive/>}/>
        <Route path="help" element={<Help/>}/>
      </Routes>
    </div>
  );
}

export default App;
