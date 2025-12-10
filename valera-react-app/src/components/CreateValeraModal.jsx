import { useState } from 'react';

function CreateValeraModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    health: 100,
    alcohol: 0,
    joy: 0,
    fatigue: 0,
    money: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreate();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8" style={{ width: '500px' }}>
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Создать нового Валеру
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            {/* Здоровье */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ❤️ Здоровье
              </label>
              <input
                type="number"
                value={formData.health}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            {/* Алкоголь */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                🍺 Алкоголь
              </label>
              <input
                type="number"
                value={formData.alcohol}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            {/* Жизнерадостность */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                😊 Жизнерадостность
              </label>
              <input
                type="number"
                value={formData.joy}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            {/* Усталость */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                😴 Усталость
              </label>
              <input
                type="number"
                value={formData.fatigue}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>

            {/* Деньги */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                💰 Деньги
              </label>
              <input
                type="number"
                value={formData.money}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          {/* Информация */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              ℹ️ Валера будет создан с начальными параметрами. Изменить их можно будет после создания через действия.
            </p>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateValeraModal;
