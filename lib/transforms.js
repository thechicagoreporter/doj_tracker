/**
 * Functions to transform ArchieML data parsed from the Google Doc.
 */
import marked from 'marked';
import moment from 'moment';
import slugify from 'slugify';

export const recommendationLookup = function recommendationLookupTransform(data) {
  const recommendations = {
    allIds: [],
    byId: {},
  };

  data.recommendations
    .map((r) => {
      const newR = Object.assign({}, r);

      if (r.updates) {
        newR.updates = r.updates.map((u) => {
          const date = moment(u.date, 'M/D/YYYY');
          return Object.assign({}, u, {
            date: date.format('MMMM D, YYYY'),
          });
        });
      }

      newR.statusSlug = slugify((r.status || data.statuses[0]).toLowerCase());
      newR.collapsed = true;

      return newR;
    })
    .forEach((r) => {
      recommendations.byId[r.id] = r;
      recommendations.allIds.push(r.id);
    });

  return Object.assign({}, data, {
    recommendations,
  });
};

export const addCategories = function addCategoriesTransform(data) {
  const categoriesByName = {};

  data.recommendations.allIds.forEach((id) => {
    const recommendation = data.recommendations.byId[id];
    const category = recommendation.category;
    if (!categoriesByName[recommendation.category]) {
      categoriesByName[category] = {
        category: category,
        slug: slugify(category.toLowerCase()),
      };
    }
  });

  return Object.assign({}, data, {
    categories: {
      all: Object.keys(categoriesByName).map(k => categoriesByName[k]),
      selected: [],
    },
  });
};

export const addStatusSlugs = function addStatusSlugsTransform(data) {
  return Object.assign({}, data, {
    statuses: data.statuses.map(s => ({
      status: s,
      slug: slugify(s).toLowerCase(),
    })),
  });
};

export const markdownifyIntro = function markdownifyIntroTransform(data) {
  return Object.assign({}, data, {
    intro_text: marked(data.intro_text),
  });
};

export const groupByStatus = function groupByStatusTransform(data) {
  const byStatus = {};

  data.recommendations.allIds.forEach((id) => {
    const r = data.recommendations.byId[id];
    if (!byStatus[r.status]) {
      byStatus[r.status] = [];
    }

    byStatus[r.status].push(r);
  });

  const statuses = data.statuses.map(s => Object.assign(
    {},
    s,
    {
      count: byStatus[s.status].length,
      pctRecommendations: byStatus[s.status].length / data.recommendations.allIds.length,
    },
  ));

  return Object.assign({}, data, {
    statuses,
  });
};

export const addSelectedStatuses = function addSelectedStatusesTransform(data) {
  // Initially, have no selected statuses.  This will be interpretted by front-end
  // logic as showing all recommendations, regardless of status.
  return Object.assign({}, data, {
    selectedStatuses: [],
  });
};
