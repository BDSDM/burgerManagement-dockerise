# Étape 1 : Build Angular
FROM node:20 AS build
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Construire l'application Angular en mode production
RUN npm run build -- --configuration production

# Étape 2 : Serveur Nginx pour Angular
FROM nginx:alpine

# Copier le build Angular dans le dossier de Nginx
COPY --from=build /app/dist/burger-management-frontend /usr/share/nginx/html

# Config Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
