import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

export function Header({ darkMode, setDarkMode }) {
    const [menuOpen, setMenuOpen] = useState(false); 
    const [isLogIn, setIsLogIn] = useState(false); 
    const menuRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken"); 
        setIsLogIn(!!token)
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={darkMode ? "dark-mode" : "App"}>
            <header className="App-header">
                <div className="header-left">
                    <button
                        className="header-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ≡
                    </button>
                    <h1><Link to="/">📚 가짜 책 도서관</Link></h1>
                    {/* 메뉴 열기/닫기 */}
                    <div
                        ref={menuRef}
                        className={`header-dropdown ${menuOpen ? "show" : ""}`}
                    >
                        <Link to="/">🏠 홈</Link>
                        <Link to="/">🔥 인기 도서</Link>
                        <Link to="/new">🆕 신작 도서</Link>
                        <Link to="/books">📖 전체 도서</Link>
                        <Link to="/search">🔎 검색</Link>
                    </div>
                </div>
                <nav className="header-nav">
                    {isLogIn ? (
                        <Link to="/mypage">마이 페이지</Link>
                    ) : (
                        <Link to="/login">로그인</Link>
                    )}
                </nav>
            </header>
        </div>
    );
}

export default Header;
