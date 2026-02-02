# Deployment Guide for Ubuntu Server with Nginx

This guide explains how to deploy the Angular Micro-Frontend application to an Ubuntu server.

## Prerequisites

- **Ubuntu Server** (Access via SSH)
- **Nginx** already installed (`sudo apt install nginx`)
- **Git** (`sudo apt install git`)

## Step 1: Install Node.js on Ubuntu
Even though we serve static files, it is best to build the project on the server to ensure consistency.

1.  Connect to your server via SSH.
2.  Install Node.js 20 (LTS):
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
3.  Verify installation:
    ```bash
    node -v
    npm -v
    ```

## Step 2: Clone and Build
1.  Clone your repository:
    ```bash
    git clone <YOUR_REPO_URL>
    cd angular-mfe-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Critical: Configure for Production IPs**
    You must update the `federation.manifest.json` in `projects/shell/public/` to point to your server's IP address or domain instead of `localhost`.
    
    Edit the file:
    ```bash
    nano projects/shell/public/federation.manifest.json
    ```
    Change it to (replace `http://YOUR_SERVER_IP` with your actual IP):
    ```json
    {
    	"merchant": "http://YOUR_SERVER_IP:4201/remoteEntry.json",
    	"credit": "http://YOUR_SERVER_IP:4202/remoteEntry.json",
    	"wealth": "http://YOUR_SERVER_IP:4203/remoteEntry.json"
    }
    ```

4.  Build all applications:
    Run the following command to build the Shell and all Remotes:
    ```bash
    npm run build:all
    ```
    Alternatively, you can build them individually:
    ```bash
    npx ng build shell --configuration production
    npx ng build merchant --configuration production
    npx ng build credit --configuration production
    npx ng build wealth --configuration production
    ```
    This will create the artifacts in the `dist/` directory:
    - `dist/shell/browser`
    - `dist/merchant/browser`
    - `dist/credit/browser`
    - `dist/wealth/browser`

## Step 3: Configure Nginx
We will configure Nginx to serve each application on its dedicated port.

1.  Create a new configuration file:
    ```bash
    sudo nano /etc/nginx/sites-available/angular-mfe
    ```

2.  Paste the following configuration (Replace `/path/to/dist` with your actual path, e.g., `/home/username/angular-mfe-app/dist`):

    ```nginx
    # Shell Application (Port 80/Default)
    server {
        listen 80;
        server_name YOUR_DOMAIN_OR_IP;
        root /home/username/angular-mfe-app/dist/shell/browser;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # CORS (Optional but recommended for federation)
        add_header Access-Control-Allow-Origin *;
    }

    # Merchant Remote (Port 4201)
    server {
        listen 4201;
        access_log off;
        root /home/username/angular-mfe-app/dist/merchant/browser;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Allow Cross-Origin for Federation
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, OPTIONS";
    }

    # Credit Remote (Port 4202)
    server {
        listen 4202;
        access_log off;
        root /home/username/angular-mfe-app/dist/credit/browser;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Allow Cross-Origin for Federation
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, OPTIONS";
    }

    # Wealth Remote (Port 4203)
    server {
        listen 4203;
        access_log off;
        root /home/username/angular-mfe-app/dist/wealth/browser;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Allow Cross-Origin for Federation
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, OPTIONS";
    }
    ```

3.  Enable the site:
    ```bash
    sudo ln -s /etc/nginx/sites-available/angular-mfe /etc/nginx/sites-enabled/
    ```

4.  Test and Restart Nginx:
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    ```

## Step 4: Verification
- Open `http://YOUR_SERVER_IP`. You should see the Shell login page.
- Login and navigate. The system should load the remotes from ports 4201, 4202, and 4203.
