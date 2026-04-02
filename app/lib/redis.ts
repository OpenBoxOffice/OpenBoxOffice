import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;
let connectPromise: Promise<RedisClientType | null> | null = null;

async function getRedisClient() {
    const url = process.env.REDIS_URL;

    if (!url) {
        return null;
    }

    if (!client) {
        client = createClient({ url });
        client.on("error", (error) => {
            console.error("Redis Client Error", error);
        });
    }

    if (client.isReady) {
        return client;
    }

    if (!connectPromise) {
        connectPromise = client.connect().then(
            () => client,
            (error) => {
                console.error("Redis connect failed; continuing without Redis.", error);
                connectPromise = null;
                return null;
            }
        );
    }

    return connectPromise;
}

export async function redisGet(key: string) {
    const redis = await getRedisClient();
    return redis ? redis.get(key) : null;
}

export async function redisSet(key: string, value: string, ttl?: number) {
    const redis = await getRedisClient();

    if (!redis) {
        return;
    }

    if (ttl) {
        await redis.set(key, value, { EX: ttl });
        return;
    }

    await redis.set(key, value);
}

export async function redisDel(key: string) {
    const redis = await getRedisClient();

    if (!redis) {
        return;
    }

    await redis.del(key);
}
