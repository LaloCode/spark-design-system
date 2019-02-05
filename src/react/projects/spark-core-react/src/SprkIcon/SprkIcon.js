import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function SprkIcon({
  additionalClasses,
  children,
  iconType,
  idString,
  viewBox,
  ...rest
}) {
  return (
    <svg
      className={classNames('sprk-c-Icon', additionalClasses)}
      viewBox={viewBox}
      data-id={idString}
      {...rest}
    >
      <use xlinkHref={`#${iconType}`} />
    </svg>
  );
}

SprkIcon.propTypes = {
  // Classes added to the svg
  additionalClasses: PropTypes.string,
  // Incoming children
  children: PropTypes.node,
  // The id of the symbol to use for the icon
  iconType: PropTypes.string.isRequired,
  // Assigned to data-id
  idString: PropTypes.string,
  // The viewbox of the svg containing the symbol
  viewBox: PropTypes.string,
};

SprkIcon.defaultProps = {
  additionalClasses: '',
  children: [],
  idString: '',
  viewBox: '0 0 64 64',
};

export default SprkIcon;
