package main

import (
	"booksplore/api"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.SetTrustedProxies([]string{"locahost:4000"})

	v1 := r.Group("v1")
	{
		// Ping
		api.GetPing(v1)
	}

	return r
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("server: error loading .env file: %s", err)
	}

	const port = ":4000"

	r := setupRouter()
	if err := r.Run(port); err != nil {
		log.Fatalf("server: startup failed: %s", err)
	}
}
