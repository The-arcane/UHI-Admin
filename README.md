# UHI Open Healthcare Platform

## Local Development Setup

Follow these steps to set up and run the project on your local machine:

1. **Install Node.js and npm:**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/)
   - This will also install npm (Node Package Manager)

2. **Clone the repository:**
   - Open your terminal
   - Run: `git clone [your-repository-url]`
   - Navigate to the project directory: `cd [project-folder-name]`

3. **Install dependencies:**
   - In the project root directory, run: `npm install`

4. **Start the development server:**
   - Run: `npm run dev`
   - This will start the Vite development server

5. **View the application:**
   - Open your browser and go to: `http://localhost:5173`
   (The exact port might be different; check the terminal output for the correct URL)

## VS Code Setup

For an optimal development experience in VS Code:

1. **Install recommended extensions:**
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense

2. **Configure VS Code settings:**
   - Open VS Code settings (File > Preferences > Settings)
   - Add the following to your `settings.json`:

   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

3. **Use the integrated terminal:**
   - Open the integrated terminal in VS Code (View > Terminal)
   - Run your npm commands directly in this terminal

## Troubleshooting

If you encounter a blank white page:

1. Check the browser console for any error messages
2. Ensure all dependencies are installed correctly
3. Try clearing your browser cache
4. Verify that the development server is running without errors

If issues persist, please check the error logs and consult the project documentation or seek assistance from the development team.