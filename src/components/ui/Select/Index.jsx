export const Select = ({
  id,
  label,
  children,
  value,
  valueChange,
  rightLabel,
  bottomLabel,
  bottomRightLabel,
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      {(label || rightLabel) && (
        <label className="label" htmlFor={id}>
          {label && <span className="label-text">{label}</span>}
          {rightLabel && <span className="label-text-alt">{rightLabel}</span>}
        </label>
      )}
      <select
        name={id}
        id={id}
        className="select select-bordered"
        value={value}
        onChange={valueChange}
      >
        <option disabled>
          Selecione uma
        </option>
        {children}
      </select>
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
