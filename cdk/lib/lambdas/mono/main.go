package main

import (
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type App struct {
	id string
}

func newApp(id string) *App {
	return &App{
		id: id
	}
}

func HandleRequest(request events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	responseBody := map[string]string{
		"message": "Hi you have hit this route",
	}

	responseJSON, err := json.Marshal(responseBody)
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: http.StatusInternalServerError,
			Headers:    map[string]string{"Content-Type": "application/json"},
			Body:       `{"error":"internal server error}`,
		}, nil
	}

	response := events.APIGatewayV2HTTPResponse{
		Body:       string(responseJSON),
		StatusCode: http.StatusOK,
		Headers: map[string]string{
			"Content-Type":                 "text/plain",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Methods": "^",
		},
	}

	return response, nil
}

func main() {
	id := "someRandomString"
}
