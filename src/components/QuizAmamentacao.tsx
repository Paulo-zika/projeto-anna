import { useState, useEffect, useRef } from 'react'

interface Pergunta {
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
  dica?: string
}

const perguntas: Pergunta[] = [
  {
    pergunta: "Qual é o tempo recomendado de amamentação exclusiva pela OMS?",
    opcoes: [
      "Até 3 meses",
      "Até 6 meses",
      "Até 1 ano",
      "Até 2 anos"
    ],
    correta: 1,
    explicacao: "A OMS recomenda amamentação exclusiva até os 6 meses de vida do bebê. Após esse período, a amamentação deve continuar junto com alimentos complementares até os 2 anos ou mais.",
    dica: "A Organização Mundial da Saúde tem uma recomendação específica sobre este período."
  },
  {
    pergunta: "Qual é um dos principais benefícios do leite materno para o bebê?",
    opcoes: [
      "Apenas nutrição",
      "Proteção contra infecções",
      "Apenas hidratação",
      "Apenas saciedade"
    ],
    correta: 1,
    explicacao: "O leite materno contém anticorpos e células de defesa que protegem o bebê contra infecções, alergias e doenças. É considerado a primeira vacina do bebê.",
    dica: "O leite materno oferece muito mais do que apenas nutrição."
  },
  {
    pergunta: "O leite materno se adapta às necessidades do bebê?",
    opcoes: [
      "Não, é sempre igual",
      "Sim, muda conforme a idade e necessidades",
      "Apenas no primeiro mês",
      "Apenas à noite"
    ],
    correta: 1,
    explicacao: "Sim! O leite materno é dinâmico e se adapta às necessidades do bebê, mudando sua composição conforme a idade, hora do dia, e até durante a mesma mamada (começa mais aquoso e termina mais gorduroso).",
    dica: "O leite materno é um alimento inteligente e adaptável."
  },
  {
    pergunta: "A amamentação traz benefícios para a mãe?",
    opcoes: [
      "Não, apenas para o bebê",
      "Sim, ajuda na recuperação pós-parto",
      "Apenas emocionais",
      "Apenas econômicos"
    ],
    correta: 1,
    explicacao: "Sim! A amamentação ajuda na recuperação do útero, reduz o risco de câncer de mama e ovário, previne hemorragias pós-parto, e fortalece o vínculo mãe-bebê.",
    dica: "A amamentação beneficia tanto a mãe quanto o bebê."
  },
  {
    pergunta: "Qual é a melhor posição para amamentar?",
    opcoes: [
      "Apenas uma posição é correta",
      "A posição em que mãe e bebê estiverem confortáveis",
      "Sempre deitada",
      "Sempre sentada"
    ],
    correta: 1,
    explicacao: "A melhor posição é aquela em que tanto a mãe quanto o bebê estão confortáveis. Existem várias posições possíveis: tradicional, invertida, deitada, entre outras. O importante é o conforto e a pega correta.",
    dica: "O conforto é fundamental para uma boa amamentação."
  },
  {
    pergunta: "Quantas vezes por dia um recém-nascido deve mamar?",
    opcoes: [
      "3 a 4 vezes",
      "6 a 8 vezes",
      "8 a 12 vezes ou mais",
      "Apenas quando o bebê chorar"
    ],
    correta: 2,
    explicacao: "Um recém-nascido deve mamar de 8 a 12 vezes ou mais por dia, ou seja, a cada 2 a 3 horas. A amamentação em livre demanda é recomendada, permitindo que o bebê mame sempre que demonstrar sinais de fome.",
    dica: "Recém-nascidos precisam mamar com muita frequência."
  },
  {
    pergunta: "O que é a pega correta na amamentação?",
    opcoes: [
      "Apenas o mamilo na boca do bebê",
      "O bebê pega o mamilo e parte da aréola",
      "Apenas a aréola",
      "Não importa como o bebê pega"
    ],
    correta: 1,
    explicacao: "A pega correta é quando o bebê pega o mamilo e parte da aréola, com a boca bem aberta, lábios virados para fora e queixo tocando o peito. Isso evita rachaduras e garante uma boa sucção.",
    dica: "A pega correta envolve mais do que apenas o mamilo."
  },
  {
    pergunta: "É normal o bebê perder peso nos primeiros dias após o nascimento?",
    opcoes: [
      "Não, nunca é normal",
      "Sim, é normal perder até 10% do peso",
      "Sim, pode perder até 20%",
      "Só é normal se perder mais de 20%"
    ],
    correta: 1,
    explicacao: "Sim, é normal o bebê perder até 10% do peso nos primeiros dias de vida. Após esse período, ele deve começar a ganhar peso. Se a perda for maior que 10%, é importante buscar orientação profissional.",
    dica: "Uma pequena perda de peso inicial é esperada."
  }
]

