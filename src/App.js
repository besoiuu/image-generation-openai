import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { ImageGenerator } from "./pages/generator/generator";
import { Favourite } from "./pages/favourite/favourite";
import { Homepage } from "./pages/homepage/homepage";
import { GradientGenerator } from "./pages/gradientgen/gradientgen";
import { TextEditor } from "./pages/texteditor/texteditor";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/generator" element={<ImageGenerator />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/gradientgen" element={<GradientGenerator />} />
          <Route path="/texteditor" element={<TextEditor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
