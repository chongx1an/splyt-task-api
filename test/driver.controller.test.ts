import request from 'supertest';
import server from "../src/server";

interface Location {
    latitude: number,
    longitude: number,
    bearing: number,
}

interface Driver {
    driver_id: string,
    location: Location
}

interface GoodReponse {
    body: {
        pickup_eta: number,
        drivers: Driver[]
    }
}

describe("GET /drivers", () => {

    afterAll(() => {
        server.close();
    });

    it("should return 200 ok", async () => {
        const query = new URLSearchParams({ latitude: "1", longitude: "1" });

        const response = await request(server).get(`/drivers?${query.toString()}`);
        expect(response.statusCode).toBe(200);
    });

    it('should return 400 error', async () => {

        const queries: URLSearchParams[] = [
            new URLSearchParams({ latitude: "1", }),
            new URLSearchParams({ longitude: "1" }),
            new URLSearchParams({}),
        ]

        for (const query of queries) {
            const response = await request(server).get(`/drivers?${query.toString()}`);
            expect(response.statusCode).toBe(400);
        }

    })

    it("should return 10 drivers", async () => {
        const query = new URLSearchParams({ latitude: "1", longitude: "1" });

        const response: GoodReponse = await request(server).get(`/drivers?${query.toString()}`);

        expect(typeof response.body.pickup_eta).toBe("number");
        expect(response.body.drivers.length).toBe(10);
    });
});