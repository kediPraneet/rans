import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Lock, BookOpen, ArrowRight, Shield as ShieldIcon, Building2, Banknote, Bell, Users, MessageSquare, Target, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingNav } from './components/ui/floating-navbar';
import GridBackgroundDemo from './components/ui/grid-background-demo';

interface RiskCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  impact: string;
  scenario?: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    hints?: string[];
  }[];
}

const riskCards: RiskCard[] = [
  {
    id: 'operational',
    title: 'Operational Disruption',
    description: 'Coordinate responses to system outages and service disruptions',
    icon: <Building2 className="h-12 w-12 text-red-500" />,
    impact: 'System Availability and Business Operations',
    scenario: 'As IT Security Lead, you discover that ransomware has encrypted multiple critical systems including file servers, databases, and application servers. The attack has halted all business operations, affecting system availability and service delivery. You must quickly address the disruption while maintaining security.',
    questions: [
      {
        question: 'What should be your first priority when operations are disrupted?',
        options: [
          'Continue normal operations',
          'Assess and isolate affected systems',
          'Contact all departments',
          'Start system restoration'
        ],
        correctAnswer: 1,
        explanation: 'Assessing and isolating affected systems helps contain the incident while understanding its scope.',
        hints: [
          'Consider incident containment',
          'Think about impact assessment'
        ]
      },
      {
        question: 'How should you prioritize operational recovery?',
        options: [
          'Recover all systems simultaneously',
          'Start with non-critical systems',
          'Prioritize based on business impact and dependencies',
          'Wait for complete investigation'
        ],
        correctAnswer: 2,
        explanation: 'Prioritizing based on business impact ensures critical operations are restored first.',
        hints: [
          'Consider business continuity',
          'Think about system dependencies'
        ]
      },
      {
        question: 'What operational channels should be used during the incident?',
        options: [
          'Regular email system',
          'Public announcement system',
          'Secure incident response channels',
          'Social media platforms'
        ],
        correctAnswer: 2,
        explanation: 'Secure incident response channels ensure operational coordination while maintaining security.',
        hints: [
          'Consider secure communications',
          'Think about coordination needs'
        ]
      },
      {
        question: 'How should operational access be managed during the incident?',
        options: [
          'Maintain all access levels',
          'Revoke all access',
          'Implement strict access controls with monitoring',
          'Delegate access decisions'
        ],
        correctAnswer: 2,
        explanation: 'Strict access controls with monitoring help maintain security while enabling necessary operations.',
        hints: [
          'Consider access requirements',
          'Think about security controls'
        ]
      },
      {
        question: 'What operational documentation should be maintained?',
        options: [
          'Only final resolution steps',
          'No documentation needed',
          'Comprehensive incident timeline and actions',
          'Only system logs'
        ],
        correctAnswer: 2,
        explanation: 'Comprehensive documentation helps track the incident and improve future response.',
        hints: [
          'Consider incident tracking',
          'Think about lessons learned'
        ]
      }
    ]
  },
  {
    id: 'ransom',
    title: 'Ransom Pay',
    description: 'Handle ransom demands and payment considerations',
    icon: <Banknote className="h-12 w-12 text-yellow-500" />,
    impact: 'Financial Impact and Data Recovery',
    scenario: 'The attackers have demanded a significant ransom payment in cryptocurrency to provide decryption keys. You must evaluate the ransom demand while considering data recovery options and organizational impact.',
    questions: [
      {
        question: 'What is your first step in evaluating the ransom demand?',
        options: [
          'Calculate payment amount',
          'Assess data recovery capabilities and impact',
          'Prepare cryptocurrency wallet',
          'Contact attackers immediately'
        ],
        correctAnswer: 1,
        explanation: 'Assessing recovery capabilities helps determine if payment is necessary.',
        hints: [
          'Consider backup availability',
          'Think about recovery options'
        ]
      },
      {
        question: 'How should you document ransom-related decisions?',
        options: [
          'Screenshot ransom note only',
          'Ignore documentation',
          'Maintain comprehensive decision records',
          'Only record payment details'
        ],
        correctAnswer: 2,
        explanation: 'Complete documentation protects the organization and informs future decisions.',
        hints: [
          'Consider legal requirements',
          'Think about decision tracking'
        ]
      },
      {
        question: 'What factors should NOT primarily influence payment decision?',
        options: [
          'Data recovery options',
          'Business impact',
          'Ransom amount alone',
          'Legal implications'
        ],
        correctAnswer: 2,
        explanation: 'The ransom amount alone should not drive the decision; consider all factors.',
        hints: [
          'Consider multiple factors',
          'Think about long-term impact'
        ]
      },
      {
        question: 'What preparations are needed before any payment decision?',
        options: [
          'Just cryptocurrency setup',
          'Complete impact and recovery assessment',
          'Draft public statement',
          'Budget allocation only'
        ],
        correctAnswer: 1,
        explanation: 'A thorough assessment helps make an informed payment decision.',
        hints: [
          'Consider assessment needs',
          'Think about decision factors'
        ]
      },
      {
        question: 'How should negotiations be handled?',
        options: [
          'Accept first demand',
          'Ignore all demands',
          'Follow established incident response procedures',
          'Make counter-offers'
        ],
        correctAnswer: 2,
        explanation: 'Following procedures ensures consistent and appropriate handling of demands.',
        hints: [
          'Consider response protocols',
          'Think about negotiation risks'
        ]
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Loss',
    description: 'Assessment and management of incident-related costs',
    icon: <AlertTriangle className="h-12 w-12 text-orange-500" />,
    impact: 'Financial Impact and Recovery Costs',
    scenario: 'The ransomware incident has caused significant financial impact through system downtime, recovery costs, and potential data loss. You need to assess and manage these financial implications while planning recovery efforts.',
    questions: [
      {
        question: 'How should you assess the financial impact?',
        options: [
          'Only direct costs',
          'Wait until resolution',
          'Comprehensive cost and impact analysis',
          'Basic damage estimate'
        ],
        correctAnswer: 2,
        explanation: 'A comprehensive analysis helps understand full financial implications.',
        hints: [
          'Consider all cost types',
          'Think about long-term impact'
        ]
      },
      {
        question: 'What should be included in cost assessment?',
        options: [
          'Only system repairs',
          'Just overtime costs',
          'All direct and indirect costs including recovery',
          'Hardware costs only'
        ],
        correctAnswer: 2,
        explanation: 'Including all costs ensures accurate impact assessment.',
        hints: [
          'Consider hidden costs',
          'Think about recovery expenses'
        ]
      },
      {
        question: 'How should recovery spending be prioritized?',
        options: [
          'Lowest cost options',
          'Most expensive solutions',
          'Based on business impact and effectiveness',
          'Equal distribution'
        ],
        correctAnswer: 2,
        explanation: 'Prioritizing based on impact ensures effective use of resources.',
        hints: [
          'Consider cost-benefit',
          'Think about critical needs'
        ]
      },
      {
        question: 'What financial documentation is crucial?',
        options: [
          'Only invoices',
          'Basic summaries',
          'Detailed records of all costs and decisions',
          'Budget reports only'
        ],
        correctAnswer: 2,
        explanation: 'Detailed documentation supports insurance claims and future planning.',
        hints: [
          'Consider insurance needs',
          'Think about audit requirements'
        ]
      },
      {
        question: 'How should budget adjustments be handled?',
        options: [
          'Cut all spending',
          'Ignore budget limits',
          'Strategic reallocation based on priorities',
          'Maintain current budget'
        ],
        correctAnswer: 2,
        explanation: 'Strategic reallocation ensures critical needs are met while managing costs.',
        hints: [
          'Consider critical needs',
          'Think about resource allocation'
        ]
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical Recovery',
    description: 'System restoration and data recovery procedures',
    icon: <AlertTriangle className="h-12 w-12 text-orange-500" />,
    impact: 'System Restoration and Data Integrity',
    scenario: 'As IT Security Lead, you must coordinate the technical recovery of affected systems while ensuring data integrity and preventing re-infection. The recovery process must be carefully planned and executed to minimize business disruption.',
    questions: [
      {
        question: 'How should you approach system recovery?',
        options: [
          'Restore from the most recent backup',
          'Wait until the incident is over',
          'Follow a structured recovery plan with validation steps',
          'Focus only on critical systems'
        ],
        correctAnswer: 2,
        explanation: 'A structured recovery plan ensures systematic and validated restoration.',
        hints: [
          'Think about recovery procedures',
          'Consider validation requirements'
        ]
      },
      {
        question: 'What should be included in the technical recovery plan?',
        options: [
          'Only system restoration steps',
          'Just data recovery procedures',
          'Comprehensive recovery procedures with validation and testing',
          'Only security updates'
        ],
        correctAnswer: 2,
        explanation: 'A complete recovery plan ensures all aspects of system restoration are covered.',
        hints: [
          'Consider all recovery aspects',
          'Think about validation steps'
        ]
      },
      {
        question: 'How should you handle system monitoring during recovery?',
        options: [
          'Disable monitoring',
          'Continue normal monitoring',
          'Implement enhanced monitoring with alerts',
          'Reduce monitoring to save resources'
        ],
        correctAnswer: 2,
        explanation: 'Enhanced monitoring helps detect any issues during recovery.',
        hints: [
          'Consider system stability',
          'Think about early warning systems'
        ]
      },
      {
        question: 'What security measures should be implemented during recovery?',
        options: [
          'Only basic security',
          'Just network segmentation',
          'Comprehensive security controls and monitoring',
          'None until recovery is complete'
        ],
        correctAnswer: 2,
        explanation: 'Multiple security measures help prevent re-infection during recovery.',
        hints: [
          'Think about layered security',
          'Consider protection mechanisms'
        ]
      },
      {
        question: 'How should you communicate technical status to stakeholders?',
        options: [
          'Provide only positive information',
          'Share complete technical status with recovery progress',
          'Delay communication until full recovery',
          'Delegate to the IT team'
        ],
        correctAnswer: 1,
        explanation: 'Sharing complete technical status helps stakeholders understand the recovery progress.',
        hints: [
          'Consider stakeholder needs',
          'Think about transparency'
        ]
      }
    ]
  },
  {
    id: 'regulatory',
    title: 'Regulatory Notification',
    description: 'Compliance with notification requirements',
    icon: <Bell className="h-12 w-12 text-purple-500" />,
    impact: 'Compliance and Legal Obligations',
    scenario: 'The ransomware incident requires notifications to various regulatory bodies due to potential data exposure. You must ensure compliance with all applicable notification requirements while managing the ongoing incident.',
    questions: [
      {
        question: 'When should regulatory authorities be notified?',
        options: [
          'Only after resolution',
          'Within required notification timeframes',
          'After public disclosure',
          'When asked by regulators'
        ],
        correctAnswer: 1,
        explanation: 'Timely notification within required timeframes ensures compliance.',
        hints: [
          'Consider legal deadlines',
          'Think about notification requirements'
        ]
      },
      {
        question: 'What information must be included in notifications?',
        options: [
          'Basic incident details',
          'Technical analysis only',
          'Required information per regulations',
          'System status only'
        ],
        correctAnswer: 2,
        explanation: 'Including required information ensures regulatory compliance.',
        hints: [
          'Consider regulatory requirements',
          'Think about notification content'
        ]
      },
      {
        question: 'How should multiple regulations be handled?',
        options: [
          'Follow strictest only',
          'Choose one regulation',
          'Comply with all applicable requirements',
          'Minimum compliance only'
        ],
        correctAnswer: 2,
        explanation: 'Meeting all applicable requirements ensures full compliance.',
        hints: [
          'Consider all obligations',
          'Think about overlapping requirements'
        ]
      },
      {
        question: 'What documentation should be maintained?',
        options: [
          'Notification copies only',
          'Basic records only',
          'Comprehensive compliance records',
          'System logs only'
        ],
        correctAnswer: 2,
        explanation: 'Complete documentation demonstrates compliance efforts.',
        hints: [
          'Consider audit needs',
          'Think about compliance proof'
        ]
      },
      {
        question: 'How should ongoing regulatory updates be managed?',
        options: [
          'Wait for requests',
          'Minimal updates',
          'Proactive communication and updates',
          'Final report only'
        ],
        correctAnswer: 2,
        explanation: 'Proactive updates maintain good regulatory relationships.',
        hints: [
          'Consider regulator needs',
          'Think about ongoing compliance'
        ]
      }
    ]
  },
  {
    id: 'employee',
    title: 'Employee Notification',
    description: 'Internal communication and staff updates',
    icon: <Users className="h-12 w-12 text-blue-500" />,
    impact: 'Staff Awareness and Response',
    scenario: 'Employees need to be informed about the ransomware incident and their role in the response. You must manage internal communications while ensuring security and maintaining operational effectiveness.',
    questions: [
      {
        question: 'What should employees be told initially?',
        options: [
          'Technical details only',
          'Clear instructions and immediate actions',
          'System names only',
          'Complete investigation results'
        ],
        correctAnswer: 1,
        explanation: 'Clear instructions help employees respond appropriately.',
        hints: [
          'Consider immediate needs',
          'Think about action items'
        ]
      },
      {
        question: 'How should employee communications be prioritized?',
        options: [
          'All at once',
          'Random order',
          'Based on impact and role',
          'Alphabetical order'
        ],
        correctAnswer: 2,
        explanation: 'Prioritizing by impact ensures critical staff are informed first.',
        hints: [
          'Consider role importance',
          'Think about response needs'
        ]
      },
      {
        question: 'What communication channels should be used?',
        options: [
          'Email only',
          'Phone only',
          'Multiple secure channels',
          'Public channels'
        ],
        correctAnswer: 2,
        explanation: 'Multiple secure channels ensure reliable communication.',
        hints: [
          'Consider security needs',
          'Think about reliability'
        ]
      },
      {
        question: 'How should employee questions be handled?',
        options: [
          'Ignore questions',
          'Individual responses',
          'Structured response system',
          'Defer all questions'
        ],
        correctAnswer: 2,
        explanation: 'A structured system ensures consistent and efficient responses.',
        hints: [
          'Consider response efficiency',
          'Think about consistency'
        ]
      },
      {
        question: 'What ongoing updates should be provided?',
        options: [
          'None needed',
          'Technical only',
          'Regular status and action updates',
          'Final resolution only'
        ],
        correctAnswer: 2,
        explanation: 'Regular updates maintain awareness and engagement.',
        hints: [
          'Consider information needs',
          'Think about ongoing awareness'
        ]
      }
    ]
  },
  {
    id: 'crisis',
    title: 'Crisis Communication',
    description: 'External stakeholder communication',
    icon: <MessageSquare className="h-12 w-12 text-green-500" />,
    impact: 'Public Relations and Trust',
    scenario: 'The ransomware incident requires careful communication with external stakeholders. You must manage public relations while protecting sensitive information and maintaining stakeholder confidence.',
    questions: [
      {
        question: 'Who should handle external communications?',
        options: [
          'IT staff',
          'Any manager',
          'Designated communication team',
          'Security team'
        ],
        correctAnswer: 2,
        explanation: 'A designated team ensures consistent and appropriate messaging.',
        hints: [
          'Consider message control',
          'Think about consistency'
        ]
      },
      {
        question: 'How should initial statements be handled?',
        options: [
          'Share all details',
          'No comment',
          'Confirmed facts and actions',
          'Deny incident'
        ],
        correctAnswer: 2,
        explanation: 'Sharing confirmed information maintains credibility.',
        hints: [
          'Consider transparency',
          'Think about accuracy'
        ]
      },
      {
        question: 'What stakeholders should be prioritized?',
        options: [
          'Media only',
          'Random order',
          'Based on impact and relationship',
          'Whoever asks first'
        ],
        correctAnswer: 2,
        explanation: 'Prioritizing based on impact ensures appropriate attention.',
        hints: [
          'Consider stakeholder importance',
          'Think about relationships'
        ]
      },
      {
        question: 'How should media inquiries be managed?',
        options: [
          'Ignore all',
          'Individual responses',
          'Coordinated through spokesperson',
          'Automated responses'
        ],
        correctAnswer: 2,
        explanation: 'Coordinated responses ensure consistent messaging.',
        hints: [
          'Consider message consistency',
          'Think about media management'
        ]
      },
      {
        question: 'What should updates include?',
        options: [
          'Technical details',
          'All information',
          'Relevant progress and actions',
          'Minimal information'
        ],
        correctAnswer: 2,
        explanation: 'Relevant updates maintain transparency while protecting sensitive details.',
        hints: [
          'Consider information needs',
          'Think about security'
        ]
      }
    ]
  },
  {
    id: 'strategic',
    title: 'Strategic Impact',
    description: 'Long-term impact and planning',
    icon: <Target className="h-12 w-12 text-indigo-500" />,
    impact: 'Organizational Strategy and Resilience',
    scenario: 'The ransomware incident requires evaluation of long-term strategic implications. You must assess the impact on organizational strategy and develop plans for improved resilience.',
    questions: [
      {
        question: 'What should strategic assessment focus on?',
        options: [
          'Technical fixes only',
          'Current issues only',
          'Long-term impact and improvements',
          'Cost cutting'
        ],
        correctAnswer: 2,
        explanation: 'Long-term focus ensures comprehensive improvements.',
        hints: [
          'Consider future needs',
          'Think about resilience'
        ]
      },
      {
        question: 'How should strategic objectives be reviewed?',
        options: [
          'No changes needed',
          'Complete replacement',
          'Evaluate and adjust as needed',
          'Technical focus only'
        ],
        correctAnswer: 2,
        explanation: 'Thoughtful evaluation ensures appropriate adjustments.',
        hints: [
          'Consider current objectives',
          'Think about necessary changes'
        ]
      },
      {
        question: 'What areas need strategic review?',
        options: [
          'Technical only',
          'Security only',
          'All affected areas and processes',
          'Budget only'
        ],
        correctAnswer: 2,
        explanation: 'Comprehensive review ensures thorough improvements.',
        hints: [
          'Consider all impacts',
          'Think about interconnections'
        ]
      },
      {
        question: 'How should improvements be prioritized?',
        options: [
          'Lowest cost first',
          'Quick fixes only',
          'Based on risk and value',
          'Random order'
        ],
        correctAnswer: 2,
        explanation: 'Risk-based prioritization ensures effective improvements.',
        hints: [
          'Consider risk levels',
          'Think about business value'
        ]
      },
      {
        question: 'What timeframe should planning cover?',
        options: [
          'Next month',
          'Current quarter',
          'Multi-year comprehensive plan',
          'Next week'
        ],
        correctAnswer: 2,
        explanation: 'Long-term planning ensures sustainable improvements.',
        hints: [
          'Consider future needs',
          'Think about sustainability'
        ]
      }
    ]
  }
];

function App() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);
  const [hintCounts, setHintCounts] = useState<number[]>([]);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference or saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Update theme class and save preference
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setShowResults(false);
    setAnsweredQuestions([]);
    setHintCounts(new Array(riskCards.find(c => c.id === cardId)?.questions.length || 0).fill(0));
    setShowHint(false);
  };

  const handleHintClick = () => {
    const currentCard = riskCards.find(c => c.id === selectedCard);
    if (!currentCard || !currentCard.questions[currentQuestionIndex].hints) return;

    const newHintCounts = [...hintCounts];
    if (newHintCounts[currentQuestionIndex] < 2) {
      newHintCounts[currentQuestionIndex]++;
      setHintCounts(newHintCounts);
      setShowHint(true);
    }
  };

  const getQuestionScore = (questionIndex: number) => {
    const hintCount = hintCounts[questionIndex];
    if (hintCount === 0) return 5;
    if (hintCount === 1) return 3;
    return 2;
  };

  const calculateTotalScore = () => {
    return answeredQuestions.reduce((total, isCorrect, index) => {
      return total + (isCorrect ? getQuestionScore(index) : 0);
    }, 0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    const currentCard = riskCards.find(c => c.id === selectedCard);
    if (currentCard) {
      const isCorrect = answerIndex === currentCard.questions[currentQuestionIndex].correctAnswer;
      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[currentQuestionIndex] = isCorrect;
      setAnsweredQuestions(newAnsweredQuestions);

      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    const currentCard = riskCards.find(c => c.id === selectedCard);
    if (currentCard && currentQuestionIndex < currentCard.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
    }
  };

  const getPerformanceMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "Excellent! You have a perfect understanding of operational disruption handling.";
    if (percentage >= 80) return "Great job! You have a strong grasp of the concepts with minor areas for improvement.";
    if (percentage >= 60) return "Good effort! Consider reviewing the areas where you made mistakes.";
    return "You might benefit from additional training on operational disruption procedures.";
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setShowResults(false);
    setAnsweredQuestions([]);
  };

  const navItems = [
    { name: "Home", link: "/", icon: <Shield className="h-4 w-4" /> },
    { name: "Assessments", link: "/assessments", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Resources", link: "/resources", icon: <Lock className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen relative">
      <GridBackgroundDemo />
      <div className="relative z-10 min-h-screen bg-white/50 dark:bg-black/50">
        <FloatingNav navItems={navItems} isDark={isDark} toggleTheme={toggleTheme} />

        {/* Main Content */}
        <div className="pt-24">
          {/* Hero Section */}
          <header className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="text-center">
                <Shield className="h-20 w-20 text-blue-500 dark:text-blue-600 mx-auto mb-8" />
                <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  IT System - Ransomware Attack Scenario
                </h1>
                <p className="text-xl text-slate-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  The Security Operations Center (SOC) has detected a sophisticated ransomware attack targeting critical IT systems. 
                  Multiple endpoints are showing signs of encryption, and the attackers are demanding payment in cryptocurrency. 
                  As the IT Security Lead, you must coordinate the incident response while ensuring business continuity and data protection.
                </p>
              </div>
            </div>
          </header>

          {/* Risk Cards Grid */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-12">Risk Cards</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {riskCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className={`bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                      selectedCard === card.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleCardClick(card.id)}
                    whileHover={{ y: -5 }}
                  >
                    <div>
                      {card.icon}
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                      <p className="text-slate-700 dark:text-gray-300">{card.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
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

      {/* Expanded Card View */}
      <AnimatePresence>
        {selectedCard && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl w-[75vw] max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      {riskCards.find(c => c.id === selectedCard)?.title}
                    </h3>
                    <p className="text-red-600 dark:text-red-400 font-semibold">
                      Impact: {riskCards.find(c => c.id === selectedCard)?.impact}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {!showResults && (
                  <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg mb-8">
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Scenario</h4>
                    <p className="text-slate-700 dark:text-gray-300">
                      {riskCards.find(c => c.id === selectedCard)?.scenario}
                    </p>
                  </div>
                )}

                {showResults ? (
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Assessment Report</h4>
                    <div className="mb-6">
                      <div className="bg-slate-200 dark:bg-slate-800 p-4 rounded-lg mb-4">
                        <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Summarized Report</h5>
                        <p className="text-slate-700 dark:text-gray-300">
                          {`You have completed ${riskCards.find(c => c.id === selectedCard)?.title.toLowerCase()} management assessment. Your score is ${calculateTotalScore()}/25.${answeredQuestions.filter(isCorrect => !isCorrect).length > 0 ? ' Review the areas for improvement to strengthen your response strategy.' : ''}`}
                        </p>
                      </div>
                      <p className="text-xl text-slate-900 dark:text-white mb-4">
                        Score: {calculateTotalScore()} out of 25
                      </p>
                      
                      <>
                        <p className="text-lg text-green-600 dark:text-green-400 mb-4">
                          Assessment Complete
                        </p>
                        <div className="mb-4">
                          <p className="text-lg text-slate-900 dark:text-white mb-2">Performance Analysis:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-200 dark:bg-slate-600 p-4 rounded-lg">
                              <p className="font-semibold mb-2 text-slate-900 dark:text-white">Correct Answers:</p>
                              {answeredQuestions.map((isCorrect, index) => (
                                isCorrect && (
                                  <p key={index} className="text-green-600 dark:text-white">
                                    ✓ Question {index + 1}
                                  </p>
                                )
                              ))}
                            </div>
                            <div className="bg-slate-200 dark:bg-slate-600 p-4 rounded-lg">
                              <p className="font-semibold mb-2 text-slate-900 dark:text-white">Areas for Improvement:</p>
                              {answeredQuestions.map((isCorrect, index) => (
                                !isCorrect && (
                                  <div key={index} className="mb-2">
                                    <p className="text-red-600 dark:text-white">
                                      ✗ Question {index + 1}
                                    </p>
                                    <p className="text-slate-600 dark:text-white text-sm">
                                      {riskCards.find(c => c.id === selectedCard)?.questions[index].explanation}
                                    </p>
                                  </div>
                                )
                              ))}
                            </div>
                          </div>
                        </div>
                        {selectedCard !== riskCards[riskCards.length - 1].id ? (
                          <button
                            onClick={() => {
                              const currentIndex = riskCards.findIndex(c => c.id === selectedCard);
                              handleCardClick(riskCards[currentIndex + 1].id);
                            }}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full"
                          >
                            Next Risk Card
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedCard(null)}
                            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full"
                          >
                            Return to Main Page
                          </button>
                        )}
                      </>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl text-slate-900 dark:text-white">
                          Question {currentQuestionIndex + 1} of {riskCards.find(c => c.id === selectedCard)?.questions.length}
                        </h4>
                        <button
                          onClick={handleHintClick}
                          disabled={hintCounts[currentQuestionIndex] >= 2}
                          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50"
                        >
                          <span>💡</span>
                          <span>Hint ({2 - hintCounts[currentQuestionIndex]} left)</span>
                        </button>
                      </div>

                      {showHint && (
                        <div className="bg-blue-100/50 dark:bg-blue-900/50 p-4 rounded-lg mb-4 animate-fade-in">
                          <p className="text-blue-900 dark:text-blue-200 font-semibold">Hint:</p>
                          <p className="text-blue-900 dark:text-blue-200">
                            {riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].hints?.[hintCounts[currentQuestionIndex] - 1]}
                          </p>
                        </div>
                      )}

                      <p className="text-slate-900 dark:text-gray-200">
                        {riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].question}
                      </p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {riskCards
                        .find(c => c.id === selectedCard)
                        ?.questions[currentQuestionIndex].options.map((option, index) => (
                          <button
                            key={index}
                            className={`w-full text-left p-4 rounded-lg transition-colors flex justify-between items-center ${
                              selectedAnswer === index
                                ? selectedAnswer === riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].correctAnswer
                                  ? 'bg-green-600 text-white'
                                  : 'bg-red-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-600 text-slate-900 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-slate-500'
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                          >
                            <span>{option}</span>
                            {selectedAnswer === index && (
                              selectedAnswer === riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].correctAnswer
                                ? <CheckCircle className="h-6 w-6 text-white" />
                                : <XCircle className="h-6 w-6 text-white" />
                            )}
                          </button>
                        ))}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <p className="text-blue-900 dark:text-blue-100 font-semibold">Right Approach:</p>
                        <p className="text-blue-800 dark:text-blue-200">
                          {riskCards.find(c => c.id === selectedCard)?.questions[currentQuestionIndex].explanation}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <button
                        onClick={handlePrevQuestion}
                        disabled={currentQuestionIndex === 0}
                        className={`px-6 py-2 rounded-full ${
                          currentQuestionIndex === 0
                            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-600 dark:text-white'
                            : 'bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white'
                        }`}
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className={`px-6 py-2 rounded-full ${
                          selectedAnswer === null
                            ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-slate-600 dark:text-white'
                            : 'bg-blue-600 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-700 text-white'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;