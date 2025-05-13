package middleware

import (
	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {
	return func(c *gin.Context) {
		// For now, just set a dummy user ID
		// In a real app, this would verify the JWT token
		c.Set("user_id", "1")
		c.Next()
	}
}
