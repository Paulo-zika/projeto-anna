import { useState, useEffect, useRef } from 'react'

type Tela = 'home' | 'alimentacao' | 'ciclo' | 'emocional' | 'quiz' | 'dicas'

interface SaudeFemininaProps {
  onVoltar: () => void
}

const conteudos = {
  alimentacao: {
    titulo: "Alimentação & Saúde Feminina",
    subtitulo: "Nutrição para o bem-estar",
    icone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    texto: "A alimentação equilibrada desempenha um papel fundamental na saúde feminina. Ela ajuda a regular o ciclo menstrual, prevenir a anemia, aliviar sintomas da TPM e proporcionar cuidados adequados durante a menopausa. Uma dieta rica em nutrientes essenciais é a base para o bem-estar em todas as fases da vida.",
    pontos: [
      "Consuma alimentos ricos em ferro: feijão, folhas verde-escuras, carnes magras",
      "Inclua fontes de cálcio: leite, iogurte, queijos, sardinha",
      "Priorize ácido fólico: folhas, frutas cítricas, leguminosas",
      "Mantenha uma alimentação variada e colorida",
      "Hidrate-se adequadamente (2-3 litros de água por dia)"
    ]
  },
  ciclo: {
    titulo: "Ciclo Feminino",
    subtitulo: "Entendendo seu corpo",
    icone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    texto: "Cada fase do ciclo menstrual traz mudanças significativas no corpo e nas necessidades nutricionais. Conhecer essas fases ajuda no autocuidado e na escolha dos alimentos mais adequados para cada momento. Durante a menstruação, priorize alimentos ricos em ferro. Na fase pré-menstrual, alimentos ricos em magnésio podem ajudar a aliviar os sintomas da TPM.",
    pontos: [
      "Fase menstrual: priorize ferro e vitamina C para absorção",
      "Fase folicular: mantenha alimentação equilibrada e variada",
      "Fase ovulatória: aumente consumo de proteínas e gorduras boas",
      "Fase lútea: alimentos ricos em magnésio ajudam com TPM",
      "Mantenha um diário alimentar para identificar padrões"
    ]
  },
  emocional: {
    titulo: "Corpo & Emoções",
    subtitulo: "Bem-estar integral",
    icone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    texto: "As emoções influenciam diretamente a saúde física e a alimentação. Respire fundo e cuide de você com carinho. Praticar atividades físicas regularmente, ter momentos de descanso adequado e manter uma alimentação equilibrada são formas essenciais de cuidar tanto do corpo quanto da mente. O autocuidado é um ato de amor próprio.",
    pontos: [
      "Pratique atividade física regular (reduz estresse e ansiedade)",
      "Priorize o sono de qualidade (7-9 horas por noite)",
      "Inclua técnicas de relaxamento: meditação, respiração",
      "Mantenha conexões sociais e atividades prazerosas",
      "Procure ajuda profissional quando necessário"
    ]
  },
  dicas: {
    titulo: "Dicas Rápidas",
    subtitulo: "Cuidados diários",
    icone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    texto: "Pequenos cuidados diários fazem grande diferença na sua saúde e bem-estar. Beba água regularmente (pelo menos 2 litros por dia), consuma frutas e legumes diariamente, respeite seu descanso e procure acompanhamento de saúde regular. Lembre-se: cuidar de si mesma não é egoísmo, é necessidade.",
    pontos: [
      "Hidrate-se: 2-3 litros de água por dia",
      "Consuma 5 porções de frutas e verduras diariamente",
      "Respeite seu descanso: 7-9 horas de sono",
      "Faça exames preventivos regularmente",
      "Pratique atividade física que você goste"
    ]
  }
}

interface Pergunta {
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
}

