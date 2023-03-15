import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import * as fs from "fs";
import * as path from "path";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";

dotenv.config();

const startServer = async (isDev = process.env.NODE_ENV === "development") => {
  const app = express();
  app.use(cors());
  const port = Number(process.env.SERVER_PORT) || 3001;

  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve("client/dist/index.html"));
  const srcPath = path.dirname(require.resolve("client"));
  const ssrClientPath = require.resolve("client/ssr-dist/ssr.cjs");

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: "custom",
    });

    app.use(vite.middlewares);
  }

  if (!isDev) {
    app.use("/assets", express.static(path.resolve(distPath, "assets")));
  }

  app.get("/serviceWorker.js", async (_, res, next) => {
    try {
      const fileName = path.resolve(srcPath, "serviceWorker.js");

      res.sendFile(fileName);
    } catch (error) {
      if (isDev && vite) {
        vite.ssrFixStacktrace(error as Error);
      }
      next(error);
    }
  });

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template: string;
      let render: (url: string) => Promise<string>;

      if (isDev && vite) {
        template = fs.readFileSync(
          path.resolve(srcPath, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);

        render = (await vite.ssrLoadModule(path.resolve(srcPath, "ssr.tsx")))
          .render;
      } else {
        template = fs.readFileSync(
          path.resolve(distPath, "index.html"),
          "utf-8"
        );

        render = (await import(ssrClientPath)).render;
      }

      const appHtml = await render(req.url);

      const html = template.replace("<!--ssr-outlet-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      if (isDev && vite) {
        vite.ssrFixStacktrace(error as Error);
      }
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
};

startServer();
