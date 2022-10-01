package routes

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/twitter"
)

func users(r *gin.RouterGroup) {
	goth.UseProviders(
		twitter.NewAuthenticate(os.Getenv("TWITTER_KEY"), os.Getenv("TWITTER_SECRET"), "http://localhost:4000/v1/users/auth/twitter/callback"),
	)

	// GET /v1/users/auth/:provider
	r.GET("/users/auth/:provider", func(c *gin.Context) {
		gothic.GetProviderName = func(r *http.Request) (string, error) { return c.Param("provider"), nil }

		gothic.BeginAuthHandler(c.Writer, c.Request)
	})

	// GET /v1/users/auth/:provider/callback
	r.GET("/users/auth/:provider/callback", func(c *gin.Context) {
		user, err := gothic.CompleteUserAuth(c.Writer, c.Request)
		if err != nil {
			log.Fatalf("server: %s", err)
			return
		}
		c.JSON(200, user)
	})
}
