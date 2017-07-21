/**
 * "Views" for updating HTML.
 *
 * For this project, we're mostly just toggling classes and not even
 * adding/removing DOM elements, but these functions are the places
 * where we would manipulate the DOM.
 */
import { addClass, removeClass } from './util';

export const categories = function categoriesView(el, state) {
  state.categories.forEach((category) => {
    const classFn = category.collapsed ? addClass : removeClass;

    const categoryNameEl = el.querySelectorAll(
      `.category[data-slug="${category.slug}"] .category__name`,
    );
    classFn(categoryNameEl, 'category__name--collapsed');
  });

  return el;
};

export const recommendations = function recommendationsView(el, state) {
  state.recommendations.forEach((r) => {
    let classFn = r.collapsed ? addClass : removeClass;

    const gistEl = el.querySelectorAll(
      `.recommendation[data-id="${r.id}"] .recommendation__gist`,
    );
    classFn(gistEl, 'recommendation__gist--collapsed');

    const recommendationEls = el.querySelectorAll(
      `.recommendation[data-id="${r.id}"]`,
    );
    classFn(recommendationEls, 'recommendation--collapsed');

    const category = state.categoryLookup[r.category];
    classFn = category.collapsed ? addClass : removeClass;
    classFn(recommendationEls, 'recommendation--category-collapsed');

    classFn = !state.statuses.has(r.status) ? addClass : removeClass;
    classFn(recommendationEls, 'recommendation--hidden');
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

