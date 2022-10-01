package routes

import (
	"github.com/gin-gonic/gin"
)

func Setup() *gin.Engine {
	r := gin.Default()

	v1 := r.Group("v1")
	{
		// Ping
		ping(v1)

		// Users
		users(v1)
	}

	return r
}
