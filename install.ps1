$repoUrl = "https://raw.githubusercontent.com/snake14v/antigravity-web-swarm/main/.agent/workflows/"
$agents = @(
    "wizard-architect.md",
    "animation-choreographer.md",
    "seo-optimizer.md",
    "copywriter-agent.md",
    "component-librarian.md",
    "accessibility-auditor.md",
    "responsive-scaler.md"
)

$targetDir = ".\.agent\workflows"

if (-Not (Test-Path $targetDir)) {
    Write-Host "Creating Antigravity agent workflow directory at $targetDir..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

Write-Host "Installing Antigravity Web Swarm Agents..." -ForegroundColor Green

foreach ($agent in $agents) {
    $url = $repoUrl + $agent
    $dest = Join-Path $targetDir $agent
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
        Write-Host "  [+] Installed /${agent.Replace('.md', '')}" -ForegroundColor DarkGreen
    } catch {
        Write-Host "  [x] Failed to install $agent" -ForegroundColor Red
    }
}

Write-Host "✨ Swarm Agents successfully integrated into your local Antigravity environment!" -ForegroundColor Cyan
Write-Host "Type / in the Antigravity chat to access them." -ForegroundColor Yellow
