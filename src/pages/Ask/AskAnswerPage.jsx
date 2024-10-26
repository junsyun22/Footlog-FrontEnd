import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // 문의 ID를 URL에서 받아옴
import styles from './AskAnswerPage.module.css'; // 스타일 모듈

const AskAnswerPage = () => {
  const { id } = useParams(); // URL에서 문의 ID 추출
  const [answer, setAnswer] = useState('');

  // 임시로 문의 데이터를 하드코딩 (실제로는 API에서 불러와야 함)
  const inquiries = [
    {
      id: 1,
      title: '결제 문제 해결 부탁드립니다.',
      category: '결제 문제',
      message: '결제가 두 번 중복되었습니다. 확인 부탁드립니다.',
      date: '2024-10-21',
    },
    {
      id: 2,
      title: '서비스 피드백 드립니다.',
      category: '서비스 피드백',
      message: '서비스를 사용하면서 느낀 점은...',
      date: '2024-10-20',
    },
    {
      id: 3,
      title: '기술 지원 요청',
      category: '기술 지원',
      message: '로그인 시 오류가 발생하고 있습니다.',
      date: '2024-10-19',
    },
  ];

  // ID를 기준으로 해당 문의 데이터 찾기
  const inquiry = inquiries.find((item) => item.id === parseInt(id));

  const handleSubmit = (e) => {
    e.preventDefault();
    // 답변 제출 로직 구현 (예: API 호출)
    console.log(`문의 ID: ${id}`);
    console.log(`작성된 답변: ${answer}`);
    alert('답변이 제출되었습니다.');
    setAnswer(''); // 제출 후 답변 필드를 비웁니다.
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>문의 내용</h2>

      {inquiry ? (
        <div className={styles.inquiryDetails}>
          <h3 className={styles.inquiryTitle}>{inquiry.title}</h3>
          <p className={styles.inquiryCategory}>카테고리: {inquiry.category}</p>
          <p className={styles.inquiryMessage}>{inquiry.message}</p>
          <span className={styles.inquiryDate}>{inquiry.date}</span>
        </div>
      ) : (
        <p>해당 문의를 찾을 수 없습니다.</p>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          placeholder="답변을 입력하세요."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          답변 제출
        </button>
      </form>
    </div>
  );
};

export default AskAnswerPage;
