import { loadEnv } from "vite";

const env = loadEnv("production", process.cwd());
console.log("FULL ENV:", env);
