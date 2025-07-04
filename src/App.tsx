import React, { useState, useEffect } from 'react';
import { Shield, Lock, BookOpen, ArrowRight, Shield as ShieldIcon, Users, CheckCircle, UserCog, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingNav } from './components/ui/floating-navbar';
import GridBackgroundDemo from './components/ui/grid-background-demo';
import { riskCards, RiskCard, Question, roles } from './lib/roleData';
import { RiskCardIcon } from './components/RiskCardIcon';
import { assessmentStore, AssessmentData } from './lib/assessmentStore';
import { Analytics } from './components/Analytics';
import { io } from 'socket.io-client';

// Add type definitions at the top of the file
type SocketMessage = {
  type: 'question_display' | 'answer_selection' | 'hint_used' | 'navigation' | 'results_display';
  data: any;
};

type ClientInfo = {
  id: string;
  connectedAt: string;
  lastActivity: string;
};

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function App() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [filteredRiskCards, setFilteredRiskCards] = useState<RiskCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [hintCounts, setHintCounts] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);
  const [currentRiskCardQuestions, setCurrentRiskCardQuestions] = useState<Question[]>([]);
  const [roleSelectionComplete, setRoleSelectionComplete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [assessments, setAssessments] = useState<AssessmentData[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const [userLoginError, setUserLoginError] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [completedRiskCards, setCompletedRiskCards] = useState<string[]>([]);
  const [showFinalAnalytics, setShowFinalAnalytics] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  // Add new state variables for admin mirroring
  const [mirroredQuestion, setMirroredQuestion] = useState<any>(null);
  const [mirroredAnswer, setMirroredAnswer] = useState<any>(null);
  const [mirroredHints, setMirroredHints] = useState<number[]>([]);
  const [mirroredResults, setMirroredResults] = useState<any>(null);
  const [activeClient, setActiveClient] = useState<string | null>(null);

  // Add new state for connected clients
  const [connectedClients, setConnectedClients] = useState<ClientInfo[]>([]);

  const handleRoleSelect = (role: string) => {
    setSelectedRoles(prev => {
      if (prev.includes(role)) {
        return prev.filter(r => r !== role);
      } else {
        return [...prev, role];
      }
    });
  };

  const handleStartGenericAssessment = () => {
    setSelectedRoles([]); // Empty array means generic assessment
    setRoleSelectionComplete(true);
  };

  const handleStartRoleBasedAssessment = () => {
    setRoleSelectionComplete(true);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const rolesParam = urlParams.get('roles');
    console.log('URL Parameters:', window.location.search);
    console.log('Roles Parameter:', rolesParam);
    if (rolesParam) {
      const roles = decodeURIComponent(rolesParam).split(',');
      console.log('Decoded Roles:', roles);
      setSelectedRoles(roles);
    }
  }, []);

  useEffect(() => {
    console.log('Selected Roles:', selectedRoles);
    setFilteredRiskCards(riskCards);
  }, [selectedRoles]);

  useEffect(() => {
    setAssessments(assessmentStore.getAssessments());
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setAssessments(assessmentStore.getAssessments());
    }
  }, [isAdmin]);

  useEffect(() => {
    // Create socket connection
    const newSocket = io('http://localhost:3001');
    console.log('Socket connection created:', newSocket.id);
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      console.log('Socket connection closed:', newSocket.id);
      newSocket.close();
    };
  }, []);

  // Add socket listeners in useEffect
  useEffect(() => {
    if (isAdmin && socket) {
      console.log('Admin socket listeners setup for socket:', socket.id);
      
      // Listen for client messages
      socket.on('messageToAdmin', (message: SocketMessage) => {
        console.log('Received message in admin view:', message);
        
        switch (message.type) {
          case 'question_display':
            setMirroredQuestion(message.data);
            setMirroredAnswer(null);
            setMirroredHints([]);
            setMirroredResults(null);
            break;
            
          case 'answer_selection':
            console.log('Received answer selection:', message.data);
            setMirroredAnswer({
              selectedAnswerIndex: message.data.selectedAnswerIndex,
              selectedAnswerText: message.data.selectedAnswerText,
              questionIndex: message.data.questionIndex
            });
            break;
            
          case 'hint_used':
            setMirroredHints(prev => {
              const newHints = [...prev];
              newHints[message.data.questionIndex] = message.data.hintNumber;
              return newHints;
            });
            break;
            
          case 'navigation':
            // Navigation is handled by question_display event
            break;
            
          case 'results_display':
            setMirroredResults(message.data);
            break;
        }
      });

      // Listen for initial client list
      socket.on('clientList', (clients: [string, ClientInfo][]) => {
        console.log('Received initial client list:', clients);
        setConnectedClients(clients.map(([_, info]) => info));
      });

      // Listen for new client connections
      socket.on('clientConnected', (clientInfo: ClientInfo) => {
        console.log('New client connected:', clientInfo);
        setConnectedClients(prev => {
          // Check if client already exists
          if (prev.some(client => client.id === clientInfo.id)) {
            return prev;
          }
          return [...prev, clientInfo];
        });
      });

      // Listen for client disconnections
      socket.on('clientDisconnected', (clientId: string) => {
        console.log('Client disconnected:', clientId);
        setConnectedClients(prev => prev.filter(client => client.id !== clientId));
        
        // If the disconnected client was being viewed, clear the view
        if (activeClient === clientId) {
          setActiveClient(null);
          setMirroredQuestion(null);
          setMirroredAnswer(null);
          setMirroredHints([]);
          setMirroredResults(null);
        }
      });

      return () => {
        console.log('Cleaning up admin socket listeners');
        socket.off('messageToAdmin');
        socket.off('clientList');
        socket.off('clientConnected');
        socket.off('clientDisconnected');
      };
    }
  }, [isAdmin, socket, activeClient]);

  const getFilteredQuestions = (card: RiskCard): Question[] => {
    console.log(`Filtering questions for card: ${card.title}, Selected roles:`, selectedRoles);
    console.log(`Total questions in ${card.title}:`, card.questions.length);
    
    // Log first few questions and their roles to debug
    if (card.questions.length > 0) {
      console.log(`First 3 questions in ${card.title}:`, card.questions.slice(0, 3).map(q => ({ question: q.question.substring(0, 50) + '...', role: q.role })));
    }
    
    const TARGET_QUESTIONS = 5; // Always aim for 5 questions per card
    
    // If no roles selected, show first 5 questions from this card (generic assessment)
    if (selectedRoles.length === 0) {
        console.log("No roles selected, returning first 5 questions of the current card.");
        const questions = card.questions.slice(0, Math.min(TARGET_QUESTIONS, card.questions.length));
        return questions.map(q => ({ ...q, cardTitle: card.title }));
    }

    // Filter questions from this card that match selected roles
    const cardQuestionsForSelectedRoles = card.questions.filter(q => {
        const matches = selectedRoles.includes(q.role);
        if (!matches) {
          console.log(`Question role "${q.role}" not in selected roles:`, selectedRoles);
        }
        return matches;
    });

    console.log(`Found ${cardQuestionsForSelectedRoles.length} questions in ${card.title} for selected roles.`);

    let selectedQuestions: Question[] = [];

    // If no questions for selected roles in this card, use fallback questions
    if (cardQuestionsForSelectedRoles.length === 0) {
        console.log(`No questions found for selected roles in ${card.title}.`);
        console.log('Available roles in this card:', [...new Set(card.questions.map(q => q.role))]);
        console.log('Using fallback questions from this card...');
        // Use first 5 questions from this card as fallback
        selectedQuestions = card.questions.slice(0, Math.min(TARGET_QUESTIONS, card.questions.length));
    }
    // If we have some role-specific questions but fewer than 5
    else if (cardQuestionsForSelectedRoles.length < TARGET_QUESTIONS) {
        console.log(`Only ${cardQuestionsForSelectedRoles.length} role-specific questions found. Filling to 5 with additional questions.`);
        
        if (selectedRoles.length === 1) {
            // Single role: use all role-specific questions, then fill with others
            selectedQuestions = [...cardQuestionsForSelectedRoles];
            const needed = TARGET_QUESTIONS - selectedQuestions.length;
            
            // Get additional questions from other roles in this card
            const otherQuestions = card.questions.filter(q => 
                !selectedRoles.includes(q.role) && 
                !selectedQuestions.some(sq => sq.question === q.question)
            );
            const shuffledOthers = shuffleArray(otherQuestions);
            selectedQuestions.push(...shuffledOthers.slice(0, needed));
            
        } else {
            // Multiple roles: distribute proportionally, then fill if needed
            const questionsPerRole: { [role: string]: Question[] } = {};
            
            // Group questions by role
            selectedRoles.forEach(role => {
                questionsPerRole[role] = cardQuestionsForSelectedRoles.filter(q => q.role === role);
            });
            
            // Calculate distribution
            const totalAvailable = cardQuestionsForSelectedRoles.length;
            const baseQuestionsPerRole = Math.floor(TARGET_QUESTIONS / selectedRoles.length);
            const extraQuestions = TARGET_QUESTIONS % selectedRoles.length;
            
            // Select questions from each role
            selectedRoles.forEach((role, index) => {
                const questionsForThisRole = questionsPerRole[role] || [];
                let questionsToTake = Math.min(baseQuestionsPerRole, questionsForThisRole.length);
                
                // Give extra questions to first few roles
                if (index < extraQuestions && questionsForThisRole.length > questionsToTake) {
                    questionsToTake += 1;
                }
                
                const shuffledRoleQuestions = shuffleArray([...questionsForThisRole]);
                const takenQuestions = shuffledRoleQuestions.slice(0, questionsToTake);
                selectedQuestions.push(...takenQuestions);
                
                console.log(`Selected ${takenQuestions.length} questions for role ${role} in ${card.title}.`);
            });
            
            // If we still need more questions to reach 5, fill from any remaining questions
            if (selectedQuestions.length < TARGET_QUESTIONS) {
                const needed = TARGET_QUESTIONS - selectedQuestions.length;
                const remainingQuestions = card.questions.filter(q => 
                    !selectedQuestions.some(sq => sq.question === q.question)
                );
                const shuffledRemaining = shuffleArray(remainingQuestions);
                selectedQuestions.push(...shuffledRemaining.slice(0, needed));
                console.log(`Added ${Math.min(needed, shuffledRemaining.length)} additional questions to reach 5 total.`);
            }
        }
    }
    // If we have 5 or more role-specific questions
    else {
        console.log(`${cardQuestionsForSelectedRoles.length} role-specific questions available. Selecting 5.`);
        
        if (selectedRoles.length === 1) {
            // Single role: randomly select 5 questions
            const shuffled = shuffleArray([...cardQuestionsForSelectedRoles]);
            selectedQuestions = shuffled.slice(0, TARGET_QUESTIONS);
        } else {
            // Multiple roles: distribute proportionally
            const questionsPerRole: { [role: string]: Question[] } = {};
            
            // Group questions by role
            selectedRoles.forEach(role => {
                questionsPerRole[role] = cardQuestionsForSelectedRoles.filter(q => q.role === role);
            });
            
            // Calculate distribution
            const baseQuestionsPerRole = Math.floor(TARGET_QUESTIONS / selectedRoles.length);
            const extraQuestions = TARGET_QUESTIONS % selectedRoles.length;
            
            // Select questions from each role
            selectedRoles.forEach((role, index) => {
                const questionsForThisRole = questionsPerRole[role] || [];
                let questionsToTake = baseQuestionsPerRole;
                
                // Give extra questions to first few roles
                if (index < extraQuestions) {
                    questionsToTake += 1;
                }
                
                const shuffledRoleQuestions = shuffleArray([...questionsForThisRole]);
                const takenQuestions = shuffledRoleQuestions.slice(0, Math.min(questionsToTake, questionsForThisRole.length));
                selectedQuestions.push(...takenQuestions);
                
                console.log(`Selected ${takenQuestions.length} questions for role ${role} in ${card.title}.`);
            });
            
            // If we still need more questions to reach exactly 5
            if (selectedQuestions.length < TARGET_QUESTIONS) {
                const needed = TARGET_QUESTIONS - selectedQuestions.length;
                const remainingQuestions = cardQuestionsForSelectedRoles.filter(q => 
                    !selectedQuestions.some(sq => sq.question === q.question)
                );
                const shuffledRemaining = shuffleArray(remainingQuestions);
                selectedQuestions.push(...shuffledRemaining.slice(0, needed));
            }
        }
    }

    // Ensure we don't exceed 5 questions
    selectedQuestions = selectedQuestions.slice(0, TARGET_QUESTIONS);

    console.log(`Final selection: ${selectedQuestions.length} questions from ${card.title}.`);
    return selectedQuestions.map(q => ({ ...q, cardTitle: card.title }));
  };

  const handleCardClick = (cardId: string) => {
    console.log('Card clicked:', cardId);
    setSelectedCard(cardId);
    const card = riskCards.find(c => c.id === cardId);
    if (card) {
      console.log('Found card:', card);
      const questions = getFilteredQuestions(card);
      setCurrentRiskCardQuestions(questions);
      setHintCounts(new Array(questions.length).fill(0));
      console.log('Questions set for this card:', questions.map(q => q.question));
      
      // Emit question display event
      socket?.emit('messageFromClient', {
        type: 'question_display',
        data: {
          cardId,
          questionIndex: 0,
          question: questions[0],
          timestamp: new Date().toISOString()
        }
      });
    }
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowHints(false);
    setShowResults(false);
    setAnsweredQuestions([]);
    setShowHint(false);
  };

  const getCurrentQuestion = (): Question | undefined => {
    return currentRiskCardQuestions[currentQuestionIndex];
  };

  const handleHintClick = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion || !currentQuestion.hints || hintCounts[currentQuestionIndex] >= currentQuestion.hints.length) return;

    const newHintCounts = [...hintCounts];
    if (newHintCounts[currentQuestionIndex] === undefined) newHintCounts[currentQuestionIndex] = 0;
    
    if (newHintCounts[currentQuestionIndex] < 2) {
        newHintCounts[currentQuestionIndex]++;
        setHintCounts(newHintCounts);
        setShowHint(true);

        // Emit hint used event
        socket?.emit('messageFromClient', {
          type: 'hint_used',
          data: {
            cardId: selectedCard,
            questionIndex: currentQuestionIndex,
            hintNumber: newHintCounts[currentQuestionIndex],
            hintText: currentQuestion.hints[newHintCounts[currentQuestionIndex] - 1],
            timestamp: new Date().toISOString()
          }
        });
    }
  };

  const getQuestionScore = (questionIndex: number): number => {
    const hintCount = hintCounts[questionIndex] || 0;
    if (hintCount === 0) return 5;
    if (hintCount === 1) return 3;
    return 2;
  };

  const calculateTotalScore = (): number => {
    const currentAnswers = answeredQuestions.slice(0, currentRiskCardQuestions.length);
    return currentAnswers.reduce((total, isCorrect, index) => {
      return total + (isCorrect === true ? getQuestionScore(index) : 0);
    }, 0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    console.log('Answer selected:', answerIndex);
    
    // Check if this answer is already selected
    const isAlreadySelected = selectedAnswers[currentQuestionIndex] === answerIndex;
    
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      if (isAlreadySelected) {
        // Deselect the answer by removing it
        newAnswers[currentQuestionIndex] = undefined;
      } else {
        // Select the new answer
        newAnswers[currentQuestionIndex] = answerIndex;
      }
      return newAnswers;
    });
    
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      if (isAlreadySelected) {
        // Clear the answered question state when deselecting
        setAnsweredQuestions(prevAnswers => {
          const newAnswers = [...prevAnswers];
          while (newAnswers.length <= currentQuestionIndex) {
            newAnswers.push(false);
          }
          newAnswers[currentQuestionIndex] = false;
          return newAnswers;
        });
        
        // Emit deselection event
        socket?.emit('messageFromClient', {
          type: 'answer_selection',
          data: {
            cardId: selectedCard,
            questionIndex: currentQuestionIndex,
            selectedAnswerIndex: null,
            selectedAnswerText: 'Deselected',
            timestamp: new Date().toISOString()
          }
        });
      } else {
        // Handle normal selection
        const isCorrect = answerIndex === currentQuestion.correctAnswer;
        console.log('Is answer correct:', isCorrect);
        setAnsweredQuestions(prevAnswers => {
          const newAnswers = [...prevAnswers];
          while (newAnswers.length <= currentQuestionIndex) {
            newAnswers.push(false);
          }
          newAnswers[currentQuestionIndex] = isCorrect;
          return newAnswers;
        });

        // Emit answer selection event
        socket?.emit('messageFromClient', {
          type: 'answer_selection',
          data: {
            cardId: selectedCard,
            questionIndex: currentQuestionIndex,
            selectedAnswerIndex: answerIndex,
            selectedAnswerText: currentQuestion.options[answerIndex],
            timestamp: new Date().toISOString()
          }
        });
      }
    }
  };

  const handleNextQuestion = () => {
    console.log('Moving to next question');
    if (currentQuestionIndex < currentRiskCardQuestions.length - 1) {
      const fromIndex = currentQuestionIndex;
      const toIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(toIndex);
      setSelectedAnswers([]);
      setShowHint(false);

      // Emit navigation event
      socket?.emit('messageFromClient', {
        type: 'navigation',
        data: {
          cardId: selectedCard,
          fromQuestionIndex: fromIndex,
          toQuestionIndex: toIndex,
          action: 'next',
          timestamp: new Date().toISOString()
        }
      });

      // Emit question display event for the new question
      const nextQuestion = currentRiskCardQuestions[toIndex];
      socket?.emit('messageFromClient', {
        type: 'question_display',
        data: {
          cardId: selectedCard,
          questionIndex: toIndex,
          question: nextQuestion,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      console.log('Showing results');
      setShowResults(true);
      
      // Store assessment data when completed
      const assessmentData: AssessmentData = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        selectedRoles,
        scores: [{
          cardId: selectedCard!,
          cardTitle: riskCards.find(c => c.id === selectedCard)?.title || '',
          score: calculateTotalScore(),
          maxScore: 25,
          answeredQuestions,
          selectedAnswers
        }],
        hintCounts: hintCounts
      };
      assessmentStore.addAssessment(assessmentData);

      // Emit results display event
      socket?.emit('messageFromClient', {
        type: 'results_display',
        data: {
          cardId: selectedCard,
          totalScore: calculateTotalScore(),
          maxScore: 25,
          answers: currentRiskCardQuestions.map((q, index) => ({
            questionIndex: index,
            isCorrect: answeredQuestions[index],
            selectedAnswer: selectedAnswers[index] !== undefined ? q.options[selectedAnswers[index]] : '',
            correctAnswer: q.options[q.correctAnswer],
            hintsUsed: hintCounts[index] || 0
          })),
          timestamp: new Date().toISOString()
        }
      });

      if (selectedCard && !completedRiskCards.includes(selectedCard)) {
        setCompletedRiskCards(prev => [...prev, selectedCard]);
      }

      setAssessments(assessmentStore.getAssessments());
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const fromIndex = currentQuestionIndex;
      const toIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(toIndex);
      setSelectedAnswers([]);
      setShowHint(false);

      // Emit navigation event
      socket?.emit('messageFromClient', {
        type: 'navigation',
        data: {
          cardId: selectedCard,
          fromQuestionIndex: fromIndex,
          toQuestionIndex: toIndex,
          action: 'previous',
          timestamp: new Date().toISOString()
        }
      });

      // Emit question display event for the previous question
      const prevQuestion = currentRiskCardQuestions[toIndex];
      socket?.emit('messageFromClient', {
        type: 'question_display',
        data: {
          cardId: selectedCard,
          questionIndex: toIndex,
          question: prevQuestion,
          timestamp: new Date().toISOString()
        }
      });
    }
  };

  const handleBackToRoleSelection = () => {
    setRoleSelectionComplete(false);
    setSelectedCard(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowHints(false);
    setShowResults(false);
    setAnsweredQuestions([]);
    setHintCounts([]);
    setShowHint(false);
  };

  const navItems = [
    { name: "Home", link: "/", icon: <Shield className="h-4 w-4" /> },
    { name: "Assessments", link: "/assessments", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Resources", link: "/resources", icon: <Lock className="h-4 w-4" /> },
    { name: "Admin", link: "#", icon: <UserCog className="h-4 w-4" />, onClick: () => setShowAdminLogin(true) },
  ];

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Attempting admin login with:', adminCredentials);
    
    // Simulate a small delay to show loading state
    setTimeout(() => {
      if (adminCredentials.email === 'admin@gmail.com' && adminCredentials.password === '123') {
        console.log('Admin login successful');
        setIsAdmin(true);
        setShowAdminLogin(false);
        setAssessments(assessmentStore.getAssessments());
        // Register socket as admin
        console.log('Registering socket as admin:', socket?.id);
        socket?.emit('register', 'admin');
      } else {
        console.log('Admin login failed');
        alert('Invalid credentials');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleAdminLogout = () => {
    console.log('Admin logging out');
    setIsAdmin(false);
    setShowAdminLogin(false);
    setAdminCredentials({ email: '', password: '' });
    setAssessments([]);
    // Clean up socket registration
    socket?.emit('register', 'none');
  };

  // Add user logout handler
  const handleUserLogout = () => {
    console.log('User logging out');
    setIsUserAuthenticated(false);
    setUserCredentials({ email: '', password: '' });
    setUserLoginError('');
    // Clean up socket registration
    socket?.emit('register', 'none');
  };

  if (showAdminLogin) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <GridBackgroundDemo />
        <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
          <FloatingNav navItems={navItems} isDark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          
          <div className="pt-24 relative z-20">
            <div className="max-w-md mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg"
              >
                <div className="text-center mb-8">
                  <UserCog className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Login</h2>
                </div>
                
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={adminCredentials.email}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={adminCredentials.password}
                      onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setShowAdminLogin(false)}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                      disabled={isLoading}
                    >
                      Back to Home
                    </button>
                    <button
                      type="submit"
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <GridBackgroundDemo />
        <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
          <FloatingNav navItems={navItems} isDark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
          
          <div className="pt-24 relative z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                <button
                  onClick={handleAdminLogout}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Logout
                </button>
              </div>

              {/* Add connected clients section in admin dashboard */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Connected Clients</h2>
                <div className="grid gap-4">
                  {connectedClients.length === 0 ? (
                    <p className="text-slate-600 dark:text-slate-400">No clients connected</p>
                  ) : (
                    connectedClients.map((client) => (
                      <div
                        key={client.id}
                        className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                              Client {client.id.slice(0, 8)}...
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Connected: {new Date(client.connectedAt).toLocaleString()}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Last Activity: {new Date(client.lastActivity).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => setActiveClient(client.id)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              activeClient === client.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                            }`}
                          >
                            {activeClient === client.id ? 'Viewing' : 'View'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add mirrored client view */}
              {mirroredQuestion && (
                <div className="mb-12 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Active Client View</h2>
                  
                  {/* Question Display */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Question {mirroredQuestion.questionIndex + 1}
                    </h3>
                    
                    {/* Scenario */}
                    {mirroredQuestion.question.scenario && (
                      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                        <h5 className="text-[1.25em] font-bold text-blue-800 dark:text-blue-300 mb-1">Scenario:</h5>
                        <p className="text-sm text-blue-700 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: mirroredQuestion.question.scenario || '' }} />
                      </div>
                    )}
                    
                    {/* Question Text */}
                    <p className="text-slate-700 dark:text-gray-300 mb-4">
                      {mirroredQuestion.question.question}
                    </p>
                    
                    {/* Options */}
                    <div className="space-y-3">
                      {mirroredQuestion.question.options.map((option: string, index: number) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            mirroredAnswer?.selectedAnswerIndex === index
                              ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                              : 'bg-white dark:bg-slate-700'
                          }`}
                        >
                          {option}
                          {mirroredAnswer?.selectedAnswerIndex === index && (
                            <span className="ml-2 text-blue-600 dark:text-blue-400">✓</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hints Used */}
                  {mirroredHints[mirroredQuestion.questionIndex] > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Hints Used:</h4>
                      <div className="space-y-2">
                        {Array.from({ length: mirroredHints[mirroredQuestion.questionIndex] }).map((_, index) => (
                          <div key={index} className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                            <p className="text-blue-800 dark:text-blue-200">
                              Hint {index + 1}: {mirroredQuestion.question.hints[index]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results Display */}
                  {mirroredResults && (
                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Assessment Results</h3>
                      <p className="text-green-700 dark:text-green-300">
                        Score: {mirroredResults.totalScore}/{mirroredResults.maxScore}
                      </p>
                      <div className="mt-4 space-y-4">
                        {mirroredResults.answers.map((answer: any, index: number) => (
                          <div key={index} className="bg-white dark:bg-slate-700 p-3 rounded-lg">
                            <p className="font-medium text-slate-900 dark:text-white">Question {index + 1}</p>
                            <p className={`text-sm ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                              {answer.isCorrect ? 'Correct' : 'Incorrect'}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Selected: {answer.selectedAnswer}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Correct: {answer.correctAnswer}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Hints Used: {answer.hintsUsed}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Existing admin dashboard content */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recent Assessments</h2>
                <div className="grid gap-6">
                  {assessments.map((assessment) => (
                    <motion.div
                      key={assessment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Assessment {assessment.id}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(assessment.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {assessment.selectedRoles.map((role) => (
                            <span
                              key={role}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {assessment.scores.map((score) => (
                          <div key={score.cardId} className="bg-white dark:bg-slate-700 p-4 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">
                                  {score.cardTitle}
                                </h4>
                                <div className="mt-2">
                                  <p className="text-slate-700 dark:text-gray-300">
                                    Score: {score.score}/{score.maxScore}
                                  </p>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Correct Answers: {score.answeredQuestions.filter(Boolean).length}/{score.answeredQuestions.length}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  Success Rate: {Math.round((score.score / score.maxScore) * 100)}%
                                </p>
                                <button
                                  onClick={() => {
                                    const detailsElement = document.getElementById(`details-${score.cardId}`);
                                    if (detailsElement) {
                                      detailsElement.classList.toggle('hidden');
                                    }
                                  }}
                                  className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm flex items-center gap-1"
                                >
                                  View Details
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            
                            <div id={`details-${score.cardId}`} className="hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                              <div className="space-y-4">
                                {score.answeredQuestions.map((isCorrect, index) => {
                                  const question = riskCards
                                    .find(card => card.id === score.cardId)
                                    ?.questions[index];
                                  
                                  if (!question) return null;
                                  
                                  return (
                                    <div key={index} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                                      <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-medium text-slate-900 dark:text-white">
                                          Question {index + 1}
                                        </h5>
                                        <span className={`px-2 py-1 rounded-full text-xs ${
                                          isCorrect 
                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                                        }`}>
                                          {isCorrect ? 'Correct' : 'Incorrect'}
                                        </span>
                                      </div>
                                      <p className="text-slate-700 dark:text-gray-300 mb-2">
                                        {question.question}
                                      </p>
                                      <div className="space-y-2">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                          Selected Answer: {question.options[score.selectedAnswers[index]]}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                          Correct Answer: {question.options[question.correctAnswer]}
                                        </p>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                          Hints Used: {assessment.hintCounts?.[index] || 0}
                                        </p>
                                        {!isCorrect && (
                                          <p className="text-sm text-red-600 dark:text-red-400">
                                            Explanation: {question.explanation}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Risk Cards</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {riskCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg relative"
                    whileHover={{ y: -5 }}
                  >
                    {/* Completion indicator for overview */}
                    {completedRiskCards.includes(card.id) && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    <div>
                      <RiskCardIcon iconName={card.icon} className="h-12 w-12 text-red-500" />
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                      <p className="text-slate-700 dark:text-gray-300 mb-4">{card.description}</p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Questions:</h4>
                          <ul className="list-disc list-inside text-slate-700 dark:text-gray-300">
                            {card.questions.map((q, index) => (
                              <li key={index} className="text-sm">{q.question}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Relevant Roles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {Array.from(new Set(card.questions.map(q => q.role))).map((role) => (
                              <span
                                key={role}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                disabled={completedRiskCards.length < 7}
                onClick={() => {
                  setSelectedCard('final-analytics');
                  setShowFinalAnalytics(true);
                }}
                className={`mt-8 px-6 py-3 rounded-lg font-bold transition ${
                  completedRiskCards.length < 7
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Final Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!roleSelectionComplete) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <GridBackgroundDemo />
        <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
          <FloatingNav navItems={navItems} isDark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

          <div className="pt-24 relative z-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <Shield className="h-20 w-20 text-blue-500 dark:text-blue-600 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Select your Roles</h1>
                <p className="text-xl text-slate-700 dark:text-gray-300">Choose one or more roles to begin your specialized assessment</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Shield className="h-8 w-8 text-blue-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">General Assessment</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-slate-700 dark:text-gray-300">
                      A comprehensive tabletop exercise designed to test your organization's incident response capabilities across all domains.
                    </p>
                    <div className="bg-slate-200/50 dark:bg-slate-700/50 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">What to Expect:</h3>
                      <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-300">
                        <li>Cross-functional scenario-based challenges</li>
                        <li>Real-world incident response simulations</li>
                        <li>Decision-making under pressure</li>
                        <li>Team coordination exercises</li>
                        <li>Risk assessment across multiple domains</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Benefits:</h3>
                      <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
                        <li>Identify gaps in incident response procedures</li>
                        <li>Improve cross-team communication</li>
                        <li>Test and validate response playbooks</li>
                        <li>Enhance overall security posture</li>
                      </ul>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex justify-center mt-6"
                    >
                      <button
                        onClick={handleStartGenericAssessment}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Start General Assessment
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Users className="h-8 w-8 text-blue-500" />
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Role-Based Assessment</h2>
                  </div>
                  <p className="text-slate-700 dark:text-gray-300 mb-6">Select one or more roles to take a specialized assessment.</p>
                  
                  <div className="bg-slate-200/50 dark:bg-slate-700/50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">What to Expect:</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-gray-300">
                      <li>Role-specific scenarios and challenges</li>
                      <li>Tailored questions for your expertise</li>
                      <li>Focused assessment on your responsibilities</li>
                    </ul>
                  </div>
                  
                  <div className="relative">
                    <div className="max-h-[300px] overflow-y-auto pr-4 role-scrollbar">
                      <div className="grid grid-cols-1 gap-3">
                        {roles.map((role, index) => (
                          <motion.div
                            key={role}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * index }}
                            onClick={() => handleRoleSelect(role)}
                            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                              selectedRoles.includes(role)
                                ? 'bg-blue-600/90 border-2 border-blue-400 shadow-lg scale-105'
                                : 'bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-600/80'
                            }`}
                          >
                            <h3 className={`font-medium text-lg ${
                              selectedRoles.includes(role)
                                ? 'text-white'
                                : 'text-slate-900 dark:text-white'
                            }`}>{role}</h3>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-100/80 dark:from-slate-800/80 to-transparent pointer-events-none rounded-b-xl"></div>
                  </div>

                  {selectedRoles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="flex justify-center mt-6"
                    >
                      <button
                        onClick={handleStartRoleBasedAssessment}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        Start Assessment
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-gray-400">
                <ShieldIcon className="h-6 w-6" />
                <span>© 2025 Ransomware Protection. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }

  if (!isUserAuthenticated) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <GridBackgroundDemo />
        <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50 flex items-center justify-center">
          <form
            onSubmit={e => {
              e.preventDefault();
              setIsUserLoading(true);
              setTimeout(() => {
                if (
                  userCredentials.email === 'us@gmail.com' &&
                  userCredentials.password === '123'
                ) {
                  setIsUserAuthenticated(true);
                  setUserLoginError('');
                  // Register socket as client
                  console.log('Registering socket as client:', socket?.id);
                  socket?.emit('register', 'client');
                } else {
                  setUserLoginError('Invalid credentials');
                }
                setIsUserLoading(false);
              }, 500);
            }}
            className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-8 shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">User Login</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={userCredentials.email}
                onChange={e => setUserCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
                disabled={isUserLoading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={userCredentials.password}
                onChange={e => setUserCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                required
                disabled={isUserLoading}
              />
            </div>
            {userLoginError && (
              <div className="text-red-600 dark:text-red-400 mb-4 text-center">{userLoginError}</div>
            )}
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg w-full transition-all ${
                isUserLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isUserLoading}
            >
              {isUserLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <GridBackgroundDemo />
      <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
        <FloatingNav navItems={navItems} isDark={theme === 'dark'} toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />

        <div className="pt-24 relative z-20">
          <header className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={handleBackToRoleSelection}
                    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Role Selection
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Selected Roles:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoles.map((role) => (
                        <span
                          key={role}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Shield className="h-20 w-20 text-blue-500 dark:text-blue-600 mx-auto mb-8" />
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Ransomware Attack Scenario
                </h1>
                <p className="text-xl text-slate-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  The Security Operations Center (SOC) has detected a sophisticated ransomware attack targeting company systems and critical data. 
                  Multiple fake videos and audio recordings are being circulated, potentially causing reputational damage and financial fraud. 
                  As the IT Security Lead, you must coordinate the incident response while ensuring business continuity and protecting the company's reputation.
                </p>
              </div>
            </div>
          </header>

          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">Risk Cards</h2>
             
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRiskCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className={`bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 relative ${
                      selectedCard === card.id ? 'ring-2 ring-blue-500' : ''
                    } ${
                      completedRiskCards.includes(card.id) ? 'ring-2 ring-green-400' : ''
                    }`}
                    onClick={() => handleCardClick(card.id)}
                    whileHover={{ y: -5 }}
                  >
                    {/* Completion indicator for interactive cards */}
                    {completedRiskCards.includes(card.id) && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <RiskCardIcon iconName={card.icon} className="h-12 w-12 text-red-500" />
                        {completedRiskCards.includes(card.id) && (
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                      <p className="text-slate-700 dark:text-gray-300">{card.description}</p>
                      <div className="mt-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Relevant Roles:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedRoles.map((role) => (
                            <span 
                              key={role}
                              className={`px-2 py-1 rounded-full text-xs ${
                                selectedRoles.includes(role)
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-gray-300'
                              }`}
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button
                disabled={completedRiskCards.length < 7}
                onClick={() => {
                  setSelectedCard('final-analytics');
                  setShowFinalAnalytics(true);
                }}
                className={`mt-8 px-6 py-3 rounded-lg font-bold transition ${
                  completedRiskCards.length < 7
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Final Analytics
              </button>
            </div>
          </section>

          <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-gray-400">
                <ShieldIcon className="h-6 w-6" />
                <span>© 2025 Ransomware Protection. All rights reserved.</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedCard(null);
              }
            }}
          >
            <div 
              className={`bg-white dark:bg-slate-800 rounded-xl overflow-y-auto shadow-2xl ${
                showAnalytics || showFinalAnalytics ? 'w-[95%] h-[95%]' : 'w-[90%] h-[90%] max-w-6xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 h-full flex flex-col">
                <button 
                  onClick={() => {
                    setSelectedCard(null);
                    setShowAnalytics(false);
                    setShowFinalAnalytics(false);
                  }}
                  className="mb-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Risk Cards
                </button>
                
                <h3 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white flex-shrink-0">
                  {showFinalAnalytics ? 'Final Analytics Dashboard' : showAnalytics ? 'Analytics Dashboard' : riskCards.find(c => c.id === selectedCard)?.title + ' Assessment'}
                </h3>
               
                <div className="flex-grow overflow-y-auto">
                  {showFinalAnalytics ? (
                    <div className="p-4">
                      <div className="mb-8">
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Risk Card Summary</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {assessments.map((assessment) => (
                            assessment.scores.map((score) => (
                              <div key={score.cardId} className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg">
                                <h5 className="font-semibold text-slate-900 dark:text-white mb-2">{score.cardTitle}</h5>
                                <div className="space-y-2">
                                  <p className="text-slate-700 dark:text-gray-300">
                                    Score: {score.score}/{score.maxScore}
                                  </p>
                                  <p className="text-slate-700 dark:text-gray-300">
                                    Correct Answers: {score.answeredQuestions.filter(Boolean).length}/{score.answeredQuestions.length}
                                  </p>
                                  <p className="text-slate-700 dark:text-gray-300">
                                    Success Rate: {Math.round((score.score / score.maxScore) * 100)}%
                                  </p>
                                </div>
                              </div>
                            ))
                          ))}
                        </div>
                      </div>
                      <Analytics
                        answeredQuestions={assessments.flatMap(a => a.scores.flatMap(s => s.answeredQuestions))}
                        hintCounts={assessments.flatMap(a => a.hintCounts || [])}
                        currentRiskCardQuestions={
                          assessments.flatMap(a =>
                            a.scores.flatMap(s => {
                              const card = riskCards.find(c => c.id === s.cardId);
                              // Only include the questions that were actually answered (should be 5 per card)
                              return card ? card.questions.slice(0, s.answeredQuestions.length) : [];
                            })
                          )
                        }
                        selectedRoles={
                          // Aggregate all roles the user selected across all assessments
                          Array.from(new Set(assessments.flatMap(a => a.selectedRoles)))
                        }
                        totalScore={assessments.reduce((total, a) => total + a.scores.reduce((sum, s) => sum + s.score, 0), 0)}
                      />
                    </div>
                  ) : !showAnalytics ? (
                    !getCurrentQuestion() ? (
                      <div className="p-6 text-center text-slate-700 dark:text-gray-300">
                        Loading question...
                      </div>
                    ) : showResults ? (
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Assessment Complete</h4>
                        <div className="flex flex-col items-center justify-center space-y-6">
                          <div className="text-center">
                            <p className="text-lg text-slate-700 dark:text-gray-300 mb-4">
                              You have completed the {riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management assessment.
                            </p>
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                              Score: {answeredQuestions.filter(Boolean).length}/{currentRiskCardQuestions.length}
                            </div>
                            <div className="text-slate-700 dark:text-gray-300 mb-6">
                              {answeredQuestions.filter(Boolean).length >= 4 ? (
                                <p>Excellent performance! You demonstrated strong understanding of {riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management.</p>
                              ) : answeredQuestions.filter(Boolean).length >= 3 ? (
                                <p>Good job! You showed solid knowledge of {riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management.</p>
                              ) : (
                                <p>Keep practicing! Review the {riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management concepts to improve your understanding.</p>
                              )}
                            </div>
                            {completedRiskCards.length === riskCards.length && (
                              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                <p className="text-indigo-700 dark:text-indigo-300">
                                  Congratulations! You have completed all risk card assessments. You can now view your final analytics.
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={() => {
                                if (completedRiskCards.length === riskCards.length) {
                                  setShowFinalAnalytics(true);
                                } else {
                                  setSelectedCard(null);
                                  setShowResults(false);
                                }
                              }}
                              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                              {completedRiskCards.length === riskCards.length ? 'View Final Analytics' : 'Move to Next Risk Card'}
                            </button>
                            <button
                              onClick={handleBackToRoleSelection}
                              className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              Return to Home Screen
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {(() => {
                          const currentQ = getCurrentQuestion();
                          console.log('Current Question Object:', currentQ);
                          console.log('Scenario for Current Question:', currentQ?.scenario);
                          return null;
                        })()}

                        {getCurrentQuestion()?.scenario && (
                           <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
                             <h5 className="text-[1.25em] font-bold text-blue-800 dark:text-blue-300 mb-1">Scenario:</h5>
                             <p className="text-sm text-blue-700 dark:text-blue-200" dangerouslySetInnerHTML={{ __html: getCurrentQuestion()?.scenario || '' }} />
                           </div>
                         )}

                        <div className="mb-8">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h4 className="text-xl text-slate-900 dark:text-white">
                                Question {currentQuestionIndex + 1} of {currentRiskCardQuestions.length}
                              </h4>
                            </div>
                            <button
                              onClick={handleHintClick}
                              disabled={hintCounts[currentQuestionIndex] >= (getCurrentQuestion()?.hints?.length || 0) || selectedAnswers.length > 0}
                              className={`flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 ${selectedAnswers.length > 0 ? 'cursor-not-allowed' : ''}`}
                            >
                              <span>💡</span>
                              <span>Hint ({(getCurrentQuestion()?.hints?.length || 0) - (hintCounts[currentQuestionIndex] || 0)} left)</span>
                            </button>
                          </div>

                           {showHint && getCurrentQuestion()?.hints && getCurrentQuestion()!.hints!.length >= hintCounts[currentQuestionIndex] && hintCounts[currentQuestionIndex] > 0 && (
                             <div className="bg-blue-100/50 dark:bg-blue-900/50 p-4 rounded-lg mb-4 animate-fade-in">
                               <p className="text-blue-900 dark:text-blue-200 font-semibold">Hint {hintCounts[currentQuestionIndex]}:</p>
                               <p className="text-blue-900 dark:text-blue-200">
                                 {getCurrentQuestion()!.hints?.[hintCounts[currentQuestionIndex] - 1]}
                               </p>
                             </div>
                           )}

                          <p className="text-lg text-slate-900 dark:text-gray-200 min-h-[60px]">
                            {getCurrentQuestion()?.question}
                          </p>
                        </div>

                        <div className="space-y-4 mb-8">
                          {getCurrentQuestion()?.options.map((option: string, index: number) => (
                            <button
                              key={index}
                              className={`w-full text-left p-4 rounded-lg transition-colors flex justify-between items-center border-2 hover:border-blue-500 dark:hover:border-blue-400 ${
                                selectedAnswers[currentQuestionIndex] === index
                                  ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 dark:border-blue-400 text-blue-800 dark:text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-gray-200'
                              }`}
                              onClick={() => handleAnswerSelect(index)}
                            >
                              <span>{option}</span>
                              {selectedAnswers[currentQuestionIndex] === index && (
                                <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                              )}
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestionIndex === 0}
                            className={`px-6 py-2 rounded-full transition-colors ${
                              currentQuestionIndex === 0
                                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-500 dark:text-gray-400'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            Previous
                          </button>
                          <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswers[currentQuestionIndex] === undefined}
                            className={`px-6 py-2 rounded-full transition-colors ${
                              selectedAnswers[currentQuestionIndex] === undefined
                                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-500 dark:text-gray-400'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="p-4">
                      <div className="mb-6">
                        <button
                          onClick={() => setShowAnalytics(false)}
                          className="flex items-center px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          ← Back to Results
                        </button>
                      </div>
                      <Analytics
                        answeredQuestions={assessments.flatMap(a => a.scores.flatMap(s => s.answeredQuestions))}
                        hintCounts={assessments.flatMap(a => a.hintCounts || [])}
                        currentRiskCardQuestions={
                          assessments.flatMap(a =>
                            a.scores.flatMap(s => {
                              const card = riskCards.find(c => c.id === s.cardId);
                              // Only include the questions that were actually answered (should be 5 per card)
                              return card ? card.questions.slice(0, s.answeredQuestions.length) : [];
                            })
                          )
                        }
                        selectedRoles={
                          // Aggregate all roles the user selected across all assessments
                          Array.from(new Set(assessments.flatMap(a => a.selectedRoles)))
                        }
                        totalScore={assessments.reduce((total, a) => total + a.scores.reduce((sum, s) => sum + s.score, 0), 0)}
                      />
                    </div>
                  )}
                </div>
              </div> 
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;