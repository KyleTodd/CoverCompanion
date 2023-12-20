import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import fs from "fs";
import https from "https";
export default defineConfig({
  server: {
    port: 443,
    host:true,
    https:{
      key: fs.readFileSync('privatekey.pem', 'utf8'),
      cert: fs.readFileSync('certificate.pem', 'utf8'),
	  ca: fs.readFileSync('gd_bundle-g2-g1.crt','utf8'),
	},
  },
   
  plugins: [
    svelte({
      preprocess: [preprocess()],
    }),
  ],
  resolve: {
    alias: {
      fs: require.resolve('rollup-plugin-node-builtins'),
    },
  },
});

