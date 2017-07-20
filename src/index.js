
import { createStore } from 'redux';
import { toggleStatusFilter, toggleCategory } from './actions';
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
    classFn(recommendationEls, 'recommendation--collapsed');
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
};

// eslint-disable-next-line import/prefer-default-export
export class App {
  constructor(container) {
    this.container = container;

    const categoryEls = this.container.querySelectorAll('.category');
    const categories = [];
    categoryEls.forEach((el) => {
      categories.push({
        slug: el.getAttribute('data-slug'),
        collapsed: true,
      });
    });
    const statusEls = this.container.querySelectorAll('.status-filter');
    const statuses = new Set();
    statusEls.forEach((el) => {
      statuses.add(getStatusFromEl(el));
    });
    const initialState = {
      categories,
      statuses,
    };

    this.store = createStore(trackerApp, initialState);

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

    this.render();
  }

  render() {
    const state = this.store.getState();

    renderCategories(this.container, state);
    applyStatusFilters(this.container, state);
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
}
