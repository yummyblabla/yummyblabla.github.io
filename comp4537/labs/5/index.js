const API_URL = 'https://comp4537-node-server.herokuapp.com';

async function submitWord(e) {
  e.preventDefault();

  const word = document.getElementById('word').value;
  const definition = document.getElementById('definition').value;

  if (!word) {
    alert('You need to submit a word.');
    return;
  }

  if (!definition) {
    alert('You need to submit a definition.');
    return;
  }

  const data = { word, definition };

  const response = await fetch(`${API_URL}/api/definitions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (response.status !== 200) {
    alert(`Error: ${result.error}`);
  } else {
    alert(`Word added: ${result.word}`);
  }
}

async function getWord(e) {
  e.preventDefault();

  const word = document.getElementById('word').value;

  if (!word) {
    alert('You need to type in a word.');
    return;
  }

  const response = await fetch(`${API_URL}/api/definitions?word=${word}`);
  const result = await response.json();

  if (response.status !== 200) {
    alert(`Error: ${result.error}`);
  } else {
    const { word: queryWord, definition, numberOfRequests } = result;
    document.getElementById('queryWord').innerHTML = queryWord;
    document.getElementById('definition').innerHTML = definition;
    document.getElementById('requests').innerHTML = numberOfRequests;
  }
}
