// order.queue.ts
import { Queue } from 'bullmq';
import { redisConnection } from './redis.config';
import { Order } from '../types/order.interface';

const orderQueue = new Queue('orders', {
  connection: redisConnection,
});

export async function addOrderToQueue(order: Order) {
  await orderQueue.add("new-order", order);
}

export default orderQueue;
