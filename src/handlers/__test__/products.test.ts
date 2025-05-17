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
