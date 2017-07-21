
import { createStore } from 'redux';
import { toggleStatusFilter, toggleCategory, toggleRecommendation } from './actions';
import { trackerApp } from './reducers';
import { addEventListener } from './util';
import {
  categories as categoriesView,
  statusFilters as statusFiltersView,
  recommendations as recommendationsView,
} from './views';

import './index.scss';

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
    const categories = [];
    const categoryLookup = {};
    const recommendations = [];
    const recommendationLookup = {};
    categoryEls.forEach((catEl) => {
      const category = {
        name: catEl.querySelectorAll('.category__name')[0].textContent,
        slug: catEl.getAttribute('data-slug'),
        collapsed: true,
      };
      categories.push(category);
      categoryLookup[category.name] = category;

      catEl.querySelectorAll('.recommendation').forEach((recEl) => {
        const recommendation = {
          id: recEl.getAttribute('data-id'),
          collapsed: true,
          status: getStatusFromEl(recEl),
          category: category.name,
        };
        recommendations.push(recommendation);
        recommendationLookup[recommendation.id] = recommendation;
      });
    });

    // Build a set of filtered statuses.  Initially, this will be all statuses.
    const statusEls = this.container.querySelectorAll('.status-filter');
    const statuses = new Set();
    statusEls.forEach((el) => {
      statuses.add(getStatusFromEl(el));
    });


    return {
      categories,
      categoryLookup,
      recommendations,
      recommendationLookup,
      statuses,
    };
  }

  render() {
    const state = this.store.getState();

    categoriesView(this.container, state);
    statusFiltersView(this.container, state);
    recommendationsView(this.container, state);
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
