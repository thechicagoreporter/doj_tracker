import './index.scss';

import { createStore } from 'redux';
import { toggleCategory } from './actions';
import { trackerApp } from './reducers';
import{ addClass, removeClass, addEventListener } from './util';

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
    const initialState = {
      categories,
    };

    this.store = createStore(trackerApp, initialState);

    this.store.subscribe(this.render.bind(this));

    addEventListener(
      this.container.querySelectorAll('.category__name a'),
      "click",
      this.clickCategoryName.bind(this)
    );

    this.render();
  }

  render() {
    this.store.getState().categories.forEach((category) => {
      let classFn = removeClass;

      if (category.collapsed) {
        classFn = addClass;
      }

      const categoryNameEl = this.container.querySelectorAll(
        `.category[data-slug="${category.slug}"] .category__name`
      );
      classFn(categoryNameEl, "category__name--collapsed");

      const recommendationEls = this.container.querySelectorAll(
        `.category[data-slug="${category.slug}"] .recommendation`
      );
      classFn(recommendationEls, "recommendation--collapsed");
    });
  }

  clickCategoryName(evt) {
    evt.preventDefault();

    const slug = evt.target
      .parentNode
      .parentNode
      .getAttribute('data-slug');
    this.store.dispatch(toggleCategory(slug));
  }
}
