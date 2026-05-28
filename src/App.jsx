import { useEffect, useState } from 'react';
import './App.css';

const DATA = [
  {
    id: 'rat-maze',
    title: 'Rat and Maze',
    emoji: '🐀',
    color: '#06b6d4',
    complexity: 'Collection of grid/maze problems (DFS, BFS, Backtracking)',
    problem:
      'A collection of classic "rat in a maze" problems: reachability, shortest path, and enumerating all paths. Tap a subcard to watch the approach.',
    concept: 'Grouped maze problems for quick comparison and animation.',
    subcards: [
      {
        id: '1',
        title: 'Maze — DFS (Find a path)',
        emoji: '🧭',
        color: '#0ea5a4',
        complexity: 'O(m×n) in practice for reachability',
        problem:
          'Given a grid with a start and target, use DFS to find any path to the target (not necessarily shortest).',
        solution:
          'DFS explores deeply along one branch before backtracking; it uses a visited set to avoid cycles. It’s good for reachability and path discovery.',
        concept: 'Depth-first exploration, mark visited to avoid cycles.',
        visual: ['S', '1', '2', '3', '4', 'E'],
        animation: 'maze-dfs',
      },

      {
        id: '2',
        title: 'Maze — Backtracking / Enumeration',
        emoji: '🔁',
        color: '#7c3aed',
        complexity: 'Exponential (enumerating all paths)',
        problem:
          'Find all valid paths from start to exit in a grid with blockers; enumerate solutions.',
        solution:
          'Backtracking tries moves, marks visited, recurses, and unmarks on return. Memoize dead-ends to prune repeated exploration.',
        concept: 'Try → mark → recurse → unmark; memoize dead-ends to prune.',
        visual: ['S', '1', '2', '3', '4', 'E'],
        animation: 'maze-backtrack',
      },

      {
        id: '3',
        title: 'Maze — BFS (Shortest path)',
        emoji: '📏',
        color: '#fb923c',
        complexity: 'O(m×n)',
        problem:
          'Find the minimum number of steps from start to exit where each step costs 1; grid may have blockers.',
        solution:
          'BFS explores level-by-level (wavefront); the first time you reach the target gives the shortest path. Use a queue and visited set.',
        concept: 'Breadth-first search (level expansion), track distance per node.',
        visual: ['S', '1', '2', '3', '4', 'E'],
        animation: 'maze-bfs',
      },
    ],
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
    } else if (item.animation && item.animation.startsWith('maze')) {
      setVisited(Array(item.visual.length).fill(false));
    }
  }, [item]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % item.visual.length;

        // behavior per maze animation type
        if (item.animation === 'maze-dfs') {
          // DFS: mark current as visited (simulate depth), occasionally unmark to show backtrack
          setVisited((v) => {
            const copy = v.length ? [...v] : Array(item.visual.length).fill(false);
            copy[next] = true;
            // simulate backtrack: clear earlier nodes when reaching end
            if (next === item.visual.length - 1) {
              for (let i = 1; i < copy.length - 1; i++) copy[i] = false;
            }
            return copy;
          });
        }

        if (item.animation === 'maze-backtrack') {
          // Backtracking: mark visited when exploring, and set memo (prune) when dead-end
          setVisited((v) => {
            const copy = v.length ? [...v] : Array(item.visual.length).fill(false);
            copy[next] = true;
            return copy;
          });

          setMemo((m) => {
            const copy = m && m.length ? [...m] : Array(item.visual.length).fill(false);
            // when reaching exit, mark middle nodes as pruned to illustrate memoization
            if (next === item.visual.length - 1) {
              for (let i = 1; i < copy.length - 1; i++) copy[i] = true;
            }
            return copy;
          });
        }

        if (item.animation === 'maze-bfs') {
          // BFS: expand wavefront—mark all nodes up to 'next' as visited
          setVisited((v) => {
            const copy = v.length ? [...v] : Array(item.visual.length).fill(false);
            for (let i = 0; i <= next; i++) copy[i] = true;
            return copy;
          });
        }

        return next;
      });
    }, 700); // rapid steps so full cycle ~3-4s for 5-6 nodes

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
                {item.animation && item.animation.startsWith('maze') && memo[index] && (
                  <div className="memoBadge">×</div>
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
  // If this item groups subcards, render each subcard inside
  if (item.subcards && Array.isArray(item.subcards)) {
    return (
      <section className="card" style={{ backgroundColor: item.color }}>
        <div className="cardHeader">
          <span className="emoji">{item.emoji}</span>
          <div>
            <h1 className="title">{item.title}</h1>
            <p className="complexity">{item.complexity}</p>
          </div>
        </div>

        <p className="description">{item.problem}</p>
        <p className="concept">
          Key concept: <strong>{item.concept}</strong>
        </p>

        <div className="subcards">
          {item.subcards.map((sub) => (
            <div key={sub.id} className="subcard" style={{ backgroundColor: sub.color }}>
              <div className="cardHeader small">
                <span className="emoji">{sub.emoji}</span>
                <div>
                  <h2 className="title small">{sub.title}</h2>
                  <p className="complexity small">{sub.complexity}</p>
                </div>
              </div>

              <p className="description small">{sub.problem}</p>
              <p className="concept small">
                Key: <strong>{sub.concept}</strong>
              </p>

              <AnimatedIllustration item={sub} />
            </div>
          ))}
        </div>

        <p className="swipeText">Swipe Up ↑</p>
      </section>
    );
  }

  return (
    <section className="card" style={{ backgroundColor: item.color }}>
      <div className="cardHeader">
        <span className="emoji">{item.emoji}</span>
        <div>
          <h1 className="title">{item.title}</h1>
          <p className="complexity">{item.complexity}</p>
        </div>
      </div>

      <p className="description">{item.problem}</p>
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
