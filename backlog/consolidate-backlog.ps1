# consolidate-backlog.ps1
# This script iterates through all remote branches (oldest to newest) and extracts their backlog/ directories,
# overlaying them on top of the current branch to consolidate all backlog contents.

Write-Host "Fetching latest branches from origin..."
git fetch --all

Write-Host "Consolidating backlog contents..."
# Get all branches sorted by commit date (oldest first)
$branches = git for-each-ref --sort=committerdate --format="%(refname:short)" refs/remotes/origin/

$count = 0
foreach ($branch in $branches) {
    # Skip HEAD and temporary branches
    if ($branch -match "HEAD|tmp-never-use") { continue }
    
    # Check if the branch has a backlog folder
    $hasBacklog = git ls-tree -r --name-only $branch backlog/ 2>$null
    if ($hasBacklog) {
        Write-Host "Pulling backlog content from $branch..."
        # Checkout ONLY the backlog directory from this branch
        git checkout $branch -- backlog/ 2>$null
        $count++
    }
}

# Unstage the changes so the user can review them instead of having them automatically staged
git reset HEAD backlog/ 2>$null

Write-Host "`nDone! Successfully merged backlog contents from $count branches."
Write-Host "Run 'git status' to see any untracked or modified files in your backlog directory."
