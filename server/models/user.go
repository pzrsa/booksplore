package models

type User struct {
	ID string

	Provider  string
	Email     string
	Name      string
	NickName  string
	UserID    string
	CreatedAt int
	UpdatedAt int
}

