// Obtém os valores armazenados no localStorage
let nomesSorteadosStorage = localStorage.getItem('nomesSorteadosStorage') ? JSON.parse(localStorage.getItem('nomesSorteadosStorage')) : []
let nomesNaoSorteadosStorage = localStorage.getItem('nomesNaoSorteadosStorage') ? JSON.parse(localStorage.getItem('nomesNaoSorteadosStorage')) : []
let totalNomesStorage = localStorage.getItem('totalNomesStorage') ? JSON.parse(localStorage.getItem('totalNomesStorage')) : ''


// Obtém os elementos da página
let btnApagar = document.getElementById('btnApagar')
let btnSortear = document.getElementById('btnSortear')
let secaoNomesSorteados = document.getElementById('secaoNomesSorteados')
let ultimoNomeSorteado = document.getElementById('ultimoNomeSorteado')
let nomesSorteados = document.getElementById('nomesSorteados')
let secaoNomesNaoSorteados = document.getElementById('secaoNomesNaoSorteados')
let nomesNaoSorteados = document.getElementById('nomesNaoSorteados')


function ocultarNomesSorteados() {
  btnSortear.style.visibility = 'hidden'
  btnApagar.style.visibility = 'hidden'
  secaoNomesSorteados.style.display = 'none'
}

function ocultarNomesNaoSorteados() {
  btnSortear.style.visibility = 'hidden'
  btnApagar.style.visibility = 'hidden'
  secaoNomesNaoSorteados.style.display = 'none'
}


// Exibe os nomes sorteados
if (nomesSorteadosStorage.length > 0) {
  ultimoNomeSorteado.innerHTML = nomesSorteadosStorage.slice(-1)
  nomesSorteadosStorage.forEach(element => {
    nomesSorteados.innerHTML += `<br>${element}`
  })
} else {
  ocultarNomesSorteados()
}


// Exibe os nomes não sorteados
if (nomesNaoSorteadosStorage.length > 0) {
  nomesNaoSorteadosStorage.forEach(element => {
    nomesNaoSorteados.innerHTML += `<br>${element}`
  })
} else {
  ocultarNomesNaoSorteados()
}

// Função responsável por carregar o arquivo
async function carregarArquivo(file) {
  if (file.size > 0) {
    let nomesArquivo = await file.text()
    nomesNaoSorteadosStorage = nomesArquivo.split('\n')
    localStorage.setItem('totalNomesStorage', nomesNaoSorteadosStorage.length)
    localStorage.setItem('nomesNaoSorteadosStorage', JSON.stringify(nomesNaoSorteadosStorage))
  } else {
    alert('Por gentileza, faça o upload de um arquivo com pelo menos um nome')
  }
}

// Função responsável por apagar os dados do sorteio.
function apagarSorteio() {
  let resposta = confirm('Deseja apagar as informações do sorteio?')

  if (resposta) {
    localStorage.clear()
    nomesSorteadosStorage = []
    nomesNaoSorteadosStorage = []
    totalNomesStorage = 0
    ocultarNomesSorteados()
    ocultarNomesNaoSorteados()
  }
}