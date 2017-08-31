/**
 * Functions to transform ArchieML data parsed from the Google Doc.
 */
import marked from 'marked';
import moment from 'moment';
import slugify from 'slugify';
import template from 'lodash/template';
import maxBy from 'lodash/maxBy';
import find from 'lodash/find';
import flow from 'lodash/fp/flow';

/*
 * Convert date from a string to a moment for comparison.
 */
const parseUpdateDates = function parseUpdateDatesTransform(r) {
  if (!r.updates) {
    return r;
  }

  return {
    ...r,
    updates: r.updates.map(u => ({
      ...u,
      // Convert date from a string to a moment for comparison
      date: moment(u.date, 'M/D/YYYY'),
    })),
  };
};

/**
 * Sort a recommendation's updates in reverse chronological order.
 */
const sortUpdatesByDate = function sortUpdatesByDateTransform(r) {
  if (!r.updates) {
    return r;
  }

  return {
    ...r,
    updates: r.updates.sort((a, b) => {
      if (a.date.isBefore(b.date)) {
        return 1;
      }

      if (a.date.isAfter(b.date)) {
        return -1;
      }

      return 0;
    }),
  };
};

const formatUpdateDates = function formatUpdateDatesTransform(r) {
  if (!r.updates) {
    return r;
  }

  return {
    ...r,
    updates: r.updates.map(u => ({
      ...u,
      // Convert moment back to a string that's in the display format
      // that we want on the front end. That way we don't have
      // to include moment on the client-side.
      date: u.date.format('MMMM D, YYYY'),
    })),
  };
};

const addLastUpdated = function addLastUpdatedTransform(r) {
  const lastUpdated = r.updates ?
    moment(r.updates[0].date, 'MMMM D, YYYY')
      .format('YYYY-MM-DD') :
    null;

  return {
    ...r,
    lastUpdated,
  };
};

const addStatusSlug = function addStatusSlugTransform(r) {
  return {
    ...r,
    statusSlug: slugify((r.status || '').toLowerCase()),
  };
};

const setCollapsed = function setCollapsedTransform(r) {
  return {
    ...r,
    collapsed: true,
  };
};

const renderRecommendationSpecific = function renderRecommendationSpecificTransform(r) {
  return {
    ...r,
    recommendation_specific: marked(r.recommendation_specific),
  };
};


const importanceToNumber = function importanceToNumberTransform(r) {
  const importanceMap = {
    low: 3,
    medium: 2,
    high: 1,
  };

  return {
    ...r,
    importance: importanceMap[r.importance],
  };
};

const updateRecommendation = flow(
  parseUpdateDates,
  sortUpdatesByDate,
  formatUpdateDates,
  addLastUpdated,
  addStatusSlug,
  setCollapsed,
  renderRecommendationSpecific,
  importanceToNumber,
);

export const updateRecommendations = function updateRecommendationsTransform(data) {
  return {
    ...data,
    recommendations: data.recommendations.map(updateRecommendation),
  };
};

export const recommendationLookup = function recommendationLookupTransform(data) {
  const recommendations = {
    allIds: [],
    byId: {},
  };

  data.recommendations
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

export const addAgencies = function addAgenciesTransform(data) {
  const agenciesByName = {};

  data.recommendations.allIds.forEach((id) => {
    const recommendation = data.recommendations.byId[id];
    recommendation.agency_responsible.forEach((agency) => {
      if (!agenciesByName[agency]) {
        agenciesByName[agency] = {
          agency,
          slug: slugify(agency.toLowerCase()),
        };
      }
    });
  });

  const agencies = Object.keys(agenciesByName)
    .sort()
    .map(k => agenciesByName[k]);

  return {
    ...data,
    agencies: {
      all: agencies,
      selected: [],
    },
  };
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

export const renderIntro = function renderIntroTransform(data) {
  return {
    ...data,
    intro_text: marked(data.intro_text),
  };
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

export const renderLede = function renderLedeTransform(data) {
  return {
    ...data,
    lede: marked(data.lede),
  };
};

export const renderChartCaption = function renderChartCaptionTransform(data) {
  const tpl = template(data.chart_caption);
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
  const caption = tpl(ctx);
  return {
    ...data,
    chart_caption: marked(caption),
  };
};

export const renderCredits = function renderCreditsTransform(data) {
  return {
    ...data,
    credits: marked(data.credits),
  };
};

export const renameProps = function renamePropsTransform(data) {
  const renamings = {
    intro_text: 'introText',
    chart_caption: 'chartCaption',
  };
  const renamed = {};

  Object.keys(data).forEach((k) => {
    const newK = Object.prototype.hasOwnProperty.call(renamings, k) ?
      renamings[k] :
      k;
    renamed[newK] = data[k];
  });

  return renamed;
};

export const pruneProps = function prunePropsTransform(data) {
  const props = [
    'title',
    'introText',
    'agencies',
    'categories',
    'statuses',
    'recommendations',
    'lede',
    'chartCaption',
    'credits',
    'shareEmailSubject',
    'shareEmailBody',
    'importance',
  ];
  const pruned = {};

  props.forEach((prop) => {
    pruned[prop] = data[prop];
  });

  return pruned;
};
