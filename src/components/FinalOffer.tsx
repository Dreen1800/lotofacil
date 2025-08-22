import React, { useEffect, useState } from 'react';
import { useGameContext } from '../contexts/GameContext';
import Button from './ui/Button';
import FAQ from './FAQ';
import { formatCurrency } from '../utils/lotteryUtils';
import { Shield } from 'lucide-react';

const FinalOffer: React.FC = () => {
  const { roundResults } = useGameContext();
  const [displayAmount, setDisplayAmount] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPlatformImage, setCurrentPlatformImage] = useState(0);
  const [currentResultImage, setCurrentResultImage] = useState(0);
  const [remainingSpots, setRemainingSpots] = useState(126);
  
  const totalEarnings = roundResults
    .filter((_, index) => index >= 2)
    .reduce((sum, result) => sum + result.winnings, 0);

  const testimonials = [
    {
      name: "Roberto Santos",
      city: "São Paulo, SP",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      text: "Usei a AcertaFácil e acertei 14 pontos na segunda semana! Melhor investimento que já fiz."
    },
    {
      name: "Ana Clara",
      city: "Rio de Janeiro, RJ",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      text: "Estava cansada de gastar dinheiro com a Lotofácil e nunca ganhar nada, mas agora estou muito satisfeita, chegando em R$4.000 faturados!"
    },
    {
      name: "Carlos Eduardo",
      city: "Belo Horizonte, MG",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
      text: "Comecei a usar a AcertaFácil há 3 semanas e já acertei 13 pontos duas vezes! A inteligência artificial realmente funciona."
    },
    {
      name: "Maria Fernanda",
      city: "Salvador, BA",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      text: "Nunca imaginei que seria possível ganhar na loteria com tanta frequência. A AcertaFácil mudou minha vida financeira!"
    }
  ];

  const platformImages = [
    "https://i.imgur.com/nIphmec.png",
    "https://i.imgur.com/9ykJTAm.png",
    "https://i.imgur.com/bqq6VD2.png"
  ];

  const resultImages = [
    "https://i.imgur.com/rtlZVel.jpeg",
    "https://i.imgur.com/8u2vlSN.jpeg",
    "https://i.imgur.com/vTvSlAZ.jpeg"
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = totalEarnings / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      if (step < steps) {
        current += increment;
        setDisplayAmount(current);
        step++;
      } else {
        setDisplayAmount(totalEarnings);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalEarnings]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentResultImage((prev) => (prev + 1) % resultImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSpots(prev => {
        if (prev <= 3) return 126; // Reset when it gets too low
        const decrease = Math.random() > 0.5 ? 3 : 5;
        return prev - decrease;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const nextPlatformImage = () => {
    setCurrentPlatformImage((prev) => (prev + 1) % platformImages.length);
  };

  const prevPlatformImage = () => {
    setCurrentPlatformImage((prev) => (prev - 1 + platformImages.length) % platformImages.length);
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl mx-auto text-center animate-scaleIn mt-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Anton, sans-serif', color: '#8f339a' }}>Você foi incrível!</h1>
        <p className="text-base md:text-lg text-gray-600">
          Você viu como a ajuda da inteligência artificial seus resultados foram bem superiores?
        </p>
      </div>

      <div className="p-6 rounded-xl mb-4" style={{ backgroundColor: '#f8f4f6' }}>
        <p className="text-lg md:text-xl mb-2" style={{ color: '#8f339a' }}>Com nossa IA, você ganhou:</p>
        <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#8f339a' }}>
          {formatCurrency(displayAmount)}
        </p>
        <p style={{ color: '#8f339a' }}>em apenas 2 rodadas!</p>
      </div>

      <p className="text-base md:text-lg font-semibold mb-8" style={{ color: '#8f339a' }}>
        Imagine jogar todos os dias com a ajuda da nossa IA?
      </p>

      <div className="mb-8">
        <p className="text-base md:text-lg text-gray-700 mb-6">
          A AcertaFácil é uma plataforma de análise inteligente que utiliza IA para cruzar dados 
          de mais de 1.500 concursos anteriores e gerar jogos com alto potencial de acerto.
        </p>

        <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#8f339a' }}>Como é nossa plataforma:</h3>
        
        <div className="mb-8 bg-gray-50 rounded-xl p-4">
          <div className="relative rounded-lg">
            <img 
              src={platformImages[currentPlatformImage]} 
              alt={`Plataforma AcertaFácil - Tela ${currentPlatformImage + 1}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
            <button
              onClick={prevPlatformImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4" style={{ color: '#8f339a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextPlatformImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
            >
              <svg className="w-4 h-4" style={{ color: '#8f339a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex justify-center mt-3 space-x-2">
              {platformImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPlatformImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentPlatformImage ? 'bg-gray-300' : 'bg-gray-300'
                  }`}
                  style={index === currentPlatformImage ? { backgroundColor: '#8f339a' } : {}}
                />
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#8f339a' }}>Usuários da AcertaFácil dizem:</h3>

        <div className="mb-8 space-y-4">
          <iframe 
            src="https://fast.wistia.net/embed/iframe/v80tti8rrx" 
            allowTransparency={true} 
            frameBorder="0" 
            scrolling="no" 
            className="wistia_embed w-full rounded-lg shadow-md" 
            name="wistia_embed" 
            allowFullScreen 
            style={{width:'100%', height:'auto', aspectRatio:'16/9'}}
          />
          <iframe 
            src="https://fast.wistia.net/embed/iframe/fsa0n5tctj" 
            allowTransparency={true} 
            frameBorder="0" 
            scrolling="no" 
            className="wistia_embed w-full rounded-lg shadow-md" 
            name="wistia_embed" 
            allowFullScreen 
            style={{width:'100%', height:'auto', aspectRatio:'16/9'}}
          />
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="flex flex-col items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mb-3 object-cover"
                    />
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600 mb-2">{testimonial.city}</p>
                    <p className="text-gray-700 text-center">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="border-2 rounded-xl p-6 text-center" style={{ backgroundColor: '#F2F2F2', borderColor: '#C7C7C7' }}>
          <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
            Oferta exclusiva
          </div>
          <h3 className="text-2xl font-bold text-black mb-2">Inteligência artificial Acerta Fácil</h3>
          
          <div className="bg-white rounded-lg p-6 mb-4 mx-auto max-w-sm">
            <p className="text-gray-700 text-lg mb-2">Garanta o seu acesso por apenas</p>
            <div className="text-4xl font-bold mb-2" style={{ color: '#8f339a' }}>
              8x de R$5,38
            </div>
            <p className="text-gray-600">ou R$37,00 no pix</p>
          </div>
          
          <button 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200 w-full max-w-sm"
          >
            Garantir meu acesso a ACERTA FÁCIL
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="border-2 rounded-xl p-6 w-full max-w-md" style={{ backgroundColor: '#f8f4f6', borderColor: '#d8bdd1' }}>
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Shield className="w-16 h-16" style={{ color: '#8f339a' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-lg" style={{ color: '#8f339a' }}>30</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl mb-2" style={{ color: '#8f339a' }}>🛡️ Garantia de 30 Dias</p>
            <p className="text-sm leading-relaxed" style={{ color: '#8f339a' }}>
              Confiamos tanto na nossa IA que se você não acertar 14 pontos dentro de 30 dias, 
              <span className="font-bold"> reembolsamos 100% do valor investido</span>.
            </p>
            <p className="text-xs mt-2 font-medium" style={{ color: '#8f339a' }}>
              ✅ Risco Zero • ✅ Satisfação Garantida
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 text-center">
        <p className="text-gray-600 mb-4 text-xs md:text-sm text-left">
          *Para participar da AcertaFácil é necessário a contribuição de uma pequena taxa de inscrição para colaborar com os custos do nosso servidor.
        </p>
        <p className="mb-6 text-base md:text-lg font-bold text-center p-4 rounded-lg border-2" style={{ color: '#8f339a', backgroundColor: '#f8f4f6', borderColor: '#d8bdd1' }}>
          👇 Finalize sua inscrição abaixo!
        </p>
      </div>

      <a 
        href="https://pay.kirvano.com/0d692dcf-aa98-4afb-b3c9-b8631a781d68"
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-8"
      >
        <Button 
          className="w-full text-sm md:text-lg animate-gentlePulse whitespace-nowrap py-4"
          variant="success"
        >
          QUERO ACESSAR A ACERTAFÁCIL!
        </Button>
      </a>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm mb-8">
        <p className="text-yellow-800 mb-2">
          Garanta sua vaga na AcertaFácil! Ao zerar o contador as novas vagas serão automaticamente encerradas.
        </p>
        <p className="text-yellow-900 font-bold text-lg">
          🔥 Restam apenas <span className="text-red-600">{remainingSpots}</span> vagas!
        </p>
      </div>

      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#8f339a' }}>Quem usa tem Resultado 👇</h3>

      <div className="mb-8 bg-gray-50 rounded-xl p-4">
        <div className="relative overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentResultImage * 100}%)` }}
          >
            {resultImages.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img 
                  src={image} 
                  alt={`Resultado ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <a 
        href="https://pay.kirvano.com/0d692dcf-aa98-4afb-b3c9-b8631a781d68"
        target="_blank"
        rel="noopener noreferrer"
        className="block mb-8"
      >
        <Button 
          className="w-full text-sm md:text-lg animate-gentlePulse whitespace-nowrap py-4"
          variant="success"
        >
          QUERO ACESSAR A ACERTAFÁCIL!
        </Button>
      </a>

      <FAQ />
    </div>
  );
};

export default FinalOffer;