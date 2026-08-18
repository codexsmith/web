# Validate or update nodes and graph context.
$scriptPath = Join-Path $PSScriptRoot "..\..\scripts\build_graph_context.py"
python $scriptPath @args
exit $LASTEXITCODE
