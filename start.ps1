# Récupérer l'adresse IP locale (non 127.0.0.1)
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.IPAddress -notlike "127.*" -and $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -like "192.*"
} | Select-Object -First 1).IPAddress

# Vérifier si une adresse IP a été trouvée
if (-not $ipAddress) {
    Write-Host "Impossible de récupérer une adresse IP dans la plage 192.*" -ForegroundColor Red
    exit 1
}

# Afficher l'adresse IP à l'utilisateur
Write-Host "Adresse IP principale détectée : $ipAddress" -ForegroundColor Green

$env:HOST_IP = $IPAddress

# Démarrer Docker Compose avec la commande requise
docker compose up --build