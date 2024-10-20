<p align="center">
  <a href="http://fidesonnova.io/" target="blank"><img src="https://fidesinnova.io/Download/logo/g-c-web-back.png" /></a>
</p>

# Step-by-step Installation Instructions for IoT Node 

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.com/invite/NQdM6JGwcs" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://twitter.com/FidesInnova" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>

To install the back-end and front-end components of the FidesInnova platform, including both the web app and mobile app, you can follow the steps below. These instructions assume that you have a basic understanding of setting up development environments and are familiar with JavaScript, Node.js, and related technologies.




# How to Install BackEnd


## 1- Prepare operating system
First of all install Ubuntu 20.04 LTS on your server. 

## 2- Install MongoDB
### Step 1 — Installing MongoDB
Install MongoDB version 4.4
```
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
apt-key list
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update
sudo apt install -y mongodb-org
```
### Step 2 — Starting the MongoDB Service and Testing the Database
```
sudo systemctl start mongod.service
sudo systemctl status mongod
sudo systemctl enable mongod
```

### Note: For managing the MongoDB Service you can use the following commands:
```
sudo systemctl status mongod
sudo systemctl stop mongod
sudo systemctl start mongod
sudo systemctl restart mongod
sudo systemctl disable mongod
sudo systemctl enable mongod
```

## 3- Install nginx web server 
```
sudo apt update
sudo apt -y install nginx
systemctl status nginx
```
### How to Take SSL by Certbot
```
sudo apt-get update
sudo apt-get install certbot
sudo certbot certonly --standalone --preferred-challenges http
```

# Obtain an SSL Certificate

To manually obtain an SSL certificate for your domains without directly modifying your web server configurations, run the following command:

```
sudo certbot certonly --standalone --preferred-challenges http
```

After running the command, enter your web app and admin web app domains separated by a space, like this:

```
test.com admin.test.com
```

- After creating certificates, copy \`fullchain.pem\` and \`privkey.pem\` files into \`/etc/nginx/ssl\`.
- Required commands for SSL by Certbot:
  - Check the expiration date of your SSL certificates:
  ```
  sudo certbot certificates
  ```
  - Renew your SSL certificate:
  ```
  sudo certbot renew
  ```

### Update the `nginx.conf` file in `/etc/nginx/nginx.conf`
```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {
	##
	# Basic Settings
	##

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	
	default_type application/octet-stream;
	include /etc/nginx/mime.types;
	##
	# SSL Settings
	##

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;

	ssl_certificate  /etc/nginx/ssl/fullchain.pem;
	ssl_certificate_key /etc/nginx/ssl/privkey.pem;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;

	server {
		listen 443 ssl;
		listen [::]:443 ssl;

		index index.html index.htm;
		server_name panel.YOUR_DOMAIN.io;

		root /var/www/html/wikifidesdoc/site;

		add_header 'Access-Control-Allow-Credentials' 'true';
		add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
		add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

		# This section is for user Web App on port 4000
		location / {
			proxy_set_header Authorization $http_authorization;
			proxy_pass_header Authorization;
			add_header Access-Control-Allow-Origin '*';
			add_header Access-Control-Allow-Headers '*';
			proxy_pass https://localhost:4000;
		}

		# This section is for Server Backend on port 3000
		location /app {
			proxy_pass http://localhost:3000;
			add_header Access-Control-Allow-Origin *;
		}
	}


	server {


                ssl_certificate  ssl/fullchainadmin.pem;
                ssl_certificate_key ssl/privkeyadmin.pem;

		listen 443 ssl;
		listen [::]:443 ssl;
		server_name admin.YOUR_DOMAIN.io;

		index index.html index.htm;

		add_header 'Access-Control-Allow-Credentials' 'true';
		add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
		add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

		# This section is for Admin Web App on port 5000
		location / {
			proxy_set_header Authorization $http_authorization;
			proxy_pass_header Authorization;
			add_header Access-Control-Allow-Origin '*';
			add_header Access-Control-Allow-Headers '*';
			proxy_pass https://localhost:5000;
		}
	}
}

```
-  Make sure to edit `server_name` to subdomain.yourdomain.com
-  Make sure to create the certificate for domain and all subdomains
  
### Restart Nginx
```
systemctl restart nginx
```

## 4- Installation of Node.js (Version 20.9.0) and NestJS on Ubuntu
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo npm install -g n
n 20.9.0
npm i -g @nestjs/cli 
```

## 5- Configure Firewall 
### Allow connections
Install `ufw`
```
apt install ufw
```
Allow OpenSSH connection
```
sudo ufw allow OpenSSH
```
Allow nginx connection
```
sudo ufw allow 'nginx full'
```
Allow Mobile App to connect to the server through port 3000 
```
sudo ufw allow 3000
```
Allow Web App to connect to the server through port 4000 
```
sudo ufw allow 4000
```
Allow Admin Web App to connect to the server through port 4000 
```
sudo ufw allow 5000
```
Allow IoT devices to connect to the MQTT broker through port 8883 
```
sudo ufw allow 8883
```

