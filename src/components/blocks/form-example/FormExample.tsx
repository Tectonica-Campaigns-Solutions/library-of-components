import React, { useState } from 'react';
import { Checkbox, DropdownInputs, Input, Radio } from 'tectonica-ui';

import './styles.scss';

const FormExample = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="form-example">
      <Input
        label="Example of input"
        placeholder="Type something"
        onChange={(e) => console.log(e.target.value)}
        assistiveText="This is an assistive text"
      />
      <Input
        label="Example of input with error"
        placeholder="Type something"
        onChange={(e) => console.log(e.target.value)}
        assistiveText="This is an assistive text"
        errors="This is an error message"
      />
      <Input
        label="Example of input with bottom border only"
        placeholder="Type something"
        onChange={(e) => console.log(e.target.value)}
        variant="bottom-border-only"
      />

      <div className="full">
        <Checkbox
          label="Checkbox example"
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          selectedValues={['1']}
          // @ts-ignore
          onChange={(e) => console.log(e.target?.value)}
        />
      </div>

      <div className="full">
        <Radio
          label="Radio example"
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          selectedValue="1"
          name="radio"
          // @ts-ignore
          onChange={(e) => console.log(e.target?.value)}
        />
      </div>

      <div className="full">
        <DropdownInputs
          label="Dropdown example"
          title={'Example of dropdown'}
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          onSelect={(option) => setSelected(option)}
        />
      </div>

      <div className="full mb-5">
        <DropdownInputs
            label="Dropdown border only"
            title={'Example of dropdown'}
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ]}
            onSelect={(option) => setSelected(option)}
            variant='bottom-border-only'
          />
      </div>

      <div className='full text-bg-dark p-3'>
        <Input
          label="Example of input"
          placeholder="Type something"
          onChange={(e) => console.log(e.target.value)}
          assistiveText="This is an assistive text"
        />

        <DropdownInputs
          label="Dropdown example"
          title={'Example of dropdown'}
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
          onSelect={(option) => setSelected(option)}
        />

        <DropdownInputs
            label="Dropdown border only"
            title={'Example of dropdown'}
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ]}
            onSelect={(option) => setSelected(option)}
            variant='bottom-border-only'
          />

      </div>

    </div>
  );
};

export default FormExample;
