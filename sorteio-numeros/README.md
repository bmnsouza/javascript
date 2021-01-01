# sorteio-numeros
Desenvolvi este sistema para aprender mais sobre _JavaScript_, _CSS_ e _HTML_.

**Sorteio Números** utiliza a biblioteca `Math.random()` do _JavaScript_ para gerar um número aleatório a cada clique do botão Sortear.

```js
// Gera um número aleatório de 1 até o limite informado
let numeroSorteado = Math.floor(Math.random() * inputLimite.value + 1)
```

O sistema verifica se o número gerado já foi sorteado anteriormente (armazenado em um array no localStorage) e recursivamente, gera o próximo número até encontrar um não repetido.

```js
/* Verifica se o número gerado ainda não existe no array do sorteio antes de armazená-lo
 * Se já existir, chama a função realizarSorteio() até encontrar um número que ainda não foi sorteado */
if (storageNumeros.indexOf(numeroGerado) < 0) {
  // Armazena o valor do limite informado
  localStorage.setItem('storageLimite', Number(inputLimite.value))

  // Armazena o novo número gerado.
  storageNumeros.push(numeroGerado)
  localStorage.setItem('storageNumeros', JSON.stringify(storageNumeros))
} else {
  // Chamada recursiva para gerar um novo número aleatório por que o anterior é repetido
  realizarSorteio()
}
```

_Para acessar o sistema, clique em [Sorteio Números](https://bmnsouza.github.io/javascript/sorteio-numeros/sorteio-numeros.html)_
