import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import * as fs from "fs";
import helmet from "helmet";
import * as path from "path";
import pino from "pino";
import { pinoHttp } from "pino-http";
import type { ViteDevServer } from "vite";
import { createServer as createViteServer } from "vite";

// import { cspConfig } from "./constants";
import { sequelize } from "./db/db";
import { proxyMiddleware } from "./middlewares";
import { ApiRouter } from "./routes";

dotenv.config();

const startServer = async (isDev = process.env.NODE_ENV === "development") => {
  const app = express();
  app.disable("x-powered-by").enable("trust proxy");
  app.use(cors({
    origin: "*",
  }));
  app.use(helmet.xssFilter());
  app.use(function (_, res, next) {
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });
  // app.use(helmet.contentSecurityPolicy(cspConfig));
  app.use(express.json());
  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
  const port = Number(process.env.SERVER_PORT) || 8000;

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

  app.use("/api/v2", proxyMiddleware);

  app.use("", ApiRouter);

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
      let render: (
        url: string
      ) => Promise<{ appHtml: string; stateScript: string }>;

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

      const { appHtml, stateScript } = await render(req.url);

      const html = template
        .replace("<!--ssr-outlet-->", appHtml)
        .replace("<!--ssr-state-outlet-->", stateScript);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (error) {
      if (isDev && vite) {
        vite.ssrFixStacktrace(error as Error);
      }
      next(error);
    }
  });

  app.use(
    pinoHttp({
      logger: pino({ level: process.env.LOG_LEVEL || "info" }),
      useLevel: "info",
    })
  );

  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
