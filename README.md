# Frontend README.md

# Crypto Prediction Web Tool

This project is a full-stack cryptocurrency prediction web tool that utilizes Flask for the backend and React for the frontend. The application predicts the value of selected cryptocurrencies for the next few days using machine learning.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd crypto-prediction-app/frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

1. Start the React application:
   ```
   npm start
   ```

2. Ensure that the Flask backend is running on a separate terminal.

### Usage

- Select a cryptocurrency from the dropdown menu.
- Enter the number of days for prediction (between 1 and 7).
- Click the "Calculate" button to get the predicted values.
- The results will be displayed in a visually appealing format.

### Components

- **CryptoSelector**: Dropdown menu for selecting a cryptocurrency.
- **PredictionChart**: Displays the predicted values.
- **LoadingSpinner**: Shows a loading spinner while predictions are being calculated.

### API Integration

The frontend communicates with the Flask backend to fetch predictions. Ensure that the backend is properly set up and running.

### Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

### License

This project is licensed under the MIT License.