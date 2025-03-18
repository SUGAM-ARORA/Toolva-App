package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email        string    `gorm:"uniqueIndex;not null" json:"email"`
	Password     string    `json:"-"`
	FirstName    string    `json:"firstName"`
	LastName     string    `json:"lastName"`
	PhoneNumber  string    `json:"phoneNumber"`
	ProfileImage string    `json:"profileImage"`
	Bio          string    `json:"bio"`
	LastLogin    time.Time `json:"lastLogin"`
	IsActive     bool      `gorm:"default:true" json:"isActive"`
	Role         string    `gorm:"default:'user'" json:"role"`
}

// BeforeCreate is a GORM hook that runs before creating a new user
func (u *User) BeforeCreate(tx *gorm.DB) error {
	// Hash password before saving
	hashedPassword, err := HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashedPassword
	return nil
}

// Validate checks if the user data is valid
func (u *User) Validate() error {
	if u.Email == "" {
		return ErrInvalidEmail
	}
	if u.Password == "" {
		return ErrInvalidPassword
	}
	if u.FirstName == "" {
		return ErrInvalidFirstName
	}
	if u.LastName == "" {
		return ErrInvalidLastName
	}
	return nil
}

// TableName specifies the table name for the User model
func (User) TableName() string {
	return "users"
} 