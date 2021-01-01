// Obtém valores armazenados no localStorage
let storageLimite = localStorage.getItem('storageLimite') ? JSON.parse(localStorage.getItem('storageLimite')) : ''
let storageNumeros = localStorage.getItem('storageNumeros') ? JSON.parse(localStorage.getItem('storageNumeros')) : []


// Obtém elementos da página
let inputLimite = document.getElementById('inputLimite')


// Função responsável por limpar o campo Limite, ocultar o botão Apagar e a seção dos números sorteados
function ocultarNumerosSorteados() {
  inputLimite.value = ''
  document.getElementById('divSecaoNumerosSorteados').style.display = 'none'
}


// Obtém os valores armazenados no localStorage para manter a página atualizada
if (storageNumeros.length == 0) {
  ocultarNumerosSorteados()
} else {
  inputLimite.value = storageLimite

  document.getElementById('h1UltimoNumeroSorteado').innerHTML = storageNumeros.slice(-1)

  // Exibe até 5 números sorteados por linha
  let h3NumerosSorteados = document.getElementById('h3NumerosSorteados')
  for (let i = 0; i < storageNumeros.length; i++) {
    if ((i != 0) && (i % 5 == 0)) {
      h3NumerosSorteados.innerHTML += `<br>${storageNumeros[i]}`
    } else if (i == 0) {
      h3NumerosSorteados.innerHTML += storageNumeros[i]
    } else {
      h3NumerosSorteados.innerHTML += ` - ${storageNumeros[i]}`
    }
  }
}



// Realiza o sorteio
function realizarSorteio() {
  // Verifica se a quantidade de números sorteados já alcançou o limite informado
  if (storageNumeros.length >= inputLimite.value) {
    alert(`O sorteio já alcançou o limite de números sorteados (${Number(inputLimite.value)}). Para continuar, aumente o limite.`)
    return false
  } else {
    // Gera um número aleatório de 1 até o limite informado
    let numeroSorteado = Math.floor(Math.random() * inputLimite.value + 1)

    /* Verifica se o número gerado ainda não existe no array do sorteio antes de armazená-lo
     * Se já existir, chama a função realizarSorteio() até encontrar um número que ainda não foi sorteado */
    if (storageNumeros.indexOf(numeroSorteado) < 0) {
      // Armazena o valor do limite informado
      localStorage.setItem('storageLimite', Number(inputLimite.value))

      // Armazena o novo número gerado.
      storageNumeros.push(numeroSorteado)
      localStorage.setItem('storageNumeros', JSON.stringify(storageNumeros))
    } else {
      // Chamada recursiva para gerar um número aleatório por que o anterior é repetido
      realizarSorteio()
    }
  }
}


// Apagar os dados do sorteio
function apagarSorteio() {
  let resposta = confirm('Deseja apagar as informações do sorteio?')

  if (resposta) {
    ocultarNumerosSorteados()
    storageLimite = 0
    storageNumeros = []
    localStorage.removeItem('storageLimite')
    localStorage.removeItem('storageNumeros')
  }
}