export const Input = ({
  id,
  type,
  placeholder,
  valueChange,
  value,
  label,
  required,
  rightLabel,
  bottomLabel,
  bottomRightLabel,
  className
}) => {
  return (
    <div className={`form-control w-full max-w-xs ${className}`}>
      {(label || rightLabel) && (
        <label className="label" htmlFor={id}>
          {label && <span className="label-text">{label}</span>}
          {rightLabel && <span className="label-text-alt">{rightLabel}</span>}
        </label>
      )}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={valueChange}
        placeholder={placeholder}
        required={required}
        className="input input-bordered w-full max-w-xs"
      />
      {(bottomLabel || bottomRightLabel) && (
        <label className="label" htmlFor={id}>
          {bottomLabel && <span className="label-text-alt">{bottomLabel}</span>}
          {bottomRightLabel && (
            <span className="label-text-alt">{bottomRightLabel}</span>
          )}
        </label>
      )}
    </div>
  );
};
