/* eslint-disable */
import React from 'react';
import { EmptyState as PfEmptyState, Button } from 'patternfly-react';
import { LinkContainer } from 'react-router-bootstrap';

const EmptyState = (props) => {
  const {
    icon = 'add-circle-o',
    header,
    description,
    customDocumentation,
    documentationLabel = __('For more information please see'),
    documentationButton = __('Documentation'),
    docUrl,
    action,
    secondayActions,
  } = props;
  const defaultDocumantion = `${documentationLabel} <a href=${docUrl}>${documentationButton}</a>`;
  const showDocsLink = !!(docUrl || customDocumentation);

  const actionButton = action => (
    <Button href={action.url} bsStyle="primary" bsSize="large">
      {action.title}
    </Button>
  );

  return (
    <PfEmptyState>
      <PfEmptyState.Icon type="pf" name={icon} />
      <PfEmptyState.Title>{header}</PfEmptyState.Title>
      <PfEmptyState.Info>{description}</PfEmptyState.Info>
      {showDocsLink && (
        <PfEmptyState.Help>
          {customDocumentation || <span dangerouslySetInnerHTML={{ __html: defaultDocumantion }} />}
        </PfEmptyState.Help>
      )}
      {action && (
        <PfEmptyState.Action>
          { action.rails
             ? actionButton(action)
             : <LinkContainer to={action.url}>
                { actionButton(action) }
               </LinkContainer>
          }
        </PfEmptyState.Action>
      )}
      {secondayActions && (
        <PfEmptyState.Action secondary>
          {secondayActions.map(item => (
            <LinkContainer to={item.url}>
              <Button href={item.url} title={item.title}>
                {item.title}
              </Button>
            </LinkContainer>
          ))}
        </PfEmptyState.Action>
        )}
    </PfEmptyState>
  );
};
export default EmptyState;
