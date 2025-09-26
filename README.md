🍔 Burger Management – Application de Gestion de Burger

Burger Management est une application complète de gestion permettant aux utilisateurs de s’enregistrer, de se connecter avec un compte sécurisé, et offrant une interface administrateur pour gérer les utilisateurs, leurs rôles et les accès.
🚀 Fonctionnalités principales

🔐 Authentification sécurisée avec JWT

👥 Gestion des utilisateurs avec rôles (ADMIN / USER)

📊 Tableau de bord administrateur

🐳 Application fullstack conteneurisée avec Docker (MySQL + Spring Boot + Angular)

🪟 Pour Windows (CMD / PowerShell)

```cmd
(for %P in (3306 8080 4200) do @for /f "tokens=1" %I in ('docker ps --format "{{.ID}} {{.Ports}}" ^| findstr ":%P"') do docker rm -f %I) & git clone https://github.com/BDSDM/burgerManagement-dockerise.git && cd burgerManagement-dockerise && docker compose up -d
```

🐧 Pour Linux / macOS (bash / zsh)
```cmd
for P in 3306 8080 4200; do
  docker ps -q --filter "publish=$P" | xargs -r docker rm -f
done && \
git clone https://github.com/BDSDM/burgerManagement-dockerise.git && \
cd burgerManagement-dockerise && \
docker compose up -d


