import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SprkIcon from '../../../icons/SprkIcon';
import SprkLink from '../../../../base/links/SprkLink';

class SprkAccordionItem extends Component {
  constructor(props) {
    super(props);
    const { isDefaultOpen } = this.props;
    this.state = {
      isOpen: isDefaultOpen || false,
      height: isDefaultOpen ? 'auto' : 0,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    const { onToggle } = this.props;
    e.preventDefault();
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      height: !prevState.isOpen ? 'auto' : 0,
    }));
    if (onToggle) onToggle(e);
  }

  render() {
    const {
      analyticsString,
      idString,
      children,
      heading,
      headingAddClasses,
      additionalClasses,
      contentAddClasses,
      iconAddClasses,
      isDefaultOpen,
      id,
      ...other
    } = this.props;
    const { isOpen, height } = this.state;

    const iconClasses = classnames(
      'sprk-c-Icon--l sprk-c-Icon--toggle sprk-c-Accordion__icon',
      { 'sprk-c-Icon--open': isOpen },
      iconAddClasses,
    );

    const itemClassNames = classnames(
      'sprk-c-Accordion__item',
      { 'sprk-c-Accordion__item--open': isOpen },
      additionalClasses,
    );

    const headingClassNames = classnames(
      'sprk-c-Accordion__heading',
      'sprk-b-TypeDisplaySeven',
      headingAddClasses,
    );

    return (
      <li className={itemClassNames} data-id={idString} {...other}>
        <SprkLink
          variant="unstyled"
          aria-controls={id}
          additionalClasses="sprk-c-Accordion__summary"
          data-analytics={analyticsString}
          onClick={this.toggle}
          aria-expanded={isOpen ? 'true' : 'false'}
        >
          <h3 className={headingClassNames}>{heading}</h3>
          <SprkIcon
            iconName="chevron-up-circle-two-color"
            additionalClasses={iconClasses}
          />
        </SprkLink>

        <AnimateHeight duration={300} height={height}>
          <div
            className={classnames(
              'sprk-c-Accordion__content',
              contentAddClasses,
            )}
            id={id}
          >
            {children}
          </div>
        </AnimateHeight>
      </li>
    );
  }
}

SprkAccordionItem.defaultProps = {
  isDefaultOpen: false,
};

SprkAccordionItem.propTypes = {
  /**
   * Children content for the item.
   */
  children: PropTypes.node,
  /**
   * The value supplied will be assigned to the
   * `data-analytics` attribute on the clickable item.
   * Intended for an outside
   * library to capture data.
   */
  analyticsString: PropTypes.string,
  /** The text for the item heading. */
  heading: PropTypes.string.isRequired,
  /**
   * Expects a space separated string
   * of classes to be added to the
   * heading.
   */
  headingAddClasses: PropTypes.string,
  /**
   * Expects a space separated string
   * of classes to be added to the
   * component.
   */
  additionalClasses: PropTypes.string,
  /**
   * The value supplied will be assigned
   * to the `data-id` attribute on the
   * component. This is intended to be
   * used as a selector for automated
   * tools. This value should be unique
   * per page.
   */
  idString: PropTypes.string,
  /**
   * Used to specify whether the item should be open by default.
   */
  isDefaultOpen: PropTypes.bool,
  /**
   * Expects a space separated string
   * of classes to be added to the
   * icon.
   */
  iconAddClasses: PropTypes.string,
  /**
   * Expects a space separated string
   * of classes to be added to the
   * toggle content.
   */
  contentAddClasses: PropTypes.string,
};

export default SprkAccordionItem;
