# Concept-Reviser

## Description

Concept-Reviser is a Visual Studio Code extension designed to help users revise programming languages in an interactive and engaging way. Here are some of the key features:

1. **Interactive MCQs**: The extension provides multiple-choice questions for various programming languages, allowing users to test and revise their knowledge directly within the VS Code environment.

2. **Save Questions**: Users have the option to save questions for later review. This feature is particularly useful for keeping track of difficult questions or concepts that need further study.

3. **View Blogs**: The extension also provides a feature to view programming-related blogs. This can be a great resource for learning new concepts, understanding best practices, and staying updated with the latest trends in the programming world.

## Installation

To run this project locally, follow these steps:

1. **Clone this repository to your local machine**

   ```bash
   git clone https://github.com/Vishal21121/Concept-Reviser-vscode-extension.git
   ```

2. **Install the dependencies**

   - Install the backend dependencies:

     ```bash
     go mod tidy
     ```

   - Install the extension dependencies:

     ```bash
     cd extension
     ```

     ```bash
     npm install
     ```

3. **Start the application**

   - Start the backend server

     ```bash
     cd backend
     ```

     ```bash
     go run main.go
     ```

   - Start the extension

     press `F5` button
