function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default InputField;