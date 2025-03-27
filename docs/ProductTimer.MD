# Product Timer

## Sobre o componente
Esse componente coloca um crônometro atrelado há uma coleção criada pelo cliente, assim ele escolhe qual produto vai ficar com o crônometro na prateleira. 


## Regras
A coleção precisa ter o nome com a data de término da promoção, por exemplo: **clock-22-02-2023**. Ele inicia com "Clock-" para fins de controle e tem a data do término da promoção logo em seguida.


## Arquivos
- pasta ProductTimer: index.tsx e ProductTimer.css

## Pontos de melhorias
- Há um ponto ruim para adicionar uma classe css no componente de prateleira;
- Há leak de memória;
- Um ponto de melhoria é atrelar ao site editor o crônometro;