export const Modal = ({ id, title, children }) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box max-w-[800px] w-fit-content">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
