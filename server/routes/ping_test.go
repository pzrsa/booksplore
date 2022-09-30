package routes

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestGetPing(t *testing.T) {
	r := Setup()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/v1/ping", nil)
	r.ServeHTTP(w, req)

	var got gin.H
	err := json.Unmarshal(w.Body.Bytes(), &got)
	if err != nil {
		t.Fatal(err)
	}
	assert.Equal(t, 200, w.Code)
	assert.Equal(t, gin.H{"message": "pong", "data": nil}, got)
}
