import type { CodeSnippet } from '../types'

export const sampleSnippets: CodeSnippet[] = [
  {
    id: 'sample-1',
    title: 'Debounce Function',
    description: 'Delays function execution until after a specified wait time has elapsed since the last call. Useful for search inputs and resize events.',
    language: 'JavaScript',
    code: `function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Usage
const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);`,
    tags: ['utility', 'performance', 'events'],
    isFavorite: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'sample-2',
    title: 'Flatten Nested Array',
    description: 'Recursively flattens a deeply nested array into a single-level array.',
    language: 'JavaScript',
    code: `function flattenArray(arr) {
  return arr.reduce((flat, item) =>
    flat.concat(Array.isArray(item) ? flattenArray(item) : item), []);
}

// Usage
const nested = [1, [2, [3, [4]], 5]];
console.log(flattenArray(nested)); // [1, 2, 3, 4, 5]`,
    tags: ['array', 'utility', 'recursion'],
    isFavorite: false,
    createdAt: '2024-01-20T09:30:00Z',
    updatedAt: '2024-01-20T09:30:00Z',
  },
  {
    id: 'sample-3',
    title: 'Generic useLocalStorage Hook',
    description: 'A reusable React hook that syncs state with localStorage, with JSON serialization and error handling.',
    language: 'TypeScript',
    code: `import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;`,
    tags: ['react', 'hooks', 'storage', 'typescript'],
    isFavorite: true,
    createdAt: '2024-02-01T14:00:00Z',
    updatedAt: '2024-02-01T14:00:00Z',
  },
  {
    id: 'sample-4',
    title: 'SQL: Find Duplicate Rows',
    description: 'Query to find and count duplicate entries in a table based on one or more columns.',
    language: 'SQL',
    code: `SELECT
  email,
  COUNT(*) AS occurrences
FROM users
GROUP BY email
HAVING COUNT(*) > 1
ORDER BY occurrences DESC;`,
    tags: ['sql', 'query', 'duplicates', 'database'],
    isFavorite: false,
    createdAt: '2024-02-10T11:00:00Z',
    updatedAt: '2024-02-10T11:00:00Z',
  },
  {
    id: 'sample-5',
    title: 'Python: Read and Parse JSON File',
    description: 'Read a JSON file from disk and handle common errors like missing file or invalid JSON.',
    language: 'Python',
    code: `import json
import os

def read_json_file(filepath: str) -> dict:
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"File not found: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON in {filepath}: {e}")

# Usage
data = read_json_file('config.json')
print(data)`,
    tags: ['python', 'json', 'file-io', 'error-handling'],
    isFavorite: true,
    createdAt: '2024-02-15T16:30:00Z',
    updatedAt: '2024-02-15T16:30:00Z',
  },
  {
    id: 'sample-6',
    title: 'CSS: Responsive Card Grid',
    description: 'A responsive grid layout for cards using CSS Grid with auto-fill and minmax.',
    language: 'CSS',
    code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}`,
    tags: ['css', 'grid', 'responsive', 'layout'],
    isFavorite: false,
    createdAt: '2024-03-01T08:00:00Z',
    updatedAt: '2024-03-01T08:00:00Z',
  },
  {
    id: 'sample-7',
    title: 'TypeScript: Deep Clone Object',
    description: 'Type-safe deep clone utility using JSON serialization. Works for plain objects without functions or undefined values.',
    language: 'TypeScript',
    code: `function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Usage
interface User {
  name: string;
  address: { city: string; zip: string };
}

const original: User = { name: 'Alice', address: { city: 'Berlin', zip: '10115' } };
const clone = deepClone(original);
clone.address.city = 'Munich';

console.log(original.address.city); // 'Berlin' (unaffected)
console.log(clone.address.city);    // 'Munich'`,
    tags: ['typescript', 'utility', 'object', 'clone'],
    isFavorite: false,
    createdAt: '2024-03-05T13:00:00Z',
    updatedAt: '2024-03-05T13:00:00Z',
  },
  {
    id: 'sample-8',
    title: 'HTML: Accessible Modal Structure',
    description: 'Semantic HTML structure for an accessible modal dialog with ARIA attributes.',
    language: 'HTML',
    code: `<div
  id="modal-backdrop"
  class="modal-backdrop"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <div class="modal-content">
    <header class="modal-header">
      <h2 id="modal-title">Dialog Title</h2>
      <button
        class="modal-close"
        aria-label="Close dialog"
        type="button"
      >
        &times;
      </button>
    </header>
    <div id="modal-description" class="modal-body">
      <p>Modal content goes here.</p>
    </div>
    <footer class="modal-footer">
      <button type="button" class="btn-primary">Confirm</button>
      <button type="button" class="btn-secondary">Cancel</button>
    </footer>
  </div>
</div>`,
    tags: ['html', 'modal', 'accessibility', 'aria'],
    isFavorite: false,
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 'sample-9',
    title: 'Python: Retry Decorator',
    description: 'A decorator that automatically retries a function on failure with configurable attempts and delay.',
    language: 'Python',
    code: `import time
import functools

def retry(max_attempts: int = 3, delay: float = 1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_error = None
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
                    print(f"Attempt {attempt} failed: {e}")
                    if attempt < max_attempts:
                        time.sleep(delay)
            raise last_error
        return wrapper
    return decorator

# Usage
@retry(max_attempts=3, delay=0.5)
def fetch_data(url: str):
    # Simulate network call
    raise ConnectionError("Timeout")`,
    tags: ['python', 'decorator', 'error-handling', 'retry'],
    isFavorite: true,
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
  },
  {
    id: 'sample-10',
    title: 'TypeScript: Group Array by Key',
    description: 'Groups an array of objects by a specified key, returning a record of arrays.',
    language: 'TypeScript',
    code: `function groupBy<T, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T[]> {
  return arr.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// Usage
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Carol', role: 'admin' },
];

const grouped = groupBy(users, 'role');
// { admin: [{...}, {...}], user: [{...}] }`,
    tags: ['typescript', 'array', 'utility', 'groupBy'],
    isFavorite: false,
    createdAt: '2024-04-01T12:00:00Z',
    updatedAt: '2024-04-01T12:00:00Z',
  },
  {
    id: 'sample-11',
    title: 'Java: Read File to String',
    description: 'Read the entire content of a file into a string using Java NIO, with UTF-8 encoding.',
    language: 'Java',
    code: `import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.charset.StandardCharsets;
import java.io.IOException;

public class FileReader {
    public static String readFile(String filepath) throws IOException {
        Path path = Path.of(filepath);
        return Files.readString(path, StandardCharsets.UTF_8);
    }

    public static void main(String[] args) {
        try {
            String content = readFile("data.txt");
            System.out.println(content);
        } catch (IOException e) {
            System.err.println("Error reading file: " + e.getMessage());
        }
    }
}`,
    tags: ['java', 'file-io', 'nio', 'utility'],
    isFavorite: false,
    createdAt: '2024-04-10T15:00:00Z',
    updatedAt: '2024-04-10T15:00:00Z',
  },
  {
    id: 'sample-12',
    title: 'SQL: Pagination Query',
    description: 'Standard SQL pagination using LIMIT and OFFSET for page-based data fetching.',
    language: 'SQL',
    code: `-- Page 1: rows 1-10
-- Page 2: rows 11-20
-- Formula: OFFSET = (page - 1) * pageSize

SELECT
  id,
  title,
  created_at
FROM posts
WHERE is_published = TRUE
ORDER BY created_at DESC
LIMIT 10
OFFSET 20; -- Page 3`,
    tags: ['sql', 'pagination', 'query', 'performance'],
    isFavorite: false,
    createdAt: '2024-04-20T11:00:00Z',
    updatedAt: '2024-04-20T11:00:00Z',
  },
]
