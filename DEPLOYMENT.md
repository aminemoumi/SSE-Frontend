# Guide de Déploiement

## Configuration des variables d'environnement

### En développement (local)
Le fichier `.env` est déjà configuré avec :
```
VITE_API_URL=http://localhost:4000/api
```

### En production
1. Copiez le fichier `.env.production.example` en `.env.production`
2. Modifiez l'URL de l'API backend avec votre URL de production
```bash
cp .env.production.example .env.production
```

Contenu de `.env.production` :
```
VITE_API_URL=https://votre-backend-api.com/api
```

## Build du frontend

```bash
npm run build
```

Cela créera un dossier `dist` avec les fichiers statiques optimisés.

## Options de déploiement

### Option 1: Vercel (Recommandé pour React)
1. Installez Vercel CLI :
```bash
npm i -g vercel
```

2. Déployez :
```bash
vercel
```

3. Configurez les variables d'environnement dans le dashboard Vercel :
   - Ajoutez `VITE_API_URL` avec l'URL de votre backend en production

### Option 2: Netlify
1. Build le projet :
```bash
npm run build
```

2. Déployez le dossier `dist` via Netlify dashboard ou CLI :
```bash
netlify deploy --prod --dir=dist
```

3. Configurez les variables d'environnement dans Netlify :
   - Ajoutez `VITE_API_URL` avec l'URL de votre backend

### Option 3: Serveur personnalisé (VPS, AWS, etc.)
1. Build le projet :
```bash
npm run build
```

2. Upload le dossier `dist` sur votre serveur

3. Configurez un serveur web (Nginx, Apache) pour servir les fichiers statiques

**Exemple de configuration Nginx :**
```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    root /var/www/votre-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Backend
Le backend doit être déployé séparément avec votre base de données. Assurez-vous que :
- L'URL du backend est accessible publiquement
- Les CORS sont configurés pour autoriser votre frontend
- La base de données est accessible depuis le serveur backend

## Base de données
Déployez votre base de données (PostgreSQL, MySQL, etc.) sur un service comme :
- Supabase
- PlanetScale
- AWS RDS
- DigitalOcean Managed Database

## Checklist avant déploiement
- [ ] Changer `VITE_API_URL` dans `.env.production`
- [ ] Configurer CORS sur le backend pour autoriser le domaine de production
- [ ] Configurer les variables d'environnement de la base de données sur le backend
- [ ] Tester l'application en mode staging si possible
- [ ] Activer HTTPS sur le backend et le frontend
