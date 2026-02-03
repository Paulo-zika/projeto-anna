
import { useState, useEffect, useRef } from 'react';

type Tela = 'home' | 'cancer' | 'obesidade' | 'alimentacao' | 'quiz'

interface SaudeDigestivaProps {
  onVoltar: () => void
}

const conteudos = {
  cancer: {
    titulo: "Câncer Colorretal",
    subtitulo: "Prevenção e Rastreamento",
    icone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    texto: "O câncer colorretal é um dos tipos de câncer mais comuns e pode ser prevenido com medidas simples. Consumir pelo menos 25g de fibras por dia, evitar carnes processadas, manter atividade física regular e fazer exames de rastreamento após os 50 anos são medidas essenciais de prevenção.",
    pontos: [
      "Consuma fibras: feijão, aveia, frutas e verduras",
      "Evite carnes processadas: salsicha, linguiça, presunto",
      "Faça atividade física regularmente",
      "Realize exames de rastreamento após os 50 anos",
      "Mantenha um peso saudável"
    ]
  },
  obesidade: {
    titulo: "Obesidade",
    subtitulo: "Riscos e Prevenção",
    icone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    texto: "A obesidade aumenta significativamente o risco de diversas doenças, incluindo diabetes tipo 2, hipertensão arterial, doenças cardiovasculares e alguns tipos de câncer. Uma alimentação equilibrada, rica em alimentos in natura, e hábitos saudáveis como atividade física regular são fundamentais na prevenção e controle do peso.",
    pontos: [
      "Priorize alimentos in natura e minimamente processados",
      "Evite alimentos ultraprocessados",
      "Pratique atividade física regular (150 min/semana)",
      "Mantenha uma rotina alimentar equilibrada",
      "Beba água regularmente"
    ]
  },
  alimentacao: {
    titulo: "Alimentação Saudável",
    subtitulo: "Guia Prático",
    icone: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    texto: "Uma alimentação saudável é a base da prevenção de doenças. Prefira alimentos in natura, evite ultraprocessados, consuma fibras diariamente (frutas, verduras, legumes, grãos integrais), beba água regularmente e mantenha uma rotina alimentar equilibrada. Pequenas mudanças diárias fazem grande diferença na saúde a longo prazo.",
    pontos: [
      "Consuma pelo menos 5 porções de frutas e verduras por dia",
      "Prefira grãos integrais: arroz integral, pão integral",
      "Inclua leguminosas: feijão, lentilha, grão-de-bico",
      "Beba pelo menos 2 litros de água por dia",
      "Evite refrigerantes e sucos industrializados"
    ]
  },
}

interface Pergunta {
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
}

