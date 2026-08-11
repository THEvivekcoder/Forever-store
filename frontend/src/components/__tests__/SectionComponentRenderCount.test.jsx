/**
 * Property-based test for section component render count.
 *
 * Property 7: Section component renders exactly the filtered products
 *   For any section key and products array, the number of product cards
 *   rendered by the corresponding section component equals
 *   filterProductsBySection(products, sectionKey).length.
 *
 * **Validates: Requirements 5.1, 6.1, 7.1**
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as fc from 'fast-check';

import { ShopContext } from '../../context/ShopContext';
import MenSection from '../MenSection';
import WomenSection from '../WomenSection';
import EssentialsSection from '../EssentialsSection';
import { filterProductsBySection } from '../../utils/sectionUtils';

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Map section key → section component */
const SECTION_COMPONENTS = {
  men: MenSection,
  women: WomenSection,
  essentials: EssentialsSection,
};

/**
 * Minimal ShopContext value. ProductItem reads `currency` from context,
 * so we must provide it. All other fields are unused by section components.
 */
const makeContextValue = (products) => ({
  products,
  currency: '₹',
  delivery_fee: 10,
  search: '',
  showSearch: false,
  cartItems: {},
  addToCart: () => {},
  setCartItems: () => {},
  getCartCount: () => 0,
  updateQuantity: () => {},
  getCartAmount: () => 0,
  navigate: () => {},
  backendUrl: '',
  setToken: () => {},
  token: '',
});

/**
 * Renders a section component with the given products injected via ShopContext.
 * Wraps in MemoryRouter because ProductItem renders <Link> elements.
 */
function renderSection(SectionComponent, products) {
  return render(
    <MemoryRouter>
      <ShopContext.Provider value={makeContextValue(products)}>
        <SectionComponent />
      </ShopContext.Provider>
    </MemoryRouter>
  );
}

// ── Arbitraries ────────────────────────────────────────────────────────────────

const SECTION_KEYS = ['men', 'women', 'essentials'];

/** Arbitrary for one of the three valid section keys */
const sectionKeyArb = fc.constantFrom(...SECTION_KEYS);

/**
 * Arbitrary for a product-like object.
 * Products can have:
 *   - a homeSection array with valid section keys (will appear in sections)
 *   - a homeSection array with other strings (won't appear)
 *   - no homeSection field / null / undefined (won't appear)
 */
const productArb = fc
  .record({
    _id: fc.string({ minLength: 1, maxLength: 24 }),
    name: fc.string({ minLength: 1, maxLength: 30 }),
    price: fc.nat({ max: 9999 }),
    // Provide a minimal image array so ProductItem's image[0] access is safe
    image: fc.constant(['https://via.placeholder.com/150']),
  })
  .chain((base) =>
    fc.oneof(
      // homeSection contains random valid section keys (the "matching" case)
      fc
        .array(sectionKeyArb, { minLength: 1, maxLength: 3 })
        .map((hs) => ({ ...base, homeSection: hs })),
      // homeSection is empty — no section (won't match any key)
      fc.constant({ ...base, homeSection: [] }),
      // homeSection has non-matching strings
      fc
        .array(fc.string({ minLength: 1, maxLength: 10 }).filter((s) => !SECTION_KEYS.includes(s)), {
          minLength: 1,
          maxLength: 3,
        })
        .map((hs) => ({ ...base, homeSection: hs })),
      // no homeSection field at all
      fc.constant({ ...base }),
      // null / undefined homeSection
      fc.constant({ ...base, homeSection: null }),
    )
  );

/** Arbitrary for an array of up to 20 products */
const productsArb = fc.array(productArb, { minLength: 0, maxLength: 20 });

// ── Property 7 ────────────────────────────────────────────────────────────────

describe('Section component render count — Property 7', () => {
  it(
    'Property 7: rendered card count equals filterProductsBySection result length for any products and section key',
    () => {
      fc.assert(
        fc.property(sectionKeyArb, productsArb, (sectionKey, products) => {
          const SectionComponent = SECTION_COMPONENTS[sectionKey];
          const expectedCount = filterProductsBySection(products, sectionKey).length;

          const { unmount } = renderSection(SectionComponent, products);

          if (expectedCount === 0) {
            // Component renders null — no product name elements should be present
            // We query for Links (each ProductItem is a <Link>) via role=link scoped
            // to what would be product cards; expect none.
            const links = screen.queryAllByRole('link');
            expect(links.length).toBe(0);
          } else {
            // Each ProductItem renders as a <Link> (role="link").
            // There should be exactly expectedCount links.
            const links = screen.getAllByRole('link');
            expect(links.length).toBe(expectedCount);
          }

          unmount();
        }),
        { numRuns: 200 }
      );
    }
  );
});
