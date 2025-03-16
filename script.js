document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const fileUpload = document.getElementById('file-upload');
    const dataTable = document.getElementById('data-table');
    const tableBody = dataTable.querySelector('tbody');
    
    // Store uploaded files for download
    const uploadedFiles = new Map();
    
    // Add event listener for file upload
    fileUpload.addEventListener('change', handleFileUpload);
    
    // Initial empty state
    showEmptyState();
    
    // Function to handle file upload
    function handleFileUpload(event) {
        const files = event.target.files;
        
        if (files.length === 0) return;
        
        // Clear existing table data
        tableBody.innerHTML = '';
        
        // Process each file
        Array.from(files).forEach((file, index) => {
            // Store the file for later download
            const fileId = 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            uploadedFiles.set(fileId, file);
            
            processFile(file, fileId, index);
        });
    }
    
    // Function to process uploaded file
    function processFile(file, fileId, fileIndex) {
        // Handle .docx files - just display the filename as a link
        if (file.name.endsWith('.docx')) {
            addRowToTable({
                name: file.name,
                phone: fileIndex === 0 ? '+18885645271' : generateRandomPhoneNumber(),
                fileId: fileId
            });
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            let data;
            
            try {
                // Try to parse as JSON first
                if (file.name.endsWith('.json')) {
                    data = JSON.parse(e.target.result);
                    populateTableWithData(data, file.name, fileId, fileIndex);
                } 
                // Handle CSV files
                else if (file.name.endsWith('.csv')) {
                    data = parseCSV(e.target.result);
                    populateTableWithData(data, file.name, fileId, fileIndex);
                }
                // Handle TXT files (assuming comma or tab separated)
                else if (file.name.endsWith('.txt')) {
                    data = parseCSV(e.target.result);
                    populateTableWithData(data, file.name, fileId, fileIndex);
                }
                // For other file types, just show filename
                else {
                    addRowToTable({
                        name: file.name,
                        phone: fileIndex === 0 ? '+18885645271' : generateRandomPhoneNumber(),
                        fileId: fileId
                    });
                }
            } catch (error) {
                console.error('Error processing file:', error);
                addRowToTable({
                    name: file.name,
                    phone: fileIndex === 0 ? '+18885645271' : generateRandomPhoneNumber(),
                    fileId: fileId
                });
            }
        };
        
        reader.onerror = function() {
            console.error('Error reading file');
            addRowToTable({
                name: file.name,
                phone: fileIndex === 0 ? '+18885645271' : generateRandomPhoneNumber(),
                fileId: fileId
            });
        };
        
        // Read the file
        if (file.name.endsWith('.json')) {
            reader.readAsText(file);
        } else if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
            reader.readAsText(file);
        } else if (!file.name.endsWith('.docx')) {
            // For unsupported file types (excluding .docx which is handled above)
            addRowToTable({
                name: file.name,
                phone: fileIndex === 0 ? '+18885645271' : generateRandomPhoneNumber(),
                fileId: fileId
            });
        }
    }
    
    // Function to generate a random phone number
    function generateRandomPhoneNumber() {
        const formats = [
            '+1##########',
            '(###) ###-####',
            '###-###-####'
        ];
        
        const format = formats[Math.floor(Math.random() * formats.length)];
        
        return format.replace(/#/g, () => Math.floor(Math.random() * 10));
    }
    
    // Function to parse CSV data
    function parseCSV(text) {
        const lines = text.split(/\r\n|\n/);
        const data = [];
        
        // Determine delimiter (comma or tab)
        const delimiter = lines[0].includes('\t') ? '\t' : ',';
        
        // Get headers
        const headers = lines[0].split(delimiter);
        
        // Process each line
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            
            const values = lines[i].split(delimiter);
            const entry = {};
            
            // Map values to headers
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j].trim()] = values[j] ? values[j].trim() : '';
            }
            
            data.push(entry);
        }
        
        return data;
    }
    
    // Function to populate table with data
    function populateTableWithData(data, fileName, fileId, fileIndex) {
        if (!Array.isArray(data)) {
            // If data is not an array, convert it to array
            data = [data];
        }
        
        if (data.length === 0) {
            showEmptyState();
            return;
        }
        
        // Process each data entry
        data.forEach((entry, index) => {
            // Determine if this is the first row (first file and first entry)
            const isFirstRow = fileIndex === 0 && index === 0;
            
            // Try to extract name, phone, and responses from the data
            // This is a simple implementation and might need adjustment based on actual data structure
            const rowData = {
                name: fileName || entry.name || entry.Name || entry.fullName || entry.full_name || 'Unknown',
                phone: isFirstRow ? '+18885645271' : generateRandomPhoneNumber(),
                fileId: fileId
            };
            
            addRowToTable(rowData);
        });
    }
    
    // Function to add a row to the table
    function addRowToTable(rowData) {
        const row = document.createElement('tr');
        
        // Create cells
        const nameCell = document.createElement('td');
        
        // Create a download link for the file
        const downloadLink = document.createElement('a');
        downloadLink.textContent = rowData.name;
        downloadLink.href = '#';
        downloadLink.className = 'file-link';
        downloadLink.dataset.fileId = rowData.fileId;
        downloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            downloadFile(this.dataset.fileId, this.textContent);
        });
        
        nameCell.appendChild(downloadLink);
        
        const phoneCell = document.createElement('td');
        phoneCell.textContent = rowData.phone;
        
        const responsesCell = document.createElement('td');
        
        // Create a link to the local Excel file
        const excelLink = document.createElement('a');
        excelLink.textContent = 'View Responses';
        excelLink.href = 'responses_data.xlsx'; // Link to your local Excel file
        excelLink.className = 'spreadsheet-link';
        excelLink.title = 'Open Excel spreadsheet with columns: Date, First Name, Last Name, Q1, Q2';
        
        responsesCell.appendChild(excelLink);
        
        // Add cells to row
        row.appendChild(nameCell);
        row.appendChild(phoneCell);
        row.appendChild(responsesCell);
        
        // Add row to table
        tableBody.appendChild(row);
    }
    
    // Function to download a file
    function downloadFile(fileId, fileName) {
        const file = uploadedFiles.get(fileId);
        if (!file) {
            console.error('File not found');
            return;
        }
        
        // Create a URL for the file
        const url = URL.createObjectURL(file);
        
        // Create a temporary link and click it
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
    
    // Function to show empty state
    function showEmptyState() {
        tableBody.innerHTML = `
            <tr>
                <td colspan="3" class="empty-table">
                    <p>No data to display. Upload files to see data.</p>
                </td>
            </tr>
        `;
    }
}); 