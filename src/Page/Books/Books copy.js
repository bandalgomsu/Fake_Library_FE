import React, { useEffect, useState } from 'react';
import './Books.css';
import { Link } from 'react-router-dom';

const books = [
  { id: 1, title: "미지의 책: 시간의 미로", genre: "판타지", author: "가상의 작가 김상상", description: "이 책은 시간과 공간을 초월하는 이야기를 담고 있으며, 독자들에게 상상의 세계로의 초대장을 제공합니다." },
  { id: 2, title: "꿈꾸는 서재",genre: "판타지", author: "상상의 작가 이몽환", description: "현실과 꿈의 경계를 허무는 이야기로, 독자들이 가상의 서재 속에서 새로운 상상을 펼칠 수 있도록 도와줍니다." },
  { id: 3, title: "허상의 연대기",genre: "판타지", author: "가공의 필자 박환상", description: "전혀 존재하지 않는 사건들과 인물들을 엮어낸 연대기로, 가짜 도서관의 대표작 중 하나입니다." },
  { id: 4, title: "별빛 속 이야기",genre: "판타지", author: "이은하", description: "별빛을 따라 펼쳐지는 신비한 이야기." },
  { id: 5, title: "숲의 노래",genre: "판타지", author: "박산하", description: "자연과 하나되는 아름다운 서사시." },
  { id: 6, title: "바다의 전설",genre: "판타지", author: "김해성", description: "깊은 바닷속에 숨겨진 비밀을 밝히는 이야기." },
  { id: 7, title: "우주의 끝에서",genre: "판타지", author: "정우주", description: "광활한 우주에서 펼쳐지는 모험과 철학." },
  { id: 8, title: "시간을 걷는 아이", genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 9, title: "시간을 걷는 아이", genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 10, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 11, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 12, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 13, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 14, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 15, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 16, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 17, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 18, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 19, title: "시간을 걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." },
  { id: 20, title: "시간을 ㅇㅁㄴㅇㅁㄴㅇ걷는 아이",genre: "판타지", author: "최시간", description: "시간을 초월한 한 아이의 특별한 여정." }
];

export function Books({ darkMode }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const booksPerPage = 10; // 한 페이지당 보여줄 책 개수
  const pagesPerGroup = 10; // 한 그룹에서 보여줄 페이지 수

  // 현재 페이지에 맞는 책 데이터 추출
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(books.length / booksPerPage);

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

  return (
    <div>
      <h2 className="new-books-title">📖 전체 도서 📖</h2>
      <div className="container" style={{ height: containerHeight }}>
        {currentBooks.map(book => (
          <div key={book.id} className="book">
            <h2>{book.title}</h2>
            <p className="info"><strong>작가:</strong> {book.author} / <strong>장르:</strong> {book.genre}</p>
            <p>{book.description}</p>
            <Link to={"/bookDetail"} state={{ bookId: book.id }} className="detail-link">🔍 상세 보기</Link>
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
