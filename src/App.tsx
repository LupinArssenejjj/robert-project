/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Shield, Zap, Skull, Activity, AlertOctagon, Anchor, Eye } from 'lucide-react';

// --- Types & Data ---

type Mode = 'bob' | 'void';

const CHARACTER_DATA = {
  bob: {
    name: "Robert",
    race: "Humano e Anomalia Conceitual",
    affinity: "Magia Arcana e Nulidade",
    class: "Arauto Involuntário",
    age: "34 anos",
    height: "1.81m"
  },
  void: {
    name: "O VAZIO",
    race: "ANOMALIA CONCEITUAL",
    affinity: "NULIDADE ABSOLUTA",
    class: "FIM MATERIAL",
    age: "ETERNO",
    height: "IMENSURÁVEL"
  }
};

const TEXT_CONTENT = {
  personalityBob: {
    title: "Personalidade de Robert",
    text: "Bob é um homem exausto, ansioso e profundamente assombrado. Ele sabe que possui um poder absurdo, mas tem o emocional de alguém prestes a quebrar. Ele tenta ser uma boa pessoa, sorri de forma nervosa e prefere evitar conflitos a todo custo. Ele odeia lutar pelo pânico absoluto de perder o controle. Quando é forçado a agir, ele é desajeitado, pedindo desculpas pelos danos colaterais e hesitando no momento decisivo. Ele vive em paranoia constante, tentando se manter calmo para não liberar a criatura que vive dentro dele."
  },
  personalityVoid: {
    title: "Personalidade do Vazio",
    text: "O Vazio é o terror puro e instintivo. Ele não reflete sobre a vida, não faz discursos e não tem ideais; ele é a fome absoluta e o fim material de todas as coisas. Quando assume o controle, age com uma brutalidade fria, predatória e silenciosa. O Vazio não quer dominar o mundo ou punir as pessoas, ele simplesmente quer apagar a existência. Ele avança como um desastre natural inescapável, sem raiva, apenas com a intenção letal de devorar a realidade."
  },
  physiology: {
    title: "Fisiologia de Alta Densidade",
    text: "Bob é uma âncora viva na realidade. Seu corpo rejeita dano em escalas catastróficas. Ele pode sobreviver no vácuo, mergulhar em lava ou receber um feitiço capaz de destruir montanhas sem sofrer um arranhão. Lâminas divinas entortam em sua pele e o fogo arcano é dispersado como vento. Sua velocidade física quebra a barreira do som, permitindo que ele voe e cruze continentes em minutos, enquanto sua força é suficiente para erguer castelos inteiros com as próprias mãos. No entanto, sua resistência cósmica é uma via de mão dupla com seu estado mental: se ele entrar em pânico, sentir culpa extrema ou duvidar de si mesmo, sua invulnerabilidade desmorona, e ele pode ser ferido por uma faca comum."
  },
  rewrite: {
    title: "Reescrita Estrutural",
    text: "Seu controle molecular é, na teoria, absoluto. Bob pode manipular a matéria, a biologia e a energia com um toque ou pela força do pensamento. Ele é capaz de transformar chumbo em ouro, curar membros decepados instantaneamente, solidificar o ar para criar barreiras indestrutíveis ou desintegrar montanhas de pedra transformando-as em água. Porém, por odiar e temer o próprio poder, ele não tem maestria. Ele é instável, e tentar usar essa habilidade em combate o faz perder o foco. O uso contínuo de tanta energia drena rapidamente sua sanidade e o empurra para as bordas da escuridão."
  },
  trigger: {
    title: "O Gatilho da Nulidade",
    text: "Bob é virtualmente imortal. Se ele sofrer dano letal quando estiver mentalmente vulnerável ou passar por um pico de estresse emocional catastrófico, seu corpo entra em colapso protetivo. Duas coisas podem acontecer: ou ele acorda horas depois em um local aleatório, curado e levemente confuso para continuar seu caminho; ou a mente de Bob se apaga completamente e o Vazio assume o controle de seu corpo no mesmo instante, iniciando o pior cenário possível."
  },
  voidMastery: {
    title: "Maestria Apática e Fisiologia Negativa",
    text: "O Vazio possui todas as habilidades físicas e de manipulação de matéria de Bob, mas elevadas à perfeição absoluta e sem as travas psicológicas do medo. Ele poderia remodelar o mundo inteiro se desejasse, mas sua natureza rejeita a criação. Para o Vazio, transformar a matéria é um esforço inútil. Ele prefere apenas destruir. A aparência de Bob é engolida: seus olhos se tornam buracos negros e seu corpo vira uma silhueta de escuridão densa. Ataques físicos atravessam seu corpo ou são devorados antes do impacto."
  },
  markOfEnd: {
    title: "A Marca do Fim",
    text: "O Vazio não precisa lutar fisicamente. Ao simplesmente erguer a mão e apontar para um ser vivo ou estrutura, ele impõe o apagamento absoluto. O alvo não sangra, não queima e não sofre impacto; os laços conceituais que prendem o alvo à realidade são rasgados em um milissegundo. A vítima simplesmente deixa de existir em um silêncio assustador. A única prova de que o alvo um dia esteve ali é uma sombra negra perpétua, queimada no chão ou na parede exatamente na mesma pose em que a vítima estava antes de ser apagada, semelhante às marcas sombrias deixadas por bombas nucleares."
  },
  voidExpansion: {
    title: "A Expansão do Vazio",
    text: "Ele rasga a barreira da realidade para trazer sua própria dimensão para a terra. Uma sombra líquida, densa e fria jorra de seu corpo e se espalha pelo chão, paredes e ar em grande velocidade, engolindo o ambiente. Qualquer coisa tocada por essa poça de escuridão é imediatamente consumida e apagada. O Vazio caminha lentamente pelo campo de batalha, enquanto essa sombra devora passivamente magias, armas e exércitos ao seu redor."
  },
  tendrils: {
    title: "Gavinhas de Nulidade",
    text: "A partir da escuridão que se espalha sob seus pés, o Vazio ergue tentáculos rápidos de pura antimatéria para agarrar vítimas distantes. Quando essas gavinhas se enrolam em um braço ou perna, não há dor inicial ou som de ruptura; o membro tocado é instantaneamente desintegrado de forma limpa, puxando o resto do inimigo para o esquecimento."
  },
  internalBattle: {
    title: "A Batalha Interna",
    text: "A fraqueza de ambos é a psique fraturada. Para Bob, o medo é seu maior inimigo. Se ele for torturado psicologicamente ou dominado pelo pânico em combate, seus poderes falham, tornando-o um alvo fácil até que a morte ou o estresse engatilhem o monstro.\nPara derrotar o Vazio, força bruta e ataques mágicos são inúteis, pois tudo vira sombra e pó. A única salvação é alcançar a consciência reprimida de Bob afogada na escuridão. O oponente deve causar dor emocional profunda ou apelar para as memórias de humanidade do receptáculo, forçando Bob a acordar de seu coma mental e lutar pelo controle do próprio corpo de dentro para fora, selando a entidade de volta em sua mente."
  },
  watch: {
    title: "O Relógio de Bolso Quebrado",
    text: "Bob carrega um relógio antigo que não funciona. Ele usa o objeto como âncora psicológica, apertando-o nas mãos para tentar se manter focado e no controle da própria mente. O Vazio detesta o objeto, mas não consegue apagá-lo por ser o último elo inquebrável da sanidade de Bob."
  },
  history: {
    title: "História",
    text: "Ninguém sabe a verdadeira origem de Robert. Ele apenas acordou um dia com o poder de destruir continentes e uma escuridão impiedosa rastejando em sua nuca. Tentando viver uma vida pacata, ele logo percebeu que seu corpo abrigava uma anomalia cósmica devoradora que usa sua invulnerabilidade como casulo. Hoje, Bob vaga pelo mundo tentando não se envolver em conflitos, medicando-se e fugindo de lutas. Ele sabe que é um homem capaz de salvar qualquer um, mas tem um medo paralisante de tentar, pois sabe que cada vez que eleva seu poder, a sombra fica mais forte, esperando o momento exato em que Bob irá quebrar para finalmente apagar o mundo."
  }
};

