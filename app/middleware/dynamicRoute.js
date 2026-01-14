import { match } from "path-to-regexp";
import { validationResult } from "express-validator";

/**
 * Create a dynamic route with optional validation
 * @param {string} pattern - route pattern, e.g. "/user/:id" or "/*splat"
 * @param {Array} validations - express-validator rules
 * @param {function} handler - async function(req, res)
 */
export const dynamicRoute = (pattern, validations = [], handler) => {
  const fn = match(pattern, { decode: decodeURIComponent });

  return async (req, res, next) => {
    const matched = fn(req.path);
    if (!matched) return next();

    // attach dynamic params
    req.params = matched.params;

    // Run validations
    for (let validate of validations) await validate.run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    // call handler
    try {
      await handler(req, res);
    } catch (err) {
      console.error("Route error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  };
};
