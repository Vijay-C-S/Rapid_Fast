param(
    [string]$Root = "."
)

$ErrorActionPreference = "Stop"
Set-Location $Root

$rootPages = Get-ChildItem -Path . -Filter *.html | Where-Object { $_.Name -notlike 'google*.html' }
$allPages = Get-ChildItem -Path . -Recurse -Filter *.html

function Count-Matches([string]$content, [string]$pattern) {
    return ([regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)).Count
}

$missingOg = @()
$missingTw = @()
$missingCanonical = @()
$missingViewport = @()

foreach ($file in $rootPages) {
    $raw = Get-Content $file.FullName -Raw
    if ($raw -notmatch '<meta\s+property="og:image"') { $missingOg += $file.Name }
    if ($raw -notmatch '<meta\s+name="twitter:image"') { $missingTw += $file.Name }
    if ($raw -notmatch '<link\s+rel="canonical"') { $missingCanonical += $file.Name }
    if ($raw -notmatch '<meta\s+name="viewport"') { $missingViewport += $file.Name }
}

$brokenScriptStarts = Select-String -Path *.html, blogs\*.html -Pattern '<script src="\s*$' -AllMatches
$nonAsyncAdScripts = Select-String -Path *.html, blogs\*.html -Pattern '<script\s+src="https://(www\.highperformanceformat\.com|pl28651117\.profitablecpmratenetwork\.com)[^"]*"(?![^>]*\basync\b)' -AllMatches
$targetBlankWithoutRel = @()
foreach ($file in $allPages) {
    $raw = Get-Content $file.FullName -Raw
    $matches = [regex]::Matches($raw, '<a[^>]*target="_blank"[^>]*>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)
    foreach ($m in $matches) {
        if ($m.Value -notmatch '\brel\s*=') {
            $targetBlankWithoutRel += "$($file.FullName)"
        }
    }
}

"=== GetUpdated SEO QA Report ==="
"Root pages scanned: $($rootPages.Count)"
"All html pages scanned: $($allPages.Count)"
""
"Missing og:image (root): $($missingOg.Count)"
if ($missingOg.Count -gt 0) { $missingOg | ForEach-Object { " - $_" } }
""
"Missing twitter:image (root): $($missingTw.Count)"
if ($missingTw.Count -gt 0) { $missingTw | ForEach-Object { " - $_" } }
""
"Missing canonical (root): $($missingCanonical.Count)"
if ($missingCanonical.Count -gt 0) { $missingCanonical | ForEach-Object { " - $_" } }
""
"Missing viewport (root): $($missingViewport.Count)"
if ($missingViewport.Count -gt 0) { $missingViewport | ForEach-Object { " - $_" } }
""
"Broken script start tags: $($brokenScriptStarts.Count)"
"Non-async ad scripts: $($nonAsyncAdScripts.Count)"
"target=_blank without rel: $($targetBlankWithoutRel.Count)"
""
if (
    $missingOg.Count -eq 0 -and
    $missingTw.Count -eq 0 -and
    $missingCanonical.Count -eq 0 -and
    $missingViewport.Count -eq 0 -and
    $brokenScriptStarts.Count -eq 0 -and
    $nonAsyncAdScripts.Count -eq 0 -and
    $targetBlankWithoutRel.Count -eq 0
) {
    "PASS: Core SEO and technical checks passed."
} else {
    "FAIL: One or more checks need attention."
}
