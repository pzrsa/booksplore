package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"hello": "world"})
	})

	return r
}

func main() {
	const port = ":4000"

	r := setupRouter()
	if err := r.Run(port); err != nil {
		log.Fatalf("server: startup failed: %s", err)
	}
}
