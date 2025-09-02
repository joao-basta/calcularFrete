import { useState } from 'react';

function CalcularFrete() {
    const [distancia, setDistancia] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('bicicleta');
    const [valorFrete, setValorFrete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    setValorFrete(null);
    setError(null);
    
    try {
        const response = await fetch('http://localhost:5001/calcularfrete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ distancia: parseFloat(distancia), tipoTransporte }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao calcular o frete.');
        }
        
        const data = await response.json();
        setValorFrete(data.valorTotal);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Calculadora de Frete</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-left">
            <label htmlFor="distancia" className="block text-gray-700 font-semibold">
              Distância (km):
            </label>
            <input
              type="number"
              id="distancia"
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              min="0"
              step="0.01"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="transporte" className="block text-gray-700 font-semibold">
              Transporte:
            </label>
            <select
              id="transporte"
              value={tipoTransporte}
              onChange={(e) => setTipoTransporte(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <option value="bicicleta">Bicicleta</option>
              <option value="carro">Carro</option>
              <option value="drone">Drone</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
            {loading ? 'Calculando...' : 'Calcular'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {valorFrete !== null && (
            <div className="mt-6 p-4 bg-blue-100 border border-blue-200 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-800">Valor do Frete: R$ {valorFrete}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalcularFrete;