import React from 'react';

const CryptoSelector = ({ cryptocurrencies, onSelect, selectedValue }) => {
    const handleChange = (e) => {
        const selectedCoin = e.target.value;
        onSelect(selectedCoin);
    };

    return (
        <div className="crypto-selector">
            <label htmlFor="crypto-select">Cryptocurrency</label>
            <select 
                id="crypto-select" 
                onChange={handleChange}
                value={selectedValue}
                className="styled-select"
            >
                <option value="">Select a cryptocurrency</option>
                {cryptocurrencies.map((crypto) => (
                    <option key={crypto.id} value={crypto.id}>
                        {crypto.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CryptoSelector;