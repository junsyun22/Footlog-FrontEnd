import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AskPage.module.css';

const AskPage = () => {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState('default');
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      title: '결제 문제 해결 부탁드립니다.',
      category: '결제 문제',
      message: '결제가 두 번 중복되었습니다. 확인 부탁드립니다.',
      date: '2024-10-21',
      userId: 'user123',
      answered: false,
    },
    {
      id: 2,
      title: '서비스 피드백 드립니다.',
      category: '서비스 피드백',
      message: '서비스를 사용하면서 느낀 점은...',
      date: '2024-10-20',
      userId: 'user456',
      answered: true,
    },
    {
      id: 3,
      title: '기술 지원 요청',
      category: '기술 지원',
      message: '로그인 시 오류가 발생하고 있습니다.',
      date: '2024-10-19',
      userId: 'user789',
      answered: false,
    },
  ]);

  // 정렬 방식에 따라 데이터를 정렬
  const sortInquiries = () => {
    let sortedInquiries = [...inquiries];
    if (sortOption === 'userId') {
      sortedInquiries.sort((a, b) => a.userId.localeCompare(b.userId));
    } else if (sortOption === 'answered') {
      sortedInquiries.sort((a, b) => (a.answered === b.answered ? 0 : a.answered ? -1 : 1));
    }
    return sortedInquiries;
  };

  // 문의 항목 클릭 시 답변 페이지로 이동
  const handleInquiryClick = (id) => {
    navigate(`ask/answer/${id}`); // 문의 ID를 기반으로 답변 페이지로 이동
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>문의 내역</h2>

      {/* 정렬 옵션 선택 리스트 */}
      <div className={styles.sortOptions}>
        <label htmlFor="sort" className={styles.sortLabel}>정렬 기준: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={styles.select}
        >
          <option value="default">기본</option>
          <option value="userId">유저 아이디</option>
          <option value="answered">답변 여부</option>
        </select>
      </div>

      {/* 정렬된 문의 리스트 */}
      {sortInquiries().map((inquiry) => (
        <div
          key={inquiry.id}
          className={`${styles.inquiryItem} ${inquiry.answered ? styles.answeredItem : ''}`}
          onClick={() => handleInquiryClick(inquiry.id)}
        >
          <div className={styles.inquiryHeader}>
            <h3 className={styles.inquiryTitle}>{inquiry.title}</h3>
            <span className={styles.inquiryDate}>{inquiry.date}</span>
          </div>
          <p className={styles.inquiryCategory}>카테고리: {inquiry.category}</p>
          <p className={styles.inquiryMessage}>{inquiry.message}</p>
          <p className={styles.inquiryUserId}>유저 아이디: {inquiry.userId}</p>
          <p className={`${styles.inquiryStatus} ${inquiry.answered ? styles.answered : styles.notAnswered}`}>
            {inquiry.answered ? '답변 완료' : '답변 대기 중'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AskPage;
