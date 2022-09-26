package api

import "github.com/gin-gonic/gin"

// GET /v1/pings
func GetPing(r *gin.RouterGroup) {
	r.GET("/pings", func(c *gin.Context) {
		c.JSON(200, gin.H{"data": "pong"})
	})
}
