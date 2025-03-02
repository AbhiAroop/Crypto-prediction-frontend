const API_URL = 'http://localhost:5000';

export const fetchPrediction = async (coin, days) => {
    try {
        console.log(`Fetching prediction for ${coin} (${days} days)`);
        
        // Make a new prediction request directly
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coin, days }),
        });

        const data = await response.json();
        console.log('Received prediction data:', data);
        console.log('Received prediction data 2:', data.predictions);
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch prediction');
        }

        if (!data.predictions || !Array.isArray(data.predictions)) {
            throw new Error('Invalid prediction data received');
        }
        console.log('HURRAY', data.predictions);

        return data.predictions;
    } catch (error) {
        console.error('Error fetching prediction:', error);
        throw error;
    }
};