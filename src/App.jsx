import { useEffect, useState } from 'react';
import './App.css';

const DATA = [
  {
    id: 'rat-maze',
    title: 'Rat and Maze',
    hook: 'A quick maze trio: DFS, Backtracking, BFS. One smooth scroll, one satisfying mental reset.',
    reward: 'Switch off and watch three classic maze styles land in under 20 seconds.',
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
        reward: 'Feel the pace of one deep search as it chases the exit.',
        problem:
          'Given a grid with a start and target, use DFS to find any path to the target (not necessarily shortest).',
        solution:
          'DFS explores deeply along one branch before backtracking; it uses a visited set to avoid cycles. It’s good for reachability and path discovery.',
        concept: 'Depth-first exploration, mark visited to avoid cycles.',
        pseudo: `def dfs(node):
    if node == target:
        return True
    visited.add(node)
    for neighbor in neighbors(node):
        if neighbor not in visited:
            if dfs(neighbor):
                return True
    return False`,
        visual: ['S', '1', '2', '3', '4', 'E'],
        animation: 'maze-dfs',
      },

      {
        id: '2',
        title: 'Maze — Backtracking / Enumeration',
        emoji: '🔁',
        color: '#7c3aed',
        complexity: 'Exponential (enumerating all paths)',
        reward: 'Notice the satisfying “try, undo, retry” rhythm of backtracking.',
        problem:
          'Find all valid paths from start to exit in a grid with blockers; enumerate solutions.',
        solution:
          'Backtracking tries moves, marks visited, recurses, and unmarks on return. Memoize dead-ends to prune repeated exploration.',
        concept: 'Try → mark → recurse → unmark; memoize dead-ends to prune.',
        pseudo: `def backtrack(node, path):
    if node == target:
        save(path)
        return
    for neighbor in neighbors(node):
        if is_valid(neighbor) and neighbor not in visited:
            visited.add(neighbor)
            backtrack(neighbor, path + [neighbor])
            visited.remove(neighbor)
`,
        visual: ['S', '1', '2', '3', '4', 'E'],
        animation: 'maze-backtrack',
      },

      {
        id: '3',
        title: 'Maze — BFS (Shortest path)',
        emoji: '📏',
        color: '#fb923c',
        complexity: 'O(m×n)',
        reward: 'Watch the wave spread until the shortest path lights up.',
        problem:
          'Find the minimum number of steps from start to exit where each step costs 1; grid may have blockers.',
        solution:
          'BFS explores level-by-level (wavefront); the first time you reach the target gives the shortest path. Use a queue and visited set.',
        concept: 'Breadth-first search (level expansion), track distance per node.',
        pseudo: `from collections import deque

def bfs(start):
    queue = deque([(start, 0)])
    visited.add(start)
    while queue:
        node, dist = queue.popleft()
        if node == target:
            return dist
        for neighbor in neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))`,
        visual: ['S', '1', '2', '3', '4', 'E'],
        animation: 'maze-bfs',
      },
    ],
  },
  {
    id: 'frog-jump',
    title: 'Jumping Frog (DP)',
    hook: 'Watch the count on each stone grow like a combo multiplier.',
    reward: 'Each step feels like earning a new combo score.',
    emoji: '🐸',
    color: '#10b981',
    complexity: 'O(n) with memoization',
    problem:
      'Count the number of ways a frog can reach the end given stones and allowed jumps.',
    solution:
      'Dynamic programming: ways[i] = sum(ways[j]) for reachable previous stones j. Memoize counts to avoid recomputation.',
    concept: 'DP accumulation, memoize subproblems into counts.',
    pseudo: `def frog_jumps(stones):
    dp = [0] * len(stones)
    dp[0] = 1
    for i in range(1, len(stones)):
        for j in range(i):
            if can_jump(stones[j], stones[i]):
                dp[i] += dp[j]
    return dp[-1]`,
    visual: ['S', '1', '2', '3', '4', 'E'],
    animation: 'stones',
  },

  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs (DP)',
    hook: 'Feel the climb as each new step unlocks twice the possibilities.',
    reward: 'The math feels like watching a level-up meter climb.',
    emoji: '🪜',
    color: '#f97316',
    complexity: 'O(n)',
    problem: 'Given n steps, count distinct ways to climb (1 or 2 steps).',
    solution:
      'Classic DP: ways[i] = ways[i-1] + ways[i-2]. Start with base cases and build up.',
    concept: 'Linear DP recurrence, cumulative counts.',
    pseudo: `def climb_stairs(n):
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
    visual: ['0', '1', '2', '3', '4', '5'],
    animation: 'stones',
  },

  {
    id: 'invert-tree',
    title: 'Binary Tree — Invert',
    hook: 'Relax into the symmetry: each swap feels like completing one satisfying flip.',
    reward: 'The inversion gives a clean “before and after” payoff every step.',
    emoji: '🌳',
    color: '#60a5fa',
    complexity: 'O(n)',
    problem:
      'Invert a binary tree (swap left/right children for every node).',
    solution:
      'Traverse the tree (preorder) and swap children at each node. Iterative or recursive works.',
    concept: 'Tree traversal (visit & mutate), preorder swap.',
    pseudo: `def invert(node):
    if not node:
        return None
    left = invert(node.left)
    right = invert(node.right)
    node.left, node.right = right, left
    return node`,
    visual: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    traversal: ['A', 'B', 'D', 'E', 'C', 'F', 'G'],
    animation: 'tree',
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder (Graph BFS)',
    hook: 'See how a word morphs one step at a time into the target.',
    reward: 'Every neighbor is a tiny jump closer to the final word.',
    emoji: '🔤',
    color: '#8b5cf6',
    complexity: 'O(V + E)',
    problem:
      'Transform one word into another by changing one letter at a time, using only valid dictionary words.',
    solution:
      'Use BFS on word transformations to find the minimum number of steps, expanding valid neighbors level by level.',
    concept: 'Graph BFS over implicit word states; shortest path in an unweighted graph.',
    visual: ['CAT', 'COT', 'COG', 'DOG', 'DOT', 'DAT'],
    animation: 'maze-bfs',
    pseudo: `from collections import deque

