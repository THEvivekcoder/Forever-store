/**
 * Property-based tests for filterProductsBySection
 *
 * Validates: Requirements 4.1, 4.2, 4.3
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { filterProductsBySection } from './sectionUtils.js';

// ── Arbitraries ────────────────────────────────────────────────────────────────

const SECTION_KEYS = ['men', 'women', 'essentials'];

/** Arbitrary for a valid section key */
const sectionKeyArb = fc.constantFrom(...SECTION_KEYS);

/**
 * Arbitrary for a product-like object. Each product may have:
 *   - homeSection that is an array (with random mix of valid/invalid section keys)
 *   - homeSection that is null / undefined / a non-array value
 *   - no homeSection field at all
 */
const productArb = fc.record({
  _id: fc.string({ minLength: 1, maxLength: 24 }),
  name: fc.string(),
  price: fc.nat(),
}, { withDeletedKeys: false }).chain((base) =>
  fc.oneof(
    // Array with random selection of section keys (0-3 items)
    fc.array(sectionKeyArb, { minLength: 0, maxLength: 3 }).map((hs) => ({ ...base, homeSection: hs })),
    // Array with totally random strings (not necessarily valid keys)
    fc.array(fc.string(), { minLength: 0, maxLength: 3 }).map((hs) => ({ ...base, homeSection: hs })),
    // null
    fc.constant({ ...base, homeSection: null }),
    // undefined (field explicitly set to undefined)
    fc.constant({ ...base, homeSection: undefined }),
    // non-array scalar
    fc.oneof(fc.string(), fc.integer(), fc.boolean()).map((v) => ({ ...base, homeSection: v })),
    // field absent entirely
    fc.constant({ ...base }),
  )
);

/** Arbitrary for an array of products */
const productsArb = fc.array(productArb, { minLength: 0, maxLength: 30 });

// ── Property 1: Section filter correctness ────────────────────────────────────
//
// Every product returned by filterProductsBySection(products, sectionKey) MUST
// have a homeSection array that includes sectionKey (Requirement 4.1).
// Products without a homeSection field, or with a non-array homeSection, MUST
// be excluded (Requirement 4.3).

describe('filterProductsBySection — property tests', () => {
  it(
    'Property 1: every returned product has homeSection array containing the section key',
    () => {
      fc.assert(
        fc.property(productsArb, sectionKeyArb, (products, sectionKey) => {
          const result = filterProductsBySection(products, sectionKey);

          // Every item in the result must satisfy both conditions:
          //   1. homeSection is an array (Req 4.3 — non-arrays are excluded)
          //   2. homeSection includes the sectionKey (Req 4.1)
          for (const product of result) {
            expect(Array.isArray(product.homeSection)).toBe(true);
            expect(product.homeSection).toContain(sectionKey);
          }
        }),
        { numRuns: 1000 }
      );
    }
  );

  it(
    'Property 1b: products without homeSection field are excluded',
    () => {
      fc.assert(
        fc.property(sectionKeyArb, (sectionKey) => {
          // Build a products array where none have a matching homeSection
          const products = [
            { _id: '1', name: 'A' },                            // no homeSection
            { _id: '2', name: 'B', homeSection: null },         // null
            { _id: '3', name: 'C', homeSection: undefined },    // undefined
            { _id: '4', name: 'D', homeSection: [] },           // empty array
            { _id: '5', name: 'E', homeSection: 'men' },        // string, not array
            { _id: '6', name: 'F', homeSection: 42 },           // number, not array
          ];
          const result = filterProductsBySection(products, sectionKey);
          expect(result).toHaveLength(0);
        }),
        { numRuns: 3 }  // deterministic, just run for each key
      );
    }
  );

  it(
    'Property 1c: products whose homeSection contains the key are always included (up to cap)',
    () => {
      fc.assert(
        fc.property(
          sectionKeyArb,
          fc.array(
            fc.record({ _id: fc.string({ minLength: 1 }), name: fc.string() }).map((base) => ({
              ...base,
              homeSection: [SECTION_KEYS[0], SECTION_KEYS[1], SECTION_KEYS[2]], // all keys
            })),
            { minLength: 1, maxLength: 20 }
          ),
          (sectionKey, products) => {
            const result = filterProductsBySection(products, sectionKey);
            // All products qualify, so result should be min(products.length, 8)
            expect(result.length).toBe(Math.min(products.length, 8));
            // And every result item must contain the key
            for (const p of result) {
              expect(p.homeSection).toContain(sectionKey);
            }
          }
        ),
        { numRuns: 500 }
      );
    }
  );

  // ── Property 2: Section filter display limit ────────────────────────────────
  //
  // For ANY products array (regardless of size, including very large arrays),
  // filterProductsBySection must return AT MOST 8 products. (Requirement 4.2)
  //
  // Validates: Requirements 4.2

  it(
    'Property 2: result length is always ≤ 8 for any products array and any section key',
    () => {
      fc.assert(
        fc.property(
          // Use a large upper bound to stress-test the slice cap
          fc.array(productArb, { minLength: 0, maxLength: 100 }),
          sectionKeyArb,
          (products, sectionKey) => {
            const result = filterProductsBySection(products, sectionKey);
            expect(result.length).toBeLessThanOrEqual(8);
          }
        ),
        { numRuns: 1000 }
      );
    }
  );

  // ── Property 3: Section filter does not mutate input ──────────────────────
  //
  // After calling filterProductsBySection, the original products array must be
  // reference-identical (same object) and deeply equal (same length, same
  // elements, same references) to what it was before the call. (Requirement 4.4)
  //
  // Validates: Requirements 4.4

  it(
    'Property 3: filterProductsBySection does not mutate the original products array',
    () => {
      fc.assert(
        fc.property(
          fc.array(productArb, { minLength: 0, maxLength: 30 }),
          sectionKeyArb,
          (products, sectionKey) => {
            // Capture a snapshot of the original array before the call
            const originalLength = products.length;
            const originalRefs = [...products]; // shallow copy of references

            filterProductsBySection(products, sectionKey);

            // 1. Same length — no elements were added or removed
            expect(products.length).toBe(originalLength);

            // 2. Same element references at every index — no items were replaced
            for (let i = 0; i < originalLength; i++) {
              expect(products[i]).toBe(originalRefs[i]);
            }
          }
        ),
        { numRuns: 1000 }
      );
    }
  );
});