const perguntasQuiz: Pergunta[] = [
  {
    pergunta: "Qual nutriente é essencial para prevenir a anemia, condição comum em mulheres?",
    opcoes: [
      "Cálcio",
      "Ferro",
      "Vitamina D",
      "Proteína"
    ],
    correta: 1,
    explicacao: "O ferro é essencial para prevenir a anemia. Mulheres perdem ferro durante a menstruação, por isso precisam consumir alimentos ricos em ferro regularmente, como feijão, folhas verde-escuras e carnes magras."
  },
  {
    pergunta: "Como melhorar a absorção de ferro dos alimentos vegetais?",
    opcoes: [
      "Consumindo com alimentos ricos em vitamina C",
      "Consumindo com café ou chá",
      "Consumindo apenas à noite",
      "Não há como melhorar"
    ],
    correta: 0,
    explicacao: "A vitamina C aumenta a absorção de ferro. Consuma alimentos ricos em ferro junto com frutas cítricas, pimentão ou tomate para melhorar a absorção."
  },
  {
    pergunta: "Durante qual fase do ciclo menstrual é importante priorizar alimentos ricos em ferro?",
    opcoes: [
      "Fase folicular",
      "Fase menstrual",
      "Fase ovulatória",
      "Todas as fases"
    ],
    correta: 1,
    explicacao: "Durante a fase menstrual, há perda de sangue, então é importante priorizar alimentos ricos em ferro para repor as perdas e prevenir a anemia."
  },
  {
    pergunta: "Qual nutriente pode ajudar a aliviar os sintomas da TPM?",
    opcoes: [
      "Ferro",
      "Magnésio",
      "Cálcio",
      "Vitamina A"
    ],
    correta: 1,
    explicacao: "O magnésio pode ajudar a aliviar sintomas da TPM como irritabilidade, cólicas e inchaço. Alimentos ricos em magnésio incluem sementes, nozes, folhas verde-escuras e chocolate amargo."
  },
  {
    pergunta: "Quantas horas de sono são recomendadas para mulheres adultas?",
    opcoes: [
      "5-6 horas",
      "7-9 horas",
      "10-12 horas",
      "Não importa"
    ],
    correta: 1,
    explicacao: "É recomendado dormir de 7 a 9 horas por noite para manter a saúde hormonal, reduzir o estresse e melhorar o bem-estar geral."
  },
  {
    pergunta: "Qual é a quantidade recomendada de água por dia para mulheres?",
    opcoes: [
      "1 litro",
      "2-3 litros",
      "4-5 litros",
      "Não há recomendação"
    ],
    correta: 1,
    explicacao: "É recomendado beber de 2 a 3 litros de água por dia para manter a hidratação adequada, ajudar na digestão e na saúde da pele."
  },
  {
    pergunta: "Alimentos ricos em qual nutriente são importantes durante a menopausa?",
    opcoes: [
      "Apenas proteína",
      "Cálcio e vitamina D",
      "Apenas carboidratos",
      "Apenas gorduras"
    ],
    correta: 1,
    explicacao: "Durante a menopausa, é importante consumir cálcio e vitamina D para manter a saúde dos ossos e prevenir a osteoporose. Leite, iogurte, sardinha e exposição ao sol são boas fontes."
  },
  {
    pergunta: "O que deve ser evitado próximo às refeições para não prejudicar a absorção de ferro?",
    opcoes: [
      "Frutas cítricas",
      "Chá e café",
      "Vegetais",
      "Água"
    ],
    correta: 1,
    explicacao: "Chá e café contêm taninos que reduzem a absorção de ferro. É recomendado consumi-los pelo menos 1 hora antes ou depois das refeições principais."
  }
]

