import React from 'react';
import { useParams, Link , useNavigate, useLocation } from 'react-router-dom';
import './BookDetail.css';

// 가짜 책 데이터 (실제 프로젝트에서는 API에서 데이터를 받아오면 됨)
const books = [
  { id: 1, title: "미지의 책: 시간의 미로", author: "가상의 작가 김상상", description: "시간과 공간을 초월하는 이야기.", content: "이 책은 한 소년이 우연히 발견한 고서 속에서 시작된다. 그는 시간의 미로를 통해 과거와 미래를 오가며 미지의 비밀을 풀어나간다." },
  { id: 2, title: "꿈꾸는 서재", author: "상상의 작가 이몽환", description: "현실과 꿈의 경계를 허무는 이야기.", content: "이 책의 주인공은 꿈 속에서만 존재하는 서재를 발견한다. 그곳에는 모든 가능성이 담긴 책들이 있고, 그는 그 책들을 읽으며 현실을 바꾸는 방법을 배운다." },
  { id: 3, title: "허상의 연대기", author: "가공의 필자 박환상", description: "전혀 존재하지 않는 사건들의 연대기.", content: "이 연대기는 한 시대도 존재하지 않는 역사 속 사건들을 기록한 책이다. 과거, 현재, 미래가 뒤섞여 하나의 거대한 이야기를 이룬다." }
];

export function BookDetail() {
  const location = useLocation();
  const { bookId } = location.state; // URL에서 책 ID 가져오기
  
  const navigate = useNavigate();
  const book = books.find(book => book.id === parseInt(bookId));

  if (!book) {
    return <h2 className="error-message">책을 찾을 수 없습니다.</h2>;
  }

  return (
    <div className="book-detail-container">
      <h1 className="book-title">{book.title}</h1>
      <p className="book-author"><strong>저자:</strong> {book.author}</p>
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
