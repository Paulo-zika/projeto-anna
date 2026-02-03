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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-7xl">
            <div className="glass-effect rounded-3xl shadow-strong p-8 md:p-12 animate-fadeIn">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-block mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight">
                    ANNA
                  </h1>
                  <div className="h-1.5 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
                </div>
                <p className="text-2xl md:text-3xl text-slate-700 font-semibold mt-8 mb-3">
                  Plataforma Educativa em Saúde
                </p>
                <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
                  Conhecimento científico acessível para todos. Aprenda sobre saúde de forma interativa e divertida.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                  <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-1">3</div>
                  <div className="text-xs md:text-sm text-slate-600 font-medium">Módulos</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">24</div>
                  <div className="text-xs md:text-sm text-slate-600 font-medium">Perguntas</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">100%</div>
                  <div className="text-xs md:text-sm text-slate-600 font-medium">Gratuito</div>
                </div>
              </div>
              
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
                {/* Quiz Amamentação */}
                <button
                  onClick={() => setTela('amamentacao')}
                  className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-pink-300 hover:-translate-y-2 text-left overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Quiz Amamentação</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Teste seus conhecimentos sobre amamentação com 8 perguntas interativas e educativas
                    </p>
                    <div className="flex items-center text-pink-600 font-semibold text-sm">
                      <span>Iniciar quiz</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Saúde Digestiva */}
                <button
                  onClick={() => setTela('digestiva')}
                  className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-emerald-300 hover:-translate-y-2 text-left overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Saúde Digestiva</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Informações sobre prevenção do câncer colorretal, obesidade e alimentação saudável
                    </p>
                    <div className="flex items-center text-emerald-600 font-semibold text-sm">
                      <span>Explorar conteúdo</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Saúde Feminina */}
                <button
                  onClick={() => setTela('feminina')}
                  className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-medium transition-all duration-300 border border-slate-100 hover:border-purple-300 hover:-translate-y-2 text-left overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 z-10">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Saúde Feminina</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Guia completo sobre cuidados, ciclo menstrual, alimentação e bem-estar feminino
                    </p>
                    <div className="flex items-center text-purple-600 font-semibold text-sm">
                      <span>Conhecer mais</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">Interativo</div>
                    <div className="text-xs text-slate-500">Quizzes dinâmicos</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">Educativo</div>
                    <div className="text-xs text-slate-500">Baseado em evidências</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-sm">Responsivo</div>
                    <div className="text-xs text-slate-500">Funciona em qualquer dispositivo</div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-8 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-500 mb-2">
                  Desenvolvido com foco em educação em saúde pública
                </p>
                <p className="text-xs text-slate-400">
                  Conhecimento científico acessível para todos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
