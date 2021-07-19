import React, { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client';
import hostgroupsQuery from '../../../graphql/queries/hostgroups.gql';
import Loading from 'foremanReact/components/Loading';
import { translate as __, sprintf } from 'foremanReact/common/I18n';

import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

const HostgroupSelect = props => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => setIsOpen(!isOpen)
  const { selected, setSelected } = props;
  const [typingTimeout, setTypingTimeout] = useState(null);

  const [fetchHostgroups, { loading, data, error }] = useLazyQuery(hostgroupsQuery)

  // if (loading) {
  //   return <Loading />
  // }

  // if (error) {
  //   return <div>{ error.message }</div>
  // }

  const onSelect = (event, selection) => {
    if (selected.find(item => item === selection)) {
      setSelected(selected.filter(item => item !== selection))
    } else {
      setSelected([...selected, selection])
    }
  }

  const onClear = () => {
    setSelected([])
  }

  const onInputChange = (value) => {
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => fetchHostgroups({ variables: { search: `name ~ ${value}` } }), 500));
  }

  const prepareOptions = data => {
    const results = data?.hostgroups?.nodes ? data.hostgroups.nodes : []

    if (results.length > 20) {
      return [
        <SelectOption isDisabled key={0}>
          {sprintf(
            'You have %s hostgroups to display. Please refine your search.',
            results.length
          )}
        </SelectOption>,
      ];
    }
    return results.map((hg, idx) => (
      <SelectOption
        key={hg.id}
        value={hg.name}
      />
    ))
  }

  const selectOpts = prepareOptions(data);

  return (
    <Select
      variant={SelectVariant.typeaheadMulti}
      typeAheadAriaLabel={'Select a hostgroup'}
      placeholderText={'Type a hostroup name...'}
      onToggle={onToggle}
      onSelect={onSelect}
      onClear={onClear}
      selections={selected}
      isOpen={isOpen}
      onTypeaheadInputChanged={onInputChange}
    >
      {selectOpts}
    </Select>
  )
}

export default HostgroupSelect;
