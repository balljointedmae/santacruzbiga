build:
	go generate ./...
	go build server.go

run:
	go generate ./...
	go run server.go