// ── toggleHomeSection — property tests ────────────────────────────────────────
//
// **Validates: Requirements 9.1, 9.2, 9.3, 9.4**

import { toggleHomeSection } from './sectionUtils.js';

/**
 * Arbitrary for a string section key (any non-empty string, so we also test
 * non-standard keys and confirm the function is key-agnostic).
 */
const anyKeyArb = fc.string({ minLength: 1, maxLength: 20 });

/**
 * Arbitrary for a string array (the "sections" state array).
 * Elements are arbitrary non-empty strings.
 */
const sectionsArb = fc.array(fc.string({ minLength: 1, maxLength: 20 }), {
  minLength: 0,
  maxLength: 10,
});

describe('toggleHomeSection — property tests', () => {
  // ── Property 4: Toggle adds absent section and preserves others ─────────────
  //
  // For any `sections` array that does NOT contain `key`, calling
  // toggleHomeSection(sections, key) must:
  //   - return a new array that CONTAINS `key` (Requirement 9.1)
  //   - still contain every element that was in the original array (Requirement 9.3)
  //
  // Validates: Requirements 9.1, 9.3

  it(
    'Property 4: toggleHomeSection adds a key absent from the array and preserves all existing elements',
    () => {
      fc.assert(
        fc.property(
          // Build a sections array that is guaranteed NOT to contain the key
          anyKeyArb.chain((key) =>
            fc
              .array(
                fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s !== key),
                { minLength: 0, maxLength: 10 }
              )
              .map((sections) => ({ sections, key }))
          ),
          ({ sections, key }) => {
            const result = toggleHomeSection(sections, key);

            // 9.1 — the key must now be present
            expect(result).toContain(key);

            // 9.3 — every original element is preserved
            for (const existing of sections) {
              expect(result).toContain(existing);
            }

            // Sanity: result is exactly one element longer
            expect(result.length).toBe(sections.length + 1);
          }
        ),
        { numRuns: 1000 }
      );
    }
  );

  // ── Property 5: Toggle removes present section and preserves others ─────────
  //
  // For any `sections` array that CONTAINS `key`, calling
  // toggleHomeSection(sections, key) must:
  //   - return a new array that does NOT contain `key` (Requirement 9.2)
  //   - still contain every other element (Requirement 9.3)
  //
  // Validates: Requirements 9.2, 9.3

  it(
    'Property 5: toggleHomeSection removes a key present in the array and preserves all other elements',
    () => {
      fc.assert(
        fc.property(
          // Build a sections array that is guaranteed to contain the key at least once
          anyKeyArb.chain((key) =>
            fc
              .array(
                fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s !== key),
                { minLength: 0, maxLength: 9 }
              )
              .chain((others) =>
                // Insert the key at a random position
                fc
                  .integer({ min: 0, max: others.length })
                  .map((pos) => {
                    const sections = [...others];
                    sections.splice(pos, 0, key);
                    return { sections, key, others };
                  })
              )
          ),
          ({ sections, key, others }) => {
            const result = toggleHomeSection(sections, key);

            // 9.2 — the key must no longer be present
            expect(result).not.toContain(key);

            // 9.3 — every OTHER element is preserved
            for (const other of others) {
              expect(result).toContain(other);
            }

            // Sanity: result is exactly one element shorter
            expect(result.length).toBe(sections.length - 1);
          }
        ),
        { numRuns: 1000 }
      );
    }
  );

  // ── Property 6: Toggle round-trip ───────────────────────────────────────────
  //
  // For any `sections` array and any `key`, applying toggleHomeSection twice
  // with the same key must produce an array that is deeply equal to the original.
  //
  // Validates: Requirements 9.4

  it(
    'Property 6: double-toggling the same key returns an array equivalent to the original',
    () => {
      fc.assert(
        fc.property(sectionsArb, anyKeyArb, (sections, key) => {
          const onceToggled = toggleHomeSection(sections, key);
          const twiceToggled = toggleHomeSection(onceToggled, key);

          // The round-tripped array must contain the same elements as the
          // original (set equivalence). Order is not guaranteed because
          // toggleHomeSection appends the key at the end when re-adding it,
          // but every element present in `sections` must appear in
          // `twiceToggled` and vice-versa.
          expect(twiceToggled.length).toBe(sections.length);
          expect([...twiceToggled].sort()).toEqual([...sections].sort());
        }),
        { numRuns: 1000 }
      );
    }
  );
});
