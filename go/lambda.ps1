$env:GOARCH="arm64"
$env:GOOS="linux"
go build -tags lambda.norpc -ldflags="-s -w" -o ./dist/bootstrap main.go teams.go