import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import SprkErrorContainer from '../SprkErrorContainer/SprkErrorContainer';
import SprkIcon from '../../SprkIcon/SprkIcon';

class SprkSelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uniqueId(),
      choiceItems: props.choices.map(item => ({ id: uniqueId(), ...item })),
    };
  }

  render() {
    const { additionalClasses, label, valid, variant } = this.props;
    const { choiceItems, id } = this.state;
    return (
      <React.Fragment>
        <div className={classNames('sprk-b-InputContainer', additionalClasses)}>
          {(variant === 'checkbox' || variant === 'radio') && (
            <fieldset className="sprk-b-Fieldset">
              <legend className="sprk-b-Legend">
                <p className="sprk-b-Label">{label}</p>
              </legend>
              {choiceItems.map(({ label: innerLabel, id: innerId, name, value, ...rest }) => (
                <div className="sprk-b-SelectionContainer" key={innerId}>
                  <input
                    id={innerId}
                    type={variant}
                    aria-describedby={`errorcontainer-${id}`}
                    name={name}
                    value={value}
                    {...rest}
                  />
                  <label htmlFor={innerId} className="sprk-b-Label sprk-b-Label--inline">
                    {innerLabel}
                  </label>
                </div>
              ))}
            </fieldset>
          )}
          {variant === 'select' && (
            <React.Fragment>
              <label htmlFor={id} className="sprk-b-Label">
                {label}
              </label>
              <select className="sprk-b-Select" id={id} aria-describedby={`errorcontainer-${id}`}>
                {choiceItems.map(({ id: innerId, label: innerLabel, value }) => (
                  <option value={value} key={innerId}>
                    {innerLabel}
                  </option>
                ))}
              </select>
              <SprkIcon
                iconName="chevron-down"
                additionalClasses="sprk-c-Icon--stroke-current-color sprk-b-SelectContainer__icon"
              />
            </React.Fragment>
          )}
          {!valid && <SprkErrorContainer id={`errorcontainer-${id}`} />}
        </div>
      </React.Fragment>
    );
  }
}

SprkSelectionInput.propTypes = {
  additionalClasses: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  groupLabel: PropTypes.string,
  valid: PropTypes.bool,
  variant: PropTypes.oneOf(['checkbox', 'radio', 'select']).isRequired,
};

SprkSelectionInput.defaultProps = {
  additionalClasses: '',
  groupLabel: '',
  valid: true,
};

export default SprkSelectionInput;
