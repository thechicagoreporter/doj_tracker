
import { createStore } from 'redux';
import { toggleStatusFilter, toggleCategory, toggleRecommendation } from './actions';
import { trackerApp } from './reducers';
import { addClass, removeClass, addEventListener } from './util';

import './index.scss';

function getStatusFromEl(el) {
  return el.getAttribute('data-status');
}

const renderCategories = function categoriesRenderer(el, state) {
  state.categories.forEach((category) => {
    let classFn = removeClass;

    if (category.collapsed) {
      classFn = addClass;
    }

    const categoryNameEl = el.querySelectorAll(
      `.category[data-slug="${category.slug}"] .category__name`,
    );
    classFn(categoryNameEl, 'category__name--collapsed');

    const recommendationEls = el.querySelectorAll(
      `.category[data-slug="${category.slug}"] .recommendation`,
    );
    classFn(recommendationEls, 'recommendation--category-collapsed');
  });

  return el;
};

const applyStatusFilters = function statusFilterRenderer(el, state) {
  addClass(
    el.querySelectorAll('.recommendation'),
    'recommendation--hidden',
  );

  removeClass(
    el.querySelectorAll('.status-filter'),
    'status-filter--selected',
  );

  state.statuses.forEach((statusFilter) => {
    removeClass(
      el.querySelectorAll(
        `.recommendation[data-status="${statusFilter}"]`,
      ),
      'recommendation--hidden',
    );

    addClass(
      el.querySelectorAll(
        `.status-filter[data-status="${statusFilter}"]`,
      ),
      'status-filter--selected',
    );
  });

  return el;
};

const renderRecommendations = function recommendationRenderer(el, state) {
  state.recommendations.forEach((r) => {
    const classFn = r.collapsed ? addClass : removeClass;

    const categoryNameEl = el.querySelectorAll(
      `.recommendation[data-id="${r.id}"] .recommendation__gist`,
    );
    classFn(categoryNameEl, 'recommendation__gist--collapsed');

    const recommendationEls = el.querySelectorAll(
      `.recommendation[data-id="${r.id}"]`,
    );
    classFn(recommendationEls, 'recommendation--collapsed');
  });

  return el;
};

// eslint-disable-next-line import/prefer-default-export
export class App {
  constructor(container) {
    this.container = container;

    this.store = createStore(trackerApp, this.getInitialState());

    this.store.subscribe(this.render.bind(this));

    addEventListener(
      this.container.querySelectorAll('.category__name a'),
      'click',
      this.clickCategoryName.bind(this),
    );

    addEventListener(
      this.container.querySelectorAll('.status-filter'),
      'click',
      this.clickStatusFilter.bind(this),
    );

    addEventListener(
      this.container.querySelectorAll('.recommendation__gist'),
      'click',
      this.clickRecommendationGist.bind(this),
    );

    this.render();
  }

  /**
   * Build initial state from data attributes in the DOM.
   */
  getInitialState() {
    // Get a list of recommendation categories
    const categoryEls = this.container.querySelectorAll('.category');
    const categories = [];
    categoryEls.forEach((el) => {
      categories.push({
        slug: el.getAttribute('data-slug'),
        collapsed: true,
      });
    });

    // Build a set of filtered statuses.  Initially, this will be all statuses.
    const statusEls = this.container.querySelectorAll('.status-filter');
    const statuses = new Set();
    statusEls.forEach((el) => {
      statuses.add(getStatusFromEl(el));
    });

    // Build a list of recommendations and a lookup by id.
    const recommendations = [];
    const recommendationLookup = {};
    this.container.querySelectorAll('.recommendation').forEach((el) => {
      const recommendation = {
        id: el.getAttribute('data-id'),
        collapsed: true,
      };
      recommendations.push(recommendation);
      recommendationLookup[recommendation.id] = recommendation;
    });

    return {
      categories,
      statuses,
      recommendations,
      recommendationLookup,
    };
  }

  render() {
    const state = this.store.getState();

    renderCategories(this.container, state);
    applyStatusFilters(this.container, state);
    renderRecommendations(this.container, state);
  }

  clickCategoryName(evt) {
    evt.preventDefault();

    const slug = evt.target
      .parentNode
      .parentNode
      .getAttribute('data-slug');
    this.store.dispatch(toggleCategory(slug));
  }

  clickStatusFilter(evt) {
    evt.preventDefault();
    const statusFilter = getStatusFromEl(evt.target);
    this.store.dispatch(toggleStatusFilter(statusFilter));
  }

  clickRecommendationGist(evt) {
    evt.preventDefault();

    const recommendationId = evt.target
      .parentNode
      .parentNode
      .getAttribute('data-id');
    const state = this.store.getState();
    const recommendation = state.recommendationLookup[recommendationId];

    this.store.dispatch(toggleRecommendation(recommendation));
  }
}
