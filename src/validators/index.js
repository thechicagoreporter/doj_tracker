/**
 * Data validation functions.
 *
 * These should take the parsed and transformed data from the Google DOc
 * and return the data if valid or throw an Error if invalid.
 */

import { isObject, isArray } from 'lodash/fp';

export const hasRecommendations = (data) => {
  if (!data.recommendations) {
    throw new Error('Missing recommendations.');
  }

  if (!isObject(data.recommendations)) {
    throw new Error('"recommendations" property is not an Object');
  }

  if (!isArray(data.recommendations.allIds)) {
    throw new Error('"recommendations.allIds" property is not an Array');
  }

  if (!isObject(data.recommendations.byId)) {
    throw new Error('"recommendations.byId" property is not an Object');
  }

  return data;
};

export const hasRecommendationCount = (data) => {
  if (data.recommendations.allIds.length !== 99) {
    throw new Error(`Expected 99 recommendations. Found ${data.recommendations.allIds.length}`);
  }

  return data;
};

/**
 * Factory for recommendations validator function.
 *
 * Returns a validator that runs the input function on every recommendation.
 */
export const recommendationsValid = validator => (data) => {
  data.recommendations.allIds.forEach((id) => {
    const recommendation = data.recommendations.byId[id];
    validator(recommendation);
  });

  return data;
};

export const hasLede = (data) => {
  if (!data.lede) {
    throw new Error('Missing lede');
  }

  return data;
};

export const hasIntro = (data) => {
  if (!data.introText) {
    throw new Error('Missing intro text');
  }

  return data;
};

export const hasChartTitle = (data) => {
  if (!data.chartTitle) {
    throw new Error('Missing chart title');
  }

  return data;
};

export const hasChartCaption = (data) => {
  if (!data.chartCaption) {
    throw new Error('Missing chart caption');
  }

  return data;
};

export const hasCredits = (data) => {
  if (!data.credits) {
    throw new Error('Missing credits');
  }

  return data;
};

export const hasShareEmailSubject = (data) => {
  if (!data.shareEmailSubject) {
    throw new Error('Missing share email subject');
  }

  return data;
};

export const hasShareEmailBody = (data) => {
  if (!data.shareEmailBody) {
    throw new Error('Missing share email body');
  }

  return data;
};

export const hasMethodology = (data) => {
  if (!data.methodology) {
    throw new Error('Missing methodology');
  }

  return data;
};

export const hasTweetText = (data) => {
  if (!data.shareTweetText) {
    throw new Error('Missing tweet text');
  }

  return data;
};
