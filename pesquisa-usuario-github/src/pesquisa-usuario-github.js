const inputUsuario = document.getElementById('inputUsuario')

async function getGitHubUser() {
  try {
    let divResultado = document.getElementById('divResultado')
    divResultado.innerHTML = ''
    
    let divErro = document.getElementById('divErro')
    divErro.innerHTML = ''
 
    if (inputUsuario.value.trim() === '') {
      divErro.innerHTML = 'Informe o usuário'
    } else {
      const response = await fetch(`https://api.github.com/users/${inputUsuario.value}`)

      if (!response.ok) {
        throw Error(response.status)
      } else {
        let data = await response.json()

        const { avatar_url, name, login, bio, company, location, email, blog, html_url, followers, following } = data

        let resultadoHTML =
          `
          <table class="table table-sm table-borderless">
            <thead>
            <tr>
              <th scope="col">Avatar</th>
              <th scope="col">Dados</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="align-middle">
                <img src="${avatar_url}" class="img-thumbnail" style="width: 250px">
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <th class="text-right" scope="row">Nome:</th>
                      <td class="text-left">${name}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">Login:</th>
                      <td class="text-left">${login}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">Bio:</th>
                      <td class="text-left">${bio}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">Empresa:</th>
                      <td class="text-left">${company}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">Local:</th>
                      <td class="text-left">${location}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">Email:</th>
                      <td class="text-left">${email}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">Blog:</th>
                      <td class="text-left">${blog}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">URL:</th>
                      <td class="text-left">${html_url}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">Seguidores:</th>
                      <td class="text-left">${followers}</td>
                    </tr>
                    <tr>
                      <th class="text-right" scope="row">Seguindo:</th>
                      <td class="text-left">${following}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
          `
        divResultado.innerHTML = resultadoHTML
      }
    }
  } catch (err) {
    console.log(err)
    divErro.innerHTML = 'Não foi possível encontrar o usuário informado'
  }
}

function debounce(cb, interval, immediate) {
  let timeout = null

  return function () {
    let context = this
    let args = arguments

    let later = function () {
      timeout = null
      if (!immediate) {
        cb.apply(context, args)
      }
    }

    let callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, interval)

    if (callNow) {
      cb.apply(context, args)
    }
  }
}

inputUsuario.onkeypress = debounce(getGitHubUser, 1000)