# Angular Micro-Frontend Application

This project is an Angular 21 Micro-Frontend architecture using Native Federation.

## Architecture

The project consists of a Shell application and three Remote applications:
- **Shell**: The host application (Port 4200)
- **Merchant**: Remote MFE (Port 4201)
- **Credit**: Remote MFE (Port 4202)
- **Wealth**: Remote MFE (Port 4203)

## Prerequisites

- Node.js (Latest LTS recommended)
- Angular CLI 21

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Application**

   You can run the entire system by starting each application. For convenience, use separate terminal windows:

   **Terminal 1: Merchant**
   ```bash
   npm run start:merchant
   ```

   **Terminal 2: Credit**
   ```bash
   npm run start:credit
   ```

   **Terminal 3: Wealth**
   ```bash
   npm run start:wealth
   ```

   **Terminal 4: Shell**
   ```bash
   npm run start:shell
   ```

3. **Access the App**
   Open your browser to [http://localhost:4200](http://localhost:4200).

## Navigation
- `/merchant` - Loads the Merchant MFE
- `/credit` - Loads the Credit MFE
- `/wealth` - Loads the Wealth MFE
