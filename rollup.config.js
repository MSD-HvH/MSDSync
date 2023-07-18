import { config } from "dotenv";
import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";

const { parsed } = config({});
const IS_V3 = parsed.VERSION === "3";

export default defineConfig({
	input: [`packages/${IS_V3 ? "v3" : "v4"}/index.ts`],
	output: {
		file: `C:/Games/Steam/steamapps/common/${
			IS_V3 ? "2020" : "Counter-Strike Global Offensive"
		}/ot/scripts/index.js`,
		format: "cjs",
		strict: false,
	},

	plugins: [typescript({ tsconfig: "./tsconfig.json" })],
});
