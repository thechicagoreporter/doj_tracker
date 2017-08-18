/**
 * Functions to transform ArchieML data parsed from the Google Doc.
 */
import marked from 'marked';
import moment from 'moment';
import slugify from 'slugify';
import template from 'lodash/template';
import maxBy from 'lodash/maxBy';
import find from 'lodash/find';

export const recommendationLookup = function recommendationLookupTransform(data) {
  const recommendations = {
    allIds: [],
    byId: {},
  };

  data.recommendations
    .map((r) => {
      const newR = {
        ...r,
      };

      if (r.updates) {
        newR.updates = r.updates.map(u => ({
          ...u,
          // Convert date from a string to a moment for comparison
          date: moment(u.date, 'M/D/YYYY'),
        }))
        // Sort updates in reverse chronological order
        .sort((a, b) => {
          if (a.date.isBefore(b.date)) {
            return 1;
          }

          if (a.date.isAfter(b.date)) {
            return -1;
          }

          return 0;
        })
        .map(u => ({
          ...u,
          // Convert moment back to a string that's in the display format
          // that we want on the front end. That way we don't have
          // to include moment on the client-side.
          date: u.date.format('MMMM D, YYYY'),
        }));

        // Include a lastUpdated property for each recommendation that
        // is in ISO-8601 format that we can use for sorting.
        newR.lastUpdated = moment(r.updates[0].date, 'MMMM D, YYYY')
          .format('YYYY-MM-DD');
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
        category,
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

/**
 * Convert list of statuses to shape useful to front-end code.
 *
 * Add slug and full version for each status.  Make an object that has
 * properties for a list of all statuses and a list of the currently
 * selected for filtering.
 */
export const reshapeStatuses = function reshapeStatusesTransform(data) {
  return Object.assign({}, data, {
    statuses: {
      // Add slugs to statuses.
      all: data.statuses.map(s => ({
        status: s,
        slug: slugify(s).toLowerCase(),
      })),
      // Initially, have no selected statuses.  This will be interpretted by
      // front-end logic as showing all recommendations, regardless of status.
      selected: [],
    },
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

  const allStatuses = data.statuses.all.map(s => Object.assign(
    {},
    s,
    {
      count: byStatus[s.status].length,
      pctRecommendations: byStatus[s.status].length / data.recommendations.allIds.length,
    },
  ));

  return Object.assign({}, data, {
    statuses: Object.assign({}, data.statuses, {
      all: allStatuses,
    }),
  });
};

export const processLede = function processLedeTransform(data) {
  const tpl = template(data.lede);
  const lastUpdatedId = maxBy(data.recommendations.allIds, id => (
    data.recommendations.byId[id].lastUpdated
  ));
  const lastUpdated = data.recommendations.byId[lastUpdatedId].updates[0].date;
  const numImplemented = find(data.statuses.all, status => (
    status.status === 'Implemented'
  )).count;
  const ctx = {
    lastUpdated,
    numRecommendations: data.recommendations.allIds.length,
    numImplemented,
  };
  const lede = tpl(ctx);
  return {
    ...data,
    lede,
  };
};
