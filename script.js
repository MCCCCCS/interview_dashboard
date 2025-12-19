async function loadCandidates() {
  const tableBody = document.getElementById('candidateTable');

  try {
    const response = await fetch('https://raw.githubusercontent.com/MCCCCCS/interview_dashboard/main/sample_candidate_data.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const candidates = data.candidates;

    if (!Array.isArray(candidates)) {
      throw new Error('Data is not an array');
    }

    tableBody.innerHTML = ''; // Clear loading message

    candidates.forEach(candidate => {
      // Validate required fields
      if (!candidate.candidate_id || !candidate.candidate_name || 
          !candidate.application_date || !candidate.status) {
        console.warn('Skipping candidate with missing fields:', candidate);
        return;
      }

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${candidate.candidate_id}</td>
        <td>${candidate.candidate_name}</td>
        <td>${candidate.application_date}</td>
        <td>${candidate.status}</td>
      `;
      tableBody.appendChild(row);
    });

    // If no valid rows were added
    if (tableBody.children.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No valid candidate data found</td></tr>';
    }
  } catch (error) {
    console.error('Error loading candidates:', error.message);
    tableBody.innerHTML = `<tr><td colspan="4" class="text-center">Error loading data: ${error.message}</td></tr>`;
  }
}

// Load data when the page finishes loading
window.onload = loadCandidates;