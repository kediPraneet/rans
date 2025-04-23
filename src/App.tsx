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
    description: 'Manage legal operations during system outages and service disruptions',
    icon: <Building2 className="h-12 w-12 text-red-500" />,
    impact: 'Legal Operations and Client Services',
    scenario: 'As Legal Division Lead, you discover that ransomware has encrypted critical legal case management systems, client files, and court document repositories. The attack has halted all legal operations, affecting case management and client services. You must quickly address the disruption while maintaining legal obligations and client confidentiality.',
    questions: [
      {
        question: 'What should be your first priority when legal operations are disrupted?',
        options: [
          'Continue normal legal proceedings',
          'Assess impact on active cases and client obligations',
          'Contact all clients immediately',
          'Start system restoration'
        ],
        correctAnswer: 1,
        explanation: 'Assessing impact on active cases helps prioritize critical legal obligations while understanding the scope of disruption.',
        hints: [
          'Consider legal obligations',
          'Think about client impact'
        ]
      },
      {
        question: 'How should you prioritize legal operations recovery?',
        options: [
          'Recover all systems simultaneously',
          'Start with non-critical cases',
          'Prioritize based on court deadlines and client impact',
          'Wait for complete investigation'
        ],
        correctAnswer: 2,
        explanation: 'Prioritizing based on court deadlines ensures critical legal obligations are met first.',
        hints: [
          'Consider court deadlines',
          'Think about client impact'
        ]
      },
      {
        question: 'What communication channels should be used during the incident?',
        options: [
          'Regular email system',
          'Public announcement system',
          'Secure legal communication channels',
          'Social media platforms'
        ],
        correctAnswer: 2,
        explanation: 'Secure legal communication channels ensure client confidentiality while maintaining necessary communications.',
        hints: [
          'Consider attorney-client privilege',
          'Think about confidentiality requirements'
        ]
      },
      {
        question: 'How should access to legal documents be managed during the incident?',
        options: [
          'Maintain all access levels',
          'Revoke all access',
          'Implement strict access controls with monitoring',
          'Delegate access decisions'
        ],
        correctAnswer: 2,
        explanation: 'Strict access controls with monitoring help maintain client confidentiality while enabling necessary legal work.',
        hints: [
          'Consider confidentiality requirements',
          'Think about legal obligations'
        ]
      },
      {
        question: 'What documentation should be maintained for legal purposes?',
        options: [
          'Only final resolution steps',
          'No documentation needed',
          'Comprehensive incident timeline and legal impact assessment',
          'Only system logs'
        ],
        correctAnswer: 2,
        explanation: 'Comprehensive documentation helps track the incident and may be required for legal proceedings.',
        hints: [
          'Consider legal requirements',
          'Think about potential litigation'
        ]
      }
    ]
  },
  {
    id: 'ransom',
    title: 'Ransom Pay',
    description: 'Handle ransom demands and legal considerations',
    icon: <Banknote className="h-12 w-12 text-yellow-500" />,
    impact: 'Legal Implications and Data Protection',
    scenario: 'The attackers have demanded a significant ransom payment in cryptocurrency to provide decryption keys for sensitive legal documents and client files. You must evaluate the ransom demand while considering legal obligations, client confidentiality, and regulatory requirements.',
    questions: [
      {
        question: 'What is your first step in evaluating the ransom demand?',
        options: [
          'Calculate payment amount',
          'Assess legal obligations and regulatory requirements',
          'Prepare cryptocurrency wallet',
          'Contact attackers immediately'
        ],
        correctAnswer: 1,
        explanation: 'Assessing legal obligations helps determine appropriate response while maintaining compliance.',
        hints: [
          'Consider regulatory requirements',
          'Think about legal obligations'
        ]
      },
      {
        question: 'How should you document ransom-related decisions?',
        options: [
          'Screenshot ransom note only',
          'Ignore documentation',
          'Maintain comprehensive legal decision records',
          'Only record payment details'
        ],
        correctAnswer: 2,
        explanation: 'Complete documentation protects the organization and may be required for legal proceedings.',
        hints: [
          'Consider legal requirements',
          'Think about potential litigation'
        ]
      },
      {
        question: 'What factors should NOT primarily influence payment decision?',
        options: [
          'Legal obligations',
          'Regulatory requirements',
          'Ransom amount alone',
          'Client impact'
        ],
        correctAnswer: 2,
        explanation: 'The ransom amount alone should not drive the decision; consider all legal and regulatory factors.',
        hints: [
          'Consider multiple factors',
          'Think about legal implications'
        ]
      },
      {
        question: 'What legal preparations are needed before any payment decision?',
        options: [
          'Just cryptocurrency setup',
          'Complete legal and regulatory assessment',
          'Draft public statement',
          'Budget allocation only'
        ],
        correctAnswer: 1,
        explanation: 'A thorough legal assessment helps make an informed payment decision.',
        hints: [
          'Consider regulatory requirements',
          'Think about legal obligations'
        ]
      },
      {
        question: 'How should negotiations be handled?',
        options: [
          'Accept first demand',
          'Ignore all demands',
          'Follow established legal procedures',
          'Make counter-offers'
        ],
        correctAnswer: 2,
        explanation: 'Following legal procedures ensures compliance with regulations and protects client interests.',
        hints: [
          'Consider legal protocols',
          'Think about regulatory requirements'
        ]
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Loss',
    description: 'Assessment and management of legal costs and liabilities',
    icon: <AlertTriangle className="h-12 w-12 text-orange-500" />,
    impact: 'Legal Costs and Liability Management',
    scenario: 'The ransomware incident has caused significant financial impact through legal operations downtime, potential client claims, and regulatory penalties. You need to assess and manage these financial implications while maintaining legal obligations.',
    questions: [
      {
        question: 'How should you assess the financial impact?',
        options: [
          'Only direct costs',
          'Wait until resolution',
          'Comprehensive legal and financial analysis',
          'Basic damage estimate'
        ],
        correctAnswer: 2,
        explanation: 'A comprehensive analysis helps understand full financial and legal implications.',
        hints: [
          'Consider all cost types',
          'Think about potential liabilities'
        ]
      },
      {
        question: 'What should be included in cost assessment?',
        options: [
          'Only system repairs',
          'Just overtime costs',
          'All direct costs, potential claims, and regulatory penalties',
          'Hardware costs only'
        ],
        correctAnswer: 2,
        explanation: 'Including all potential costs ensures accurate impact assessment.',
        hints: [
          'Consider potential claims',
          'Think about regulatory penalties'
        ]
      },
      {
        question: 'How should recovery spending be prioritized?',
        options: [
          'Lowest cost options',
          'Most expensive solutions',
          'Based on legal obligations and client impact',
          'Equal distribution'
        ],
        correctAnswer: 2,
        explanation: 'Prioritizing based on legal obligations ensures compliance and client protection.',
        hints: [
          'Consider legal requirements',
          'Think about client impact'
        ]
      },
      {
        question: 'What financial documentation is crucial for legal purposes?',
        options: [
          'Only invoices',
          'Just payment records',
          'Comprehensive financial impact and legal cost documentation',
          'Basic expense tracking'
        ],
        correctAnswer: 2,
        explanation: 'Complete documentation helps track costs and may be required for legal proceedings.',
        hints: [
          'Consider legal requirements',
          'Think about potential claims'
        ]
      },
      {
        question: 'How should potential client claims be handled?',
        options: [
          'Ignore until formal claim',
          'Proactively assess and document',
          'Wait for client complaints',
          'Assume no claims will occur'
        ],
        correctAnswer: 1,
        explanation: 'Proactive assessment helps prepare for potential claims and protect the organization.',
        hints: [
          'Consider client impact',
          'Think about legal protection'
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
    id: 'reputation',
    title: 'Reputation Damage',
    description: 'Manage legal reputation and client trust',
    icon: <Users className="h-12 w-12 text-blue-500" />,
    impact: 'Client Trust and Legal Standing',
    scenario: "The ransomware attack has compromised sensitive client information and disrupted legal services. News of the incident is spreading, potentially damaging the legal division's reputation and client trust. You must manage the situation while protecting client interests and maintaining professional obligations.",
    questions: [
      {
        question: 'What should be your first communication priority?',
        options: [
          'Public statement to media',
          'Direct communication with affected clients',
          'Internal staff announcement',
          'Social media update'
        ],
        correctAnswer: 1,
        explanation: 'Direct client communication maintains trust and fulfills legal obligations.',
        hints: [
          'Consider client obligations',
          'Think about confidentiality'
        ]
      },
      {
        question: 'How should client concerns be addressed?',
        options: [
          'Generic responses',
          'Individual case-by-case assessment',
          'Standard template',
          'Defer to management'
        ],
        correctAnswer: 1,
        explanation: "Individual assessment ensures proper handling of each client's situation.",
        hints: [
          'Consider client impact',
          'Think about legal obligations'
        ]
      },
      {
        question: 'What information should be included in client communications?',
        options: [
          'Full technical details',
          'Only necessary legal information',
          'Complete incident report',
          'No information'
        ],
        correctAnswer: 1,
        explanation: 'Providing necessary legal information maintains transparency while protecting interests.',
        hints: [
          'Consider legal requirements',
          'Think about client needs'
        ]
      },
      {
        question: 'How should media inquiries be handled?',
        options: [
          'Full disclosure',
          'No comment',
          'Through legal communications team',
          'Direct responses'
        ],
        correctAnswer: 2,
        explanation: 'Legal communications team ensures consistent and appropriate messaging.',
        hints: [
          'Consider legal implications',
          'Think about client confidentiality'
        ]
      },
      {
        question: 'What reputation recovery steps are most important?',
        options: [
          'Marketing campaign',
          'Demonstrating legal compliance and client protection',
          'Price reductions',
          'Staff changes'
        ],
        correctAnswer: 1,
        explanation: 'Demonstrating compliance and protection rebuilds trust effectively.',
        hints: [
          'Consider legal obligations',
          'Think about client trust'
        ]
      }
    ]
  },
  {
    id: 'regulatory',
    title: 'Regulatory Compliance',
    description: 'Ensure compliance with legal and regulatory requirements',
    icon: <Shield className="h-12 w-12 text-green-500" />,
    impact: 'Legal Compliance and Reporting',
    scenario: 'The ransomware attack has potentially compromised client confidentiality and affected legal operations. You must ensure compliance with legal regulations, reporting requirements, and professional obligations while managing the incident.',
    questions: [
      {
        question: 'What is your first regulatory compliance step?',
        options: [
          'Wait for regulator inquiry',
          'Assess regulatory reporting requirements',
          'Contact all regulators',
          'Internal review only'
        ],
        correctAnswer: 1,
        explanation: 'Assessing requirements ensures timely and appropriate regulatory compliance.',
        hints: [
          'Consider reporting deadlines',
          'Think about regulatory obligations'
        ]
      },
      {
        question: 'How should regulatory documentation be prepared?',
        options: [
          'Basic summary',
          'Comprehensive legal and technical documentation',
          'Informal notes',
          'Verbal report'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive documentation ensures proper regulatory compliance.',
        hints: [
          'Consider legal requirements',
          'Think about documentation standards'
        ]
      },
      {
        question: 'What regulatory notifications are required?',
        options: [
          'All possible regulators',
          'Only mandatory notifications',
          'No notifications',
          'Selected regulators'
        ],
        correctAnswer: 1,
        explanation: 'Focusing on mandatory notifications ensures proper compliance.',
        hints: [
          'Consider legal requirements',
          'Think about notification obligations'
        ]
      },
      {
        question: 'How should regulatory interactions be managed?',
        options: [
          'Direct communication',
          'Through legal counsel',
          'Informal discussions',
          'Written responses only'
        ],
        correctAnswer: 1,
        explanation: 'Legal counsel ensures proper handling of regulatory matters.',
        hints: [
          'Consider legal implications',
          'Think about professional standards'
        ]
      },
      {
        question: 'What compliance monitoring should be implemented?',
        options: [
          'Basic checks',
          'Enhanced legal and regulatory monitoring',
          'No changes needed',
          'External audit only'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced monitoring helps maintain ongoing compliance.',
        hints: [
          'Consider regulatory requirements',
          'Think about continuous compliance'
        ]
      }
    ]
  },
  {
    id: 'data',
    title: 'Data Protection',
    description: 'Safeguard legal documents and client information',
    icon: <Lock className="h-12 w-12 text-purple-500" />,
    impact: 'Client Confidentiality and Data Security',
    scenario: 'The ransomware attack has potentially compromised sensitive legal documents and client information. You must ensure the protection of privileged communications and confidential data while maintaining legal obligations and client trust.',
    questions: [
      {
        question: 'What is your first data protection priority?',
        options: [
          'System restoration',
          'Assess data exposure and legal implications',
          'Contact all clients',
          'Public announcement'
        ],
        correctAnswer: 1,
        explanation: 'Assessing exposure helps determine necessary protective measures.',
        hints: [
          'Consider client confidentiality',
          'Think about legal obligations'
        ]
      },
      {
        question: 'How should compromised data be handled?',
        options: [
          'Ignore if encrypted',
          'Comprehensive legal assessment and notification',
          'Basic cleanup',
          'System reset'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive assessment ensures proper handling of compromised data.',
        hints: [
          'Consider legal requirements',
          'Think about client impact'
        ]
      },
      {
        question: 'What data protection measures should be implemented?',
        options: [
          'Basic security',
          'Enhanced legal data protection controls',
          'No changes needed',
          'External monitoring only'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced controls help protect sensitive legal information.',
        hints: [
          'Consider confidentiality requirements',
          'Think about data protection'
        ]
      },
      {
        question: 'How should data access be managed?',
        options: [
          'Open access',
          'Strict legal need-to-know basis',
          'Department-level access',
          'No restrictions'
        ],
        correctAnswer: 1,
        explanation: 'Need-to-know basis maintains proper confidentiality.',
        hints: [
          'Consider attorney-client privilege',
          'Think about access controls'
        ]
      },
      {
        question: 'What documentation is needed for data protection?',
        options: [
          'Basic logs',
          'Comprehensive legal data protection records',
          'No documentation',
          'System reports only'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive records support legal compliance and protection.',
        hints: [
          'Consider legal requirements',
          'Think about documentation needs'
        ]
      }
    ]
  },
  {
    id: 'recovery',
    title: 'Recovery Planning',
    description: 'Develop legal recovery and continuity strategies',
    icon: <CheckCircle className="h-12 w-12 text-teal-500" />,
    impact: 'Legal Service Continuity',
    scenario: 'Following the ransomware attack, you must develop and implement recovery plans that ensure the continuity of legal services while maintaining client confidentiality and meeting legal obligations. The focus is on restoring critical legal operations and protecting client interests.',
    questions: [
      {
        question: 'What should be the first recovery priority?',
        options: [
          'All systems',
          'Critical legal operations and client services',
          'Non-essential services',
          'External systems'
        ],
        correctAnswer: 1,
        explanation: 'Focusing on critical operations ensures essential legal services continue.',
        hints: [
          'Consider legal obligations',
          'Think about client impact'
        ]
      },
      {
        question: 'How should recovery resources be allocated?',
        options: [
          'Equal distribution',
          'Based on legal priorities and client impact',
          'First-come-first-served',
          'External priority'
        ],
        correctAnswer: 1,
        explanation: 'Priority-based allocation ensures critical legal needs are met.',
        hints: [
          'Consider legal requirements',
          'Think about client impact'
        ]
      },
      {
        question: 'What recovery documentation is essential?',
        options: [
          'Basic notes',
          'Comprehensive legal recovery plans',
          'No documentation',
          'System logs only'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive plans ensure proper legal service recovery.',
        hints: [
          'Consider legal requirements',
          'Think about recovery needs'
        ]
      },
      {
        question: 'How should recovery progress be communicated?',
        options: [
          'Public updates',
          'Targeted legal client communications',
          'No updates',
          'Social media'
        ],
        correctAnswer: 1,
        explanation: 'Targeted communications maintain client trust and legal obligations.',
        hints: [
          'Consider client needs',
          'Think about confidentiality'
        ]
      },
      {
        question: 'What recovery validation is required?',
        options: [
          'Basic check',
          'Comprehensive legal and operational validation',
          'No validation',
          'External audit only'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive validation ensures proper legal service restoration.',
        hints: [
          'Consider legal requirements',
          'Think about service quality'
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
                  Legal Division - Ransomware Attack Scenario
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