import React, { useEffect, useState } from 'react';
import { useParams, Link , useNavigate, useLocation } from 'react-router-dom';
import './Books.css';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function Books({ darkMode }) {
  const location = useLocation();
  const initialPage = location.state?.returnPage || 1;

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 10;
  const pagesPerGroup = 10;
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/v1/books?page=${page}&size=${booksPerPage}`);
      const data = res.data;
      setBooks(data.bookInfos);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('도서 목록을 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
      fetchBooks(currentPage);
 }, [currentPage]);
 
  const currentBooks = books;

  // 페이지네이션 버튼 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 페이지 그룹 계산 (10페이지씩)
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup) + 1;
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const bookHeight = 250; // 각 책의 높이를 설정 (필요에 따라 조정)
    const calculatedHeight = currentBooks.length * bookHeight; // 현재 페이지에 맞는 책 높이 계산
    setContainerHeight(calculatedHeight); // 동적으로 높이 설정
  }, [currentBooks]); // currentBooks가 바뀔 때마다 높이 재계산

    if (loading) {
  return <div className="spinner" />;
  }  

  return (
    <div>
      <h2 className="new-books-title">📖 전체 도서 📖</h2>
      <div className="container" style={{ height: containerHeight }}>
        {currentBooks.map(book => (
          <div key={book.bookId} className="book">
            <h2>{book.title}</h2>
            <p className="info"><strong>작가:</strong> {book.author} / <strong>장르:</strong> {book.genres.join(', ')} </p>
            <p>{book.plot}</p>
            <Link to={"/bookDetail"} state={{ bookId: book.bookId , author : book.author , genres : book.genres.join(', ') , returnPage :  currentPage , returnUri : "/books" }} className="detail-link">🔍 상세 보기</Link>
          </div>
        ))}
      </div>

      {/* 페이지네이션 UI */}
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          ◀ 이전
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button 
            key={startPage + index} 
            className={currentPage === startPage + index ? "active" : ""}
            onClick={() => paginate(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          다음 ▶
        </button>
      </div>

      <footer>
        &copy; {new Date().getFullYear()} 가짜 도서관. 이 책들은 세상에 존재하지 않는 가짜 책들입니다 All Rights Reserved.
      </footer>
    </div>
  );
}

export default Books;
