import { useState } from 'react';
import styles from './AskRegist.module.css';

const AskRegist = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    '유저 문의',
    '클럽 문의',
    '장애 문의',
    '기타 문의',
    '서비스 피드백'
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || message.trim() === '' || category === '') {
      alert('제목, 카테고리, 내용 모두 입력해 주세요.');
      return;
    }

    // 문의 내용을 처리하는 로직 (API 호출 등)
    console.log('문의 제목:', title);
    console.log('문의 내용:', message);
    console.log('문의 카테고리:', category);
    alert('문의가 성공적으로 제출되었습니다.');

    // 제출 후 입력 필드 초기화
    setTitle('');
    setMessage('');
    setCategory('');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>1:1 문의</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 질문 카테고리 선택 */}
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled>
            질문 카테고리를 선택하세요
          </option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* 제목 입력 필드 */}
        <input
          type="text"
          className={styles.input}
          placeholder="문의 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 내용 입력 필드 */}
        <textarea
          className={styles.textarea}
          placeholder="문의 내용을 입력하세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* 제출 버튼 */}
        <button type="submit" className={styles.button}>
          문의하기
        </button>
      </form>
    </div>
  );
};

export default AskRegist;
