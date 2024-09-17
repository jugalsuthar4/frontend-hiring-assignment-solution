# Project Setup and Structure

## Project Setup

To run this project, follow these steps:

1. **Navigate to Project Directory**:
   Open the terminal and change to the directory where the `package.json` file is located.

   ```bash
   cd path/to/project
   ```

2. **Install Dependencies**:
   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

3. **Start the React Application**:
   To start the React application in development mode, run:

   ```bash
   npm run dev
   ```

## Project Structure

The project follows a well-structured folder organization to separate concerns:

- **`src/`**: The root folder that contains the main functionality of the app.
  
  - **`components/ui/`**: This folder contains all the UI components used in the app.
  
  - **`actions/shifts.ts`**: Contains all actions and API calls related to shifts.
  
  - **`reducers/`**: Contains reducers that are used with React's `useReducer` hook for state management.
  
  - **`assets/`**: This folder holds static assets like images and stylesheets.
  
  - **`context/`**: All context and context providers for global state management are stored here.
  
  - **`hooks/`**: Custom React hooks are kept in this directory.
  
  - **`constants.ts`**: All app-wide constants are defined here.
  
  - **`model/`**: Contains TypeScript interfaces and models, such as `IShift`.
  
  - **`screens/`**: This folder holds the different screens of the application.
  
  - **`utils/`**: Utility functions are organized here, including the `shift_utils.ts` file for handling shifts.

## Shifts Data Grouping

The utility functions in `utils/shift_utils.ts` are responsible for grouping shifts. The key function is `organizeShifts`, which takes an array of `IShift` objects and returns grouped shifts.

### Interfaces

The `IShift` interface defines the structure for a shift object:

```typescript
export interface IShift {
  id: string;
  booked: boolean;
  area: string;
  startTime: number;
  endTime: number;
  isOverlapping: boolean;
}
```

### Grouping Functions

1. **`mapAvailableShifts`**: Groups available shifts by area and time. It checks for overlapping shifts to avoid conflicts.

   ```typescript
   const mapAvailableShifts = (booked: IShift[], allShifts: IShift[]) => {
     // Grouping logic
   };
   ```

2. **`groupBookedShiftsByDate`**: Groups booked shifts by their date (Today, Tomorrow, or formatted date).

   ```typescript
   const groupBookedShiftsByDate = (shifts: IShift[]) => {
     // Grouping by date logic
   };
   ```

3. **`organizeShifts`**: This is the main entry point for grouping shifts. It sorts the shifts, separates booked and available shifts, and returns them in the desired format.

   ```typescript
   export const organizeShifts = (shifts: IShift[]) => {
     // Organizing shifts logic
   };
   ```

### Example of Grouping

The `organizeShifts` function sorts shifts by `startTime`, separates booked shifts, and groups available shifts into the `IGroupedShifts` format and booked shifts by their respective dates.

## Environment Variables

The environment variables are specified in the root directory in a `.env` file. For local development, the following variable is used:

```
VITE_APP_SERVER=http://127.0.0.1:8080/shifts
```

Make sure to update this as per your environment.

## Important Note

```typescript
/**
 *
 * Note: There are some issues in the POST request while sending requests to the Hapi server.
 * For now, I have temporarily changed the HTTP POST method to GET in the Hapi server.
 * URL for reference: https://stackoverflow.com/questions/72052025/post-request-not-completing-on-postman
 * This is due to incompatibility with my current Node version.
 */
```