interface QuizAmamentacaoProps {
  onVoltar: () => void
}

export default function QuizAmamentacao({ onVoltar }: QuizAmamentacaoProps) {
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

  if (index >= perguntas.length) {
    const porcentagem = Math.round((acertos / perguntas.length) * 100)
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
              
              {/* Estrelas */}
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
                <span className="text-3xl font-bold text-slate-800">{perguntas.length}</span>
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
              
              {/* Mensagem personalizada */}
              <div className="mt-6">
                {porcentagem >= 90 && (
                  <p className="text-lg font-semibold text-emerald-600">Excelente! Você domina o assunto! 🌟</p>
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
                Amamentar é um ato de amor, cuidado e saúde. Continue aprendendo e compartilhando conhecimento sobre esse tema tão importante.
              </p>
            </div>

            <button
              onClick={onVoltar}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
            >
              Voltar ao Menu Principal
            </button>
          </div>
        </div>
      </div>
    )
  }

  const atual = perguntas[index]
  const progresso = ((index + 1) / perguntas.length) * 100
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">
        <div className={`glass-effect rounded-3xl shadow-strong p-6 md:p-10 transition-all duration-500 ${
          animacao === 'correto' ? 'ring-4 ring-emerald-300 ring-opacity-50' : 
          animacao === 'incorreto' ? 'ring-4 ring-red-300 ring-opacity-50' : ''
        }`}>
          {/* Header com pontuação */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Quiz de Amamentação</h2>
              <p className="text-sm text-slate-500">Teste seus conhecimentos</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-500 mb-1">Pontuação</div>
                <div className="text-2xl font-bold text-pink-600">{acertos}/{index}</div>
              </div>
              <button
                onClick={onVoltar}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ← Voltar
              </button>
            </div>
          </div>

          {/* Progress Bar melhorada */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-3">
              <span className="font-semibold">Pergunta {index + 1} de {perguntas.length}</span>
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

          {/* Confete animado */}
          {mostrarConfete && (
            <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎉</div>
            </div>
          )}

          {/* Pergunta */}
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
                {/* Resposta selecionada com animação */}
                <div className={`p-5 rounded-2xl border-2 transform transition-all duration-500 ${
                  respostaSelecionada === atual.correta 
                    ? 'bg-emerald-50 border-emerald-400 scale-105 shadow-lg' 
                    : 'bg-red-50 border-red-400 scale-105 shadow-lg'
                }`}>
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg ${
                      respostaSelecionada === atual.correta 
                        ? 'bg-emerald-500' 
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
                        respostaSelecionada === atual.correta ? 'text-emerald-800' : 'text-red-800'
                      }`}>
                        {respostaSelecionada === atual.correta ? '🎉 Resposta Correta!' : '❌ Resposta Incorreta'}
                      </p>
                      <p className="text-slate-700 font-medium">{atual.opcoes[respostaSelecionada!]}</p>
                      {respostaSelecionada !== atual.correta && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-emerald-200">
                          <p className="text-sm text-emerald-700 font-semibold mb-1">Resposta correta:</p>
                          <p className="text-emerald-800 font-medium">{atual.opcoes[atual.correta]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Explicação melhorada */}
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

                {/* Timer visual melhorado */}
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
    </div>
  )
}