const perguntasQuiz: Pergunta[] = [
  {
    pergunta: "Qual é a quantidade recomendada de fibras por dia para prevenir o câncer colorretal?",
    opcoes: [
      "15g por dia",
      "25g por dia",
      "35g por dia",
      "45g por dia"
    ],
    correta: 1,
    explicacao: "A recomendação é consumir pelo menos 25g de fibras por dia. As fibras ajudam no funcionamento do intestino e na prevenção do câncer colorretal."
  },
  {
    pergunta: "A partir de qual idade é recomendado fazer exames de rastreamento para câncer colorretal?",
    opcoes: [
      "A partir dos 40 anos",
      "A partir dos 50 anos",
      "A partir dos 60 anos",
      "Apenas se houver sintomas"
    ],
    correta: 1,
    explicacao: "É recomendado fazer exames de rastreamento a partir dos 50 anos, mesmo sem sintomas. O diagnóstico precoce aumenta muito as chances de cura."
  },
  {
    pergunta: "Qual tipo de alimento deve ser evitado para prevenir o câncer colorretal?",
    opcoes: [
      "Frutas e verduras",
      "Carnes processadas",
      "Grãos integrais",
      "Leguminosas"
    ],
    correta: 1,
    explicacao: "Carnes processadas como salsicha, linguiça, presunto e bacon devem ser evitadas, pois aumentam o risco de câncer colorretal."
  },
  {
    pergunta: "A obesidade aumenta o risco de quais doenças?",
    opcoes: [
      "Apenas diabetes",
      "Diabetes, hipertensão e alguns tipos de câncer",
      "Apenas problemas cardíacos",
      "Nenhuma doença"
    ],
    correta: 1,
    explicacao: "A obesidade aumenta o risco de diversas doenças, incluindo diabetes tipo 2, hipertensão arterial, doenças cardiovasculares e alguns tipos de câncer, incluindo o câncer colorretal."
  },
  {
    pergunta: "Quantas porções de frutas e verduras são recomendadas por dia?",
    opcoes: [
      "2 a 3 porções",
      "3 a 4 porções",
      "5 ou mais porções",
      "Apenas 1 porção"
    ],
    correta: 2,
    explicacao: "É recomendado consumir pelo menos 5 porções de frutas e verduras por dia. Isso fornece fibras, vitaminas e minerais essenciais para a saúde."
  },
  {
    pergunta: "Qual é a quantidade mínima de atividade física recomendada por semana?",
    opcoes: [
      "30 minutos",
      "75 minutos",
      "150 minutos",
      "300 minutos"
    ],
    correta: 2,
    explicacao: "A recomendação é de pelo menos 150 minutos de atividade física moderada por semana, o que ajuda na prevenção da obesidade e de diversas doenças."
  },
  {
    pergunta: "Qual é a principal fonte de fibras entre as opções abaixo?",
    opcoes: [
      "Refrigerantes",
      "Carnes vermelhas",
      "Feijão, aveia e frutas",
      "Açúcar refinado"
    ],
    correta: 2,
    explicacao: "Feijão, aveia, frutas, verduras e legumes são excelentes fontes de fibras. As fibras são essenciais para a saúde intestinal e prevenção de doenças."
  },
  {
    pergunta: "O que são alimentos ultraprocessados?",
    opcoes: [
      "Frutas e verduras frescas",
      "Alimentos com muitos aditivos químicos e conservantes",
      "Grãos integrais",
      "Leguminosas"
    ],
    correta: 1,
    explicacao: "Alimentos ultraprocessados são aqueles que passaram por muitos processos industriais e contêm muitos aditivos químicos, conservantes, corantes e açúcares. Devem ser evitados."
  }
]

