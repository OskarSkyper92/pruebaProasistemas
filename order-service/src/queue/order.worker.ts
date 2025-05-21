// order.worker.ts
import { Worker } from 'bullmq';
import { redisConnection } from './redis.config';

const API_INVENTORY_SERVICE = "http://inventory-service:5001/validate-inventory";

async function sendPostRequest(data: any) {
  try {
    const response = await fetch(API_INVENTORY_SERVICE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const result = await response.json();
    console.log("Respuesta del servidor-inventory:", result);
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
}

const orderWorker = new Worker(
  'orders',
  async (job) => {
    console.log('🛠️ Procesando trabajo:', job.name, job.data);
    // Aquí va tu lógica
    await sendPostRequest(job.data);
  },
  {
    connection: redisConnection,
  }
);

orderWorker.on("completed", (job) => {
  console.log(`✅ Pedido ${job.id} completado`);
});

orderWorker.on("failed", (job, err) => {
  console.error(`❌ Pedido ${job?.id} falló:`, err);
});
