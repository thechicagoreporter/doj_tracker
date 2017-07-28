
import { combineReducers, createStore } from 'redux';
import { toggleStatusFilter, toggleCategory, toggleRecommendation } from './actions';
import * as reducers from './reducers';
import { addEventListener } from './util';
import {
  categories as categoriesView,
  statusFilters as statusFiltersView,
  recommendations as recommendationsView,
  statusChart as statusChartView,
} from './views';

import './index.scss';

const trackerApp = combineReducers(reducers);

function getStatusFromEl(el) {
  return el.getAttribute('data-status');
}

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
    // Get a list of recommendation categories, a lookup of categories by name,
    // a list of recommendations and a lookup of recommendations by id.
    const categoryEls = this.container.querySelectorAll('.category');
    const categories = {
      items: [],
      byName: {},
    };
    const recommendations = {
      items: [],
      byId: {},
    };
    categoryEls.forEach((catEl) => {
      const category = {
        name: catEl.querySelectorAll('.category__name')[0].textContent,
        slug: catEl.getAttribute('data-slug'),
        collapsed: true,
      };
      categories.items.push(category);
      categories.byName[category.name] = category;

      catEl.querySelectorAll('.recommendation').forEach((recEl) => {
        const recommendation = {
          id: recEl.getAttribute('data-id'),
          collapsed: true,
          status: getStatusFromEl(recEl),
          category: category.name,
        };
        recommendations.items.push(recommendation);
        recommendations.byId[recommendation.id] = recommendation;
      });
    });

    // Build a set of filtered statuses.  Initially, this will be all statuses.
    const statusEls = this.container.querySelectorAll('.status-chart__bar');
    const selectedStatuses = new Set();
    const statuses = [];

    statusEls.forEach((el) => {
      const statusName = getStatusFromEl(el);
      selectedStatuses.add(statusName);
      statuses.push({
        status: statusName,
        count: parseInt(el.getAttribute('data-count'), 10),
        slug: el.getAttribute('data-slug'),
      });
    });

    return {
      categories,
      recommendations,
      statuses,
      selectedStatuses,
    };
  }

  render() {
    const state = this.store.getState();

    categoriesView(this.container, state);
    statusFiltersView(this.container, state);
    recommendationsView(this.container, state);
    statusChartView(this.container.querySelector('.status-chart'), state);
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
    const recommendation = state.recommendations.byId[recommendationId];

    this.store.dispatch(toggleRecommendation(recommendation));
  }
}
