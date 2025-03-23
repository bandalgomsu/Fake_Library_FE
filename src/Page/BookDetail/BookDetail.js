import React, { useEffect, useState } from 'react';
import { useParams, Link , useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function BookDetail() {
  const location = useLocation();
  const { bookId } = location.state; // URL에서 책 ID 가져오기
  const { genres } = location.state
  const { author } = location.state
  const navigate = useNavigate();

  const [book, setBook] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBookDetail = async (page) => {
    try {
      setLoading(true);
    
      const res = await axios.get(`${API_BASE_URL}/api/v1/books/${bookId}?page=${page}`);
      const data = res.data;
      
      setBook(data.bookContentInfos[0])
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);

    } catch (error) {
      console.error('도서를 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetail(currentPage)
  }, [currentPage]);

  if (loading) {
  return <div className="spinner" />;
  }

  if (!book) {
    return <h2 className="error-message">책을 찾을 수 없습니다.</h2>;
  }

  return (
    <div className="book-detail-container">
      <h1 className="book-title">{book.title}</h1>
      <p className="book-author"><strong>저자:</strong> {author}</p>
      <p className="book-description">{book.description}</p>
      <div className="book-content">
        <h3>📖 책 내용</h3>
        <p>{book.content}</p>
      </div>
      <button onClick={() => navigate(-1)} className="back-button">⬅ 뒤로 가기</button>
    </div>
  );
}

export default BookDetail;
