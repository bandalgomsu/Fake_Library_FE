import React, { useEffect, useState } from 'react';
import './Books.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Books({ darkMode }) {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const booksPerPage = 10;
  const pagesPerGroup = 10;
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (page) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8081/api/v1/books?page=${page}&size=${booksPerPage}`);
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

  // 페이지 그룹 계산
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup) + 1;
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
      const bookHeight = 250; // 각 책의 높이를 설정 (필요에 따라 조정)
      const calculatedHeight = currentPage.length * bookHeight; // 현재 페이지에 맞는 책 높이 계산
      setContainerHeight(calculatedHeight); // 동적으로 높이 설정
    }, [currentPage]); // currentBooks가 바뀔 때마다 높이 재계산

  return (
    <div>
      <h2 className="new-books-title">📖 전체 도서 📖</h2>

      {loading ? (
        <p>도서를 불러오는 중입니다...</p>
      ) : (
        <div className="container" style={{ height: containerHeight }}>
          {books.map(book => (
            <div key={book.id} className="book">
              <h2>{book.title}</h2>
              <p className="info"><strong>작가:</strong> {book.author} / <strong>장르:</strong> {book.genre}</p>
              <p>{book.description}</p>
              <Link to={"/bookDetail"} state={{ bookId: book.id }} className="detail-link">🔍 상세 보기</Link>
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션 UI */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ 이전
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <button 
              key={page} 
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
