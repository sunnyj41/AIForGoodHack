# Data Viewer Web Application

A simple single-page web application that allows users to upload files and view their contents in a table format.

## Features

- Upload multiple files (supports CSV, TXT, JSON, and DOCX formats)
- Display data in a clean, responsive table with three columns: Name, Phone Number, and Responses
- Filenames in the Name column are clickable links that allow downloading the original file
- Auto-generated phone numbers (first row always shows +18885645271)
- Responses column contains links to a local Excel spreadsheet template
- Modern UI with a clean design

## How to Use

1. Clone or download this repository
2. Place your Excel template file named `responses_template.xlsx` in the same folder as the HTML file
3. Open the `index.html` file in your web browser
4. Click the "Upload Files" button in the top right corner
5. Select one or more files to upload (CSV, TXT, JSON, or DOCX)
6. The data will be displayed in the table:
   - Name column: Filename with download link to the original file
   - Phone Number column: Auto-generated phone numbers (first row is always +18885645271)
   - Responses column: "View Responses" link that opens your local Excel template
7. Click on any filename in the Name column to download the original file
8. Click on "View Responses" to open the Excel template file

## Required Files

- `index.html`: The main HTML file
- `styles.css`: CSS styles for the application
- `script.js`: JavaScript code for the application functionality
- `responses_template.xlsx`: Your Excel template file with the following recommended columns:
  - Date
  - First Name
  - Last Name
  - Q1
  - Q2

## File Format Support

- **CSV files**: Should have headers in the first row
- **TXT files**: Should be comma or tab-separated with headers in the first row
- **JSON files**: Should contain objects with properties
- **DOCX files**: The filename will be displayed in the Name column as a downloadable link

Example CSV format:
```
Name,Phone Number,Responses
John Doe,123-456-7890,Yes
Jane Smith,987-654-3210,No
```

Example JSON format:
```json
[
  {
    "name": "John Doe",
    "phone": "123-456-7890",
    "responses": "Yes"
  },
  {
    "name": "Jane Smith",
    "phone": "987-654-3210",
    "responses": "No"
  }
]
```

## Browser Compatibility

This application works in all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License. 