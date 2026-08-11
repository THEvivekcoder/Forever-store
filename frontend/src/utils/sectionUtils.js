/**
 * Utility functions for filtering products into homepage sections
 * and toggling section keys in the admin form state.
 */

/**
 * Filters the products array to those belonging to the given section key,
 * returning at most 8 results. Does not mutate the input array.
 *
 * @param {Array<Object>} products - The full array of product objects from ShopContext.
 * @param {string} sectionKey - One of "men", "women", or "essentials".
 * @returns {Array<Object>} Up to 8 products whose `homeSection` includes `sectionKey`.
 */
export function filterProductsBySection(products, sectionKey) {
  return products
    .filter(
      (p) => Array.isArray(p.homeSection) && p.homeSection.includes(sectionKey)
    )
    .slice(0, 8);
}

/**
 * Toggles the presence of `sectionKey` in the `sections` array.
 * Returns a new array — never mutates the input.
 *
 * - If `sectionKey` is absent, it is appended to the result.
 * - If `sectionKey` is present, it is removed from the result.
 * All other elements are preserved unchanged.
 *
 * @param {string[]} sections - Current array of selected section keys.
 * @param {string} sectionKey - The section key to add or remove.
 * @returns {string[]} New array with the toggle applied.
 */
export function toggleHomeSection(sections, sectionKey) {
  if (sections.includes(sectionKey)) {
    return sections.filter((s) => s !== sectionKey);
  }
  return [...sections, sectionKey];
}
