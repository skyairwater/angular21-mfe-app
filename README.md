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

   You can run the entire system (Shell and all 3 remotes) with a single command:
   ```bash
   npm run start:all
   ```

   Alternatively, you can run each application in a separate terminal:
   - **Shell**: `npm run start:shell` (Port 4200)
   - **Merchant**: `npm run start:merchant` (Port 4201)
   - **Credit**: `npm run start:credit` (Port 4202)
   - **Wealth**: `npm run start:wealth` (Port 4203)

3. **Access the App**
   Open your browser to [http://localhost:4200](http://localhost:4200). You will be redirected to the Login page.

## Authentication & Roles

This application uses Role-Based Access Control (RBAC).

| Username | Password | Role | Access |
|---|---|---|---|
| `merchantuser` | `abcd123` | merchant | Merchant App only |
| `credituser` | `abcd123` | credit | Credit App only |
| `wealthuser` | `abcd123` | wealth | Wealth App only |
| `admin` | `abcd123` | admin | All Apps |

## Navigation
- `/merchant` - Loads the Merchant MFE (Restricted)
- `/credit` - Loads the Credit MFE (Restricted)
- `/wealth` - Loads the Wealth MFE (Restricted)
