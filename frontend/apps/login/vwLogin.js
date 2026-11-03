document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  var errorBox = document.getElementById('loginError');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    var usuario = document.getElementById('usuario').value;
    var senha = document.getElementById('senha').value;
    var submitButton = form.querySelector('button[type="submit"]');

    errorBox.classList.add('d-none');
    submitButton.disabled = true;
    submitButton.textContent = 'Entrando...';

    try {
      var response = await fetch(servidorDw3 + '/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: senha })
      });
      var data = await response.json();
      if (!data.token) {
        throw new Error(data.message || 'Usuário ou senha inválidos.');
      }
      localStorage.setItem('token', data.token); // Token usado nas chamadas ao back-end
      localStorage.setItem('username', data.username);
      document.cookie = 'IsLogged=true; path=/'; // Usado pelo front-end para saber se está logado
      window.location.href = '/home';
    } catch (error) {
      errorBox.textContent = error.message || 'Não foi possível realizar o login.';
      errorBox.classList.remove('d-none');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Entrar';
    }
  });
});
