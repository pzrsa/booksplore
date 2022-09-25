package main

import (
	"booksplore/models"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"hello": "world"})
	})

	return r
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("server: error loading .env file: %s", err)
	}

	db, err := gorm.Open(postgres.Open(os.Getenv("DATABASE_URL")), &gorm.Config{})
	if err != nil {
		log.Fatalf("server: failed to connect database: %s", err)
	}

	// Migrate the schema
	db.AutoMigrate(&models.User{})

	const port = ":4000"

	r := setupRouter()
	if err := r.Run(port); err != nil {
		log.Fatalf("server: startup failed: %s", err)
	}
}
