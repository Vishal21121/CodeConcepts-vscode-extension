package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Vishal21121/CodeConcepts-vscode-extension/db"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func main() {
	app := fiber.New()
	fmt.Println(os.Getenv("ENV"))
	if os.Getenv("ENV") != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}
	var client *mongo.Client = db.Init()
	questionController := client.Database("extensionDatabase").Collection("questions")

	app.Use(cors.New())
	app.Get("/questions", func(c *fiber.Ctx) error {

		// getting all the query parameters
		queries := c.Queries()
		language := queries["language"]

		if language == "" {
			c.SendStatus(400)
			return c.JSON(fiber.Map{
				"statusCode": 400,
				"data": fiber.Map{
					"status":  "failure",
					"message": "language is required",
				},
			})
		}

		// filter with language
		filterWithLanguage := bson.D{
			{"$match", bson.D{{"language", language}}},
		}
		// get the random element
		randomElement := bson.D{{"$sample", bson.D{{"size", 1}}}}
		cursor, err := questionController.Aggregate(c.Context(), mongo.Pipeline{filterWithLanguage, randomElement})

		if err != nil {
			log.Fatal(err)
		}
		var results []bson.M
		if err = cursor.All(c.Context(), &results); err != nil {
			log.Fatal(err)
		}
		c.SendStatus(200)
		return c.JSON(fiber.Map{
			"statusCode": 200,
			"data": fiber.Map{
				"status": "success",
				"value":  results[0],
			},
		})
	})
	fmt.Println("Server is listening at port 3000")
	log.Fatal(app.Listen(":3000"))
}
