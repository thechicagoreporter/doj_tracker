import PropTypes from 'prop-types';
import React from 'react';

const getHtml = text => ({
  __html: text,
});

const Intro = ({ text }) => (
  <div className="intro" dangerouslySetInnerHTML={getHtml(text)}/>
);

Intro.propTypes = {
  text: PropTypes.string,
};

export default Intro;
