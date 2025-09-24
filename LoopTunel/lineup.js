function solution(commands) {
    let direction = 0;
    let count = 0;
    let canTellLeftFromRight = true
    
    for (const command of commands) {
        // Update direction based on the command
        if (canTellLeftFromRight) {
        if (command === 'L') {
            direction++;
        } else if (command === 'R') {
            direction--;
        }
        } else {
        // Students can't tell left from right
        if (command === 'L') {
            direction--;
        } else if (command === 'R') {
            direction++;
        }
        }

        // Toggle whether students can tell left from right when 'A' is encountered
        if (command === 'A') {
        canTellLeftFromRight = !canTellLeftFromRight;
        }

        // Check if the direction is 0 (facing forward) and increment the counter
        if (direction === 0) {
        count++;
        }
    }
    
    return count;
}
