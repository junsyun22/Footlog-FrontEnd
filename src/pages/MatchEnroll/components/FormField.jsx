import styled from '@emotion/styled';
import { ErrorMessage } from './Basic';

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  width: auto;
  margin: 0 10px;
`;

export function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  error,
  onChange,
  value,
}) {
  return (
    <InputLabel htmlFor={id}>
      {label}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}

export function SelectField({ id, label, options, register, error }) {
  return (
    <InputLabel htmlFor={id}>
      {label}
      <Select id={id} {...register}>
        <option value="" disabled>
          {`Select ${label}`}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}

export function ObjectSelectField({ id, label, options, register, error }) {
  console.log(options);
  return (
    <InputLabel htmlFor={id}>
      {label}
      <Select id={id} {...register}>
        <option value="" disabled>
          {`Select ${label}`}
        </option>
        {options.map((option) => (
          <option key={option.clubId} value={option.clubId}>
            {option.clubName}
          </option>
        ))}
      </Select>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputLabel>
  );
}

export function CheckboxField({ label, register }) {
  return (
    <InputLabel>
      {label}
      <Checkbox type="checkbox" {...register} />
    </InputLabel>
  );
}