### Enable firewall 
```
sudo ufw enable
```
### Check the firewall status
```
sudo ufw status
```
## 6- Clone the project
Install `git`
```
apt install git
```
In the root directory clone the project
```
cd /home
git clone https://github.com/FidesInnova/iot_node_backend_web_app_source_source.git
```

## 7- Prepare app host configuration
-  In project root folder, create `.env` file and edit parameters based on your node URL info
```
cd ~/iot_node_backend_web_app_source/backend
sudo nano .env
```
Inside the `.env` file, past the parameters.
```
NODE_ID = "your.node.url" # Set this with your node URL.
PORT = 5000
NODE_NAME = "your.node.name"
SWAGGER_LOCAL_SERVER = http://localhost:5000

# Rpc Url
RPC_URL = 'https://fidesf1-rpc.fidesinnova.io'

# Smart contract user & pass
REMIX_USER = 'rmadmin'
REMIX_PASS = 'rm123'

# Zkp user & pass
ZKP_USER = 'zkpadmin'
ZKP_PASS = 'zkp123'

# Faucet Wallet Private Key
FAUCET_WALLET_PRIVATE_KEY = 'YOUR_FAUCET_WALLET_PRIVATE_KEY'

# Admin Wallet Private Key
ADMIN_WALLET_PRIVATE_KEY = 'YOUR_ADMIN_WALLET_PRIVATE_KEY'

# Server Configuration
HOST_PROTOCOL = 'https://'
HOST_NAME_OR_IP = 'panel.YOUR_DOMAIN.COM'
HOST_PORT = '3000'
HOST_SUB_DIRECTORY = 'app'

# StorX Config
STORX_BUCKET_NAME = 'fidesinnova'
STORX_HOST = 'https://b2.storx.io'
STORX_AUTH_HOST = 'https://auth.storx.io'

# Mongo Database Configuration
MONGO_DATABASE_NAME = fidesinnova
MONGO_USER = Administrator
# MONGO_PASSWORD = 'PASSWORD'
MONGO_PORT = 27017
MONGO_HOST = mongodb://127.0.0.1
MONGO_CONNECTION = mongodb://127.0.0.1:27017/fidesinnova

# Email Configuration
NOTIFICATION_BY_MAIL = 'enabled'
NOTIFICATION_BY_NOTIFICATION = 'enabled'

# Mail server
MAIL_HOST = YOUR_HOST_MAIL_SERVER_PROVIDER
MAIL_PORT = 465
MAIL_USER = noreply@YOUR_DOMAIN.COM
MAIL_PASSWORD = YOUR_MAIL_SERVER_PASSWORD
MAIL_FROM = noreply@YOUR_DOMAIN.COM
# optional
MAIL_TRANSPORT = smtp://${MAIL_USER}:${MAIL_PASSWORD}@${MAIL_HOST}

# Mobile theme ( hex color code without # )
THEME_LOGO = "www.example.com/image.png"
THEME_TEXT = "ffffff"
THEME_BACKGROUND = "212838"
THEME_BOX = "2d355c"
THEME_BUTTON = "4e46e7"

ACCESS_TOKEN_ISSUER = 'https://fidesinnova.io'
ACCESS_TOKEN_EXPIRATION_TIME = 1200000000     # Miliseconds
ACCESS_TOKEN_SECRET_KEY = '?#6KRVytq*zn5zhWWLHksL$MJj7Krkan^&^^BzZD?fqUjs4mhWNExZZ8S7CPXXkPGYMEzj2y$bK7@TWwYaja=7j^+ccFqG8#EpM4&4ppmST?A7?F_a3bq=m6B&CwRrb3'
# ACCESS_TOKEN_ALGORITHM = 'PS384'
ACCESS_TOKEN_ALGORITHM = 'HS384'

REFRESH_TOKEN_ISSUER = 'https://fidesinnova.io'
REFRESH_TOKEN_EXPIRATION_TIME = 2400000000    # Miliseconds
REFRESH_TOKEN_SECRET_KEY = 'Cn3ZU$EQcpc_C9Yyqc*t3pur#Rg_Q9xUt4GUVnf8=Q4ruE?f@8^ngFgKpE7Nh=gytxzY3!tcpBZ4STj-ehCfb2k-&C43sFgYfSfZ&ALP!XJhe3R%hNGTMmHXCMsm9Bfv'
REFRESH_TOKEN_ALGORITHM = 'HS384'

SUPER_ADMIN_EMAILS = ["admin.email.@example.com"] # your admins emails that can make other users into admin

# Multer Configuration     # Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
MULTER_MEDIA_PATH = ./storages/resources
MULTER_MEDIA_SIZE = 10000000    # 10 MB
```
Update these parameters:
```
NODE_NAME = "your-node-name"
NODE_ID = "your-node-url" # Set this to your node URL

HOST_NAME_OR_IP = 'panel.YOUR-DOMAIN.COM'

FAUCET_WALLET_PRIVATE_KEY = "your-faucet-wallet-private-key"
ADMIN_WALLET_PRIVATE_KEY = 'your-admin-wallet-private-key'


MAIL_HOST = YOUR-HOST-MAIL-SERVER-PROVIDER
MAIL_PORT = 465
MAIL_USER = noreply@YOUR-DOMAIN.COM
MAIL_PASSWORD = YOUR-MAIL-SERVER-PASSWORD
MAIL_FROM = noreply@YOUR_-DOMAIN.COM

THEME_LOGO = 'your-logo-url'

REMIX_USER = 'your-remix-username'
REMIX_PASS = 'your-remix-password'

ZKP_USER = 'your-zkp-username'
ZKP_PASS = 'your-zkp-password'

RPC_URL = 'your-rpc-url'
```

