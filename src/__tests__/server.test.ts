import request from "supertest";
import server from "../server";

describe("GET /api", () => {
    it("should send back a json response", async () => {
        const response = await request(server).get("/api");
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toBe("API is running"); 
    })
})










// describe("Nuestro primer test", () => {
//     it("debería ser verdadero", () => {
//         expect(1+1).toBe('2')
//     });
//     it("No debería ser verdadero", () => {
//         expect(1+1).not.toBe('2')
//     });
// })