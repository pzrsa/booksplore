package api

import "github.com/gin-gonic/gin"

// GET
func Ping(r *gin.RouterGroup) {
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"data": "pong"})
	})
}