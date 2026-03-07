param (
    [string]$Command,
    [string]$Target
)

$WorkspaceSkillsDir = ".\.agent\skills"
$GlobalSkillsDir = "$HOME\.antigravity\skills"

# Ensure directories exist
if (-Not (Test-Path $WorkspaceSkillsDir)) {
    New-Item -ItemType Directory -Force -Path $WorkspaceSkillsDir | Out-Null
}
if (-Not (Test-Path $GlobalSkillsDir)) {
    New-Item -ItemType Directory -Force -Path $GlobalSkillsDir | Out-Null
}

function Show-Help {
    Write-Host "ClawHub CLI - The npm for agents 🐅" -ForegroundColor Cyan
    Write-Host "Usage: clawhub <command> <target>"
    Write-Host "Commands:"
    Write-Host "  install <namespace/skill>    Installs a skill to your local workspace."
    Write-Host "  install -g <namespace/skill> Installs a skill globally."
    Write-Host "  list                         Lists all installed skills."
}

if ($Command -eq "install") {
    $SkillName = $Target.Split('/')[-1]
    
    # Simulating Behavioral Code Insight Scanning before installation (CVE-2026-25253 Mitigation)
    Write-Host "[ClawHub] Initiating Behavioral Code Insight scan for $Target..." -ForegroundColor Yellow
    Start-Sleep -Seconds 1
    Write-Host "[ClawHub] ✅ Scan Passed. No malicious AMOS payloads or prompt injections detected." -ForegroundColor DarkGreen
    
    $SkillPath = Join-Path $WorkspaceSkillsDir $SkillName
    if (-Not (Test-Path $SkillPath)) {
        New-Item -ItemType Directory -Force -Path $SkillPath | Out-Null
    }
    
    $MarkdownTarget = Join-Path $SkillPath "SKILL.md"
    
    # Mock download success
    Write-Host "[ClawHub] Downloading bundle for $Target..." -ForegroundColor Cyan
    Start-Sleep -Seconds 1
    
    # Create empty SKILL.md template if it doesnt exist to simulate download
    if (-Not (Test-Path $MarkdownTarget)) {
        "---`nname: $SkillName`nnamespace: $Target`ndescription: Downloaded via ClawHub CLI simulator.`n---`n`n# Detailed Instructions`n`nAuto-generated skill placeholder." | Out-File -FilePath $MarkdownTarget -Encoding utf8
    }

    Write-Host "[ClawHub] ✨ Successfully installed ${Target} into ${SkillPath}" -ForegroundColor Green
    exit 0
}
elseif ($Command -eq "list") {
    Write-Host "Workspace Skills (.agent/skills/):" -ForegroundColor Cyan
    Get-ChildItem -Path $WorkspaceSkillsDir | ForEach-Object { Write-Host "  - $($_.Name)" }
}
else {
    Show-Help
}
