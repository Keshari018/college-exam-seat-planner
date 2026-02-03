// Store classrooms in memory
let classrooms = [];

// Load classrooms from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadClassrooms();
    displayClassrooms();
});

// Add Classroom Form Handler
document.getElementById('addClassroomForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const roomId = document.getElementById('roomId').value.trim();
    const capacity = parseInt(document.getElementById('capacity').value);
    const floorNo = parseInt(document.getElementById('floorNo').value);
    const nearWashroom = document.getElementById('nearWashroom').checked;
    
    // Check if room ID already exists
    if (classrooms.some(room => room.roomId === roomId)) {
        alert('Room ID already exists. Please use a unique ID.');
        return;
    }
    
    // Validate inputs
    if (capacity <= 0 || floorNo < 0) {
        alert('Please enter valid capacity and floor number.');
        return;
    }
    
    // Create classroom object
    const classroom = {
        roomId,
        capacity,
        floorNo,
        nearWashroom
    };
    
    // Add to array
    classrooms.push(classroom);
    
    // Save to localStorage
    saveClassrooms();
    
    // Display updated list
    displayClassrooms();
    
    // Reset form
    document.getElementById('addClassroomForm').reset();
    
    // Show success message
    showMessage('Classroom added successfully!', 'success');
});

// Allocate Exam Form Handler
document.getElementById('allocateForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const totalStudents = parseInt(document.getElementById('totalStudents').value);
    
    if (totalStudents <= 0) {
        alert('Please enter a valid number of students.');
        return;
    }
    
    allocateExam(totalStudents);
});

// Clear All Button Handler
document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete all classrooms? This action cannot be undone.')) {
        classrooms = [];
        saveClassrooms();
        displayClassrooms();
        showMessage('All classrooms cleared successfully!', 'success');
        
        // Hide result section
        document.getElementById('resultSection').style.display = 'none';
    }
});

// Delete single classroom
function deleteClassroom(roomId) {
    if (confirm(`Are you sure you want to delete classroom ${roomId}?`)) {
        classrooms = classrooms.filter(room => room.roomId !== roomId);
        saveClassrooms();
        displayClassrooms();
        showMessage(`Classroom ${roomId} deleted successfully!`, 'success');
        
        // Hide result section if it was showing
        document.getElementById('resultSection').style.display = 'none';
    }
}

// Display all classrooms in a table
function displayClassrooms() {
    const listContainer = document.getElementById('classroomList');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    if (classrooms.length === 0) {
        listContainer.innerHTML = '<p class="empty-message">No classrooms added yet.</p>';
        clearAllBtn.style.display = 'none';
        return;
    }
    
    // Show clear all button when there are classrooms
    clearAllBtn.style.display = 'inline-block';
    
    let html = `
        <table class="classroom-table">
            <thead>
                <tr>
                    <th>Room ID</th>
                    <th>Capacity</th>
                    <th>Floor</th>
                    <th>Near Washroom</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    classrooms.forEach(room => {
        html += `
            <tr>
                <td><span class="room-id-badge">${room.roomId}</span></td>
                <td>${room.capacity}</td>
                <td>Floor ${room.floorNo}</td>
                <td>${room.nearWashroom ? '<span class="badge-yes">Yes</span>' : '<span class="badge-no">No</span>'}</td>
                <td>
                    <button class="btn btn-delete btn-sm" onclick="deleteClassroom('${room.roomId}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
        <div class="stats-bar">
            <span>Total Classrooms: <strong>${classrooms.length}</strong></span>
            <span>Total Capacity: <strong>${classrooms.reduce((sum, room) => sum + room.capacity, 0)}</strong></span>
        </div>
    `;
    
    listContainer.innerHTML = html;
}

// Greedy allocation algorithm
function allocateExam(totalStudents) {
    if (classrooms.length === 0) {
        showAllocationResult('No classrooms available. Please add classrooms first.', false);
        return;
    }
    
    // Sort classrooms by floor number (ascending) and then by capacity (descending)
    // This ensures we prefer lower floors first, and among same floor, prefer larger rooms
    const sortedRooms = [...classrooms].sort((a, b) => {
        if (a.floorNo !== b.floorNo) {
            return a.floorNo - b.floorNo;
        }
        return b.capacity - a.capacity;
    });
    
    let remainingStudents = totalStudents;
    const allocatedRooms = [];
    
    // Greedy allocation: pick rooms from sorted list
    for (const room of sortedRooms) {
        if (remainingStudents <= 0) break;
        
        const studentsInRoom = Math.min(room.capacity, remainingStudents);
        allocatedRooms.push({
            ...room,
            allocatedSeats: studentsInRoom
        });
        
        remainingStudents -= studentsInRoom;
    }
    
    // Check if allocation was successful
    if (remainingStudents > 0) {
        showAllocationResult(`Not enough seats available. ${remainingStudents} students could not be accommodated.`, false);
    } else {
        showAllocationResult(allocatedRooms, true, totalStudents);
    }
}

// Display allocation result
function showAllocationResult(data, isSuccess, totalStudents = 0) {
    const resultSection = document.getElementById('resultSection');
    const resultContainer = document.getElementById('allocationResult');
    
    resultSection.style.display = 'block';
    
    if (!isSuccess) {
        resultContainer.innerHTML = `<div class="error-message">${data}</div>`;
        return;
    }
    
    let html = `
        <div class="allocation-summary">
            <h3>✓ Allocation Successful</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <span class="summary-label">Total Students</span>
                    <span class="summary-value">${totalStudents}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Rooms Allocated</span>
                    <span class="summary-value">${data.length}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Total Capacity Used</span>
                    <span class="summary-value">${data.reduce((sum, room) => sum + room.allocatedSeats, 0)}</span>
                </div>
            </div>
        </div>
        <h3>Allocated Classrooms:</h3>
        <ul class="allocation-list">
    `;
    
    data.forEach(room => {
        const utilizationPercent = Math.round((room.allocatedSeats / room.capacity) * 100);
        html += `
            <li>
                <div class="allocation-item">
                    <span class="room-id-badge">${room.roomId}</span>
                    <span class="allocation-details">
                        Floor ${room.floorNo} • 
                        ${room.allocatedSeats}/${room.capacity} seats (${utilizationPercent}% utilized)
                        ${room.nearWashroom ? ' • <span class="badge-washroom">Near Washroom</span>' : ''}
                    </span>
                </div>
            </li>
        `;
    });
    
    html += '</ul>';
    resultContainer.innerHTML = html;
}

// Save classrooms to localStorage
function saveClassrooms() {
    localStorage.setItem('classrooms', JSON.stringify(classrooms));
}

// Load classrooms from localStorage
function loadClassrooms() {
    const stored = localStorage.getItem('classrooms');
    if (stored) {
        classrooms = JSON.parse(stored);
    }
}

// Show temporary success message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.minWidth = '250px';
    messageDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 2700);
}
