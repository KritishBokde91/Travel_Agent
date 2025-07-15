import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./routes/home";
import Book from "./routes/Book";

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book/>} />
        
      </Routes>
    </Router>
    </>
  )
}

export default App
