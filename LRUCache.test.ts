import { describe, it, expect, beforeEach, vi, afterEach, test } from "vitest";
import { LRUCache } from "./LRUCache.ts";

describe("LRUCache", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should store and retrieve values", () => {
    const cache = new LRUCache(3);
    cache.set("key1", "value1", 1000);
    expect(cache.get("key1")).toBe("value1");
  });

  it("should return null for non-existent keys", () => {
    const cache = new LRUCache(3);
    expect(cache.get("non-existent")).toBeNull();
  });

  it("should evict the least recently used item when capacity is reached", () => {
    const cache = new LRUCache(2);
    cache.set("a", 1, 5000);
    cache.set("b", 2, 5000);

    // Usage order: a, b (b is newest)
    cache.get("a"); // Usage order: b, a (a is newest)

    cache.set("c", 3, 5000); // Should evict 'b'

    expect(cache.get("a")).toBe(1);
    expect(cache.get("c")).toBe(3);
    expect(cache.get("b")).toBeNull();
  });

  it("should expire entries after TTL", () => {
    const cache = new LRUCache(3);
    cache.set("key1", "value1", 1000);

    vi.advanceTimersByTime(500);
    expect(cache.get("key1")).toBe("value1");

    vi.advanceTimersByTime(501); // Total 1001ms
    expect(cache.get("key1")).toBeNull();
  });

  it("should refresh usage order on get", () => {
    const cache = new LRUCache(2);
    cache.set("a", 1, 5000);
    cache.set("b", 2, 5000); // 'b' is now most recent

    cache.get("a"); // 'a' is now most recent and 'b' is least recent
    cache.set("c", 3, 5000); // 'b' should be evicted

    expect(cache.get("b")).toBeNull();
    expect(cache.get("a")).toBe(1);
    expect(cache.get("c")).toBe(3);
  });

  it("should refresh usage order on set of existing key", () => {
    const cache = new LRUCache(2);
    cache.set("a", 1, 5000);
    cache.set("b", 2, 5000);

    cache.set("a", 10, 5000); // 'a' is now most recent
    cache.set("c", 3, 5000); // 'b' should be evicted

    expect(cache.get("b")).toBeNull();
    expect(cache.get("a")).toBe(10);
    expect(cache.get("c")).toBe(3);
  });

  it("should remove expired entries when setting a new one", () => {
    const cache = new LRUCache(2);
    cache.set("a", 1, 1000);

    vi.advanceTimersByTime(1100);

    // 'a' is expired but still in the Map until a cleanup happens
    cache.set("b", 2, 5000);
    cache.set("c", 3, 5000);

    // Since 'a' was expired and removed during set('b', ...),
    // capacity should allow both 'b' and 'c'
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
  });

  test("should print all entries in the cache", () => {
    const cache = new LRUCache(2);
    cache.set("a", 1, 5000);
    cache.set("b", 2, 5000);

    // Capture console output
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    cache.print();

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith("a", {
      value: 1,
      expiresAt: Date.now() + 5000,
    });
    expect(consoleSpy).toHaveBeenCalledWith("b", {
      value: 2,
      expiresAt: Date.now() + 5000,
    });
  });
});
