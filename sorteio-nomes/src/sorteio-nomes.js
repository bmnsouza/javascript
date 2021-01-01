// Obtém valores armazenados no localStorage
let storageNomesSorteados = localStorage.getItem('storageNomesSorteados') ? JSON.parse(localStorage.getItem('storageNomesSorteados')) : []
let storageNomesNaoSorteados = localStorage.getItem('storageNomesNaoSorteados') ? JSON.parse(localStorage.getItem('storageNomesNaoSorteados')) : []

// Obtém elementos da página
let textareaNomesArquivo = document.getElementById('textareaNomesArquivo')
textareaNomesArquivo.innerHTML = localStorage.getItem('storageNomesArquivo')


// Verifica se existe nome sorteado para exibir
if (storageNomesSorteados.length == 0) {
  naoExibirElementos()
} else {
  document.getElementById('h3UltimoNomeSorteado').innerHTML = storageNomesSorteados.slice(-1)
  storageNomesSorteados.forEach(element => {
    document.getElementById('pNomesSorteados').innerHTML += `${element}<br>`
  })
}


// Não exibe a seção nomes sorteados
function naoExibirElementos() {
  textareaNomesArquivo.innerHTML = ''
  document.getElementById('divSecaoUltimoNomeSorteado').style.display = 'none'
  document.getElementById('divSecaoNomesSorteados').style.display = 'none'
}


// Função responsável por carregar o arquivo
async function carregarArquivo(file) {
  if (file.size <= 3) {
    alert('Por gentileza, faça o upload do arquivo de no mínimo 3 bytes')
    return false
  } else if (file.size > 5000) {
    alert('Por gentileza, faça o upload do arquivo de no máximo 5 KB')
    return false
  } else {
    try {
      // Obtém os nomes contidos no arquivo, armazena-os no localStorage e exibe-os no textareaNomesArquivo
      let nomes = await file.text()
      localStorage.setItem('storageNomesArquivo', nomes)
      textareaNomesArquivo.innerHTML = nomes
      
      // Cria um array a partir da quebra de linha do arquivo e armaneza-o no localStorage
      storageNomesNaoSorteados = nomes.split('\n')
      localStorage.setItem('storageNomesNaoSorteados', JSON.stringify(storageNomesNaoSorteados))

      alert('Upload realizado com sucesso!')
    } catch (err) {
      alert('Erro ao fazer o upload do arquivo. Por gentileza, tente novamente')
      return false
    }
  }
}


// Realiza o sorteio
function realizarSorteio() {
  // Verifica se ainda há nome para sortear
  if (storageNomesNaoSorteados.length == 0) {
    alert(`Faça o upload do arquivo para realizar o sorteio`)
    return false
  } else {
    // Gera um número aleatório de 0 até o total de nomes não sorteados
    let indice = Math.floor(Math.random() * storageNomesNaoSorteados.length)

    // Adiciona o nome do sorteado no array de sorteados
    storageNomesSorteados.push(storageNomesNaoSorteados[indice])
    localStorage.setItem('storageNomesSorteados', JSON.stringify(storageNomesSorteados))

    // Retira o nome do sorteado do array storageNomesNaoSorteados
    storageNomesNaoSorteados.splice(indice, 1)
    localStorage.setItem('storageNomesNaoSorteados', JSON.stringify(storageNomesNaoSorteados))
  }
}


// Apaga os dados do sorteio
function apagarSorteio() {
  let resposta = confirm('Deseja apagar as informações do sorteio?')

  if (resposta) {
    naoExibirElementos()
    storageNomesArquivo = null
    storageNomesSorteados = []
    storageNomesNaoSorteados = []
    localStorage.removeItem('storageNomesSorteados')
    localStorage.removeItem('storageNomesNaoSorteados')
  }
}