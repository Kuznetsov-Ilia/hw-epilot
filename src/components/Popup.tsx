export interface PopupProps {
  title?: string;
  message?: string;
  onClose?: () => void;
}

export default function Popup({ title, message, onClose }: PopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="mb-4 text-2xl font-bold empty:hidden">{title}</h2>
        <p className="text-gray-700 empty:hidden">{message}</p>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 text-sm font-medium rounded bg-orange "
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
