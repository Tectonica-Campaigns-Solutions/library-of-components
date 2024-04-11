import React, { useState } from 'react';
import './styles.scss';
import Dropdown from './Dropdown';

const FormExample = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="form-example">
      <div className="input">
        <label>
          <span>Firstname</span>
        </label>
        <input name="firstname" type="text" />
      </div>

      <div className="input">
        <label>
          <span>Lastname name</span>
        </label>
        <input name="firstname" type="text" />
      </div>

      <div className="input">
        <label>
          <span>Postal code</span>
        </label>
        <input name="firstname" type="text" />
      </div>

      <div className="input">
        <label>
          <span>Email</span>
        </label>
        <input name="firstname" type="text" />
      </div>

      <div className="full">
        <label>Checkbox example</label>
        <div className="items">
          <div className="input">
            <input type="checkbox" name="1" />
            <label for="1">Value 1</label>
          </div>
          <div className="input">
            <input type="checkbox" name="2" />
            <label for="2">Value 2</label>
          </div>
        </div>
      </div>

      <div className="full">
        <fieldset>
          <legend>Radio button example</legend>

          <div className="items">
            <div className="input">
              <input type="radio" name="drone" value="o1" />
              <label for="o1">Option 1</label>
            </div>

            <div className="input">
              <input type="radio" name="drone" value="o2" />
              <label for="o2">Option 2</label>
            </div>

            <div className="input">
              <input type="radio" name="drone" value="o3" />
              <label for="o3">Option 3</label>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="full">
        <Dropdown
          title={'Example of dropdown'}
          options={[
            { label: 'Option 1', value: 1 },
            { label: 'Option 2', value: 2 },
            { label: 'Option 3', value: 3 },
          ]}
        />
      </div>
    </div>
  );
};

export default FormExample;
