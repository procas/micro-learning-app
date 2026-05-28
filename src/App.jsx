import { useEffect, useState } from 'react';
import './App.css';

const DATA = [
  {
    id: '1',
    title: 'Jumping Frog',
    emoji: '🐸',
    color: '#0f766e',
    complexity: 'O(n²)',
    description:
      'Choose the best stones to jump across using dynamic programming and reach the far bank with minimum jumps.',
    concept:
      'Count the number of ways to reach each stone by summing reachable predecessors.',
    visual: ['1', '2', '3', '5', '8', '13'],
    animation: 'stones',
  },
  {
    id: '2',
    title: 'Rat in a Maze',
    emoji: '🧀',
    color: '#7c3aed',
    complexity: 'O(2^(m×n))',
    description:
      'Explore every valid path and backtrack from dead ends until the exit is found.',
    concept:
      'Recursively traverse neighbors, mark visited cells, and undo paths when blocked.',
    visual: ['S', '•', '•', '•', 'E'],
    animation: 'maze',
  },
  {
    id: '3',
    title: 'Word Ladder',
    emoji: '🔤',
    color: '#dc2626',
    complexity: 'O(N × L²)',
    description:
      'Transform the start word into the end word using valid intermediate dictionary words.',
    concept:
      'Build a graph where words are neighbors if they differ by one letter and search with BFS.',
    visual: ['hit', 'hot', 'dot', 'dog', 'cog'],
    animation: 'words',
  },
];

const AnimatedIllustration = ({ item }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % item.visual.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [item.visual.length]);

  return (
    <div className={`illustration ${item.animation}`}>
      {item.visual.map((value, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={`${item.id}-${value}-${index}`}
            className={`illustrationNode ${isActive ? 'active' : ''}`}
          >
            <span>{value}</span>
          </div>
        );
      })}
      <div className="illustrationTrail" />
    </div>
  );
};

const Card = ({ item }) => {
  return (
    <section className="card" style={{ backgroundColor: item.color }}>
      <div className="cardHeader">
        <span className="emoji">{item.emoji}</span>
        <div>
          <h1 className="title">{item.title}</h1>
          <p className="complexity">{item.complexity}</p>
        </div>
      </div>

      <p className="description">{item.description}</p>
      <p className="concept">
        Key concept: <strong>{item.concept}</strong>
      </p>

      <AnimatedIllustration item={item} />
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
