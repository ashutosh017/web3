export default function Modal({ onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="text-lg font-medium mb-4">
            Are you sure you want to delete everything?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-400 rounded-md text-white hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }