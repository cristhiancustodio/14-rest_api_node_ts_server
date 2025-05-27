import server from "../../server";
import request from "supertest";


describe("Products API", () => {
    it("should return all products", async () => {
        const response = await request(server).get("/api/products");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    }),
    it("should create a new product", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Cristhian custodio",
            price: 100,
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(400);
        expect(response.status).not.toBe(200);
        expect(response.status).not.toHaveProperty('error');
    }),
    
    it("should display validations errors", async () => {
        const response = await request(server).post("/api/products").send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');


        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
    })
    
    it("should validate that price not be zero", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Cristhian custodio",
            price: 0,
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');


        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
    })
    
    it("should validate that price is a number and not be zero and", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Cristhian custodio",
            price: "hola",
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
    })
})


describe("GET /api/products/:id", () => {
    it("should return a 404 response for a non-existent product", async () => {
        const productId = 200
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto No Encontrado')

    })

    it("should chekc a valid ID in the URL", async () => {
        const response = await request(server).get(`/api/products/invalid-id`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })
    it("get a JSON response for a single product", async () => {
        const response = await request(server).get(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
});

describe("PUT /api/products/:id", () => {
    it("should update a product", async () => {
        const response = await request(server).put("/api/products/1").send({
            name: "Cristhian custodio actualizado",
            price: 200,
            availability: true
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.name).toBe("Cristhian custodio actualizado");
        expect(response.body.data.price).toBe(200);
    })
})

