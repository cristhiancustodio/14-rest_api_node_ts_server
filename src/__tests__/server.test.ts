import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe("GET /api", () => {
    it("should send back a json response", async () => {
        const response = await request(server).get("/api");
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toBe("API is running");
    })
})


jest.mock("../config/db")

describe("Database connection", () => {
    it("should connect to the database", async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error("Connection error"));
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Hubo un error al conectar a la BD"));
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