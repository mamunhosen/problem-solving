class Cache {
  constructor(limit) {
    this.cache = new Map();
    this.limit = limit;
    this.timer = setInterval(() => {
      this.#clearExpiredEntries();
    }, 1000);
  }

  set(key, value, ttl) {
    const now = Date.now();
    const entry = { value, expiry: now + ttl };

    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // remove expired entries
    this.#clearExpiredEntries();

    // envict LRU
    if (this.cache.size === this.limit) {
      this.#envictLRU();
    }

    // add new entry
    this.cache.set(key, entry);
  }

  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (this.#isExpired(entry)) {
      this.cache.delete(key);
      return null;
    }

    // Refresh usage
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.value;
  }

  #clearExpiredEntries() {
    const now = Date.now();
    for (let [key, entry] of this.cache) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
  }

  #isExpired(entry) {
    return Date.now() > entry.expiry;
  }

  #envictLRU() {
    const key = this.cache.keys().next().value;
    this.cache.delete(key);
  }

  clearTimer() {
    clearInterval(this.timer);
  }

  print() {
    for (let [key, entry] of this.cache) {
      console.log(key, entry);
    }
  }
}

const cache = new Cache(3);

cache.set("a", 1, 5000); // 5s
cache.set("b", 2, 3000); // 3s
cache.set("c", 3, 4000); // 4s

setTimeout(() => {
  cache.get("a"); // refreshes 'a'
  cache.set("d", 4, 5000); // evicts least recently used non-expired (likely 'b')
  cache.print();
  cache.clearTimer();
}, 4000);
