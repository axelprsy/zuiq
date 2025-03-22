#!/bin/bash

# Vérifier le système d'exploitation et récupérer l'adresse IP
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    res=$(ip addr show | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | cut -d'/' -f1 | head -n1)
elif [[ "$OSTYPE" == "darwin"* ]]; then
    res=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n1)
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]]; then
    res=$(ipconfig | findstr IPv4 | awk '{print $NF}' | head -n1)
else
    echo "OS non pris en charge : $OSTYPE"
    exit 1
fi

# Vérification du résultat
if [[ -z "$res" ]]; then
    echo "Impossible de récupérer l'adresse IP"
    exit 1
fi

# Exporter l'adresse IP dans une variable d'environnement
export HOST_IP=$res

# Afficher l'IP pour confirmation
echo "Adresse IP détectée : $HOST_IP"

# Lancer docker-compose
docker compose up --build