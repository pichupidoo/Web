import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { valeraApi } from '../services/valeraApi';

function ValeraStats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [valera, setValera] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);  

  // Загрузить Валеру
  const loadValera = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await valeraApi.getValeraById(id);
      setValera(data);
    } catch (err) {
      setError('Ошибка загрузки Валеры: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadValera();
  }, [id]);

  const performAction = async (actionFn, actionName) => {
    try {
      setActionLoading(true);
      setError(null);
      const updatedValera = await actionFn(id);
      setValera(updatedValera);
    } catch (err) {
      setError(`Ошибка при выполнении "${actionName}": ${err.message}`);
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const canWork = valera && valera.alcohol < 50 && valera.fatigue < 10;

const getHealthColor = (health) => {
  if (health > 70) return 'from-green-500 to-green-600';
  if (health > 40) return 'from-yellow-500 to-yellow-600';
  return 'from-red-500 to-red-600';
};

const getAlcoholColor = (alcohol) => {
  if (alcohol < 30) return 'from-blue-400 to-blue-500';
  if (alcohol < 70) return 'from-blue-500 to-blue-600';
  return 'from-purple-500 to-purple-600';
};

const getFatigueColor = (fatigue) => {
  if (fatigue < 40) return 'from-green-400 to-green-500';
  if (fatigue < 70) return 'from-orange-400 to-orange-500';
  return 'from-red-400 to-red-500';
};

const getJoyColor = (joy) => {
  if (joy > 5) return 'text-green-600';
  if (joy > 0) return 'text-green-500';
  if (joy === 0) return 'text-gray-600';
  if (joy > -5) return 'text-orange-600';
  return 'text-red-600';
};

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
        <p className="text-white mt-4 text-xl">Загрузка Валеры...</p>
      </div>
    </div>
  );
}

if (!valera) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 text-center">
        <p className="text-red-600 text-xl mb-4">Валера не найден</p>
        <button
          onClick={() => navigate('/')}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          ← Назад к списку
        </button>
      </div>
    </div>
  );
}

return (
  <div className="container mx-auto px-4 py-8">
    {/* Кнопка назад */}
    <button
      onClick={() => navigate('/')}
      className="mb-6 bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
    >
      ← Назад к списку
    </button>

    {/* Заголовок */}
    <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
        Валера #{valera.id}
      </h1>
      <p className="text-gray-600">Статистика персонажа</p>
    </div>

    {/* Ошибки */}
    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
        {error}
      </div>
    )}

    {/* Параметры */}
    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* Здоровье */}
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-4xl mr-3">❤️</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Здоровье</h3>
              <p className="text-3xl font-bold text-gray-900">{valera.health}/100</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`bg-gradient-to-r ${getHealthColor(valera.health)} h-6 rounded-full transition-all duration-500`}
            style={{ width: `${valera.health}%` }}
          ></div>
        </div>
      </div>

      {/* Алкоголь */}
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-4xl mr-3">🍺</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Алкоголь</h3>
              <p className="text-3xl font-bold text-gray-900">{valera.alcohol}/100</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`bg-gradient-to-r ${getAlcoholColor(valera.alcohol)} h-6 rounded-full transition-all duration-500`}
            style={{ width: `${valera.alcohol}%` }}
          ></div>
        </div>
      </div>

      {/* Усталость */}
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-4xl mr-3">😴</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Усталость</h3>
              <p className="text-3xl font-bold text-gray-900">{valera.fatigue}/100</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className={`bg-gradient-to-r ${getFatigueColor(valera.fatigue)} h-6 rounded-full transition-all duration-500`}
            style={{ width: `${valera.fatigue}%` }}
          ></div>
        </div>
      </div>

      {/* Жизнерадостность */}
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-4xl mr-3">😊</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Жизнерадостность</h3>
              <p className={`text-5xl font-bold ${getJoyColor(valera.joy)}`}>
                {valera.joy > 0 ? '+' : ''}{valera.joy}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Диапазон:</p>
            <p className="text-sm text-gray-700 font-semibold">-10 до +10</p>
          </div>
        </div>
      </div>
    </div>

    {/* Деньги - отдельная карточка */}
    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg shadow-xl p-8 mb-6">
        <div className="flex items-center ">
          <span className="text-6xl mr-4">💰</span>
          <div>
            <h3 className="text-2xl font-semibold text-white">Деньги</h3>
            <p className="text-5xl font-bold text-white">${valera.money}</p>
          </div>
        </div>
    </div>

    {/* Панель действий */}
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎮 Действия</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Работа */}
        <button
          onClick={() => performAction(valeraApi.work, 'Пойти на работу')}
          disabled={!canWork || actionLoading}
          className={`p-6 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${
            canWork && !actionLoading
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="text-4xl mb-2">💼</div>
          <div>Работать</div>
          {!canWork && (
            <div className="text-xs mt-2">
              {valera.alcohol >= 50 && '🍺 Слишком пьян'}
              {valera.fatigue >= 10 && '😴 Слишком устал'}
            </div>
          )}
        </button>

        {/* Природа */}
        <button
          onClick={() => performAction(valeraApi.enjoyNature, 'Созерцать природу')}
          disabled={actionLoading}
          className="p-6 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          <div className="text-4xl mb-2">🌳</div>
          <div>Созерцать природу</div>
        </button>

        {/* Вино и сериал */}
        <button
          onClick={() => performAction(valeraApi.drinkWine, 'Пить вино')}
          disabled={actionLoading}
          className="p-6 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          <div className="text-4xl mb-2">🍷</div>
          <div>Вино + Сериал</div>
        </button>

        {/* Бар */}
        <button
          onClick={() => performAction(valeraApi.goToBar, 'Сходить в бар')}
          disabled={actionLoading}
          className="p-6 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          <div className="text-4xl mb-2">🍻</div>
          <div>Сходить в бар</div>
        </button>

        {/* Маргиналы */}
        <button
          onClick={() => performAction(valeraApi.drinkWithMarginals, 'Пить с маргиналами')}
          disabled={actionLoading}
          className="p-6 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          <div className="text-4xl mb-2">🥴</div>
          <div>С маргиналами</div>
        </button>

        {/* Метро */}
        <button
          onClick={() => performAction(valeraApi.singInMetro, 'Петь в метро')}
          disabled={actionLoading}
          className="p-6 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105 disabled:opacity-50"
        >
          <div className="text-4xl mb-2">🎤</div>
          <div>Петь в метро</div>
        </button>

        {/* Спать (на всю ширину) */}
        <button
          onClick={() => performAction(valeraApi.sleep, 'Спать')}
          disabled={actionLoading}
          className="p-6 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 col-span-3"
        >
          <div className="text-4xl mb-2">😴</div>
          <div>Спать</div>
        </button>
      </div>

      {actionLoading && (
        <div className="mt-6 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-600 border-t-transparent"></div>
          <p className="text-gray-600 mt-2">Выполняется действие...</p>
        </div>
      )}
    </div>
  </div>
);
}

export default ValeraStats; 