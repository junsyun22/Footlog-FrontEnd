import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './MyAskPage.module.css'; // CSS 모듈 파일을 임포트

const MyAskPage = () => {
  const { userId } = useParams(); // URL에서 유저 ID를 가져옴
  const navigate = useNavigate();

  // 임시 데이터 설정
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      title: '결제 문제 해결 부탁드립니다.',
      category: '결제 문제',
      message: '결제가 두 번 중복되었습니다. 확인 부탁드립니다.',
      date: '2024-10-21',
      userId: '12345',
      answered: false,
    },
    {
      id: 2,
      title: '서비스 피드백 드립니다.',
      category: '서비스 피드백',
      message: '서비스를 사용하면서 느낀 점은...',
      date: '2024-10-20',
      userId: '12345',
      answered: true,
    },
    {
      id: 3,
      title: '기술 지원 요청',
      category: '기술 지원',
      message: '로그인 시 오류가 발생하고 있습니다.',
      date: '2024-10-19',
      userId: '54321', // 다른 유저의 문의
      answered: false,
    },
  ]);

  // 유저의 문의만 필터링
  const userInquiries = inquiries.filter(inquiry => inquiry.userId === userId);

  // 문의 항목 클릭 시 문의 내용 페이지로 이동
  const handleInquiryClick = (id) => {
    navigate(`/ask/${id}`); // 문의 ID를 기반으로 문의 내용 페이지로 이동
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>내 문의 내역</h2>

      {userInquiries.length > 0 ? (
        userInquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={styles.inquiryItem}
            onClick={() => handleInquiryClick(inquiry.id)}
          >
            <div className={styles.inquiryHeader}>
              <h3 className={styles.inquiryTitle}>{inquiry.title}</h3>
              <span className={styles.inquiryDate}>{inquiry.date}</span>
            </div>
            <p className={styles.inquiryCategory}>카테고리: {inquiry.category}</p>
            <p className={styles.inquiryMessage}>{inquiry.message}</p>
            <p className={`${inquiry.answered ? styles.answered : styles.notAnswered}`}>
              {inquiry.answered ? '답변 완료' : '답변 대기 중'}
            </p>
          </div>
        ))
      ) : (
        <p>문의 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default MyAskPage;
