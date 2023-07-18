import { config } from "dotenv";
import { defineConfig } from "tsup";

const { parsed } = config({}) as { parsed: { VERSION: "3" | "4" } };
const IS_V3 = parsed.VERSION === "3";

export default defineConfig({
	entry: [`packages/${IS_V3 ? "v3" : "v4"}/index.ts`],
	format: ["cjs", "esm"],
	sourcemap: true,
	clean: true,
	dts: true,
	target: "es5",
	tsconfig: `packages/${IS_V3 ? "v3" : "v4"}/tsconfig.json`,
	outDir: `C:/Games/Steam/steamapps/common/${IS_V3 ? "2020" : "Counter-Strike Global Offensive"}/ot/scripts`,
});
