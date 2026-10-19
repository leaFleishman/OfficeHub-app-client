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
      onClick={() => {
        if (!isLoading) onCancel();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>

        <p>{message}</p>

        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelText}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "מבצע..." : confirmText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDialog;