import { useState } from 'react'
import QuizAmamentacao from './components/QuizAmamentacao'
import SaudeDigestiva from './components/SaudeDigestiva'
import SaudeFeminina from './components/SaudeFeminina'

type Tela = 'home' | 'amamentacao' | 'digestiva' | 'feminina'

function App() {
  const [tela, setTela] = useState<Tela>('home')

  if (tela === 'amamentacao') {
    return <QuizAmamentacao onVoltar={() => setTela('home')} />
  }

  if (tela === 'digestiva') {
    return <SaudeDigestiva onVoltar={() => setTela('home')} />
  }

  if (tela === 'feminina') {
    return <SaudeFeminina onVoltar={() => setTela('home')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="glass-effect rounded-3xl shadow-strong p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                ANNA
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"></div>
            </div>
            <p className="text-xl md:text-2xl text-slate-600 font-medium mt-6">
              Plataforma Educativa em Saúde
            </p>
            <p className="text-sm md:text-base text-slate-500 mt-2">
              Conhecimento científico acessível para todos
            </p>
          </div>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Quiz Amamentação */}
            <button
              onClick={() => setTela('amamentacao')}
              className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-pink-200 hover:-translate-y-1 text-left"
            >
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Amamentação</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Teste seus conhecimentos sobre amamentação com nosso quiz interativo e educativo
                </p>
              </div>
              <div className="flex items-center text-pink-600 font-semibold text-sm mt-6">
                <span>Iniciar quiz</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Saúde Digestiva */}
            <button
              onClick={() => setTela('digestiva')}
              className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-emerald-200 hover:-translate-y-1 text-left"
            >
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Saúde Digestiva</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Informações sobre prevenção do câncer colorretal, obesidade e alimentação saudável
                </p>
              </div>
              <div className="flex items-center text-emerald-600 font-semibold text-sm mt-6">
                <span>Explorar conteúdo</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Saúde Feminina */}
            <button
              onClick={() => setTela('feminina')}
              className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-purple-200 hover:-translate-y-1 text-left"
            >
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Saúde Feminina</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Guia completo sobre cuidados, ciclo menstrual, alimentação e bem-estar feminino
                </p>
              </div>
              <div className="flex items-center text-purple-600 font-semibold text-sm mt-6">
                <span>Conhecer mais</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              Desenvolvido com foco em educação em saúde pública
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

