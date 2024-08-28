import React from 'react';
import Select from 'react-select';

interface SelectInputProps {
  label: string;
  name: string;
  id: string;
  options: { value: string; label: string }[];
  placeholder: string;
}

const SelectInputBar: React.FC<SelectInputProps> = ({ label, name, id, options, placeholder }) => {
  return (
    <div>
      <label htmlFor={id} className="font-semibold text-[1.125rem] text-defaulttextcolor dark:text-defaulttextcolor/70 !mb-0">
        {label}
      </label>
      <Select
        name={name}
        id={id}
        options={options}
        className="block w-full text-[0.875rem] !rounded-md"
        menuPlacement='auto'
        classNamePrefix="Select2"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectInputBar;
