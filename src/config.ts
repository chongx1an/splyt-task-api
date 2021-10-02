import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export interface Config {
    port: number;
}

const config: Config = {
    port: +(process.env.PORT || 4000)
};

export { config };