def ladder_length(begin, end, word_set):
    queue = deque([(begin, 1)])
    visited = {begin}
    while queue:
        word, steps = queue.popleft()
        if word == end:
            return steps
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                candidate = word[:i] + c + word[i+1:]
                if candidate in word_set and candidate not in visited:
                    visited.add(candidate)
                    queue.append((candidate, steps + 1))`,
  },
  {
    id: 'subset-sum',
    title: 'Partition Equal Subset Sum',
    hook: 'Feel how choices add up into a balanced split.',
    reward: 'Each stone either stays or moves; the balance appears one decision at a time.',
    emoji: '⚖️',
    color: '#ea580c',
    complexity: 'O(n × sum)',
    problem:
      'Determine if the array can be partitioned into two subsets with equal sum.',
    solution:
      'Use DP to track attainable subset sums, then check whether half the total sum is reachable.',
    concept: 'Subset-sum DP; build reachable sums from choices and reuse results.',
    pseudo: `def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    reachable = {0}
    for num in nums:
        reachable |= {x + num for x in reachable}
    return target in reachable`,
    visual: ['1', '5', '11', '5', '8', '9'],
    animation: 'stones',
  },
  {
    id: 'top-k',
    title: 'Top K Frequent Elements',
    hook: 'Watch the most common elements rise to the top.',
    reward: 'The most frequent values feel like trending hits, sorted naturally.',
    emoji: '📊',
    color: '#22c55e',
    complexity: 'O(n log k)',
    problem:
      'Return the k most frequent elements from an array.',
    solution:
      'Count frequencies with a hash map, then use a bucket or heap-like selection to surface the top k.',
    concept: 'Frequency counting + selection; use data structures to surface the heaviest hitters.',
    pseudo: `from collections import Counter

def top_k_frequent(nums, k):
    counts = Counter(nums)
    freq_buckets = [[] for _ in range(len(nums) + 1)]
    for num, cnt in counts.items():
        freq_buckets[cnt].append(num)
    result = []
    for i in range(len(freq_buckets) - 1, 0, -1):
        for num in freq_buckets[i]:
            result.append(num)
            if len(result) == k:
                return result`,
    visual: ['a', 'b', 'b', 'c', 'c', 'c'],
    animation: 'stones',
  },
  {
    id: 'min-window',
    title: 'Minimum Window Substring',
    hook: 'Enjoy the satisfying shrink-and-fit of the perfect window.',
    reward: 'Every edge contraction makes the answer tighter and more elegant.',
    emoji: '🔍',
    color: '#f43f5e',
    complexity: 'O(n)',
    problem:
      'Find the smallest substring containing all characters of a target string.',
    solution:
      'Use a sliding window to expand until all targets are included, then contract to find the minimum span.',
    concept: 'Sliding window expansion/contraction; keep just enough to cover the target.',
    pseudo: `from collections import Counter

