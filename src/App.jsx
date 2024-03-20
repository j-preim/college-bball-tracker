import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import { Home, Matchups, Bracket } from "./pages"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <Header />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/matchups" element={<Matchups />} />
          <Route path="/bracket" element={<Bracket />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </div>
  )
}

export default App
