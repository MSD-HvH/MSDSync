import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	target: "es5",
	// format: ["cjs"],
	// sourcemap: true,
	// clean: true,
	// dts: true,
	// bundle: false,
	// tsconfig: "./tsconfig.json",
	// config: false,
	outDir: "C:/Games/Steam/steamapps/common/2020/ot/scripts",
});
