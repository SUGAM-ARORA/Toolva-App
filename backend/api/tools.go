package api

import (
	"database/sql"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Tool struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Slug        string  `json:"slug"`
	Description string  `json:"description"`
	CategoryID  int     `json:"category_id"`
	Rating      float64 `json:"rating"`
	Pricing     string  `json:"pricing"`
	Users       string  `json:"users"`
	Model       string  `json:"model"`
	ImageURL    string  `json:"image_url"`
	IsFeatured  bool    `json:"is_featured"`
}

type Category struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Slug        string `json:"slug"`
	Description string `json:"description"`
	Count       int    `json:"count"`
}

func GetTools(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		category := c.Query("category")
		search := c.Query("search")
		featured := c.Query("featured")

		query := `
			SELECT t.id, t.name, t.slug, t.description, t.category_id, 
			       t.rating, t.pricing, t.users, t.model, t.image_url, t.is_featured
			FROM tools t
			WHERE 1=1
		`
		args := []interface{}{}

		if category != "" && category != "all" {
			query += " AND t.category_id = (SELECT id FROM categories WHERE slug = $1)"
			args = append(args, category)
		}

		if search != "" {
			query += " AND (t.name ILIKE $2 OR t.description ILIKE $2)"
			args = append(args, "%"+search+"%")
		}

		if featured == "true" {
			query += " AND t.is_featured = true"
		}

		rows, err := db.Query(query, args...)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var tools []Tool
		for rows.Next() {
			var tool Tool
			err := rows.Scan(
				&tool.ID, &tool.Name, &tool.Slug, &tool.Description,
				&tool.CategoryID, &tool.Rating, &tool.Pricing,
				&tool.Users, &tool.Model, &tool.ImageURL, &tool.IsFeatured,
			)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			tools = append(tools, tool)
		}

		c.JSON(http.StatusOK, tools)
	}
}

func GetCategories(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		query := `
			SELECT c.id, c.name, c.slug, c.description, COUNT(t.id) as count
			FROM categories c
			LEFT JOIN tools t ON c.id = t.category_id
			GROUP BY c.id, c.name, c.slug, c.description
			ORDER BY count DESC
		`

		rows, err := db.Query(query)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var categories []Category
		for rows.Next() {
			var category Category
			err := rows.Scan(
				&category.ID, &category.Name, &category.Slug,
				&category.Description, &category.Count,
			)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			categories = append(categories, category)
		}

		c.JSON(http.StatusOK, categories)
	}
}

func GetToolBySlug(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		slug := c.Param("slug")

		var tool Tool
		err := db.QueryRow(`
			SELECT id, name, slug, description, category_id, 
			       rating, pricing, users, model, image_url, is_featured
			FROM tools
			WHERE slug = $1
		`, slug).Scan(
			&tool.ID, &tool.Name, &tool.Slug, &tool.Description,
			&tool.CategoryID, &tool.Rating, &tool.Pricing,
			&tool.Users, &tool.Model, &tool.ImageURL, &tool.IsFeatured,
		)

		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Tool not found"})
			return
		}
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, tool)
	}
}

func ToggleFavorite(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, _ := strconv.Atoi(c.GetString("user_id"))
		toolID, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid tool ID"})
			return
		}

		// Check if favorite exists
		var exists bool
		err = db.QueryRow(`
			SELECT EXISTS(
				SELECT 1 FROM user_favorites 
				WHERE user_id = $1 AND tool_id = $2
			)
		`, userID, toolID).Scan(&exists)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if exists {
			// Remove favorite
			_, err = db.Exec(`
				DELETE FROM user_favorites 
				WHERE user_id = $1 AND tool_id = $2
			`, userID, toolID)
		} else {
			// Add favorite
			_, err = db.Exec(`
				INSERT INTO user_favorites (user_id, tool_id)
				VALUES ($1, $2)
			`, userID, toolID)
		}

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"is_favorite": !exists})
	}
}
