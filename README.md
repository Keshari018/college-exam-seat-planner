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

## License

MIT License

## Author

Created as part of Round 2 Assignment 3
