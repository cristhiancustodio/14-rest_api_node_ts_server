import swaggerJSDoc from "swagger-jsdoc";
const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        tags: [
            {
                name: "auth",
                description: "Authentication related endpoints"
            }
        ],
        info: {
            title: "Mi documentacino de curso Udemy",
            version: "1.0.0",
            description: "API Docs for products"
        }
    },
    apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;