// Obtém os valores armazenados no localStorage
let totalStorage = localStorage.getItem('totalStorage') ? JSON.parse(localStorage.getItem('totalStorage')) : ''
let nomesStorage = localStorage.getItem('nomesStorage') ? JSON.parse(localStorage.getItem('nomesStorage')) : []
let nomesSorteadosStorage = localStorage.getItem('nomesSorteadosStorage') ? JSON.parse(localStorage.getItem('nomesSorteadosStorage')) : []


// Obtém os elementos da página
const limite = document.getElementById('limite')
let btnApagar = document.getElementById('btnApagar')
let secaoNomesSorteados = document.getElementById('secaoNomesSorteados')
let ultimoNomeSorteado = document.getElementById('ultimoNomeSorteado')
let nomesSorteados = document.getElementById('nomesSorteados')


// Função responsável por Limpar o campo Limite, ocultar o botão Apagar e a seção dos números sorteados
function ocultarNomesSorteados() {
  btnApagar.style.visibility = 'hidden'
  secaoNomesSorteados.style.display = 'none'
}

//localStorage.setItem('nomesSorteadosStorage', JSON.stringify(['Bruno Marcel', 'Cristiano Gomes']))

// Todas as vezes que a página é carregada, obtém os valores armazenados no localStorage para mantê-la atualizada
if (nomesSorteadosStorage.length > 0) {
  ultimoNomeSorteado.innerHTML = nomesSorteadosStorage.slice(-1)

  // Lógica criada para permitir até 5 números sorteados por linha
  for (let i = 0; i < nomesSorteadosStorage.length; i++) {
    nomesSorteados.innerHTML += `<br>${nomesSorteadosStorage[i]}`
  }
} else {
  ocultarNomesSorteados()
}

// Função responsável por carregar o arquivo
async function carregarArquivo(file) {
  if (file.size > 0) {
    let nomesArquivo = await file.text()
    nomesStorage = nomesArquivo.split('\n')
    localStorage.setItem('totalStorage', nomesStorage.length)
    localStorage.setItem('nomesStorage', JSON.stringify(nomesStorage))
  } else {
    alert('Por gentileza,  o upload de um arquivo com pelo menos um nome')
  }
}

/*
// Função responsável por realizar o sorteio
function realizarSorteio() {
  // Verifica se a quantidade de números sorteados já alcançou o limite informado
  if (nomesStorage.length >= limite.value) {
    alert(`O sorteio já alcançou o limite de números sorteados (${Number(limite.value)}). Para continuar aumente o limite.`)
    return false
  } else {
    // Gera um número aleatório de 1 até o limite informado
    let numeroSorteado = Math.floor(Math.random() * limite.value + 1)

    /* Verifica se o número gerado ainda não existe no array do sorteio antes de armazená-lo
     * Se já existir, chama a função realizarSorteio() até encontrar um número que ainda não foi sorteado *
    if (nomesStorage.indexOf(numeroSorteado) < 0) {
      // Armazena o valor do limite informado
      localStorage.setItem('totalStorage', Number(limite.value))

      // Armazena o novo número gerado
      nomesStorage.push(numeroSorteado)
      localStorage.setItem('nomesStorage', JSON.stringify(nomesStorage))
    } else {
      // Chamada recursiva para gerar um número aleatório por que o anterior é repetido
      realizarSorteio()
    }
  }
}


// Função responsável por apagar os dados do sorteio.
function apagarSorteio() {
  let resposta = confirm('Deseja apagar as informações do sorteio?')

  if (resposta) {
    localStorage.clear()
    nomesStorage = []
    ocultarNomesSorteados()
  }
}
*/