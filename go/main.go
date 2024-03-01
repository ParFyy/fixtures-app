package main

import (
	"context"
	"log"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	echoadapter "github.com/awslabs/aws-lambda-go-api-proxy/echo"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

var echoLambda *echoadapter.EchoLambda
var sess *session.Session
var svc *dynamodb.DynamoDB

type Fixture struct {
	Id       string `json:"id"`
	HomeTeam string
	AwayTeam string
	Date     string
	Time     string
	Location string
}

func init() {
	sess = session.Must(session.NewSessionWithOptions(session.Options{
		SharedConfigState: session.SharedConfigEnable,
	}))

	e := echo.New()

	e.GET("/fixtures/get/:id", getFixture)
	e.POST("/fixtures/create", createFixture)
	e.DELETE("/fixtures/delete/:id", deleteFixture)

	e.GET("/teams/get/:id", getTeam)
	e.POST("/teams/create/:name", createTeam)
	e.POST("/teams/update/:id/:name", createTeam)
	e.DELETE("/teams/delete/:id", deleteTeam)

	echoLambda = echoadapter.New(e)

	if os.Getenv("AWS_LAMBDA_FUNCTION_NAME") == "" {
		// Start the server only if running locally
		e.Start(":3000")
		svc = dynamodb.New(sess, aws.NewConfig().WithEndpoint("http://localhost:8000"))
	} else {
		svc = dynamodb.New(sess)
	}
}

func createFixture(c echo.Context) error {
	var fixture Fixture
	c.Bind(&fixture)

	if fixture.HomeTeam == "" {
		return c.JSON(400, "Bad Request: Fixtures must contain a home team")
	}

	if fixture.AwayTeam == "" {
		return c.JSON(400, "Bad Request: Fixtures must contain an away team")
	}

	if fixture.Id == "" {
		fixture.Id = uuid.New().String()
	}

	av, err := dynamodbattribute.MarshalMap(fixture)
	if err != nil {
		log.Fatalf("Error converting fixture to attribute value")
		return c.JSON(500, "Internal Error")
	}

	input := &dynamodb.PutItemInput{
		Item:      av,
		TableName: aws.String("sp-fixtures-table"),
	}

	_, err = svc.PutItem(input)
	if err != nil {
		log.Fatalf("Error calling PutItem. Details: " + err.Error())
		return c.JSON(500, "Internal Error")
	}

	return c.JSON(200, fixture.Id)
}

func getFixture(c echo.Context) error {
	if c.Param("id") == "" {
		return c.JSON(404, "No fixture id in url")
	}

	tableName := "sp-fixtures-table"

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

	var fixture Fixture
	err = dynamodbattribute.UnmarshalMap(result.Item, &fixture)

	return c.JSON(200, fixture)
}

func deleteFixture(c echo.Context) error {
	if c.Param("id") == "" {
		return c.JSON(404, "No fixture id in url")
	}

	tableName := "sp-fixtures-table"

	_, err := svc.DeleteItem(&dynamodb.DeleteItemInput{
		TableName: aws.String(tableName),
		Key: map[string]*dynamodb.AttributeValue{
			"id": {
				S: aws.String(c.Param("id")),
			},
		},
	})
	if err != nil {
		return c.JSON(400, "Error deleting fixture")
	}

	return c.JSON(200, "Successfully deleted fixture")
}

/* func createTable(c echo.Context) error {
	// Define table parameters
	tableName := "sp-fixtures-table"
	input := &dynamodb.CreateTableInput{
		AttributeDefinitions: []*dynamodb.AttributeDefinition{
			{
				AttributeName: aws.String("id"),
				AttributeType: aws.String("S"),
			},
		},
		KeySchema: []*dynamodb.KeySchemaElement{
			{
				AttributeName: aws.String("id"),
				KeyType:       aws.String("HASH"),
			},
		},
		BillingMode: aws.String("PAY_PER_REQUEST"),
		TableName:   aws.String(tableName),
	}
	// Create the DynamoDB table
	_, err := svc.CreateTable(input)
	if err != nil {
		panic("failed to create table, " + err.Error())
	}

	return c.JSON(200, "Table"+tableName+"created successfully.")
} */

func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return echoLambda.ProxyWithContext(ctx, req)
}

func main() {
	lambda.Start(Handler)
}
