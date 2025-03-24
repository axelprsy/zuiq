$ipconfig = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" }

Write-Host "Adresse IP détectée : $ipAddress" -ForegroundColor Green

# Exporter l'adresse IP en tant que variable d'environnement
$env:HOST_IP = $ipconfig.IPAddress

# Démarrer Docker Compose avec la commande requise
docker compose up --build