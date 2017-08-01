/**
 * Functions to transform ArchieML data parsed from the Google Doc.
 */
import marked from 'marked';
import moment from 'moment';
import slugify from 'slugify';

export const categorize = function categorizeTransform(data) {
  const recommendations = {
    items: [],
  };
  const categories = [];
  const categoriesMap = {};

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
      recommendations.items.push(r);

      let category = categoriesMap[r.category];

      if (!category) {
        category = {
          name: r.category,
          slug: slugify(r.category).toLowerCase(),
          recommendations: [],
          collapsed: true,
        };
        categories.push(r.category);
        categoriesMap[r.category] = category;
      }

      category.recommendations.push(r.id);
    });

  return Object.assign({}, data, {
    recommendations,
    categories: categories.map(c => categoriesMap[c]),
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

  data.recommendations.items.forEach((r) => {
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
      pctRecommendations: byStatus[s.status].length / data.recommendations.items.length,
    },
  ));

  return Object.assign({}, data, {
    statuses,
  });
};

export const addSelectedStatuses = function addSelectedStatusesTransform(data) {
  // Initially, show all statuses
  const selectedStatuses = data.statuses.map(s => s.status);

  return Object.assign({}, data, {
    selectedStatuses,
  });
};
