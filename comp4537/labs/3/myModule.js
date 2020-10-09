const SERVER_URL = 'https://secret-reaches-06218.herokuapp.com/';

const form = document.getElementById('form');

async function handleForm(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  try {
    document.getElementById('loadingMessage').innerHTML = 'Retrieving from Heroku. May take awhile to load server';
    const response = await fetch(`${SERVER_URL}?name=${name}`);
    const json = await response.json();
    alert(json.message);
  } catch (err) {
    console.log(err);
  } finally {
    document.getElementById('loadingMessage').innerHTML = '';
  }
}

form.addEventListener('submit', handleForm);
