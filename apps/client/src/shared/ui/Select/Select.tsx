import { memo, type SelectHTMLAttributes } from 'react';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
}

export const Select = memo(function Select({
  label,
  options,
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label;
  return (
    <label className="ui-select" htmlFor={selectId}>
      <span className="ui-select__label">{label}</span>
      <select id={selectId} className="ui-select__control" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
});
