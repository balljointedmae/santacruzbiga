package graph

// This file will not be regenerated automatically.
//go:generate go run github.com/99designs/gqlgen
// It serves as dependency injection for your app, add any dependencies you require here.
import (
	"github.com/l4nn1312/santacruzbiga/graph/model"
)

type Resolver struct {
	articles []*model.Article
}

// func (r *mutationResolver) CreateArticle(ctx context.Context, input model.NewArticle) (*model.Article, error) {
// 	panic(fmt.Errorf("not implemented"))
// }

// func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.Article, error) {
// 	panic(fmt.Errorf("not implemented"))
// }

// func (r *queryResolver) Articles(ctx context.Context) ([]*model.Article, error) {
// 	// client := graphql.NewClient("https://localhost:8080/graphql")
// 	panic(fmt.Errorf("not implemented"))
// }
