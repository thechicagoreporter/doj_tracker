import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import React from 'react';
import { camelCase } from '../util';
import styles from './StatusChart.css';

const cx = classNames.bind(styles);

const getBarClassName = status => (
  cx('bar', camelCase(status.status))
);

const getBarStyle = status => ({
  width: `${status.pctRecommendations * 100}%`,
});

const getLabelWord = (count, width) => {
  const suffix = count > 1 ? 's' : '';

  if (width && width < 150) {
    return `rec${suffix}.`;
  }

  return `recommendation${suffix}`;
};

class StatusChart extends React.Component {
  constructor() {
    super();
    this.addBarElement = this.addBarElement.bind(this);
    this.updateBarLabels = this.updateBarLabels.bind(this);
  }

  render() {
    return (
      <div className={styles.chart}>
        {this.props.statuses.all.map(status => (
          <div className={getBarClassName(status)}
               style={getBarStyle(status)}
               key={status.slug}
               ref={this.addBarElement}>

             <div className={styles.barLabel}>
               <span className={styles.barLabelNumber}>{status.count}</span>
               <span className={styles.barLabelWord}>{getLabelWord(status.count)}</span>
             </div>
          </div>
        ))}
      </div>
    );
  }

  addBarElement(el) {
    if (!this.barElements) {
      this.barElements = [];
    }

    this.barElements.push(el);
  }

  /**
   * Reveal or hide the bar labels based on the width of the bars.
   */
  updateBarLabels() {
    for (let i = this.barElements.length - 1; i >= 0; i -= 1) {
      const el = this.barElements[i];
      const word = el.querySelector(`.${styles.barLabelWord}`);
      const count = parseInt(
        el.querySelector(`.${styles.barLabelNumber}`).textContent,
        10,
      );

      if (el.offsetWidth > 50) {
        word.style.display = 'inline';
        word.textContent = getLabelWord(count, el.offsetWidth);
        return;
      }
    }
  }

  componentDidMount() {
    this.updateBarLabels();
    this.props.window.addEventListener('resize', this.updateBarLabels);
  }

  componentWillUnmount() {
    this.props.window.removeEventListener('resize', this.updateBarLabels);
  }
}

StatusChart.propTypes = {
  statuses: PropTypes.shape({
    all: PropTypes.arrayOf(PropTypes.shape({
      slug: PropTypes.string,
      status: PropTypes.string,
    })),
  }),
  window: PropTypes.shape({
    addEventListener: PropTypes.func,
    removeEventListener: PropTypes.func,
  }),
};

export default StatusChart;
