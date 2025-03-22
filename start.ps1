# Récupérer l'adresse IP locale (non 127.0.0.1)
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.IPAddress -notlike "127.*" -and $_.InterfaceAlias -notlike "*Loopback*"
}).IPAddress

# Vérifier si une adresse IP a été trouvée
if (-not $ipAddress) {
    Write-Host "Impossible de récupérer l'adresse IP" -ForegroundColor Red
    exit 1
}

# Afficher l'adresse IP à l'utilisateur
Write-Host "Adresse IP détectée : $ipAddress" -ForegroundColor Green

# Exporter l'adresse IP en tant que variable d'environnement
$env:HOST_IP = $ipAddress

# Démarrer Docker Compose avec la commande requise
docker compose up --build