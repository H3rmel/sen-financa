export const Modal = ({ id, title, children, className, open, setOpen }) => {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <dialog id={id} className="modal bg-overlay" open={open}>
      <div className={`modal-box max-w-[800px] w-fit-content ${className}`}>
        <h3 className="font-semibold text-lg">{title}</h3>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}>close</button>
      </form>
    </dialog>
  );
};
