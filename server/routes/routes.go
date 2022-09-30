package routes

import "github.com/gin-gonic/gin"

func Setup() *gin.Engine {
	r := gin.Default()
	r.SetTrustedProxies([]string{"localhost:4000"})

	v1 := r.Group("v1")
	{
		// Ping
		GetPing(v1)
	}

	return r
}
