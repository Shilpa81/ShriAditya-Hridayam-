/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const stanzas = [
  "ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् ।\nरावणं चाग्रतो दृष्टवा युद्धाय समुपस्थितम् ॥",
  "दैवतैश्च समागम्य द्रष्टुमभ्यागतो रणम् ।\nउपगम्याब्रवीद् राममगरत्यो भगवांस्तदा ॥",
  "राम राम महाबाहो श्रृणु गुह्यं सनातनम् ।\nयेन सर्वानरीन् वत्स समरे विजयिष्यसे ॥",
  "आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् ।\nजयावहं जपं नित्यमक्षयं परमं शिवम् ॥",
  "सर्वमंगलमांगल्यं सर्वपापप्रणाशनम् ।\nचिन्ताशोकप्रशमनमायुर्वधैनमुत्तमम् ॥",
  "रश्मिमन्तं समुद्यन्तं देवासुरनमस्कृतम् ।\nपूजयस्व विवस्वन्तं भास्करं भुवनेश्वरम् ॥",
  "सर्वदेवतामको ह्येष तेजस्वी रश्मिभावनः ।\nएष देवासुरगणाँल्लोकान् पाति गभस्तिभिः ॥",
  "एष ब्रह्मा च विष्णुश्च शिवः स्कन्दः प्रजापतिः ।\nमहेन्द्रो धनदः कालो यमः सोमो ह्यपां पतिः ॥",
  "पितरो वसवः साध्या अश्विनौ मरुतो मनुः ।\nवायुर्वन्हिः प्रजाः प्राण ऋतुकर्ता प्रभाकरः ॥",
  "आदित्यः सविता सूर्यः खगः पूषा गर्भास्तिमान् ।\nसुवर्णसदृशो भानुहिरण्यरेता दिवाकरः ॥",
  "हरिदश्वः सहस्रार्चिः सप्तसप्तिर्मरीचिमान् ।\nतिमिरोन्मथनः शम्भूस्त्ष्टा मार्तण्डकोंऽशुमान् ॥",
  "हिरण्यगर्भः शिशिरस्तपनोऽहरकरो रविः ।\nअग्निगर्भोऽदितेः पुत्रः शंखः शिशिरनाशनः ॥",
  "व्योमनाथस्तमोभेदी ऋम्यजुःसामपारगः ।\nघनवृष्टिरपां मित्रो विन्ध्यवीथीप्लवंगमः ॥",
  "आतपी मण्डली मृत्युः पिंगलः सर्वतापनः ।\nकविर्विश्वो महातेजा रक्तः सर्वभवोदभवः ॥",
  "नक्षत्रग्रहताराणामधिपो विश्वभावनः ।\nतेजसामपि तेजस्वी द्वादशात्मन् नमोऽस्तु ते ॥",
  "नमः पूर्वाय गिरये पश्चिमायाद्रये नमः ।\nज्योतिर्गणानां पतये दिनाधिपतये नमः ॥",
  "जयाय जयभद्राय हर्यश्वाय नमो नमः ।\nनमो नमः सहस्रांशो आदित्याय नमो नमः ॥",
  "नम उग्राय वीराय सारंगाय नमो नमः ।\nनमः पद्मप्रबोधाय प्रचण्डाय नमोऽस्तु ते ॥",
  "ब्रह्मेशानाच्युतेशाय सूरायदित्यवर्चसे ।\nभास्वते सर्वभक्षाय रौद्राय वपुषे नमः ॥",
  "तमोघ्नाय हिमघ्नाय शत्रुघ्नायामितात्मने ।\nकृतघ्नघ्नाय देवाय ज्योतिषां पतये नमः ॥",
  "तप्तचामीकराभाय हस्ये विश्वकर्मणे ।\nनमस्तमोऽभिनिघ्नाय रुचये लोकसाक्षिणे ॥",
  "नाशयत्येष वै भूतं तमेव सृजति प्रभुः ।\nपायत्येष तपत्येष वर्षत्येष गभस्तिभिः ॥",
  "एष सुप्तेषु जागर्ति भूतेषु परिनिष्ठितः ।\nएष चैवाग्निहोत्रं च फलं चैवाग्निहोत्रिणाम् ॥",
  "देवाश्च क्रतवश्चैव क्रतूनां फलमेव च ।\nयानि कृत्यानि लोकेषु सर्वेषु परमप्रभुः ॥",
  "एनमापत्सु कृच्छ्रेषु कान्तारेषु भयेषु च ।\nकीर्तयन् पुरुषः कश्चिन्नावसीदति राघव ॥",
  "पूजयस्वैनमेकाग्रो देवदेवं जगत्पतिम् ।\nएतत् त्रिगुणितं जप्तवा युद्धेषु विजयिष्ति ॥",
  "अस्मिन् क्षणे महाबाहो रावणं त्वं जहिष्यसि ।\nएवमुक्त्वा ततोऽगस्त्यो जगाम स यथागतम् ॥",
  "एतच्छ्रुत्वा महातेजा, नष्टशोकोऽभवत् तदा ।\nधारयामास सुप्रीतो राघवः प्रयतात्मवान् ॥",
  "आदित्यं प्रेक्ष्य जप्त्वेदं परं हर्षमवाप्तवान् ।\nत्रिराचम्य शुचिर्भूत्वा धनुरादाय वीर्यवान् ॥",
  "रावणं प्रेक्ष्य हृष्टात्मा जयार्थे समुपागमत् ।\nसर्वयत्नेन महता वृतस्तस्य वधेऽभवत् ॥",
  "अथ रविरवदन्निरीक्ष्य रामं मुदितनाः परमं प्रहृष्यमाणः ।\nनिशिचरपतिसंक्षयं विदित्वा सुरगणमध्यगतो वचस्त्वरेति ॥"
];

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStanza, setCurrentStanza] = useState<number | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const stanzaRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Load voices for text to speech
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
      setVoicesLoaded(true);
    };
    
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Set up the utterance
  const playStanza = (index: number) => {
    if (index >= stanzas.length) {
      stopPlaying();
      return;
    }

    setCurrentStanza(index);
    
    // Scroll to the active stanza smoothly
    if (stanzaRefs.current[index]) {
      stanzaRefs.current[index]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    const text = stanzas[index];
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to match a soothing female Indian voice
    const voices = window.speechSynthesis.getVoices();
    const hindiVoices = voices.filter(v => v.lang.includes('hi'));
    
    // Simple heuristic to pick a voice that is often female in popular OSs
    const preferredVoice = hindiVoices.find(v => v.name.includes('Google') || v.name.toLowerCase().includes('female')) || hindiVoices[0];
    
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.lang = 'hi-IN';
    utterance.rate = 0.8; // Slower, calmer pace
    utterance.pitch = 1.1; // Slightly higher pitch often translates to a softer/female tone on default synths 

    utterance.onend = () => {
      // Small pause between stanzas for a temple-like calm pace
      setTimeout(() => {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) return;
        playStanza(index + 1);
      }, 800);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const startPlaying = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      window.speechSynthesis.cancel(); // Clear any ongoing speech
      playStanza(0);
    }
  };

  const pausePlaying = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const stopPlaying = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStanza(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#593D2B] font-serif selection:bg-orange-200">
      {/* Top ambient header */}
      <div className="sticky top-0 z-10 bg-[#FFFBF0]/90 backdrop-blur-md border-b border-orange-200/50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-[#D97736] flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-6 h-6 text-orange-400" />
              आदित्यहृदय स्तोत्र
            </h1>
            <p className="text-sm text-orange-800/70 mt-1">Aditya Hridaya Stotram • Calming Chants</p>
          </div>
          
          <div className="flex items-center gap-3">
            {!isPlaying ? (
              <button 
                onClick={startPlaying}
                className="flex items-center gap-2 bg-[#D97736] hover:bg-[#C26227] text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 font-medium"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>{isPaused ? 'Resume' : 'Chant'}</span>
              </button>
            ) : (
              <button 
                onClick={pausePlaying}
                className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-[#D97736] px-5 py-2.5 rounded-full transition-all font-medium border border-orange-200"
              >
                <Pause className="w-5 h-5 fill-current" />
                <span>Pause</span>
              </button>
            )}
            
            {(isPlaying || isPaused) && (
              <button 
                onClick={stopPlaying}
                className="flex items-center justify-center w-11 h-11 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full transition-all"
                aria-label="Stop"
              >
                <Square className="w-4 h-4 fill-current" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Note about Audio */}
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <div className="bg-orange-50 border border-orange-100/60 rounded-2xl p-4 flex gap-3 text-sm text-orange-900/80">
          <Volume2 className="w-5 h-5 shrink-0 text-orange-400" />
          <p>
            Press <strong>Chant</strong> to listen. Note: The voice quality and gender rely on your device's built-in Text-to-Speech voices. We request a soothing Hindi voice automatically.
          </p>
        </div>
      </div>

      {/* Stanzas List */}
      <div className="max-w-3xl mx-auto px-4 py-12 pb-32 space-y-8">
        {stanzas.map((stanza, i) => {
          const isActive = currentStanza === i;
          
          return (
            <motion.div
              key={i}
              ref={(el) => (stanzaRefs.current[i] = el)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`p-6 md:p-8 rounded-3xl transition-all duration-700 ${
                isActive 
                  ? 'bg-white shadow-[0_8px_30px_rgb(217,119,54,0.12)] scale-[1.02] border border-orange-100' 
                  : 'hover:bg-white/50'
              }`}
            >
              <p className={`text-xl md:text-2xl leading-loose md:leading-[2.5] text-center whitespace-pre-line transition-colors duration-500 font-medium ${
                isActive ? 'text-[#D97736]' : 'text-[#6C4B35]'
              }`}>
                {stanza}
              </p>
            </motion.div>
          );
        })}
      </div>
      
      {/* Bottom decorative pattern */}
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-300 via-amber-400 to-orange-300 opacity-60"></div>
    </div>
  );
}

