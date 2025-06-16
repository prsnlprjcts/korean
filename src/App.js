import React, { useState, useRef } from 'react';
import vocabularyData from './vocabularyData';

function App() {
  const [data, setData] = useState(vocabularyData.map(set => ({ ...set, words: [...set.words] })));
  const [userInputs, setUserInputs] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [showAnswers, setShowAnswers] = useState({});

  const sectionRefs = useRef({});

  const handleInputChange = (setIndex, wordIndex, value) => {
    setUserInputs(prev => ({
      ...prev,
      [`${setIndex}-${wordIndex}`]: value
    }));
  };

  const handleCheck = (setIndex, wordIndex) => {
    const key = `${setIndex}-${wordIndex}`;
    const correct = data[setIndex].words[wordIndex].korean;
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
      backgroundColor: '#f7f9fb'
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
      backgroundColor: '#4f46e5',
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
      border: '1px solid #ccc',
      marginTop: '0.5rem',
      marginBottom: '0.5rem'
    },
    card: {
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem'
    },
    section: {
      marginBottom: '3rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#1e293b'
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
      backgroundColor: '#ddd',
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
      border: '1px solid #bbb',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.3s'
    },
    tabButtonHover: {
      backgroundColor: '#eee'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Korean Vocabulary Test</h1>

      {/* Tab Bar */}
      <div style={styles.tabBar}>
        {data.map((set, idx) => (
          <button
            key={set.title}
            style={styles.tabButton}
            onClick={() => scrollToSection(set.title)}
          >
            {set.title}
          </button>
        ))}
      </div>

      {/* Randomize Button */}
      <div style={{ textAlign: 'center' }}>
        <button style={styles.button} onClick={randomize}>🔀 Randomize Each Set</button>
      </div>

      {/* Vocabulary Sections */}
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
                  {wordIndex + 1}. {item.english}
                </label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Type Korean here"
                  value={userInputs[key] || ''}
                  onChange={(e) => handleInputChange(setIndex, wordIndex, e.target.value)}
                />
                <div>
                  <button
                    style={{ ...styles.button, backgroundColor: '#10b981' }}
                    onClick={() => handleCheck(setIndex, wordIndex)}
                  >
                    Check
                  </button>
                  <button
                    style={{ ...styles.button, backgroundColor: '#3b82f6', marginLeft: '1rem' }}
                    onClick={() => handleShowAnswer(setIndex, wordIndex)}
                  >
                    {showAnswers[key] ? 'Hide Correct' : 'Show Correct'}
                  </button>
                </div>
                {feedbacks[key]}
                {showAnswers[key] && (
                  <div style={styles.answer}>
                    ✅ Correct Answer: <strong>{item.korean}</strong>
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
