import React, { useState, useRef, useEffect } from 'react';
import vocabularyData from './vocabularyData';

function App() {
  const [data, setData] = useState(vocabularyData.map(set => ({ ...set, words: [...set.words] })));
  const [userInputs, setUserInputs] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [showAnswers, setShowAnswers] = useState({});
  const [isEnglishToKorean, setIsEnglishToKorean] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const sectionRefs = useRef({});

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f7f9fb';
    document.body.style.color = darkMode ? '#e0e0e0' : '#1e293b';
  }, [darkMode]);

  const handleInputChange = (setIndex, wordIndex, value) => {
    setUserInputs(prev => ({
      ...prev,
      [`${setIndex}-${wordIndex}`]: value
    }));
  };

  const handleCheck = (setIndex, wordIndex) => {
    const key = `${setIndex}-${wordIndex}`;
    const correct = isEnglishToKorean
      ? data[setIndex].words[wordIndex].korean
      : data[setIndex].words[wordIndex].english;
    const user = (userInputs[key] || '').trim();

    const feedback = [];
    for (let i = 0; i < Math.max(user.length, correct.length); i++) {
      feedback.push(
        <span key={i} style={{ color: user[i] === correct[i] ? 'green' : 'red' }}>
          {user[i] || '_'}
        </span>
      );
    }

    setFeedbacks(prev => ({
      ...prev,
      [key]: <div>Your answer: {feedback}</div>
    }));
  };

  const handleShowAnswer = (setIndex, wordIndex) => {
    const key = `${setIndex}-${wordIndex}`;
    setShowAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const randomize = () => {
    setData(prev =>
      prev.map(set => ({
        ...set,
        words: [...set.words].sort(() => Math.random() - 0.5)
      }))
    );
  };

  const scrollToSection = (title) => {
    sectionRefs.current[title]?.scrollIntoView({ behavior: 'smooth' });
  };

  const styles = {
    container: {
      fontFamily: 'Segoe UI, sans-serif',
      padding: '2rem',
      maxWidth: '1000px',
      margin: 'auto',
      backgroundColor: darkMode ? '#121212' : '#f7f9fb',
      color: darkMode ? '#e0e0e0' : '#1e293b',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    button: {
      padding: '0.5rem 1rem',
      margin: '0.5rem 0',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#f18e9f',
      color: 'white',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    button2: {
      padding: '0.5rem 1rem',
      margin: '0.5rem 0',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#2d2d2d',
      color: 'white',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    input: {
      padding: '0.5rem',
      fontSize: '1rem',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '6px',
      border: darkMode ? '1px solid #555' : '1px solid #ccc',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      backgroundColor: darkMode ? '#222' : 'white',
      color: darkMode ? '#e0e0e0' : 'black'
    },
    card: {
      backgroundColor: darkMode ? '#1e1e1e' : 'white',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: darkMode
        ? '0 2px 5px rgba(255,255,255,0.1)'
        : '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem'
    },
    section: {
      marginBottom: '3rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: darkMode ? '#bb86fc' : '#1e293b'
    },
    label: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '0.5rem'
    },
    answer: {
      marginTop: '0.5rem',
      color: '#2563eb'
    },
    divider: {
      height: '1px',
      backgroundColor: darkMode ? '#444' : '#ddd',
      margin: '2rem 0'
    },
    tabBar: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
      marginBottom: '2rem'
    },
    tabButton: {
      padding: '0.4rem 1rem',
      borderRadius: '20px',
      border: darkMode ? '1px solid #666' : '1px solid #bbb',
      backgroundColor: darkMode ? '#2c2c2c' : '#fff',
      color: darkMode ? '#ddd' : '#000',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.3s'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Korean Vocabulary Test</h1>

      {/* Tab Bar */}
      <div style={styles.tabBar}>
        {data.map((set) => (
          <button
            key={set.title}
            style={styles.tabButton}
            onClick={() => scrollToSection(set.title)}
          >
            {set.title}
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button style={styles.button} onClick={randomize}>🔀 Randomize Each Set</button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button style={styles.button} onClick={() => setIsEnglishToKorean(prev => !prev)}>
          🔁 Switch to {isEnglishToKorean ? 'Korean → English' : 'English → Korean'}
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button style={styles.button2} onClick={() => setDarkMode(prev => !prev)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {data.map((set, setIndex) => (
        <div
          key={setIndex}
          style={styles.section}
          ref={el => (sectionRefs.current[set.title] = el)}
        >
          <h2 style={styles.sectionTitle}>{set.title}</h2>
          {set.words.map((item, wordIndex) => {
            const key = `${setIndex}-${wordIndex}`;
            return (
              <div key={wordIndex} style={styles.card}>
                <label style={styles.label}>
                  {wordIndex + 1}. {isEnglishToKorean ? item.english : item.korean}
                </label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder={`Type ${isEnglishToKorean ? 'Korean' : 'English'} here`}
                  value={userInputs[key] || ''}
                  onChange={(e) => handleInputChange(setIndex, wordIndex, e.target.value)}
                />
                <div>
                  <button
                    style={{ ...styles.button, backgroundColor: '#4cc79e' }}
                    onClick={() => handleCheck(setIndex, wordIndex)}
                  >
                    Check
                  </button>
                  <button
                    style={{ ...styles.button, backgroundColor: '#f18e9f', marginLeft: '1rem' }}
                    onClick={() => handleShowAnswer(setIndex, wordIndex)}
                  >
                    {showAnswers[key] ? 'Hide Correct' : 'Show Correct'}
                  </button>
                </div>
                {feedbacks[key]}
                {showAnswers[key] && (
                  <div style={styles.answer}>
                    ✅ Correct Answer: <strong>{isEnglishToKorean ? item.korean : item.english}</strong>
                  </div>
                )}
              </div>
            );
          })}
          <div style={styles.divider} />
        </div>
      ))}
    </div>
  );
}

export default App;
