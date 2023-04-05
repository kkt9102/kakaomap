import { Route, Routes } from "react-router-dom";
import Header from "./components/include/Header";
import Main from "./pages/Main";
import SearchArchive from "./pages/SearchArchive";
import Help from "./pages/Help";

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="archive" element={<SearchArchive/>}/>
        <Route path="help" element={<Help/>}/>
      </Routes>
    </div>
  );
}

export default App;
