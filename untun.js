import { startTunnel } from 'untun';

async function main() {
  try {
    const tunnel = await startTunnel({ port: 5173 });
    const url = await tunnel.getURL();
    console.log('PUBLIC_LIVE_URL: ' + url);
  } catch (err) {
    console.error('Error starting untun:', err);
  }
}

main();
