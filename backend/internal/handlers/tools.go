package handlers

import (
	"database/sql"

	"toolva/backend/api"

	"github.com/gin-gonic/gin"
)

type ToolsHandler struct {
	db *sql.DB
}

func NewToolsHandler(db *sql.DB) *ToolsHandler {
	return &ToolsHandler{db: db}
}

func (h *ToolsHandler) RegisterRoutes(r *gin.Engine) {
	tools := r.Group("/api/tools")
	{
		tools.GET("", api.GetTools(h.db))
		tools.GET("/:slug", api.GetToolBySlug(h.db))
		tools.POST("/:id/favorite", api.ToggleFavorite(h.db))
	}

	r.GET("/api/categories", api.GetCategories(h.db))
}
