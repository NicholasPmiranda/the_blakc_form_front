const pensamentos = [
    { autor: "Platão", pensamento: "A necessidade é a mãe da invenção." },
    { autor: "Aristóteles", pensamento: "Somos o que repetidamente fazemos. A excelência, portanto, não é um ato, mas um hábito." },
    { autor: "Sócrates", pensamento: "Só sei que nada sei." },
    { autor: "Confúcio", pensamento: "Aquele que move montanhas começa carregando pequenas pedras." },
    { autor: "Maquiavel", pensamento: "Os fins justificam os meios." },
    { autor: "Jean-Jacques Rousseau", pensamento: "O homem nasce livre, mas por toda parte está acorrentado." },
    { autor: "Friedrich Nietzsche", pensamento: "Aquilo que não me mata me torna mais forte." },
    { autor: "Immanuel Kant", pensamento: "O céu estrelado acima de mim e a lei moral dentro de mim." },
    { autor: "Descartes", pensamento: "Penso, logo existo." },
    { autor: "Karl Marx", pensamento: "Os filósofos apenas interpretaram o mundo de diferentes maneiras; o que importa é transformá-lo." },
    { autor: "Sigmund Freud", pensamento: "A felicidade é um problema individual. Aqui, nenhum conselho é válido. Cada um deve procurar, por si, tornar-se feliz." },
    { autor: "Mahatma Gandhi", pensamento: "Seja a mudança que você quer ver no mundo." },
    { autor: "Nelson Mandela", pensamento: "A educação é a arma mais poderosa que você pode usar para mudar o mundo." },
    { autor: "Albert Einstein", pensamento: "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original." },
    { autor: "Isaac Newton", pensamento: "Se vi mais longe, foi por estar sobre os ombros de gigantes." },
    { autor: "Voltaire", pensamento: "Posso não concordar com o que você diz, mas defenderei até a morte o seu direito de dizê-lo." },
    { autor: "Lao Tsé", pensamento: "Uma jornada de mil milhas começa com um único passo." },
    { autor: "Buda", pensamento: "Não sobrecarregue sua mente com preocupações do passado ou do futuro. Viva no presente." },
    { autor: "Leonardo da Vinci", pensamento: "Simplicidade é o último grau de sofisticação." },
    { autor: "Galileu Galilei", pensamento: "Eppur si muove. (E, no entanto, ela se move.)" },
    { autor: "Thomas Edison", pensamento: "Gênio é 1% inspiração e 99% transpiração." },
    { autor: "Henry Ford", pensamento: "Se você pensa que pode ou pensa que não pode, de qualquer forma, você está certo." },
    { autor: "Sun Tzu", pensamento: "A suprema arte da guerra é derrotar o inimigo sem lutar." },
    { autor: "Dalai Lama", pensamento: "Nossa principal tarefa na vida é ajudar os outros. E se você não pode ajudá-los, pelo menos não os machuque." },
    { autor: "Steve Jobs", pensamento: "Seu tempo é limitado, então não o desperdice vivendo a vida de outra pessoa." },
    { autor: "Walt Disney", pensamento: "Todos os nossos sonhos podem se tornar realidade, se tivermos a coragem de persegui-los." },
    { autor: "Francis Bacon", pensamento: "O conhecimento é poder." },
    { autor: "Blaise Pascal", pensamento: "O coração tem razões que a própria razão desconhece." },
    { autor: "Oscar Wilde", pensamento: "Seja você mesmo; todos os outros já existem." },
    { autor: "René Descartes", pensamento: "Para investigar a verdade, é preciso duvidar, tanto quanto possível, de todas as coisas." }
];

// Obtém o dia do mês atual (1-31)
const diaDoMes = new Date().getDate();

// Seleciona o pensamento correspondente ao dia do mês (ajustando índice)
export const pensamentoDoDia = pensamentos[(diaDoMes - 1) % pensamentos.length];
