const tasks = document.querySelectorAll('.task');
const lists = document.querySelectorAll('.list');

// Add event listeners to each task for dragstart and dragend events
for (const task of tasks) {
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging'); // Add 'dragging' class when drag starts to apply specific styles
    });
    task.addEventListener('dragend', () => {
        task.classList.remove('dragging'); // Remove 'dragging' class once drag ends
    });
}

// Add event listeners to each list/column to handle the drop zone logic
for (const list of lists) {
    list.addEventListener('dragover', (e) => {
        e.preventDefault(); // Prevent default behavior to allow dropping

        // Determine the element immediately after the cursor's current position
        const afterElement = getDragAfterElement(list, e.clientY);
        const dragging = document.querySelector('.dragging'); // Find the currently dragged task

        if (afterElement == null) {
            list.appendChild(dragging); // If no element is below, append to the end of the list
        } else {
            list.insertBefore(dragging, afterElement); // Otherwise, insert before the identified element
        }
    });
}

// Function to determine which element the dragged item should be placed above
function getDragAfterElement(list, y) {
    // Get all tasks in the list that are NOT currently being dragged
    const draggableElements = [...list.querySelectorAll('.task:not(.dragging)')];

    // Use reduce to find the closest element directly below the mouse cursor
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect(); // Get the bounding box of the current child
        const offset = y - box.top - box.height / 2; // Calculate distance from the mouse to the center of the child

        // If the mouse is above the center of the child and closer than the previously found closest element
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
