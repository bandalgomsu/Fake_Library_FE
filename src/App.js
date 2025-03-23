import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Header  from "./Page/Header/Header"
import NewBooks from "./Page/NewBooks/NewBooks"
import {Login} from "./Page/Login/Login"
import Signup from './Page/SignUp/SignUp';
import Books from './Page/Books/Books';
import BookDetail from './Page/BookDetail/BookDetail';
import PopularBooks from './Page/Popular/PopularBooks';

function App() {
    const [darkMode, setDarkMode] = useState(true);
  return (
    <Router> {/* ✅ BrowserRouter로 감싸기 */}
      <div className={darkMode ? "App dark-mode" : "App"}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes> 
                  <Route path="/new" element={<NewBooks darkMode={darkMode} />} />
                  <Route path="/login" element={<Login darkMode={darkMode} />} />
                  <Route path="/signUp" element={<Signup darkMode={darkMode} />} />
                  <Route path="/" element={<PopularBooks darkMode={darkMode} />} />
                  <Route path="/books" element={<Books darkMode={darkMode} />} />
                  <Route path="/bookDetail" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;