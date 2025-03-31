const API_URL = 'https://crypto-prediction-backend.onrender.com';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPrediction = async (coin, days, retries = 3) => {
    try {
        console.log(`Fetching prediction for ${coin} (${days} days)`);
        
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            credentials: 'omit',
            mode: 'no-cors',
            body: JSON.stringify({ coin, days })
        });

        if (!response.ok) {
            const errorData = await response.json();
            
            // If we still have retries left and it's a 500 error, retry
            if (retries > 0 && response.status === 500) {
                console.log(`Retrying... (${retries} attempts left)`);
                await wait(2000); // Wait 2 seconds before retrying
                return fetchPrediction(coin, days, retries - 1);
            }

            throw new Error(`HTTP error! status: ${response.status}, message: ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        if (!data.predictions || !Array.isArray(data.predictions)) {
            throw new Error('Invalid prediction data format received');
        }
        return data.predictions;
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw error;
    }
};