export default function SaudeDigestiva({ onVoltar }: SaudeDigestivaProps) {
  const [tela, setTela] = useState<Tela>('home')

  const Menu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        onClick={() => setTela('cancer')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1 text-left"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
          {conteudos.cancer.icone}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Câncer Colorretal</h3>
        <p className="text-sm text-slate-600 leading-relaxed">Prevenção e rastreamento</p>
        <div className="flex items-center text-blue-600 font-semibold text-sm mt-4">
          <span>Saiba mais</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
      
      <button
        onClick={() => setTela('obesidade')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-orange-200 hover:-translate-y-1 text-left"
      >
        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
          {conteudos.obesidade.icone}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Obesidade</h3>
        <p className="text-sm text-slate-600 leading-relaxed">Riscos e prevenção</p>
        <div className="flex items-center text-orange-600 font-semibold text-sm mt-4">
          <span>Saiba mais</span>
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
      
      <button
        onClick={() => setTela('alimentacao')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-emerald-200 hover:-translate-y-1 text-left md:col-span-2"
      >
        <div className="flex items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 text-white shadow-lg flex-shrink-0">
            {conteudos.alimentacao.icone}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Alimentação Saudável</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Guia prático para o dia a dia</p>
          </div>
          <div className="flex items-center text-emerald-600 font-semibold text-sm">
            <span>Saiba mais</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>
      
      <button
        onClick={() => setTela('quiz')}
        className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-purple-200 hover:-translate-y-1 text-left md:col-span-2"
      >
        <div className="flex items-center">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mr-4 text-white shadow-lg flex-shrink-0">
            {conteudos.alimentacao.icone}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Quiz Educativo</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Teste seus conhecimentos</p>
          </div>
          <div className="flex items-center text-purple-600 font-semibold text-sm">
            <span>Iniciar quiz</span>
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
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg mr-4">
              {conteudo.icone}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">{conteudo.titulo}</h2>
              <p className="text-slate-500">{conteudo.subtitulo}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 md:p-8 mb-6 border border-emerald-100">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">{conteudo.texto}</p>
          
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 mb-3">Principais recomendações:</h3>
            {conteudo.pontos.map((ponto, i) => (
              <div key={i} className="flex items-start">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
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
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Voltar ao Menu
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect rounded-3xl shadow-strong p-6 md:p-10">
          {tela === 'home' && (
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Saúde Digestiva & Alimentação</h1>
                  <p className="text-slate-600">Prevenção começa com escolhas diárias</p>
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

          {tela === 'cancer' && <TelaConteudo chave="cancer" />}
          {tela === 'obesidade' && <TelaConteudo chave="obesidade" />}
          {tela === 'alimentacao' && <TelaConteudo chave="alimentacao" />}
          {tela === 'quiz' && <QuizDigestiva 
            onVoltar={() => setTela('home')}
          />}
        </div>
      </div>
    </div>
  )
}

function QuizDigestiva({ onVoltar }: { onVoltar: () => void }) {
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl">
          <div className="glass-effect rounded-3xl shadow-strong p-8 md:p-12 text-center animate-fadeIn">
            <div className="mb-8">
              <div className={`w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform transition-all duration-500 ${
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

              <div className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-6 shadow-soft">
                <span className="text-3xl font-bold text-emerald-600">{acertos}</span>
                <span className="text-slate-600 mx-2">de</span>
                <span className="text-3xl font-bold text-slate-800">{perguntasQuiz.length}</span>
                <span className="text-slate-600 ml-2">perguntas</span>
              </div>
              
              <div className="w-full bg-slate-200 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${porcentagem}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <p className="text-xl text-slate-600 mb-2 font-bold">{porcentagem}% de acertos</p>
              
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
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 border border-emerald-100">
              <p className="text-lg text-slate-700 leading-relaxed">
                A prevenção começa com escolhas diárias. Continue aprendendo sobre alimentação saudável e saúde digestiva!
              </p>
            </div>

            <button
              onClick={onVoltar}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
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
        animacao === 'correto' ? 'ring-4 ring-emerald-300 ring-opacity-50' : 
        animacao === 'incorreto' ? 'ring-4 ring-red-300 ring-opacity-50' : ''
      }`}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Quiz Saúde Digestiva</h2>
            <p className="text-sm text-slate-500">Teste seus conhecimentos</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">Pontuação</div>
            <div className="text-2xl font-bold text-emerald-600">{acertos}/{index}</div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-600 mb-3">
            <span className="font-semibold">Pergunta {index + 1} de {perguntasQuiz.length}</span>
            <span className="font-semibold">{Math.round(progresso)}% completo</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full transition-all duration-700 relative overflow-hidden"
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
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-2xl p-6 mb-6 border border-emerald-200">
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
                    <div className="flex items-center p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-400 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-300 text-left shadow-soft hover:shadow-medium transform hover:scale-[1.02] active:scale-[0.98]">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                        {letra}
                      </div>
                      <span className="text-slate-700 font-semibold text-lg flex-1 group-hover:text-slate-900">{op}</span>
                      <svg className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 shadow-soft">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-emerald-900 mb-2 text-lg">Explicação:</p>
                    <p className="text-slate-700 leading-relaxed text-base">{atual.explicacao}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(tempoRestante / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center min-w-[120px]">
                    <p className="text-sm text-slate-500 mb-1">Próxima pergunta em</p>
                    <p className="text-3xl font-bold text-emerald-600">{tempoRestante}</p>
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
