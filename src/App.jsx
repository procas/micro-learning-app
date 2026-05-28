import { useEffect, useState } from 'react';
import './App.css';

const DATA = [
  {
    id: '1',
    title: 'Jumping Frog (DP)',
    emoji: '🐸',
    color: '#0f766e',
    complexity: 'O(n²)',
    description: 'Count ways to reach each stone; reuse computed counts (memo).',
    concept: 'DP: build counts left→right; memo prevents recomputation.',
    visual: ['1', '2', '3', '5', '8', '13'],
    animation: 'stones',
  },
  {
    id: '2',
    title: 'Rat in a Maze (Backtrack)',
    emoji: '🧀',
    color: '#7c3aed',
    complexity: 'Exponential (worst)',
    description: 'Explore paths, mark visited; undo (backtrack) on dead ends.',
    concept: 'Backtracking: try, mark, recurse, unmark on return.',
    visual: ['S', '1', '2', '3', 'E'],
    animation: 'maze',
  },
  
  {
    id: '3',
    title: 'Tree Traversal (Preorder)',
    emoji: '🌳',
    color: '#0369a1',
    complexity: 'O(n)',
    description: 'Visit root, then left, then right — visualize preorder traversal.',
    concept: 'Preorder: process node, traverse left subtree, traverse right subtree.',
    visual: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    traversal: ['A', 'B', 'D', 'E', 'C', 'F', 'G'],
    animation: 'tree',
  },
];

const AnimatedIllustration = ({ item }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [memo, setMemo] = useState([]);
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    // initialize states per item
    if (item.animation === 'stones') {
      // DP counts: start with 0s and set first stone as 1
      setMemo(Array(item.visual.length).fill(0));
      setVisited(Array(item.visual.length).fill(false));
    } else if (item.animation === 'maze') {
      setVisited(Array(item.visual.length).fill(false));
    }
  }, [item]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % item.visual.length;

        // update memo / visited in a concise simulation to demonstrate concept
        if (item.animation === 'stones') {
          setMemo((m) => {
            const copy = [...m];
            // compute count for next using previous counts (simple DP accumulation)
            const start = Math.max(0, next - 2); // frog can jump up to 2 for demo
            let sum = 0;
            for (let i = start; i < next; i++) sum += copy[i] || (i === 0 ? 1 : 0);
            // ensure first stone has 1
            if (next === 0) copy[next] = 1;
            else copy[next] = Math.max(1, sum);
            return copy;
          });
          setVisited((v) => {
            const copy = [...v];
            copy[next] = true; // mark as computed/visited
            return copy;
          });
        }

        if (item.animation === 'maze') {
          setVisited((v) => {
            const copy = [...v];
            // simulate exploration: mark forward visited and occasionally clear to show backtrack
            copy[next] = true;
            // if next is last, simulate backtrack by clearing earlier ones
            if (next === item.visual.length - 1) {
              for (let i = 1; i < copy.length - 1; i++) {
                copy[i] = false;
              }
            }
            return copy;
          });
        }

        return next;
      });
    }, 900); // faster loop to fit 3-4s digestible animation

    return () => window.clearInterval(interval);
  }, [item]);

  return (
    <div className={`illustration ${item.animation}`}>
      {item.animation === 'tree' ? (
        <div className="treeLayout">
          {item.visual.map((value, index) => {
            const posOrder = [4, 2, 6, 1, 3, 5, 7];
            const isActive = item.traversal
              ? item.traversal[activeIndex] === value
              : index === activeIndex;

            return (
              <div
                key={`${item.id}-${value}-${index}`}
                className={`illustrationNode ${isActive ? 'active' : ''}`}
                style={{ gridColumn: posOrder[index] }}
              >
                <span>{value}</span>
              </div>
            );
          })}
        </div>
      ) : (
        item.visual.map((value, index) => {
          const isActive = index === activeIndex;
          const isVisited = visited[index];
          const count = memo[index];

          return (
            <div
              key={`${item.id}-${value}-${index}`}
              className={`illustrationNode ${isActive ? 'active' : ''} ${
                isVisited ? 'visited' : ''
              }`}
            >
              <div>
                <span>{value}</span>
                {item.animation === 'stones' && (
                  <div className="nodeBadge">{count > 0 ? count : ''}</div>
                )}
              </div>
            </div>
          );
        })
      )}
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
