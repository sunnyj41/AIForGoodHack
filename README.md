# Shift Booker Survey System

This system collects survey responses using a Brainbase Labs conversational agent and provides tools to analyze the collected data.

## Files

- `shift_booker.based`: The conversational agent definition that collects survey responses
- `deploy_shift_booker.py`: Script to deploy the conversational agent
- `process_survey_data.py`: Script to analyze the collected survey data
- `.env`: Environment variables for API keys and credentials
- `requirements.txt`: Python dependencies

## Setup

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Set up your environment variables in the `.env` file:
   ```
   BB_API_KEY=your_brainbase_labs_api_key
   ```

## Usage

### Deploy the Survey Agent

To deploy the conversational agent:

```
python deploy_shift_booker.py
```

This will deploy the agent to the phone number specified in the script.

### Collect Survey Data

When users interact with the deployed agent via phone, their responses will be collected and saved to JSON files in the `data` directory.

### Process Survey Data

To analyze the collected survey data:

```
python process_survey_data.py
```

This script will:
1. Load the most recent survey response
2. Load and analyze all survey responses
3. Generate statistics on the responses
4. Save the combined data to a CSV file

## Data Storage

Survey responses are saved as JSON files in the `data` directory with timestamps in the filename format:
```
data/survey_response_YYYYMMDD_HHMMSS.json
```

Each file contains the complete state from a single survey interaction, including:
- User's name (or "Anonymous")
- Selected language
- Responses to all survey questions

## Analysis

The `process_survey_data.py` script provides several functions:

- `load_latest_survey_data()`: Loads the most recent survey response
- `load_all_survey_data()`: Loads all survey responses
- `analyze_survey_data(data)`: Generates statistics on the responses

The analysis includes:
- Total number of responses
- Language distribution
- Average ratings for each question

The combined data is also saved to a CSV file for further analysis in spreadsheet software. 