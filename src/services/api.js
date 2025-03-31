const API_URL = 'https://crypto-prediction-backend.onrender.com';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPrediction = async (coin, days, retries = 3) => {
    try {
        console.log(`Fetching prediction for ${coin} (${days} days)`);
        
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'https://crypto-prediction-frontend.vercel.app',
                'Access-Control-Allow-Origin': '*'
            },
            mode: 'cors', // Remove duplicate mode declaration and no-cors
            credentials: 'omit',
            body: JSON.stringify({ coin, days })
        });

        // First check if response exists
        if (!response) {
            throw new Error('No response received from server');
        }

        // Parse error response first
        const data = await response.json();

        // Then check response status
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(data)}`);
        }

        // Validate prediction data
        if (!data.predictions || !Array.isArray(data.predictions)) {
            throw new Error('Invalid prediction data format received');
        }

        return data.predictions;
    } catch (error) {
        console.error('Error fetching prediction:', error);
        if (retries > 0 && (error.message.includes('500') || error.message.includes('Failed to fetch'))) {
            console.log(`Retrying... (${retries} attempts left)`);
            await wait(2000);
            return fetchPrediction(coin, days, retries - 1);
        }
        throw error;
    }
};