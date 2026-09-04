import localtunnel from 'localtunnel';

(async () => {
  try {
    const tunnel = await localtunnel({ port: 5173, subdomain: 'sahakar-coop-' + Math.floor(Math.random() * 10000) });
    console.log('LIVE_TUNNEL_URL: ' + tunnel.url);

    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
  } catch (err) {
    console.error('Tunnel error:', err);
  }
})();
