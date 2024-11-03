# Maze Visualization

This project is a visual representation of pathfinding algorithms using JavaScript and HTML. It generates a grid where users can select start and end points, and the application will visualize the search for a path between those points using Breadth-First Search (BFS) and Depth-First Search (DFS) algorithms.

## Features

- **Grid Generation**: Dynamically generates a grid based on user-defined dimensions (height and width).
- **Blocked Cells**: Randomly blocks some cells in the grid to simulate obstacles.
- **Start and End Point Selection**: Allows users to select the starting and ending points on the grid.
- **Pathfinding Algorithms**: Implements BFS and DFS algorithms to find a path between the selected points.
- **Visualization**: Visually indicates visited nodes, the path found, and blocked cells through CSS classes.
- **Logging**: Outputs logs to a terminal interface to show progress and results.

## Technologies Used

- **HTML**: For the basic structure and layout of the grid.
- **CSS**: For styling the grid and visual elements.
- **JavaScript**: For the interactive functionalities, grid generation, and algorithm implementations.

## Algorithms Implemented

### 1. Breadth-First Search (BFS)
BFS explores the neighbor nodes level by level. It uses a queue to keep track of nodes to visit. The algorithm starts from the selected start point, explores all adjacent cells, marks them as visited, and adds them to the queue until it reaches the end point.

### 2. Depth-First Search (DFS)
DFS explores as far down a branch as possible before backtracking. It uses a stack (or recursive calls) to remember the path taken. Like BFS, it starts from the selected point and explores the grid until it finds the end point or exhausts all options.

## Screenshots


![Screenshot 2024-11-03 122400](https://github.com/user-attachments/assets/877909f7-cf45-4a1e-aa15-263913faaedf)
![Screenshot 2024-11-03 122424](https://github.com/user-attachments/assets/74d8e932-5524-4b7e-9108-7b308258dfad)
![Screenshot 2024-11-03 122440](https://github.com/user-attachments/assets/45d6fb03-216c-459b-b431-33b070c3272d)
![Screenshot 2024-11-03 122521](https://github.com/user-attachments/assets/f2c66e74-3cd5-4809-9b9f-94734941cc5b)
