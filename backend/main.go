package main

import (
	"log"
	"os"
	"time"
	"encoding/json"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type AITool struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Category    string    `json:"category"`
	Rating      float32   `json:"rating"`
	Pricing     string    `json:"pricing"`
	Users       string    `json:"users"`
	Model       string    `json:"model"`
	ImageURL    string    `json:"imageUrl"`
	Features    []string  `gorm:"type:text[]" json:"features"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type Review struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	ToolID    uint      `json:"toolId"`
	UserID    string    `json:"userId"`
	Rating    float32   `json:"rating"`
	Comment   string    `json:"comment"`
	CreatedAt time.Time `json:"createdAt"`
}

type User struct {
	ID        string    `gorm:"primaryKey" json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	Favorites []uint    `gorm:"type:integer[]" json:"favorites"`
	CreatedAt time.Time `json:"createdAt"`
}

var db *gorm.DB

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	dsn := os.Getenv("DATABASE_URL")
	var err error
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto-migrate all models
	db.AutoMigrate(&AITool{}, &Review{}, &User{})

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:          12 * time.Hour,
	}))

	// AI Tools endpoints
	r.GET("/api/tools", getTools)
	r.GET("/api/tools/category/:category", getToolsByCategory)
	r.GET("/api/tools/search", searchTools)
	r.POST("/api/tools", createTool)
	r.PUT("/api/tools/:id", updateTool)
	r.DELETE("/api/tools/:id", deleteTool)

	// Reviews endpoints
	r.GET("/api/tools/:id/reviews", getToolReviews)
	r.POST("/api/reviews", createReview)
	r.PUT("/api/reviews/:id", updateReview)
	r.DELETE("/api/reviews/:id", deleteReview)

	// User endpoints
	r.GET("/api/users/:id", getUser)
	r.POST("/api/users", createUser)
	r.PUT("/api/users/:id", updateUser)
	r.PUT("/api/users/:id/favorites", updateUserFavorites)

	// Analytics endpoints
	r.GET("/api/analytics/popular", getPopularTools)
	r.GET("/api/analytics/trending", getTrendingTools)
	r.GET("/api/analytics/category-stats", getCategoryStats)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}

func getTools(c *gin.Context) {
	var tools []AITool
	result := db.Find(&tools)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch tools"})
		return
	}
	c.JSON(200, tools)
}

func getToolsByCategory(c *gin.Context) {
	category := c.Param("category")
	var tools []AITool
	result := db.Where("category = ?", category).Find(&tools)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch tools"})
		return
	}
	c.JSON(200, tools)
}

func searchTools(c *gin.Context) {
	query := c.Query("q")
	var tools []AITool
	result := db.Where("name ILIKE ? OR description ILIKE ?", 
		"%"+query+"%", "%"+query+"%").Find(&tools)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to search tools"})
		return
	}
	c.JSON(200, tools)
}

func createTool(c *gin.Context) {
	var tool AITool
	if err := c.ShouldBindJSON(&tool); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := db.Create(&tool)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create tool"})
		return
	}
	c.JSON(201, tool)
}

func updateTool(c *gin.Context) {
	id := c.Param("id")
	var tool AITool
	if err := c.ShouldBindJSON(&tool); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := db.Model(&AITool{}).Where("id = ?", id).Updates(tool)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to update tool"})
		return
	}
	c.JSON(200, tool)
}

func deleteTool(c *gin.Context) {
	id := c.Param("id")
	result := db.Delete(&AITool{}, id)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to delete tool"})
		return
	}
	c.JSON(200, gin.H{"message": "Tool deleted successfully"})
}

func getToolReviews(c *gin.Context) {
	toolID := c.Param("id")
	var reviews []Review
	result := db.Where("tool_id = ?", toolID).Find(&reviews)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch reviews"})
		return
	}
	c.JSON(200, reviews)
}

func createReview(c *gin.Context) {
	var review Review
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := db.Create(&review)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create review"})
		return
	}
	c.JSON(201, review)
}

func updateReview(c *gin.Context) {
	id := c.Param("id")
	var review Review
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := db.Model(&Review{}).Where("id = ?", id).Updates(review)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to update review"})
		return
	}
	c.JSON(200, review)
}

func deleteReview(c *gin.Context) {
	id := c.Param("id")
	result := db.Delete(&Review{}, id)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to delete review"})
		return
	}
	c.JSON(200, gin.H{"message": "Review deleted successfully"})
}

func getUser(c *gin.Context) {
	id := c.Param("id")
	var user User
	result := db.First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(404, gin.H{"error": "User not found"})
		return
	}
	c.JSON(200, user)
}

func createUser(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := db.Create(&user)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create user"})
		return
	}
	c.JSON(201, user)
}

func updateUser(c *gin.Context) {
	id := c.Param("id")
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := db.Model(&User{}).Where("id = ?", id).Updates(user)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to update user"})
		return
	}
	c.JSON(200, user)
}

func updateUserFavorites(c *gin.Context) {
	id := c.Param("id")
	var favorites []uint
	if err := c.ShouldBindJSON(&favorites); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := db.Model(&User{}).Where("id = ?", id).Update("favorites", favorites)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to update favorites"})
		return
	}
	c.JSON(200, gin.H{"message": "Favorites updated successfully"})
}

func getPopularTools(c *gin.Context) {
	var tools []struct {
		AITool
		ReviewCount int     `json:"reviewCount"`
		AvgRating   float32 `json:"avgRating"`
	}
	
	result := db.Model(&AITool{}).
		Select("ai_tools.*, COUNT(reviews.id) as review_count, AVG(reviews.rating) as avg_rating").
		Joins("LEFT JOIN reviews ON reviews.tool_id = ai_tools.id").
		Group("ai_tools.id").
		Order("review_count DESC, avg_rating DESC").
		Limit(10).
		Find(&tools)
		
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch popular tools"})
		return
	}
	c.JSON(200, tools)
}

func getTrendingTools(c *gin.Context) {
	var tools []struct {
		AITool
		RecentReviews int `json:"recentReviews"`
	}
	
	result := db.Model(&AITool{}).
		Select("ai_tools.*, COUNT(reviews.id) as recent_reviews").
		Joins("LEFT JOIN reviews ON reviews.tool_id = ai_tools.id AND reviews.created_at > ?", 
			time.Now().AddDate(0, 0, -7)).
		Group("ai_tools.id").
		Order("recent_reviews DESC").
		Limit(10).
		Find(&tools)
		
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch trending tools"})
		return
	}
	c.JSON(200, tools)
}

func getCategoryStats(c *gin.Context) {
	var stats []struct {
		Category    string  `json:"category"`
		ToolCount   int     `json:"toolCount"`
		AvgRating   float32 `json:"avgRating"`
		TotalUsers  int     `json:"totalUsers"`
	}
	
	result := db.Model(&AITool{}).
		Select("category, COUNT(*) as tool_count, AVG(rating) as avg_rating").
		Group("category").
		Find(&stats)
		
	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch category stats"})
		return
	}
	c.JSON(200, stats)
}