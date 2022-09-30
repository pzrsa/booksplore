package main

import (
	"booksplore/routes"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("server: error loading .env file: %s", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := routes.Setup()
	if err := r.Run(fmt.Sprintf(":%s", port)); err != nil {
		log.Fatalf("server: startup failed: %s", err)
	}
}
