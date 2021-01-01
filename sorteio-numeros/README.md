# sorteio-numeros
Desenvolvi este sistema para aprender mais sobre JavaScript, CSS e HTML.

**Sorteio Números** gera números aleatórios utilizando a biblioteca random do JavaScript.

```js
// Gera um número aleatório de 1 até o limite informado.
let numeroSorteado = Math.floor(Math.random() * limite.value + 1);
```

O algoritmo verifica se o número gerado já existe (armazenado em um array no localStorage) e recursivamente gera o próximo número até encontrar um não repetido.

```js
/* Verifica se o número gerado ainda não existe no array do sorteio antes de inseri-lo. 
 * Se já existir, chama a função realizarSorteio() até encontrar um número que ainda não foi sorteado. */
if (numerosArray.indexOf(numeroSorteado) < 0) {
    numerosArray.push(numeroSorteado);
    localStorage.setItem('numeros', JSON.stringify(numerosArray));
} else {
    // Chamada recursiva para gerar um número aleatório por que o anterior é repetido.
    realizarSorteio();
}
```

Meu principal objetivo era trabalhar com o **localStorage** no armazenamento dos números gerados randomicamente.

_Para acessar o sistema, clique em [Sorteio Números](https://bmnsouza.github.io/javascript/sorteio-numeros/index.html)_
