import type { Request, RequestHandler } from "express";
import type { ClientRequest } from "http";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";

import { YANDEX_URL } from "../constants";

const modifyBodyReStreamCb = function (proxyReq: ClientRequest, req: Request) {
  if (req.body) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
};

export const proxyMiddleware: RequestHandler = (req, res, next) => {
  return createProxyMiddleware({
    target: YANDEX_URL,
    changeOrigin: true,
    cookieDomainRewrite: {
      "*": "",
    },
    selfHandleResponse: true,
    logLevel: "error",
    onProxyReq: modifyBodyReStreamCb,
    onProxyRes: responseInterceptor(
      async (responseBuffer, _proxyRes, _req, _res) => {
        return responseBuffer;
      }
    ),
  })(req, res, next);
};
