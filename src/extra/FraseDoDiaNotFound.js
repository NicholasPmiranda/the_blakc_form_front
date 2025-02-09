const pensamentos = [
    "404: O sentido da vida não foi encontrado. Talvez esteja em outro universo.",
    "404: Você procurou, mas a resposta se escondeu na entrelinha do tempo.",
    "404: O caminho certo não foi encontrado. Talvez o erro seja o mapa.",
    "404: Verdade não encontrada. Será que ela realmente existe?",
    "404: A página que você busca sumiu como poeira ao vento da impermanência.",
    "404: Seu destino está fora do ar. Por favor, reconecte-se à existência.",
    "404: O que foi perdido talvez nunca tenha existido.",
    "404: Você digitou o endereço errado, ou ele nunca esteve certo?",
    "404: O universo lhe nega a resposta, mas a dúvida pode ser mais valiosa.",
    "404: O passado não pode ser acessado. O presente é seu único link válido.",
    "404: A sabedoria se esconde entre as páginas que não conseguimos carregar.",
    "404: Caminho não encontrado. Será que você quer realmente seguir adiante?",
    "404: Página em branco. O que você escrever nela determinará seu futuro.",
    "404: O destino está quebrado. Tente reconstruí-lo com novas escolhas.",
    "404: Nada foi encontrado... e talvez seja exatamente isso que você precisa.",
    "404: Você chegou ao vazio. O que pretende fazer com ele?",
    "404: Esta página nunca existiu... mas sua busca já faz parte da história.",
    "404: Você não encontrou a página, mas a página encontrou você.",
    "404: O erro não está na página, mas na busca por algo que já se perdeu.",
    "404: A resposta está ausente, mas e se a pergunta também estiver errada?",
    "404: Você se perdeu no labirinto digital da existência.",
    "404: O conteúdo foi apagado pelo tempo. O que mais foi perdido sem que percebêssemos?",
    "404: A ausência da página reflete a ausência de certezas na vida.",
    "404: Tudo o que buscamos está em outro link... ou dentro de nós?",
    "404: A busca continua, mas será que há um destino para alcançar?",
    "404: O desconhecido se apresenta na forma do vazio. O que você vê nele?",
    "404: Sua mente tentou acessar uma ideia que não existe mais.",
    "404: Sua conexão com o significado foi interrompida. Tente reiniciar sua percepção.",
    "404: A realidade não pôde ser carregada. Verifique sua conexão com o agora.",
    "404: Página não encontrada. Mas quem disse que ela realmente deveria estar aqui?",
    "404: Você está procurando por algo que talvez nunca tenha existido... e agora?"
];

// Obtém o dia do mês atual (1-31)
const diaDoMes = new Date().getDate();

// Seleciona o pensamento correspondente ao dia do mês (ajustando índice)
export const pensamentoDoDiaNotFound = pensamentos[(diaDoMes - 1) % pensamentos.length];
