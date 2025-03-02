import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PredictionChart = ({ predictions }) => {
    if (!predictions || !Array.isArray(predictions) || predictions.length === 0) {
        return <div>No prediction data available</div>;
    }

    const data = {
        labels: predictions.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: 'Price Prediction (USD)',
                data: predictions,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Cryptocurrency Price Prediction'
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: (value) => `$${value.toLocaleString()}`
                }
            }
        }
    };

    return (
        <div className="predictions-container">
            <div className="chart-container">
                <Line data={data} options={options} />
            </div>
            <div className="prediction-summary">
                <p>Total predictions: {predictions.length}</p>
                <p>Average predicted value: ${(predictions.reduce((a, b) => a + b, 0) / predictions.length)
                    .toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </p>
            </div>
        </div>
    );
};

export default PredictionChart;