package main

import (
	"booksplore/routes"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("server: error loading .env file: %s", err)
	}

	const port = ":4000"

	r := routes.Setup()
	if err := r.Run(port); err != nil {
		log.Fatalf("server: startup failed: %s", err)
	}
}
