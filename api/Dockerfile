FROM python:3.12-slim-bullseye

# Mettre à jour les paquets système pour corriger les vulnérabilités
RUN apt-get update && apt-get upgrade -y && apt-get clean

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier le fichier requirements.txt situé dans le dossier api/
COPY api/requirements.txt ./requirements.txt

# Installer les dépendances Python
RUN pip install --no-cache-dir -U -r requirements.txt

# Copier le code de l’API
COPY api/ .

# Copier les dépendances du projet depuis la racine
COPY src/ ../src/
COPY ../models/ ./models/
COPY ../data/ ../data/
COPY ../src/config.py ./src/config.py
# Exposer le port utilisé par FastAPI
EXPOSE 8000

# Lancer le serveur FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
