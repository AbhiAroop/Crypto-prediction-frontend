const API_URL = 'https://crypto-prediction-backend.onrender.com';

export const fetchPrediction = async (coin, days) => {
    try {
        console.log(`Fetching prediction for ${coin} (${days} days)`);
        
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({ coin, days }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received prediction data:', data);
        
        if (!data.predictions || !Array.isArray(data.predictions)) {
            throw new Error('Invalid prediction data received');
        }

        return data.predictions;
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw error;
    }
};