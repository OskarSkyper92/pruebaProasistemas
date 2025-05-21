"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
exports.redisConnection = {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
};
console.log('🔌 Redis connection config:', exports.redisConnection);
//# sourceMappingURL=redis.config.js.map