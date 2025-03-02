import React, { useState, useEffect } from 'react';
import CryptoSelector from './components/CryptoSelector';
import PredictionChart from './components/PredictionChart';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchPrediction } from './services/api';
import './styles.css'; 

const App = () => {
    const [selectedCrypto, setSelectedCrypto] = useState('');
    const [days, setDays] = useState(1);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Add effect to monitor prediction changes
    useEffect(() => {
        if (prediction) {
            console.log('Prediction updated:', prediction);
        }
    }, [prediction]);

    const handleCryptoChange = (value) => {
        setSelectedCrypto(value);
        setPrediction(null); // Reset prediction when crypto changes
        setError(''); // Clear any previous errors
    };

    const handleCalculate = async () => {
        setLoading(true);
        setError('');
        setPrediction(null); // Reset prediction before new request
        
        try {
            const result = await fetchPrediction(selectedCrypto, days);
            console.log('Received prediction data:', result);
            
            if (result && Array.isArray(result) && result.length > 0) {
                setPrediction(result);
                // Don't try to log prediction here as it won't be updated yet
                console.log('Prediction data received:', result);
            } else {
                setError('Invalid prediction data received');
            }
        } catch (err) {
            console.error('Prediction error:', err);
            setError('Failed to fetch prediction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDaysChange = (e) => {
        const value = e.target.value;
        // Updated validation for up to 100 days
        if (value === '' || (Number(value) >= 1 && Number(value) <= 100)) {
            setDays(value === '' ? '' : parseInt(value));
        }
    };

    const cryptocurrencies = [
        { id: 'bitcoin', name: 'Bitcoin' },
        { id: 'ethereum', name: 'Ethereum' },
        { id: 'dogecoin', name: 'Dogecoin' },
        { id: 'cardano', name: 'Cardano' },
        { id: 'solana', name: 'Solana' },
        { id: 'ripple', name: 'XRP' },
        { id: 'polkadot', name: 'Polkadot' },
        { id: 'binancecoin', name: 'Binance Coin' },
        { id: 'polygon', name: 'Polygon' },
        { id: 'avalanche-2', name: 'Avalanche' },
        { id: 'chainlink', name: 'Chainlink' },
        { id: 'uniswap', name: 'Uniswap' },
        { id: 'litecoin', name: 'Litecoin' },
        { id: 'stellar', name: 'Stellar' },
        { id: 'cosmos', name: 'Cosmos' },
        { id: 'monero', name: 'Monero' },
        { id: 'algorand', name: 'Algorand' },
        { id: 'tron', name: 'TRON' },
        { id: 'near', name: 'NEAR Protocol' },
        { id: 'vechain', name: 'VeChain' }
    ];

    return (
        <div>
            <h1>Crypto Prediction Tool</h1>
            <div className="controls">
                <CryptoSelector 
                    cryptocurrencies={cryptocurrencies} 
                    onSelect={handleCryptoChange}
                    selectedValue={selectedCrypto}
                />
                <div className="days-selector">
                    <label htmlFor="days-select">Prediction Days (1-100):</label>
                    <input
                        id="days-select"
                        type="number"
                        min="1"
                        max="100"
                        value={days}
                        onChange={handleDaysChange}
                        onBlur={() => {
                            if (days === '' || days < 1) setDays(1);
                            if (days > 100) setDays(100);
                        }}
                    />
                </div>
                <button 
                    onClick={handleCalculate}
                    disabled={!selectedCrypto || !days || days < 1 || days > 100}>
                    Calculate
                </button>
            </div>
            {loading && <LoadingSpinner />}
            {error && <p className="error-message">{error}</p>}
            {prediction && <PredictionChart predictions={prediction} />}
        </div>
    );
};

export default App;