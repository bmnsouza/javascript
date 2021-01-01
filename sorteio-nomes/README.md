# sorteio-nomes
Desenvolvi este sistema para aprender mais sobre _JavaScript_, _CSS_ e _HTML_.

**Sorteio Nomes** faz upload do arquivo texto contendo nomes para realizar o sorteio.

Cada nome deverá estar em uma linha do arquivo para que o sistema armazene corretamente todos os nomes.

O sistema utiliza a biblioteca `Math.random()` do _JavaScript_ para gerar um número aleatório a cada clique do botão Sortear.

``` js
// Gera um número aleatório de 0 até o total de nomes não sorteados
let indice = Math.floor(Math.random() * storageNomesNaoSorteados.length)
```

O algoritmo verifica se o número gerado já existe (armazenado em um array no localStorage) e recursivamente gera o próximo número até encontrar um não repetido.

``` js
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

_Para acessar o sistema, clique em [Sorteio Nomes](https://bmnsouza.github.io/javascript/sorteio-nomes/sorteio-nomes.html)_
