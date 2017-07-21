/**
 * "Views" for updating HTML.
 *
 * For this project, we're mostly just toggling classes and not even
 * adding/removing DOM elements, but these functions are the places
 * where we would manipulate the DOM.
 */
import { addClass, removeClass, setClass } from './util';

export const categories = function categoriesView(el, state) {
  state.categories.items.forEach((category) => {
    const categoryNameEl = el.querySelectorAll(
      `.category[data-slug="${category.slug}"] .category__name`,
    );
    setClass(categoryNameEl, 'category__name--collapsed', category.collapsed);
  });

  return el;
};

export const recommendations = function recommendationsView(el, state) {
  state.recommendations.items.forEach((r) => {
    const gistEl = el.querySelectorAll(
      `.recommendation[data-id="${r.id}"] .recommendation__gist`,
    );
    const recommendationEls = el.querySelectorAll(
      `.recommendation[data-id="${r.id}"]`,
    );
    const category = state.categories.byName[r.category];

    setClass(gistEl, 'recommendation__gist--collapsed', r.collapsed);

    setClass(recommendationEls, 'recommendation--collapsed', r.collapsed);
    setClass(recommendationEls, 'recommendation--category-collapsed', category.collapsed);
    setClass(recommendationEls, 'recommendation--hidden', !state.statuses.has(r.status));
  });

  return el;
};

export const statusFilters = function statusFiltersView(el, state) {
  removeClass(
    el.querySelectorAll('.status-filter'),
    'status-filter--selected',
  );

  state.statuses.forEach((statusFilter) => {
    addClass(
      el.querySelectorAll(
        `.status-filter[data-status="${statusFilter}"]`,
      ),
      'status-filter--selected',
    );
  });

  return el;
};
