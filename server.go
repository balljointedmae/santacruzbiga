package main

import (
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/l4nn1312/santacruzbiga/graph"
	"github.com/l4nn1312/santacruzbiga/graph/generated"
)

func main() {
	// Setting up Gin
	r := gin.Default()
	r.Use(gzip.Gzip(gzip.DefaultCompression))
	r.LoadHTMLGlob("templates/*")
	r.Static("/bundles", "./bundles")

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &graph.Resolver{}}))
	playg := playground.Handler("GraphQL playground", "/query")
	// routes
	r.POST("/query", gin.WrapH(srv))
	r.GET("/", gin.WrapH(playg))

	r.Run()
}
