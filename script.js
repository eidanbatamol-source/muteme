const statusText = document.getElementById('status');
const addBtn = document.getElementById('addNetwork');
const list = document.getElementById('networkList');

let savedNetworks = JSON.parse(localStorage.getItem('muteNetworks')) || [];

function updateList() {
  list.innerHTML = '';
  savedNetworks.forEach(n => {
    const li = document.createElement('li');
    li.textContent = n;
    list.appendChild(li);
  });
}

updateList();

addBtn.addEventListener('click', () => {
  const network = prompt('Introduce el nombre de la red Wi-Fi a silenciar (SSID):');
  if (network && !savedNetworks.includes(network)) {
    savedNetworks.push(network);
    localStorage.setItem('muteNetworks', JSON.stringify(savedNetworks));
    updateList();
    alert(`Red ${network} agregada.`);
  }
});

function checkNetwork() {
  if (savedNetworks.length === 0) {
    statusText.textContent = 'No tienes redes configuradas 🔈';
    return;
  }
  const random = Math.random();
  const connected = savedNetworks[Math.floor(random * savedNetworks.length)];
  if (connected) {
    statusText.textContent = `Estás en la red ${connected}. Silencia tu móvil 🔕`;
  } else {
    statusText.textContent = 'Estás en una red normal. Volumen activado 🔊';
  }
}

setInterval(checkNetwork, 5000);
