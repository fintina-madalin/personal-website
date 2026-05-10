import next from "eslint-config-next";
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

const eslintConfig = [...next, ...coreWebVitals, ...typescriptConfig];

export default eslintConfig;
