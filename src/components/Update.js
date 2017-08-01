import PropTypes from 'prop-types';
import React from 'react';

const getHtml = update => ({
  __html: update.notes,
});

const Update = ({ update }) => (
  <li className="update">
    <h4 className="update__date">{update.date}</h4>
    <div className="update__notes" dangerouslySetInnerHTML={getHtml(update)} />
  </li>
);

Update.propTypes = {
  update: PropTypes.shape({
    date: PropTypes.string,
    notes: PropTypes.string,
  }),
};

export default Update;
