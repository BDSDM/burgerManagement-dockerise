# 🍔 Burger Management – Application de Gestion de Burger

**Burger Management** est une application fullstack (Angular + Spring Boot + MySQL) permettant aux utilisateurs de commander un **burger** ou un **menu complet** (burger + boisson + dessert) et de recevoir la facture du panier par mail.  
Elle propose également une interface **administrateur** pour gérer les utilisateurs, leurs rôles et leurs accès.

---

## 🚀 Fonctionnalités principales

- 🔐 **Authentification sécurisée** avec JWT  
- 👥 **Gestion des utilisateurs** avec rôles (ADMIN / USER)  
- 📊 **Tableau de bord administrateur** (gestion des utilisateurs et commandes)  
- 🛒 **Commande de burgers et menus** avec choix de boisson et dessert  
- 🐳 **Application fullstack conteneurisée avec Docker** (MySQL + Spring Boot + Angular)  
- 🌍 **Multi-plateforme** : fonctionne sous Windows, Linux et macOS  

---

## 📦 Prérequis

Avant de commencer, assurez-vous d’avoir installé :

- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  
- Git (optionnel mais recommandé)  

---

## ⚙️ Installation & Lancement

### 🪟 Pour Windows (CMD / PowerShell)

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



