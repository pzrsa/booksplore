package routes

import "github.com/gin-gonic/gin"

func ping(r *gin.RouterGroup) {
	// GET /v1/ping
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong", "data": nil})
	})
}
