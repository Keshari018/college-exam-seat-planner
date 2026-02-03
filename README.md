# College Exam Seat Planner

A simple and efficient web application for allocating classrooms for college exams using a greedy allocation algorithm.

## Features

- **Add Classroom**: Add classrooms with room ID, capacity, floor number, and washroom proximity
- **View All Classrooms**: Display all added classrooms in a table format
- **Allocate Exam Seats**: Automatically allocate minimum number of classrooms for exams
- **Smart Allocation**: Prefers lower floor classrooms and optimizes room usage
- **Data Persistence**: Uses localStorage to persist classroom data

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage API

## Allocation Algorithm

The application uses a **greedy allocation approach**:

1. Sorts classrooms by floor number (ascending)
2. Among same floor, prefers larger capacity rooms
3. Allocates rooms sequentially until all students are accommodated
4. Shows error if total capacity is insufficient

### Example:
- **Input**: 150 students
- **Classrooms**: 
  - Room A (Floor 1, Capacity 60)
  - Room B (Floor 2, Capacity 100)
  - Room C (Floor 1, Capacity 40)
- **Allocation**: Room A (60), Room C (40), Room B (50) = 3 rooms

## Installation & Setup

### Local Development

1. Clone the repository:
```bash
git clone <repository-url>
cd college-exam-seat-planner
```

2. Open `index.html` in a web browser:
```bash
# Using Python
python -m http.server 8000

# Or simply open the file
open index.html
```

### Deployment on Netlify

1. Create a new site on [Netlify](https://www.netlify.com)
2. Connect your GitHub repository
3. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
4. Click "Deploy site"

### Deployment on Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deployment on GitHub Pages

1. Go to repository Settings > Pages
2. Select branch: `main`
3. Select folder: `/ (root)`
4. Save and wait for deployment

## Usage Guide

### Adding a Classroom

1. Fill in the "Add Classroom" form:
   - **Room ID**: Unique identifier (e.g., R101, A-201)
   - **Capacity**: Number of seats (positive integer)
   - **Floor Number**: Floor location (0 for ground floor)
   - **Near Washroom**: Check if applicable
2. Click "Add Classroom"

### Viewing Classrooms

- All added classrooms appear in the "All Classrooms" section
- Displays: Room ID, Capacity, Floor, Washroom proximity

### Allocating Exam Seats

1. Enter total number of students in the "Allocate Exam Seats" form
2. Click "Allocate Rooms"
3. View results:
   - Success: Shows allocated rooms with floor preference
   - Failure: Shows "Not enough seats available" message

## Error Handling

- Duplicate room IDs not allowed
- Invalid capacity/floor numbers rejected
- Zero or negative student counts rejected
- Insufficient capacity handled gracefully

## File Structure

```
.
├── index.html          # Main HTML structure
├── style.css           # Simple, classic styling
├── script.js           # Allocation logic and DOM manipulation
└── README.md           # This file
```

## Key Functions

### `allocateExam(totalStudents)`
Main allocation function that:
- Sorts rooms by floor (ascending) and capacity (descending)
- Greedily allocates rooms until students are seated
- Returns allocation result or error message

### `displayClassrooms()`
Renders classroom list in table format

### `saveClassrooms()` / `loadClassrooms()`
Handles data persistence using localStorage

## Testing Scenarios

### Test Case 1: Normal Allocation
- Add: R101 (Floor 0, Cap 50), R201 (Floor 1, Cap 60)
- Allocate: 80 students
- Expected: R101 (50), R201 (30)

### Test Case 2: Insufficient Capacity
- Add: R101 (Floor 0, Cap 30)
- Allocate: 50 students
- Expected: "Not enough seats available"

### Test Case 3: Multiple Floor Preference
- Add: R301 (Floor 2, Cap 40), R101 (Floor 0, Cap 30), R201 (Floor 1, Cap 35)
- Allocate: 70 students
- Expected: R101 (30), R201 (35), R301 (5) - Lower floors preferred

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Export allocation results to PDF
- Room deletion functionality
- Edit existing classrooms
- Multiple exam scheduling
- Database integration

## License

MIT License

## Author

Created as part of Round 2 Assignment 3
