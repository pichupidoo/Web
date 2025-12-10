import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { valeraApi } from '../services/valeraApi'; 
import CreateValeraModal from './CreateValeraModal';

function ValeraList() {
  const [valeras, setValeras] = useState([]); 
  const [filteredValeras, setFilteredValeras] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const loadValeras = async () => {
    try {
      setLoading(true); 
      setError(null); 
      const data = await valeraApi.getAllValeras(); 
      setValeras(data);
      setFilteredValeras(data);
    } catch (err) { 
      setError('Ошибка загрузки Валер: ' + err.message);
      console.error(err);
    } finally { 
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadValeras();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredValeras(valeras);
    } else {
      const filtered = valeras.filter((valera) =>
        valera.id.toString().includes(searchTerm)
      );
      setFilteredValeras(filtered);
    }
  }, [searchTerm, valeras]);

  // Создать нового Валеру
  const handleCreate = async () => {
    try {
      setLoading(true);
      await valeraApi.createValera();
      await loadValeras();
      setIsModalOpen(false); 
    } catch (err) {
      setError('Ошибка создания Валеры: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Удалить Валеру
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm(`Удалить Валеру #${id}?`)) { 
      try {
        await valeraApi.deleteValera(id);
        await loadValeras();
      } catch (err) {
        setError('Ошибка удаления: ' + err.message);
      }
    }
  };

  // Открыть детали
  const handleViewDetails = (id) => {
    navigate(`/valera/${id}`); 
  };

  const getHealthColor = (health) => {
    if (health > 70) return 'bg-gray-300';
    if (health > 40) return 'bg-gray-500';
    return 'bg-gray-700';
  };

  const getMoneyColor = (money) => {
    if (money > 500) return 'text-gray-200';
    if (money > 0) return 'text-gray-400';
    return 'text-gray-600';
  };

return (
  <div className="container mx-auto px-4 py-8 bg-gray-900 min-h-screen">
    {/* Заголовок */}
    <div className="text-center mb-11">
      <h1 className="text-7xl font-bold text-gray-100 mb-1">
        🍺 Управление Валерами
      </h1>
    </div>

    {/* Панель управления */}
    <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
      <div className="flex flex-row gap-4 items-center justify-between">
        {/* Поиск */}
        <div className="w-64">
          <input
            type="text"
            placeholder="🔍 Поиск по ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent bg-gray-700 text-gray-100"
          />
        </div>

        {/* Кнопка создания */}
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={loading}
          className="w-auto bg-blue-700 text-gray-100 px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ➕ Создать Валеру
        </button>
      </div>
    </div>

    {/* Ошибки */}
    {error && (
      <div className="bg-red-800 border border-red-600 text-red-200 px-4 py-3 rounded-lg mb-6">
        {error}
      </div>
    )}

    {/* Загрузка */}
    {loading && (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-transparent"></div>
        <p className="text-gray-100 mt-4">Загрузка...</p>
      </div>
    )}

    {/* Список Валер */}
    {!loading && filteredValeras.length === 0 ? (
      <div className="bg-gray-800 rounded-lg shadow-xl p-12 text-center">
        <p className="text-gray-400 text-xl">
          {searchTerm ? '🔍 Ничего не найдено' : '📝 Нет Валер. Создайте первого!'}
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-3 gap-6">
        {filteredValeras.map((valera) => (
          <div
            key={valera.id}
            onClick={() => handleViewDetails(valera.id)}
            className="bg-gray-800 rounded-lg shadow-xl overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            {/* Заголовок карточки */}
            <div className="bg-gray-700 p-4">
              <h3 className="text-2xl font-bold text-gray-100">
                Валера #{valera.id}
              </h3>
            </div>

            {/* Параметры */}
            <div className="p-6 space-y-4 text-gray-100">
              {/* Здоровье */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">❤️ Здоровье</span>
                  <span className="text-sm font-bold">{valera.health}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div
                    className={`${getHealthColor(valera.health)} h-3 rounded-full transition-all`}
                    style={{ width: `${valera.health}%` }}
                  ></div>
                </div>
              </div>

              {/* Алкоголь */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">🍺 Алкоголь</span>
                  <span className="text-sm font-bold">{valera.alcohol}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-gray-500 h-3 rounded-full transition-all"
                    style={{ width: `${valera.alcohol}%` }}
                  ></div>
                </div>
              </div>

              {/* Усталость */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">😴 Усталость</span>
                  <span className="text-sm font-bold">{valera.fatigue}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-3">
                  <div
                    className="bg-gray-500 h-3 rounded-full transition-all"
                    style={{ width: `${valera.fatigue}%` }}
                  ></div>
                </div>
              </div>

              {/* Жизнерадостность */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">😊 Жизнерадостность</span>
                <span className={`text-lg font-bold ${valera.joy >= 0 ? 'text-gray-200' : 'text-gray-500'}`}>
                  {valera.joy > 0 ? '+' : ''}{valera.joy}
                </span>
              </div>

              {/* Деньги */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">💰 Деньги</span>
                <span className={`text-xl font-bold ${getMoneyColor(valera.money)}`}>${valera.money}</span>
              </div>
            </div>

            {/* Кнопки */}
            <div className="bg-gray-700 px-6 py-4 flex justify-between">
              <button
                onClick={() => handleViewDetails(valera.id)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                📊 Подробнее
              </button>
              <button
                onClick={(e) => handleDelete(valera.id, e)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    <CreateValeraModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onCreate={handleCreate}
    />
  </div>
);
}

export default ValeraList;
