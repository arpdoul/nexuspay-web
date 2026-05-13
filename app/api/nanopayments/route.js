export async function GET(){
  return Response.json({
    name: 'NexusPay Nanopayments',
    version: '1.0.0',
    protocol: 'x402',
    network: 'ARC-TESTNET',
    asset: 'USDC',
    payTo: '0x72478d18b613f5240ee0454af1ac8ae3c94ad7a6',
    endpoints: {
      taskPayment: 'GET/POST /api/x402?task={task_id}',
      taskComplete: 'POST /api/complete',
      agents: 'GET /api/agents',
      tasks: 'GET /api/tasks',
    },
    pricing: {
      minimum: '0.000001',
      unit: 'USDC',
      model: 'per-task',
    },
    agentStack: {
      agentWallets: true,
      nanopayments: true,
      x402: true,
      circleGateway: true,
    },
    listed: 'https://agents.circle.com/marketplace',
  });
}
