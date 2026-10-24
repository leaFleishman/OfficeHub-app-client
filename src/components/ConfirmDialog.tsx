type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
};

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = "אישור",
  cancelText = "ביטול",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;
return (
  <div
    className="modal-backdrop"
    onClick={() => {
      if (!isLoading) onCancel();
    }}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="modal"
      onClick={(e) => e.stopPropagation()}
    >
      {/* כותרת */}
      <h2
        id="confirm-dialog-title"
        className="modal-title"
      >
        {title}
      </h2>

      {/* הודעה */}
      <p className="modal-text">
        {message}
      </p>

      {/* כפתורים */}
      <div className="modal-actions">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="btn btn-ghost"
        >
          {cancelText}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? "מבצע..." : confirmText}
        </button>
      </div>
    </div>
  </div>
);
};

export default ConfirmDialog;
