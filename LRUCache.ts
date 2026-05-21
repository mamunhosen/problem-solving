export type CachePrimitive = string | number;

export type CacheEntry = {
  value: CachePrimitive;
  expiresAt: number;
};

export class LRUCache {
  #entries: Map<string, CacheEntry>;
  #capacity: number;

  constructor(capacity: number) {
    this.#entries = new Map();
    this.#capacity = capacity;
  }

  set(key: string, value: CachePrimitive, ttlMs: number): void {
    const cacheEntry: CacheEntry = {
      value,
      expiresAt: Date.now() + ttlMs,
    };

    // Remove existing entry to refresh insertion order
    if (this.#entries.has(key)) {
      this.#entries.delete(key);
    }

    this.#removeExpiredEntries();
    this.#evictLeastRecentlyUsed();

    this.#entries.set(key, cacheEntry);
  }

  get(key: string): CachePrimitive | null {
    const cacheEntry = this.#entries.get(key);

    if (!cacheEntry) {
      return null;
    }

    if (this.#hasExpired(cacheEntry)) {
      this.#entries.delete(key);
      return null;
    }

    // Refresh usage order
    this.#entries.delete(key);
    this.#entries.set(key, cacheEntry);

    return cacheEntry.value;
  }

  #hasExpired(entry: CacheEntry): boolean {
    return Date.now() > entry.expiresAt;
  }

  #removeExpiredEntries(): void {
    for (const [key, entry] of this.#entries) {
      if (this.#hasExpired(entry)) {
        this.#entries.delete(key);
      }
    }
  }

  #evictLeastRecentlyUsed(): void {
    if (this.#entries.size < this.#capacity) {
      return;
    }

    const leastRecentlyUsedKey = this.#entries.keys().next().value;

    if (leastRecentlyUsedKey !== undefined) {
      this.#entries.delete(leastRecentlyUsedKey);
    }
  }

  print(): void {
    for (const [key, entry] of this.#entries) {
      console.log(key, entry);
    }
  }
}
