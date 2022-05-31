# Deploy de Nestjs en Digital Ocean

- Crear el droplet con SSH
- Instalar NVM
- Instalar la version necesaria de Node
- Clonar el repositorio en una carpeta y ejecutar el npm install para instalar todas las dependencias del proyecto
- Crear la base de datos y colocar los datos para la conexion en las variables de entorno
- Instalar PM2 de manera global:
    
    ```bash
    npm install pm2 -g
    ```
    
     Con pm2 en la carpeta del proyecto corremos la aplicacion desde el fichero main.js de la carpeta dist (donde se escuentra el bundle de la aplicacion para produccion) y le ponemos un nombre al proceso para identificarlo con la flag —name
    
    ```bash
    pm2 start dist/main.js --name ozono
    ```
    
    ![Untitled](Deploy%20de%20Nestjs%20en%20Digital%20Ocean%208ae23e23ed954048b5ba1a524cbfb63c/Untitled.png)
    
    Ejecutamos un comando adicional de pm2 para iniciar la aplicacion automaticamente cada vez que el servidor inicie (por si ocurre un error o se reinicia por alguna actualizacion)
    

```bash
pm2 startup
```

esto agrega archivos de configuracion para iniciar la aplicacion cada vez que el servidor se inicie y finalmenta guardamos con: 

```bash
pm2 save
```

- Activa el firewall que viene por defecto en la maquina:
    
    ```bash
    sudo ufw enable
    ```
    
    y agregamos las reglas de conexion:
    
    ```bash
    sudo ufw allow ssh http https
    ```
    

- Instalar nginx para configurar el servidor proxy
    
    ```bash
    sudo apt install nginx
    ```
    
    verificamos si el servidor nginx esta corriendo
    
    ```bash
    systemctl status nginx
    ```
    
    ![Untitled](Deploy%20de%20Nestjs%20en%20Digital%20Ocean%208ae23e23ed954048b5ba1a524cbfb63c/Untitled%201.png)
    
    Creamos un archivo de configuracion de nginx para decirle a donde debe apuntar el servidor proxy: 
    
    ```bash
    nano /etc/nginx/sites-available/ozono.api
    ```
    
    configuramos el servidor de nginx
    
    ```bash
    server {
            listen 80;
    
            server_name 137.184.225.42;
    
            location / {
             proxy_pass http://localhost:3333;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection 'upgrade';
             proxy_set_header Host $host;
             proxy_cache_bypass $http_upgrade;
            }
    }
    ```
    
    Enlazamos ese fichero a los sites enable de nginx
    
    ```bash
    ln -s /etc/nginx/sites-available/ozono.api /etc/nginx/sites-enabled/ozono.api
    ```
    
    reiniciamos el nginx
    
    ```bash
    sudo service nginx restart
    ```
    
    # Y ya la aplicacion debe estar corriendo en la direccion del server name
    
    Con un DNS se haria lo mismo solo que en lugar de colocar en server_name la direccion se colocaria el dominio y asi podriamos acceder directamente a la aplicacion.