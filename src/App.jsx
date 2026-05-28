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
  {
    id: 'frog-jump',
    title: 'Jumping Frog (DP)',
    emoji: '🐸',
    color: '#10b981',
    complexity: 'O(n) with memoization',
    problem:
      'Count the number of ways a frog can reach the end given stones and allowed jumps.',
    solution:
      'Dynamic programming: ways[i] = sum(ways[j]) for reachable previous stones j. Memoize counts to avoid recomputation.',
    concept: 'DP accumulation, memoize subproblems into counts.',
    visual: ['S', '1', '2', '3', '4', 'E'],
    animation: 'stones',
  },

  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs (DP)',
    emoji: '🪜',
    color: '#f97316',
    complexity: 'O(n)',
    problem: 'Given n steps, count distinct ways to climb (1 or 2 steps).',
    solution:
      'Classic DP: ways[i] = ways[i-1] + ways[i-2]. Start with base cases and build up.',
    concept: 'Linear DP recurrence, cumulative counts.',
    visual: ['0', '1', '2', '3', '4', '5'],
    animation: 'stones',
  },

  {
    id: 'invert-tree',
    title: 'Binary Tree — Invert',
    emoji: '🌳',
    color: '#60a5fa',
    complexity: 'O(n)',
    problem:
      'Invert a binary tree (swap left/right children for every node).',
    solution:
      'Traverse the tree (preorder) and swap children at each node. Iterative or recursive works.',
    concept: 'Tree traversal (visit & mutate), preorder swap.',
    visual: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    traversal: ['A', 'B', 'D', 'E', 'C', 'F', 'G'],
    animation: 'tree',
  },
];
const AnimatedIllustration = ({ item }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [memo, setMemo] = useState([]);
  const [visited, setVisited] = useState([]);
  const [distances, setDistances] = useState([]);
  const [overlayLabel, setOverlayLabel] = useState('');
  const [path, setPath] = useState([]);

  useEffect(() => {
    // initialize states per item
    if (item.animation === 'stones') {
      // DP counts: start with 0s and set first stone as 1
      setMemo(Array(item.visual.length).fill(0));
      setVisited(Array(item.visual.length).fill(false));
    } else if (item.animation && item.animation.startsWith('maze')) {
      setVisited(Array(item.visual.length).fill(false));
      setDistances(Array(item.visual.length).fill(null));
      setPath([]);
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
            return copy;
          });

          // maintain a simple path stack: add next, and if at end clear to simulate found path
          setPath((p) => {
            const copy = p && p.length ? [...p] : [];
            copy.push(next);
            if (next === item.visual.length - 1) return copy;
            // keep path short for animation
            if (copy.length > 4) copy.shift();
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
          // cycle overlay labels to explain backtracking phases
          setOverlayLabel((lbl) => {
            const phases = ['Try', 'Mark', 'Recurse', 'Unmark'];
            const idx = (next + phases.length) % phases.length;
            return phases[idx];
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

          // set simple distances equal to index for illustrative purposes
          setDistances((d) => {
            const copy = d && d.length ? [...d] : Array(item.visual.length).fill(null);
            for (let i = 0; i <= next; i++) copy[i] = i === 0 ? 0 : i;
            return copy;
          });
        }

        if (item.animation === 'stones') {
          // accumulate simple DP counts for stones/climbing stairs
          setMemo((m) => {
            const copy = m && m.length ? [...m] : Array(item.visual.length).fill(0);
            // seed start
            if (copy[0] === 0) copy[0] = 1;
            // compute next as sum of previous two (simple illustrative rule)
            const i = next;
            const left = copy[i - 1] || 0;
            const left2 = copy[i - 2] || 0;
            copy[i] = left + left2 || copy[i] || 1;
            return copy;
          });
        }

        if (item.animation === 'tree') {
          // brief overlay indicating swap at active node
          setOverlayLabel('Swap');
          setTimeout(() => setOverlayLabel(''), 350);
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
          const dist = distances[index];
          const inPath = path.includes(index);

          return (
            <div
              key={`${item.id}-${value}-${index}`}
              className={`illustrationNode ${isActive ? 'active' : ''} ${
                isVisited ? 'visited' : ''
              } ${inPath ? 'path' : ''}`}
            >
              <div>
                <span>{value}</span>
                {item.animation === 'stones' && (
                  <div className="nodeBadge">{count > 0 ? count : ''}</div>
                )}
                {item.animation && item.animation.startsWith('maze') && memo[index] && (
                  <div className="memoBadge">×</div>
                )}
                {item.animation === 'maze-bfs' && dist != null && (
                  <div className="distanceBadge">{dist}</div>
                )}
                {item.animation === 'tree' && overlayLabel && isActive && (
                  <div className="swapBadge">{overlayLabel}</div>
                )}
              </div>
            </div>
          );
        })
      )}
      {/* explanatory overlay for backtracking */}
      {item.animation === 'maze-backtrack' && overlayLabel && (
        <div className="overlayLabel">{overlayLabel}</div>
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