export default function SaudeFeminina({ onVoltar }: SaudeFemininaProps) {
  const [tela, setTela] = useState<Tela>('home')

  const Menu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        onClick={() => setTela('alimentacao')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-red-200 hover:-translate-y-1 text-left"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
          {conteudos.alimentacao.icone}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Alimentação</h3>
        <p className="text-sm text-slate-600 leading-relaxed">Nutrição para o bem-estar</p>
        <div className="flex items-center text-red-600 font-semibold text-sm mt-4">
          <span>Saiba mais</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
      
      <button
        onClick={() => setTela('ciclo')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-pink-200 hover:-translate-y-1 text-left"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
          {conteudos.ciclo.icone}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Ciclo Feminino</h3>
        <p className="text-sm text-slate-600 leading-relaxed">Entendendo seu corpo</p>
        <div className="flex items-center text-pink-600 font-semibold text-sm mt-4">
          <span>Saiba mais</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
      
      <button
        onClick={() => setTela('emocional')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-purple-200 hover:-translate-y-1 text-left"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
          {conteudos.emocional.icone}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Corpo & Emoções</h3>
        <p className="text-sm text-slate-600 leading-relaxed">Bem-estar integral</p>
        <div className="flex items-center text-purple-600 font-semibold text-sm mt-4">
          <span>Saiba mais</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
      
      <button
        onClick={() => setTela('quiz')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1 text-left"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
          {conteudos.quiz.icone}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Quiz</h3>
        <p className="text-sm text-slate-600 leading-relaxed">Teste seus conhecimentos</p>
        <div className="flex items-center text-blue-600 font-semibold text-sm mt-4">
          <span>Iniciar quiz</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
      
      <button
        onClick={() => setTela('dicas')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-yellow-200 hover:-translate-y-1 text-left md:col-span-2"
      >
        <div className="flex items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center mr-4 text-white shadow-lg flex-shrink-0">
            {conteudos.dicas.icone}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Dicas Rápidas</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Cuidados diários para seu bem-estar</p>
          </div>
          <div className="flex items-center text-yellow-600 font-semibold text-sm">
            <span>Ver dicas</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  )

  const TelaConteudo = ({ chave }: { chave: keyof typeof conteudos }) => {
    const conteudo = conteudos[chave]
    
    return (
      <div>
        <button
          onClick={() => setTela('home')}
          className="flex items-center text-slate-600 hover:text-slate-800 mb-6 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Voltar ao menu</span>
        </button>

        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white shadow-lg mr-4">
              {conteudo.icone}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">{conteudo.titulo}</h2>
              <p className="text-slate-500">{conteudo.subtitulo}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 md:p-8 mb-6 border border-pink-100">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">{conteudo.texto}</p>
          
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 mb-3">Principais recomendações:</h3>
            {conteudo.pontos.map((ponto, i) => (
              <div key={i} className="flex items-start">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-slate-700 flex-1">{ponto}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setTela('home')}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Voltar ao Menu
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-3xl shadow-strong p-6 md:p-10">
          {tela === 'home' && (
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Saúde Feminina em Foco</h1>
                  <p className="text-slate-600">Cuidar de você é um ato de amor</p>
                </div>
                <button
                  onClick={onVoltar}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  ← Menu Principal
                </button>
              </div>
              <Menu />
            </div>
          )}

          {tela === 'alimentacao' && <TelaConteudo chave="alimentacao" />}
          {tela === 'ciclo' && <TelaConteudo chave="ciclo" />}
          {tela === 'emocional' && <TelaConteudo chave="emocional" />}
          {tela === 'quiz' && <QuizFeminina onVoltar={() => setTela('home')} />}
          {tela === 'dicas' && <TelaConteudo chave="dicas" />}
        </div>
      </div>
    </div>
  )
}

function QuizFeminina({ onVoltar }: { onVoltar: () => void }) {
  const [index, setIndex] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false)
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null)
  const [tempoRestante, setTempoRestante] = useState(4)
  const [animacao, setAnimacao] = useState<'idle' | 'correto' | 'incorreto'>('idle')
  const [mostrarConfete, setMostrarConfete] = useState(false)
  const timerRef = useRef<number | null>(null)
  const confeteTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (mostrarExplicacao) {
      setTempoRestante(4)
      const interval = setInterval(() => {
        setTempoRestante((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      timerRef.current = window.setTimeout(() => {
        setMostrarExplicacao(false)
        setRespostaSelecionada(null)
        setAnimacao('idle')
        setMostrarConfete(false)
        setIndex((prev) => prev + 1)
        setTempoRestante(4)
      }, 4000)

      return () => {
        clearInterval(interval)
        if (timerRef.current) window.clearTimeout(timerRef.current)
      }
    }
  }, [mostrarExplicacao])

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      if (confeteTimeoutRef.current) window.clearTimeout(confeteTimeoutRef.current)
    }
  }, [])

  if (index >= perguntasQuiz.length) {
    const porcentagem = Math.round((acertos / perguntasQuiz.length) * 100)
    const estrelas = porcentagem >= 90 ? 5 : porcentagem >= 70 ? 4 : porcentagem >= 50 ? 3 : porcentagem >= 30 ? 2 : 1
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <div className="glass-effect rounded-3xl shadow-strong p-8 md:p-12 text-center animate-fadeIn">
            <div className="mb-8">
              <div className={`w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-all duration-500 ${
                porcentagem >= 70 ? 'scale-110' : ''
              }`}>
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Parabéns!</h2>
              
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-8 h-8 transition-all duration-300 ${
                      i < estrelas ? 'text-yellow-400 scale-110' : 'text-slate-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <div className="inline-block px-6 py-3 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full mb-6 shadow-soft">
                <span className="text-3xl font-bold text-pink-600">{acertos}</span>
                <span className="text-slate-600 mx-2">de</span>
                <span className="text-3xl font-bold text-slate-800">{perguntasQuiz.length}</span>
                <span className="text-slate-600 ml-2">perguntas</span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${porcentagem}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p className="text-xl text-slate-600 mb-2 font-bold">{porcentagem}% de acertos</p>
              
              <div className="mt-6">
                {porcentagem >= 90 && (
                  <p className="text-lg font-semibold text-pink-600">Excelente! Você domina o assunto! 🌟</p>
                )}
                {porcentagem >= 70 && porcentagem < 90 && (
                  <p className="text-lg font-semibold text-blue-600">Muito bom! Continue aprendendo! 💪</p>
                )}
                {porcentagem >= 50 && porcentagem < 70 && (
                  <p className="text-lg font-semibold text-yellow-600">Bom trabalho! Há sempre mais para aprender! 📚</p>
                )}
                {porcentagem < 50 && (
                  <p className="text-lg font-semibold text-orange-600">Continue estudando! O conhecimento vem com prática! 📖</p>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-8 border border-pink-100">
              <p className="text-lg text-slate-700 leading-relaxed">
                Cuidar de você é um ato de amor. Continue aprendendo sobre saúde feminina e bem-estar!
              </p>
            </div>

            <button
              onClick={onVoltar}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            >
              Voltar ao Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  const atual = perguntasQuiz[index]
  const progresso = ((index + 1) / perguntasQuiz.length) * 100
  const letras = ['A', 'B', 'C', 'D']

  function responder(i: number) {
    if (mostrarExplicacao) return
    
    setRespostaSelecionada(i)
    const acertou = i === atual.correta
    
    if (acertou) {
      setAcertos(acertos + 1)
      setAnimacao('correto')
      setMostrarConfete(true)
      if (confeteTimeoutRef.current) window.clearTimeout(confeteTimeoutRef.current)
      confeteTimeoutRef.current = window.setTimeout(() => setMostrarConfete(false), 2000)
    } else {
      setAnimacao('incorreto')
    }
    
    setMostrarExplicacao(true)
  }

  return (
    <div>
      <button
        onClick={onVoltar}
        className="flex items-center text-slate-600 hover:text-slate-800 mb-6 group"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium">Voltar ao menu</span>
      </button>

      <div className={`glass-effect rounded-3xl shadow-strong p-6 md:p-10 transition-all duration-500 ${
        animacao === 'correto' ? 'ring-4 ring-pink-300 ring-opacity-50' : 
        animacao === 'incorreto' ? 'ring-4 ring-red-300 ring-opacity-50' : ''
      }`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Quiz Saúde Feminina</h2>
            <p className="text-sm text-slate-500">Teste seus conhecimentos</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">Pontuação</div>
            <div className="text-2xl font-bold text-pink-600">{acertos}/{index}</div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-600 mb-3">
            <span className="font-semibold">Pergunta {index + 1} de {perguntasQuiz.length}</span>
            <span className="font-semibold">{Math.round(progresso)}% completo</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 rounded-full transition-all duration-700 relative overflow-hidden"
              style={{ width: `${progresso}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {mostrarConfete && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}

        <div className="mb-8">
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 mb-6 border border-pink-200">
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
              {atual.pergunta}
            </h3>
          </div>

          {!mostrarExplicacao ? (
            <div className="space-y-4">
              {atual.opcoes.map((op, i) => {
                const letra = letras[i]
                return (
                  <button
                    key={i}
                    onClick={() => responder(i)}
                    disabled={mostrarExplicacao}
                    className="w-full group relative overflow-hidden"
                  >
                    <div className="flex items-center p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-pink-400 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-300 text-left shadow-soft hover:shadow-medium transform hover:scale-[1.02] active:scale-[0.98]">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white font-bold flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        {letra}
                      </div>
                      <span className="text-slate-700 font-semibold text-lg flex-1 group-hover:text-slate-900">{op}</span>
                      <svg className="w-6 h-6 text-slate-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className={`p-5 rounded-2xl border-2 transform transition-all duration-500 ${
                respostaSelecionada === atual.correta 
                  ? 'bg-pink-50 border-pink-400 scale-105 shadow-lg' 
                  : 'bg-red-50 border-red-400 scale-105 shadow-lg'
              }`}>
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg ${
                    respostaSelecionada === atual.correta 
                      ? 'bg-pink-500' 
                      : 'bg-red-500'
                  }`}>
                    {respostaSelecionada === atual.correta ? (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-lg mb-2 ${
                      respostaSelecionada === atual.correta ? 'text-pink-800' : 'text-red-800'
                    }`}>
                      {respostaSelecionada === atual.correta ? '🎉 Resposta Correta!' : '❌ Resposta Incorreta'}
                    </p>
                    <p className="text-slate-700 font-medium">{atual.opcoes[respostaSelecionada!]}</p>
                    {respostaSelecionada !== atual.correta && (
                      <div className="mt-3 p-3 bg-white rounded-lg border border-pink-200">
                        <p className="text-sm text-pink-700 font-semibold mb-1">Resposta correta:</p>
                        <p className="text-pink-800 font-medium">{atual.opcoes[atual.correta]}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-200 shadow-soft">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-pink-900 mb-2 text-lg">Explicação:</p>
                    <p className="text-slate-700 leading-relaxed text-base">{atual.explicacao}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(tempoRestante / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center min-w-[120px]">
                    <p className="text-sm text-slate-500 mb-1">Próxima pergunta em</p>
                    <p className="text-3xl font-bold text-pink-600">{tempoRestante}</p>
                    <p className="text-xs text-slate-400">segundos</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
