# Guide d'Installation - Pole Evolution Backend

## Prérequis

- Node.js v18+
- MongoDB v6+
- npm ou yarn

## Installation

### 1. Cloner le projet

``` git clone https://github.com/ton-username/pole-evolution-backend.git ```
``` cd pole-evolution-backend ```

### 2. Installer les dépendances

``` npm install ```

### 3. Configuration

``` cp .env.example .env ```
# Editer .env avec tes valeurs

### 4. Lancer MongoDB

# Windows
``` net start MongoDB ```

# Mac/Linux
``` sudo systemctl start mongodb ```

### 5. Démarrer le serveur

# Mode dev avec hot reload
``` npm run dev ```

# Mode production
``` npm start ```