// --- Components ---

const HeroCard = ({ title, text, mode, icon: Icon }: { title: string, text: string, mode: Mode, icon?: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      className={`mb-4 overflow-hidden rounded-lg transition-all duration-500
        ${mode === 'bob' 
          ? 'bg-white border border-amber-200 shadow-[0_4px_20px_rgba(251,191,36,0.15)]' 
          : 'bg-zinc-950 border border-zinc-800 shadow-[0_0_20px_rgba(0,0,0,0.8)]'}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-5 text-left flex items-center justify-between group`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-full ${mode === 'bob' ? 'bg-amber-50 text-amber-600' : 'bg-zinc-900 text-red-900'}`}>
            {Icon && <Icon size={20} className={mode === 'void' ? 'animate-pulse' : ''} />}
          </div>
          <span className={`text-lg font-bold uppercase tracking-wider 
            ${mode === 'bob' ? 'font-hero text-slate-800' : 'font-condensed text-zinc-400 group-hover:text-red-500 transition-colors'}`}>
            {title}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={mode === 'bob' ? 'text-amber-400' : 'text-zinc-700'}
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className={`p-6 pt-0 text-sm leading-relaxed whitespace-pre-line 
              ${mode === 'bob' ? 'text-slate-600 font-body' : 'text-zinc-500 font-body'}`}>
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const VoidGlitchText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-600 opacity-0 group-hover:opacity-70 animate-pulse translate-x-[2px]">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-900 opacity-0 group-hover:opacity-70 animate-pulse -translate-x-[2px]">{text}</span>
    </span>
  );
};

export default function App() {
  const [mode, setMode] = useState<Mode>('bob');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleMode = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMode(prev => prev === 'bob' ? 'void' : 'bob');
      setIsTransitioning(false);
    }, 1000);
  };

  const currentData = CHARACTER_DATA[mode];

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out relative overflow-x-hidden
      ${mode === 'bob' ? 'bg-sentry text-slate-900' : 'bg-void-texture text-zinc-300'}`}
    >
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 ${mode === 'bob' ? 'bg-black' : 'bg-white'}`}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Ambient Effects */}
      {mode === 'bob' && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />
      )}
      {mode === 'void' && (
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] pointer-events-none z-0" />
      )}

      <div className="relative z-10 max-w-3xl mx-auto p-6 md:p-12 flex flex-col gap-12">
        
        {/* HEADER */}
        <header className="flex flex-col gap-8 text-center md:text-left md:flex-row md:justify-between md:items-end">
          <div className="flex flex-col gap-2">
            <motion.div 
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* NOME VISÍVEL AQUI - Removido o bg-clip-text do Bob para garantir visibilidade */}
              <h1 className={`text-6xl md:text-8xl font-black tracking-tighter leading-none
                ${mode === 'bob' 
                  ? 'font-hero text-amber-600 drop-shadow-md' 
                  : 'font-condensed text-white text-shadow-void animate-glitch-container'}`}
              >
                {currentData.name}
              </h1>
              
              {mode === 'bob' && (
                <motion.div 
                  className="absolute -inset-4 bg-amber-400/20 blur-xl -z-10 rounded-full opacity-50"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              )}
            </motion.div>
            
            <div className={`flex flex-wrap gap-3 justify-center md:justify-start text-xs font-bold uppercase tracking-[0.2em]
              ${mode === 'bob' ? 'text-amber-600/70' : 'text-red-900'}`}>
              <span>{currentData.class}</span>
              <span>•</span>
              <span>{currentData.race}</span>
            </div>

            <div className={`flex flex-wrap gap-6 justify-center md:justify-start text-sm font-bold uppercase tracking-widest mt-1
              ${mode === 'bob' ? 'text-slate-500' : 'text-zinc-600'}`}>
              <div className="flex items-center gap-2">
                <span className={mode === 'bob' ? 'text-amber-500' : 'text-red-900'}>Idade:</span>
                <span>{currentData.age}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={mode === 'bob' ? 'text-amber-500' : 'text-red-900'}>Altura:</span>
                <span>{currentData.height}</span>
              </div>
            </div>
          </div>
          
          {/* TOGGLE */}
          <button 
            onClick={toggleMode}
            className={`group relative px-6 py-3 overflow-hidden rounded-full transition-all duration-500
              ${mode === 'bob' 
                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg hover:shadow-amber-400/50 hover:scale-105' 
                : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-900'}`}
          >
            <div className="relative z-10 flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
              {mode === 'bob' ? <Sun size={16} /> : <Moon size={16} />}
              {mode === 'bob' ? 'Perder o Controle' : 'Recuperar a Mente'}
            </div>
            {mode === 'bob' && (
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}
          </button>
        </header>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
          
          {/* LEFT COLUMN: Stats & Lore */}
          <div className="flex flex-col gap-6">
            
            {/* PERSONALITY CARD */}
            <motion.div 
              layout
              className={`p-6 rounded-2xl relative overflow-hidden
                ${mode === 'bob' 
                  ? 'bg-white shadow-xl shadow-amber-900/5 border border-amber-100' 
                  : 'bg-black border border-zinc-800'}`}
            >
              <div className={`mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest
                ${mode === 'bob' ? 'text-amber-500' : 'text-red-900'}`}>
                <Activity size={16} />
                {mode === 'bob' ? 'Psique: Instável' : 'Psique: Colapso'}
              </div>
              
              <h2 className={`text-2xl font-bold mb-4 leading-tight
                ${mode === 'bob' ? 'font-hero text-slate-800' : 'font-condensed text-zinc-200'}`}>
                {mode === 'bob' ? TEXT_CONTENT.personalityBob.title : TEXT_CONTENT.personalityVoid.title}
              </h2>
              
              <p className={`text-sm leading-relaxed text-justify
                ${mode === 'bob' ? 'text-slate-600 font-body' : 'text-zinc-500 font-body'}`}>
                {mode === 'bob' ? TEXT_CONTENT.personalityBob.text : TEXT_CONTENT.personalityVoid.text}
              </p>

              {mode === 'bob' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-bl-full" />
              )}
            </motion.div>

            {/* RELIC CARD */}
            <div className={`p-6 rounded-2xl border transition-colors duration-500
              ${mode === 'bob' 
                ? 'bg-amber-50 border-amber-200' 
                : 'bg-zinc-950 border-zinc-900'}`}>
              <div className="flex items-center gap-3 mb-3">
                <Anchor size={18} className={mode === 'bob' ? 'text-amber-600' : 'text-zinc-700'} />
                <h3 className={`text-xs font-bold uppercase tracking-widest ${mode === 'bob' ? 'text-amber-800' : 'text-zinc-600'}`}>
                  {TEXT_CONTENT.watch.title}
                </h3>
              </div>
              <p className={`text-xs leading-relaxed ${mode === 'bob' ? 'text-amber-900/70' : 'text-zinc-600'}`}>
                {TEXT_CONTENT.watch.text}
              </p>
            </div>

            {/* WEAKNESS */}
             <div className={`p-6 rounded-2xl border transition-colors duration-500
              ${mode === 'bob' 
                ? 'bg-slate-50 border-slate-200' 
                : 'bg-zinc-950 border-red-900/20'}`}>
              <div className="flex items-center gap-3 mb-3">
                <AlertOctagon size={18} className={mode === 'bob' ? 'text-slate-400' : 'text-red-900'} />
                <h3 className={`text-xs font-bold uppercase tracking-widest ${mode === 'bob' ? 'text-slate-500' : 'text-red-900'}`}>
                  {TEXT_CONTENT.internalBattle.title}
                </h3>
              </div>
              <p className={`text-xs leading-relaxed whitespace-pre-line ${mode === 'bob' ? 'text-slate-500' : 'text-zinc-600'}`}>
                {TEXT_CONTENT.internalBattle.text}
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Powers */}
          <div className="flex flex-col">
            <h3 className={`text-xs font-bold uppercase tracking-[0.3em] mb-6 pl-2 border-l-2
              ${mode === 'bob' ? 'text-amber-400 border-amber-400' : 'text-zinc-700 border-zinc-800'}`}>
              {mode === 'bob' ? 'Manifestações de Poder' : 'Protocolos de Extinção'}
            </h3>

            <HeroCard 
              title={TEXT_CONTENT.physiology.title} 
              text={TEXT_CONTENT.physiology.text} 
              mode={mode} 
              icon={Shield} 
            />
            <HeroCard 
              title={TEXT_CONTENT.rewrite.title} 
              text={TEXT_CONTENT.rewrite.text} 
              mode={mode} 
              icon={Zap} 
            />
            <HeroCard 
              title={TEXT_CONTENT.trigger.title} 
              text={TEXT_CONTENT.trigger.text} 
              mode={mode} 
              icon={Skull} 
            />

            {/* VOID ONLY POWERS */}
            <div className={`transition-all duration-1000 overflow-hidden ${mode === 'void' ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent mb-8" />
              
              {[TEXT_CONTENT.voidMastery, TEXT_CONTENT.markOfEnd, TEXT_CONTENT.voidExpansion, TEXT_CONTENT.tendrils].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={mode === 'void' ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-6 pl-6 border-l border-zinc-800 hover:border-red-600 transition-colors group"
                >
                  <h4 className="text-lg font-condensed font-bold text-zinc-400 group-hover:text-white uppercase mb-2">
                    <VoidGlitchText text={item.title} />
                  </h4>
                  <p className="text-sm text-zinc-600 font-body leading-relaxed group-hover:text-zinc-400">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* HISTORY FOOTER */}
        <footer className={`mt-12 pt-12 border-t ${mode === 'bob' ? 'border-amber-100' : 'border-zinc-900'}`}>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className={`mb-6 p-3 rounded-full ${mode === 'bob' ? 'bg-amber-100 text-amber-600' : 'bg-zinc-900 text-zinc-700'}`}>
              <Eye size={24} />
            </div>
            <h3 className={`text-sm font-bold uppercase tracking-[0.3em] mb-6 ${mode === 'bob' ? 'text-slate-400' : 'text-zinc-600'}`}>
              {TEXT_CONTENT.history.title}
            </h3>
            <p className={`text-sm leading-loose ${mode === 'bob' ? 'text-slate-600 font-body' : 'text-zinc-500 font-body'}`}>
              {TEXT_CONTENT.history.text}
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}