import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './AskDetailPage.module.css'; // CSS 모듈 파일을 임포트

const AskDetailPage = () => {
  const { id } = useParams(); // URL에서 문의 ID 가져오기

  // 임시 데이터 설정
  const [inquiries] = useState([
    {
      id: 1,
      title: '결제 문제 해결 부탁드립니다.',
      category: '결제 문제',
      message: '결제가 두 번 중복되었습니다. 결제 기록을 확인해 주시고 환불 요청 드립니다.',
      date: '2024-10-21',
      answered: false,
      user: 'user123',
      response: '',
    },
    {
      id: 2,
      title: '서비스 피드백 드립니다.',
      category: '서비스 피드백',
      message: '서비스 사용 중 발견한 몇 가지 개선 사항을 전달드립니다...',
      date: '2024-10-20',
      answered: true,
      user: 'user456',
      response: '서비스 개선 의견 감사드립니다. 향후 업데이트에 반영하도록 하겠습니다.',
    },
    {
      id: 3,
      title: '기술 지원 요청',
      category: '기술 지원',
      message: '로그인 시 "오류 코드 500" 메시지가 발생하고 있습니다. 확인 부탁드립니다.',
      date: '2024-10-19',
      answered: false,
      user: 'user789',
      response: '',
    },
  ]);

  // 문의 ID로 필터링하여 해당 문의 가져오기
  const inquiry = inquiries.find(inquiry => inquiry.id === parseInt(id));

  return (
    <div className={styles.container}>
      {inquiry ? (
        <div className={styles.inquiryDetails}>
          <h2 className={styles.title}>{inquiry.title}</h2>
          
          <div className={styles.detailSection}>
            <span className={styles.label}>문의자:</span>
            <span className={styles.value}>{inquiry.user}</span>
          </div>
          
          <div className={styles.detailSection}>
            <span className={styles.label}>문의 날짜:</span>
            <span className={styles.value}>{inquiry.date}</span>
          </div>

          <div className={styles.detailSection}>
            <span className={styles.label}>카테고리:</span>
            <span className={styles.value}>{inquiry.category}</span>
          </div>

          <div className={styles.detailSection}>
            <span className={styles.label}>문의 내용:</span>
            <span className={styles.message}>{inquiry.message}</span>
          </div>

          {inquiry.answered && (
            <div className={styles.detailSection}>
              <span className={styles.label}>관리자 답변:</span>
              <span className={styles.response}>{inquiry.response}</span>
            </div>
          )}

          <div className={styles.statusSection}>
            <span className={`${styles.status} ${inquiry.answered ? styles.answered : styles.notAnswered}`}>
              {inquiry.answered ? '답변 완료' : '답변 대기 중'}
            </span>
          </div>
        </div>
      ) : (
        <p>문의 내역을 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default AskDetailPage;
