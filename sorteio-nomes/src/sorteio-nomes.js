// Obtém os valores armazenados no localStorage
let nomesSorteadosStorage = localStorage.getItem('nomesSorteadosStorage') ? JSON.parse(localStorage.getItem('nomesSorteadosStorage')) : []
let nomesNaoSorteadosStorage = localStorage.getItem('nomesNaoSorteadosStorage') ? JSON.parse(localStorage.getItem('nomesNaoSorteadosStorage')) : []

// Obtém os elementos da página
let secaoNomesSorteados = document.getElementById('secaoNomesSorteados')
let nomesSorteados = document.getElementById('nomesSorteados')
let nomesArquivo = document.getElementById('nomesArquivo')


function ocultar() {
  nomesArquivo.innerHTML = ''
  secaoNomesSorteados.style.display = 'none'
}


// Exibe os nomes sorteados
if (nomesSorteadosStorage.length == 0) {
  ocultar()
} else {
  document.getElementById('ultimoNomeSorteado').innerHTML = nomesSorteadosStorage.slice(-1)
  nomesSorteadosStorage.forEach(element => {
    nomesSorteados.innerHTML += `<br>${element}`
  })
}

nomesArquivo.innerHTML = localStorage.getItem('nomesArquivoStorage')

// Função responsável por carregar o arquivo
async function carregarArquivo(file) {
  if (file.size <= 3) {
    alert('>>>>> Por gentileza, faça o upload do arquivo de no mínimo 3 bytes <<<<<')
    return false
  } else if (file.size > 5000) {
    alert('>>>>> Por gentileza, faça o upload do arquivo de no máximo 5 KB <<<<<')
    return false
  } else {
    try {
      let nomes = await file.text()
      nomesNaoSorteadosStorage = nomes.split('\n')
      localStorage.setItem('nomesNaoSorteadosStorage', JSON.stringify(nomesNaoSorteadosStorage))
      
      localStorage.setItem('nomesArquivoStorage', nomes)
      nomesArquivo.innerHTML = nomes

      alert('>>>>> Upload realizado com sucesso! <<<<<')
    } catch (err) {
      alert('>>>>> Erro ao fazer o upload do arquivo. Por gentileza, tente novamente <<<<<')
      return false
    }
  }
}


// Realiza o sorteio
function realizarSorteio() {
  // Verifica se ainda há nome para sortear
  if (nomesNaoSorteadosStorage.length == 0) {
    alert(`>>>>> Faça o upload do arquivo para realizar o sorteio <<<<<`)
    return false
  } else {
    // Gera um número aleatório de 0 até o total de nomes não sorteados
    let indice = Math.floor(Math.random() * nomesNaoSorteadosStorage.length)

    // Adiciona o nome do sorteado no array de sorteados
    nomesSorteadosStorage.push(nomesNaoSorteadosStorage[indice])
    localStorage.setItem('nomesSorteadosStorage', JSON.stringify(nomesSorteadosStorage))

    // Retira o nome do sorteado do array de não sorteados
    nomesNaoSorteadosStorage.splice(indice, 1)
    localStorage.setItem('nomesNaoSorteadosStorage', JSON.stringify(nomesNaoSorteadosStorage))
  }
}


// Função responsável por apagar os dados do sorteio.
function apagarSorteio() {
  let resposta = confirm('>>>>> Deseja apagar as informações do sorteio? <<<<<')

  if (resposta) {
    ocultar()
    localStorage.clear()
    nomesArquivoStorage = null
    nomesSorteadosStorage = []
    nomesNaoSorteadosStorage = []
  }
}