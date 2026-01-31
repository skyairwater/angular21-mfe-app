# Angular Micro-Frontend Implementation Guide

This repository demonstrates a **Micro-Frontend (MFE) Architecture** using **Angular 21** and **Native Federation**.

## Architecture Overview

- **Monorepo Structure**: A single Angular workspace containing multiple projects.
- **Shell (Host)**: The main entry point that loads authentication and dynamically fetches remote apps.
- **Remotes**: Independent applications (`merchant`, `credit`, `wealth`) exposed as modules.
- **Native Federation**: Uses the browser's native ES Module support (Import Maps) instead of Webpack specific bundles.

---

## Implementation Steps

### 1. Workspace Scaffolding
We started by creating an empty Angular workspace to house multiple projects.
```bash
ng new angular-mfe-app --no-create-application
```
Inside this workspace, we generated four distinct applications:
- `shell` (The orchestrator)
- `merchant` (Feature A)
- `credit` (Feature B)
- `wealth` (Feature C)

### 2. Native Federation Setup
We installed the `@angular-architects/native-federation` package to handle module sharing and loading.

**Command:**
```bash
npm install @angular-architects/native-federation -D
```

**Initialization:**
- **Shell**: Initialized as a `dynamic-host`. This allows it to load remotes defined in a JSON manifest at runtime, rather than hardcoding them in the build.
- **Remotes**: Initialized as `remote`. This configures them to expose an entry point (`remoteEntry.json`).

**Configuration:**
- `federation.config.js`: Controls shared dependencies (Singletons) and exposed modules.
- `federation.manifest.json`: A JSON file in the Shell's public assets that maps remote names to their deployed locations (e.g., `"merchant": "http://localhost:4201/remoteEntry.json"`).

### 3. Shell Routing & Dynamic Loading
The Shell application does not statically import the remotes. Instead, it uses the Angular Router with `loadRemoteModule`.

- **Lazy Loading**: Routes are defined to lazy-load components from the native federation wrapper.
- **Typed Manifests**: The shell reads the manifest to resolve the remote URLs.

### 4. Role-Based Authentication (RBAC)
We implemented a custom security layer within the Shell to restrict access.

**Components:**
1.  **AuthService**: Manages user session state using Angular Signals. It verifies hardcoded credentials and determining user roles.
2.  **AuthGuard**: A functional route guard that intercepts navigation.
    - Checks if the user is authenticated.
    - Checks if the user's role matches the module's requirements (`data: { role: '...' }`).
3.  **Login Component**: A standalone entry component that authenticates the user before they can access the standard layout.

### 5. Shared State & Dependencies
Native Federation ensures that `@angular/core`, `@angular/common`, and other shared libraries are loaded only once (Singleton pattern). The `federation.config.js` in each project handles this negotiation.

---

## Running the System

To run the complete system locally, we must serve the Shell and all Remotes simultaneously on their configured ports.

```bash
# Terminals 1-3 (Remotes)
npm run start:merchant  # Port 4201
npm run start:credit    # Port 4202
npm run start:wealth    # Port 4203

# Terminal 4 (Shell)
npm run start:shell     # Port 4200
```

Navigate to `http://localhost:4200` to access the application.
