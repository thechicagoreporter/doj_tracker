/**
 * Recommendation update validation functions.
 *
 * These take an update object and return the input if valid.  Otherwise, they
 * throw an error.
 */

export const hasDate = (update) => {
  if (!update.date) {
    throw new Error('Update is missing date');
  }

  return update;
};

export const hasStatus = (update) => {
  if (!update.status) {
    throw new Error('Update is missing status');
  }

  return update;
};

export const hasNotes = (update) => {
  if (!update.notes) {
    throw new Error('Update is missing notes');
  }

  return update;
};
