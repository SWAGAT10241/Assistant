import React, { useContext, useEffect, useState, useRef } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from '../assets/ai.gif'
import userImg from '../assets/user.gif'
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext)
  const navigate = useNavigate()
  const [listening, setListening] = useState(false)
  const [userText, setUserText] = useState("")
  const [aiText, setAiText] = useState("")
  const isSpeakingRef = useRef(false)
  const recognitionRef = useRef(null)
  const [ham, setHam] = useState(false)
  const isRecognizingRef = useRef(false)
  const synth = window.speechSynthesis


  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      setUserData(null)
      navigate("/signin")
    } catch (error) {
      setUserData(null)
      console.log(error);
    }
  }
  const startRecognition = () => {
    if (!isSpeakingRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current?.start()
      } catch (error) {
        if (!error.message.includes("start")) {
          console.error("Recognition error:", error);
        }
      }
    }
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'hi-IN';
    const voices = window.speechSynthesis.getVoices()
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    isSpeakingRef.current = true
    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecognition()
      }, 800);
    }
    synth.cancel();
    synth.speak(utterance);
  }

  const handleCommand = (data) => {
    const { type, userInput, response } = data
    speak(response);

    if (type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
    if (type === 'calculator-open') {
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }
    if (type === 'instagram-open') {
      window.open(`https://www.instagram.com`, '_blank');
    }
    if (type === 'facebook-open') {
      window.open(`https://www.facebook.com`, '_blank');
    }
    if (type === 'weather-show') {
      window.open(`https://www.google.com/search?q=weather`, '_blank');
    }
    if (type === 'youtube-search' || type === 'youtube-play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query?q=${query}`, '_blank');
    }
  }


  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognitionRef.current = recognition

    let isMounted = true;

    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error(error);
          }
        }
      }
    }, 1000);

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setListening(true);
    }
    recognition.onend = () => {
      isRecognizingRef.current = false;
      setListening(false);
      if (isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
            } catch (error) {
              console.error(error);
            }
          }
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
            } catch (error) {
              if (error.name !== "InvalidStateError") console.error(error);
            }
          }
        }, 1000);
      }
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim()

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAiText("");
        setUserText(transcript);
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      }
    };

    const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, What can I help you with?`);
    greeting.lang = 'hi-IN';
    window.speechSynthesis.speak(greeting);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
    };

  }, []);

  return (
    <div className='w-full h-screen bg-gradient-to-t from-black to-[#02023d] flex justify-center items-center flex-col gap-4 overflow-hidden relative'>
      <CgMenuRight
        className='text-white absolute top-5 right-5 w-7 h-7 cursor-pointer z-50'
        onClick={() => setHam(true)}
      />
      <div className={`absolute top-0 right-0 bg-[#00000080] backdrop-blur-lg p-5 flex flex-col gap-5 items-start transition-transform duration-300 z-50 ${ham ? 'translate-x-0' : 'translate-x-full'} w-full sm:w-[400px] lg:w-[300px] h-full`}>
        <RxCross1
          className='text-white absolute top-5 right-5 w-7 h-7 cursor-pointer'
          onClick={() => setHam(false)}
        />

        <button
          className="min-w-[150px] h-[50px] text-black font-semibold bg-white rounded-full text-lg cursor-pointer"
          onClick={handleLogOut}
        >
          Log Out
        </button>

        <button
          className="min-w-[150px] h-[50px] text-black font-semibold bg-white rounded-full text-lg px-5 py-2 cursor-pointer"
          onClick={() => navigate('/customize')}
        >
          Customize your Assistant
        </button>

        <div className='w-full h-[2px] bg-gray-400'></div>

        <h1 className='text-white font-semibold text-lg'>History</h1>
        <div className='w-full h-[400px] overflow-y-auto flex flex-col gap-3'>
          {userData?.history?.map((his, idx) => (
            <span key={idx} className='text-gray-200 text-base truncate'>{his}</span>
          ))}
        </div>
      </div>
      <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-2xl shadow-lg'>
        <img
          src={userData?.assistantImage || aiImg}
          alt="assistant"
          className='h-full w-full object-cover'
        />
      </div>
      <h1 className='text-white text-lg font-semibold'>
        {userData?.assistantName ? `I'm ${userData.assistantName}` : "I'm your Assistant"}
      </h1>
      <h1 className='text-white text-lg font-semibold text-center px-4'>
        {userText || aiText || null}
      </h1>
      {!aiText && <img src={userImg} alt="user" className='w-[200px]' />}
      {aiText && <img src={aiImg} alt="ai" className='w-[200px]' />}

    </div>
  )
}

export default Home
