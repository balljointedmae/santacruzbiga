package main

import (
	"net/http"

	"./santacruzbiga"

	"github.com/gin-gonic/gin"
	graphql "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

var schema *graphql.Schema

func init() {
	schema = graphql.MustParseSchema(santacruzbiga.Schema, &santacruzbiga.Resolver{})
}

func main() {
	// Creates a router without any middleware by default
	r := gin.New()

	r.LoadHTMLGlob("templates/*")

	// Global middleware
	// Logger middleware will write the logs to gin.DefaultWriter even if you set with GIN_MODE=release.
	// By default gin.DefaultWriter = os.Stdout
	r.Use(gin.Logger())

	// Recovery middleware recovers from any panics and writes a 500 if there was one.
	r.Use(gin.Recovery())
	// // Authorization group
	// // authorized := r.Group("/", AuthRequired())
	// // exactly the same as:
	// authorized := r.Group("/")
	// // per group middleware! in this case we use the custom created
	// // AuthRequired() middleware just in the "authorized" group.
	// authorized.Use(AuthRequired())
	// {
	// 	authorized.POST("/login", loginEndpoint)
	// 	authorized.POST("/submit", submitEndpoint)
	// 	authorized.POST("/read", readEndpoint)

	// 	// nested group
	// 	testing := authorized.Group("testing")
	// 	testing.GET("/analytics", analyticsEndpoint)
	// }

	// routes
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "santacruzbiga",
		})
	})
	r.GET("/graphiql", func(c *gin.Context) {
		c.HTML(http.StatusOK, "graphiql.html", gin.H{
			"title": "graphiql",
		})
	})
	r.POST("/graphql", gin.WrapH(&relay.Handler{Schema: schema}))

	r.Static("/bundles", "./bundles")
	// Listen and serve on 0.0.0.0:8080
	r.Run(":8080")
}
