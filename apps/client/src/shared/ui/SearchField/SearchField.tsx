import { memo, type InputHTMLAttributes } from 'react';
import '../Field/Field.scss';

interface SearchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const SearchField = memo(function SearchField({
  label = 'Поиск',
  id = 'global-search',
  ...props
}: SearchFieldProps) {
  return (
    <label className="ui-field" htmlFor={id}>
      <span className="sr-only">{label}</span>
      <input
        id={id}
        className="ui-field__control"
        placeholder="Поиск"
        type="search"
        {...props}
      />
    </label>
  );
});
