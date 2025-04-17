# Relatório de Avaliação da Interface - Rubric Pro

O processo se iniciou com a captura de prints das principais telas, seguida da gravação de um vídeo navegando pelas funcionalidades para entender melhor o fluxo de uso. Durante essa etapa, foi possível identificar interações que pareciam confusas ou mal posicionadas. A partir disso, os prints foram organizados no Figma, onde cada ponto de melhoria foi marcado com comentários diretamente sobre os elementos da interface. Para facilitar a organização das observações, utilizei um plugin do Figma que exporta os comentários em formato de planilha.

Depois desse levantamento, explorei também uma ferramenta de IA voltada para UI, onde testei variações de telas com base nos prompts de cada fluxo. Essas novas telas servem como referência visual e ajudam a imaginar alternativas mais eficientes. Elas não estão 100% alinhadas ou finalizadas, mas cumprem o papel de guiar o redesenho de forma mais objetiva. Caso queiram aproveitar algo, o projeto com código está no GitHub. O foco aqui é mais estrutural: propor organização melhor dos elementos.

## Tela de Login

A sugestão é transformar o processo de login em algo mais direto e leve. Um exemplo é abrir o login em um modal, dando mais dinamismo para o primeiro contato. Isso também ajuda a manter o usuário no contexto da página inicial.

**Pontos a melhorar:**

- Entrada de e-mail e senha pode ficar mais centralizada e com destaque.
- Botões secundários (ex: entrar com o Google) precisam de hierarquia visual mais clara.
- Melhorar espaçamento entre elementos.

## Tela de Cursos e Disciplinas

Recomenda-se organizar primeiro por cursos e dentro de cada curso listar as disciplinas. Assim a hierarquia fica mais clara, e o usuário entende melhor a divisão. Isso também pode reduzir o excesso de informação visível de uma vez só.

**Pontos a melhorar:**

- Accordion dos cursos não está intuitivo nem evidente.
- Falta contraste entre os títulos das seções.
- Poderia haver indicação visual de progresso ou status por disciplina.

## Gerenciador de Rubricas

A tela atual não apresenta uma disposição visual muito boa. Os elementos ficam meio soltos e não existe uma ordem de leitura clara. A ideia aqui seria organizar os cards com mais espaçamento, destacar os botões de ação e trabalhar melhor o alinhamento das informações.

**Pontos a melhorar:**

- Cards muito agrupados e pouco informativos.
- Ícones de ação pouco visíveis e sem tooltip.
- Falta de feedback visual ao interagir com os elementos.

## Fluxo de Navegação Geral

Durante o uso, foi notado que após algum tempo logado, ao atualizar a página, ela fica toda branca. Para conseguir voltar a navegar, é preciso apagar o caminho da URL depois da primeira barra e logar novamente. Esse comportamento quebra o fluxo de uso e pode ser resolvido com uma validação de sessão mais robusta, redirecionando automaticamente para o login caso o token expire ou apresente erro.

**Pontos a melhorar:**

- Ausência de verificação ativa de sessão.
- Falta de mensagens informativas sobre o que aconteceu.
- Redirecionamento automático não está implementado.



Obs: Verifiquei também que a tela de criar modelos de rubricas está retornando erro 500

## Paleta de Cores

Analisando os feedbacks da interface e lembrando também de quando você comentou sobre o laranja trazer uma sensação meio “fome” ou agitação (o que faz sentido mesmo, segundo a psicologia das cores), decidi mudar a paleta pra algo mais equilibrado. Troquei por um gradiente que vai do `#1A8DE3` até o `#00DAFF`, passando pelo `#05B3D7`. Esses tons de azul e ciano transmitem confiança, tranquilidade e foco, que é bem o que o software quer passar: um ambiente seguro, calmo e profissional pra avaliação. Além disso, essas cores têm ótimo contraste tanto no modo claro quanto no modo escuro, o que garante legibilidade e consistência visual independente do tema.

