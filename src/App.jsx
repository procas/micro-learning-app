import { useEffect, useState } from 'react';
import './App.css';

const DATA = [
  {
    id: '1',
    title: 'Binary Search',
    emoji: '🔍',
    color: '#1E3A8A',
    complexity: 'O(log n)',
    description: 'Repeatedly divide the search space into halves.',
    visual: ['1', '3', '5', '7', '9'],
  },
  {
    id: '2',
    title: 'Sliding Window',
    emoji: '🪟',
    color: '#065F46',
    complexity: 'O(n)',
    description: 'Maintain a moving range to optimize subarray problems.',
    visual: ['2', '4', '6', '8'],
  },
];

const AnimatedBoxes = ({ visual }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % visual.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [visual.length]);

  return (
    <div className="visualContainer">
      {visual.map((value, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={index}
            className={`box ${isActive ? 'boxActive' : ''}`}
          >
            <span className="boxText">{value}</span>
          </div>
        );
      })}
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <section
      className="card"
      style={{ backgroundColor: item.color }}
    >
      <span className="emoji">{item.emoji}</span>
      <h1 className="title">{item.title}</h1>
      <p className="complexity">{item.complexity}</p>
      <p className="description">{item.description}</p>
      <AnimatedBoxes visual={item.visual} />
      <p className="swipeText">Swipe Up ↑</p>
    </section>
  );
};

export default function App() {
  return (
    <main className="pageWrapper">
      <div className="cardsList">
        {DATA.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