def min_window(s, t):
    need = Counter(t)
    window = Counter()
    have = 0
    left = 0
    best = (float('inf'), None, None)
    for right, char in enumerate(s):
        window[char] += 1
        if window[char] == need[char]:
            have += 1
        while have == len(need):
            if right - left + 1 < best[0]:
                best = (right - left + 1, left, right)
            window[s[left]] -= 1
            if window[s[left]] < need[s[left]]:
                have -= 1
            left += 1
    return '' if best[1] is None else s[best[1]:best[2]+1]`,
    visual: ['A', 'B', 'C', 'A', 'B', 'C'],
    animation: 'maze-dfs',
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

const FlipCard = ({ item, children, small = false }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`flipContainer ${small ? 'small' : ''}`} onClick={() => setFlipped((prev) => !prev)}>
      <div className={`flipInner ${flipped ? 'flipped' : ''}`}>
        <div className="flipFront">{children}</div>
        <div className="flipBack">
          <div className="pseudoHeader">Pseudo code</div>
          <pre>{item.pseudo || 'No pseudocode available.'}</pre>
          <div className="flipHint">Tap to flip back</div>
        </div>
      </div>
    </div>
  );
};

const Subcard = ({ item }) => (
  <div className="subcard" style={{ backgroundColor: item.color }}>
    <FlipCard item={item} small>
      <div className="cardHeader small">
        <span className="emoji">{item.emoji}</span>
        <div>
          <h2 className="title small">{item.title}</h2>
          <p className="complexity small">{item.complexity}</p>
        </div>
      </div>
      <p className="description small">{item.problem}</p>
      {item.hook && <p className="hookText small">{item.hook}</p>}
      {item.reward && <p className="rewardLine small">{item.reward}</p>}
      <p className="concept small">
        Key: <strong>{item.concept}</strong>
      </p>
      <AnimatedIllustration item={item} />
    </FlipCard>
  </div>
);

const Card = ({ item, isActive }) => {
  // If this item groups subcards, render each subcard inside
  if (item.subcards && Array.isArray(item.subcards)) {
    return (
      <section
        id={`card-${item.id}`}
        className={`card ${isActive ? 'activeCard' : ''}`}
        style={{ backgroundColor: item.color }}
      >
        <div className="cardHeader">
          <span className="emoji">{item.emoji}</span>
          <div>
            <h1 className="title">{item.title}</h1>
            <p className="complexity">{item.complexity}</p>
          </div>
        </div>

        <p className="description">{item.problem}</p>
        {item.hook && <p className="hookText">{item.hook}</p>}
        {item.reward && <p className="rewardLine">{item.reward}</p>}
        <p className="concept">
          Key concept: <strong>{item.concept}</strong>
        </p>

        <div className="subcards">
          {item.subcards.map((sub) => (
            <Subcard key={sub.id} item={sub} />
          ))}
        </div>

        <p className="swipeText">Swipe Up ↑</p>
      </section>
    );
  }

  return (
    <section
      id={`card-${item.id}`}
      className={`card ${isActive ? 'activeCard' : ''}`}
      style={{ backgroundColor: item.color }}
    >
      <FlipCard item={item}>
        <div className="cardHeader">
          <span className="emoji">{item.emoji}</span>
          <div>
            <h1 className="title">{item.title}</h1>
            <p className="complexity">{item.complexity}</p>
          </div>
        </div>

        <p className="description">{item.problem}</p>
        {item.hook && <p className="hookText">{item.hook}</p>}
        <p className="concept">
          Key concept: <strong>{item.concept}</strong>
        </p>

        <AnimatedIllustration item={item} />
        <p className="swipeText">Swipe Up ↑</p>
      </FlipCard>
    </section>
  );
};

export default function App() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const idToIndex = Object.fromEntries(DATA.map((item, index) => [item.id, index]));
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        });
        if (best && best.isIntersecting) {
          const id = best.target.id.replace('card-', '');
          setActiveCard(idToIndex[id] ?? 0);
        }
      },
      { threshold: 0.55 }
    );

    document.querySelectorAll('.card').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const activeItem = DATA[activeCard];
  const progress = ((activeCard + 1) / DATA.length) * 100;

  return (
    <main className="pageWrapper">
      <div className="heroPanel">
        <div className="heroIntro">
          <span className="heroTag">Daily Algo Dose</span>
          <h1>Small bites. Smooth flow. No friction.</h1>
          <p className="heroText">
            Each card is designed to be calming, satisfying, and quick enough to feel like a reward, not more work.
          </p>
          <p className="heroFocus">Now: {activeItem.reward || activeItem.hook}</p>
        </div>

        <div className="progressShell">
          <div className="progressInfo">
            <strong>{activeCard + 1}/{DATA.length}</strong> {activeItem.title}
          </div>
          <div className="progressBar">
            <div className="progressFill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="cardsList">
        {DATA.map((item, index) => (
          <Card key={item.id} item={item} isActive={index === activeCard} />
        ))}
      </div>
    </main>
  );
}
