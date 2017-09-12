/**
 * Recommendation validation functions.
 *
 * These take a recommendation object as input and return the input if valid
 * or throw an Error if invalid.
 */

export const hasId = (recommendation) => {
  if (!recommendation.id) {
    throw new Error('Recommendation is missing an ID');
  }

  return recommendation;
};

export const hasGist = (recommendation) => {
  if (!recommendation.recommendation_gist) {
    throw new Error(`Recommendation with ID ${recommendation.id} is missing a gist`);
  }

  return recommendation;
};

export const hasSpecific = (recommendation) => {
  if (!recommendation.recommendation_specific) {
    throw new Error(`Recommendation with ID ${recommendation.id} is missing a specific recommendation`);
  }

  return recommendation;
};

export const hasAgencyResponsible = (recommendation) => {
  if (
    !recommendation.agency_responsible ||
    !recommendation.agency_responsible.length
  ) {
    throw new Error(`Recommendation with ID ${recommendation.id} is missing an agency responsible`);
  }

  return recommendation;
};

export const hasStatus = (recommendation) => {
  if (!recommendation.status) {
    throw new Error(`Recommendation with ID ${recommendation.id} is missing a status`);
  }

  return recommendation;
};

export const hasUpdates = (recommendation) => {
  if (!recommendation.updates || !recommendation.updates.length) {
    throw new Error(`Recommendation with ID ${recommendation.id} is missing updates`);
  }

  return recommendation;
};

/**
 * Factory function for updates validator.
 *
 * Returns a recommendation validation function that runs the input validator
 * on every update of a recommendation.
 */
export const updatesValid = validator => (recommendation) => {
  recommendation.updates.forEach((update, i) => {
    try {
      validator(update);
    } catch (e) {
      const msg = `Recommendation with ID ${recommendation.id} has an invalid update ${i}: ${e.message}`;
      throw new Error(msg);
    }
  });
  return recommendation;
};

export const fail = () => {
  throw new Error('Failure');
};
