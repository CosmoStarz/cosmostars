import type { Request, RequestHandler } from "express";
import type { ClientRequest } from "http";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";

import { YANDEX_URL } from "../constants";
import { User } from '../db/models/User';
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
    onProxyRes: responseInterceptor(async (responseBuffer, _proxyRes, _req, _res) => {
      if (req.url.includes('/auth/user') && req.method === 'GET') {
        const response = responseBuffer.toString(); // convert buffer to string
        let user;
        try {
          user = JSON.parse(response);
        } catch (e) {
          user = null;
        }
        if (user && user.id) {
          try {
            await User.upsert({
              ya_id: user.id,
              login: user.login,
              display_name: user.display_name,
              avatar: user.avatar,
            });
          } catch (e) {
            console.error(e);
          }
        }
      }
      return responseBuffer;
    }),
  })(req, res, next);
};
