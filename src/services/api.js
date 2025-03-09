const API_URL = 'https://crypto-prediction-backend.onrender.com';

export const fetchPrediction = async (coin, days) => {
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
            body: JSON.stringify({ coin, days })
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
        }

        const data = await response.json();
        console.log('Received prediction data:', data);
        
        return data.predictions;
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw error;
    }
};