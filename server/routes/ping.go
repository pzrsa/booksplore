package routes

import "github.com/gin-gonic/gin"

// GET /v1/ping
func GetPing(r *gin.RouterGroup) {
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong", "data": nil})
	})
}
