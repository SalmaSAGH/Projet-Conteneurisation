# Étape 1 : Construire l'application React
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (si présents)
COPY package*.json ./

# Installer les dépendances
RUN npm install --frozen-lockfile

# Copier le reste du code source
COPY . .

# Construire l'application React pour la production
RUN npm run build

# Étape 2 : Créer une image légère pour servir l'application avec Nginx
FROM nginx:alpine

# Copier les fichiers de build générés dans l'image Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Ajouter une configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour servir l'application
EXPOSE 80

# Lancer Nginx en mode non-démon
CMD ["nginx", "-g", "daemon off;"]