## 8- Device Installation Data

During the installation process in the mobile app, the following devices will be displayed based on the data provided in the `iot_node_backend_web_app_source/backend/src/data/devices.json` file. Each device is represented by an image and a title:

```json
[
  { 
    "fileName": "ecard.png", 
    "title": "E-Card", 
    "type": "E-CARD" 
  },
  {
    "fileName": "multisensor.png",
    "title": "Multi Sensor",
    "type": "MULTI_SENSOR"
  },
  {
    "fileName": "motionsensor.png",
    "title": "Motion Sensor",
    "type": "MOTION_SENSOR"
  }
]
```
* `fileName:` Refers to the image file that should be placed in the `/iot_node_backend_web_app_source/backend/uploads/device` directory. This image will be displayed in the mobile app.
* `title:` The name of the device as it will appear in the mobile app's device installation list.
* `type:` The device type, which is used by the node supervisor to categorize the devices.

-------------------------------------------------------------------------------------------------

# How to Install WebApp

### Note:
  * If you are a Node owner, contact FidesInnova team at info@fidesinnova.io to add your Web App URL address to FidesInnova website.
## 1- Prepare app configuration
In project root folder, create `.env` file and edit parameters based on your node URL info
```
cd ~/iot_node_backend_web_app_source/web_app/Source_webapp
sudo nano .env
```
Inside the `.env` file, past the parameters.
*  Make sure to add `/app/` to the end of the `VITE_URL` path!
*  Enter your node name in `VITE_NODE_NAME` for showing in website
```
VITE_URL='https://panel.YOUR_DOMAIN.COM/app/'
VITE_NODE_NAME = 'your.node.name'
```
In Runner_webapp folder, create `.env` file and edit parameters based on your node URL info
```
cd ~/iot_node_backend_web_app_source/web_app/Runner_webapp
sudo nano .env
```
Inside the `.env` file, past the parameters.
```
PORT=4000
```
## 2- Configure Firewall
Allow Web App to connect to the server through port 4000 
```
sudo ufw allow 4000
```

-------------------------------------------------------------------------------------------------

# How to Install Admin WebApp
## 1- Prepare app configuration
In project root folder, create `.env` file and edit parameters based on your node URL info
```
cd ~/iot_node_backend_web_app_source/admin_web_app/Source_webapp
sudo nano .env
```
Inside the `.env` file, past the parameters.
*  Make sure to add `/app/` to the end of the `VITE_URL` path!
*  Enter your node name in `VITE_NODE_NAME` for showing in website
```
VITE_URL='https://panel.YOUR_DOMAIN.COM/app/'
VITE_NODE_NAME = 'your.node.name'
```
In Runner_webapp folder, create `.env` file and edit parameters based on your node URL info
```
cd ~/iot_node_backend_web_app_source/admin_web_app/Runner_webapp
sudo nano .env
```
Inside the `.env` file, past the parameters.
```
PORT=5000
```
## 2- Configure Firewall
Allow Admin Web App to connect to the server through port 5000 
```
sudo ufw allow 5000
```
-------------------------------------------------------------------------------------------------
# Building and Running

To automate the setup and build processes for both the backend and frontend applications, run the \`initial_setup.sh\` script located in the root directory of the project.

### Steps:
1. **Set the appropriate permissions** (one-time step):
   Before running the setup script for the first time, ensure it has executable permissions by running the following command in the terminal:

   ```
   cd ~/your_project_directory/
   chmod +x initial_setup.sh
   ```

2. **Run the setup script**:
   After setting the permissions, execute the setup script to build the applications and create PM2 services:

   ```
   cd ~/your_project_directory/
   ./initial_setup.sh
   ```

This script will handle building both the backend and frontend applications and configuring PM2 services automatically.

### Subsequent Updates
After the initial setup, you only need to run the update process to keep the applications up to date. Please refer to the \`Update Process\` section for instructions on how to do this.


-------------------------------------------------------------------------------------------------

# Update Process

To update both the backend and frontend applications, simply run the \`update.sh\` script located in the root directory of the project. 

### Steps:
1. **Set the appropriate permissions** (one-time step):
   Before running the update script for the first time, ensure it has executable permissions by running the following command in the terminal:

   ```
   cd ~/iot_node_backend_web_app_source/
   chmod +x update.sh
   ```

2. **Run the update script**:
   After setting the permissions, update the applications automatically by running:

   ```
   cd ~/iot_node_backend_web_app_source/
   ./update.sh
   ```

This script will handle pulling the latest changes, rebuilding the apps, and restarting services automatically.


-------------------------------------------------------------------------------------------------
