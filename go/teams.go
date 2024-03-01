package main

import (
	"html"
	"log"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type Team struct {
	Id          string `json:"id"`
	DisplayName string
}

func createTeam(c echo.Context) error {
	team := Team{
		Id:          c.Param("id"),
		DisplayName: html.UnescapeString(c.Param("name")),
	}

	if team.DisplayName == "" {
		return c.JSON(400, "Bad Request: Team must have a display name")
	}

	if team.Id == "" {
		team.Id = uuid.New().String()
	}

	av, err := dynamodbattribute.MarshalMap(team)
	if err != nil {
		log.Fatalf("Error converting team to attribute value")
		return c.JSON(500, "Internal Error")
	}

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String("sp-teams-table"),
	}

	_, err = svc.PutItem(input)
	if err != nil {
		log.Fatalf("Error calling PutItem. Details: " + err.Error())
		return c.JSON(500, "Internal Error")
	}

	return c.JSON(200, team.Id)
}

func UnescapeString(s string) {
	panic("unimplemented")
}

func getTeam(c echo.Context) error {
	if c.Param("id") == "" {
		return c.JSON(404, "No team id in url")
	}

	tableName := "sp-teams-table"

	result, err := svc.GetItem(&dynamodb.GetItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(c.Param("id")),
			},
		},
	})

	if err != nil || result.Item == nil {
		return c.JSON(400, "Fixture does not exist")
	}

	var team Team
	err = dynamodbattribute.UnmarshalMap(result.Item, &team)

	return c.JSON(200, team)
}

func deleteTeam(c echo.Context) error {
	if c.Param("id") == "" {
		return c.JSON(404, "No team id in url")
	}

	tableName := "sp-teams-table"

	_, err := svc.DeleteItem(&dynamodb.DeleteItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(c.Param("id")),
			},
		},
	})
	if err != nil {
		return c.JSON(400, "Error deleting team")
	}

	return c.JSON(200, "Successfully deleted team")
}
