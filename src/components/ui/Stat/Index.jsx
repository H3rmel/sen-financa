export const Stat = ({ title, value, description }) => {
  return (
    <div className="stat">
      <h3 className="stat-title">{title}</h3>
      <div className="stat-value my-2 text-neutral-200">{value}</div>
      <div className="stat-desc">{description}</div>
    </div>
  );
};
