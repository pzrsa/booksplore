package main

import (
	"booksplore/config"
	"booksplore/routes"
	"fmt"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("server: error loading .env file: %s", err)
	}

	if config.Port == "" {
		config.Port = "8080"
	}

	r := routes.Setup()
	if err := r.Run(fmt.Sprintf(":%s", config.Port)); err != nil {
		log.Fatalf("server: startup failed: %s", err)
	}
}
