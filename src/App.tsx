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
    description: 'Coordinate Responses with Supplier, vendors relation and production teams',
    icon: <Building2 className="h-12 w-12 text-red-500" />,
    impact: 'Logistics Issues and Delays in payment',
    scenario: 'A manufacturing company has been hit by a ransomware attack that has encrypted their production line control systems. The attack has halted all manufacturing operations, affecting their ability to fulfill customer orders. The company is facing significant operational disruption, potential contract penalties, and reputational damage.',
    questions: [
      {
        question: 'What should be the first action when operational disruption is detected?',
        options: [
          'Continue operations as normal',
          'Immediately shut down all systems',
          'Assess the situation and isolate affected systems',
          'Contact the attackers'
        ],
        correctAnswer: 2,
        explanation: 'Assessing the situation and isolating affected systems helps contain the incident while maintaining critical operations.',
        hints: [
          'Consider the immediate impact on production and safety',
          'Think about containment while maintaining critical operations'
        ]
      },
      {
        question: 'How should you prioritize system recovery during operational disruption?',
        options: [
          'Recover all systems simultaneously',
          'Start with non-critical systems first',
          'Prioritize based on business impact analysis',
          'Wait for complete investigation before recovery'
        ],
        correctAnswer: 2,
        explanation: 'Using business impact analysis ensures critical operations are restored first.',
        hints: [
          'Consider which systems are most critical for business continuity',
          'Think about the dependencies between different systems'
        ]
      },
      {
        question: 'What communication channel should be used during the incident?',
        options: [
          'Regular email system',
          'Public announcement system',
          'Out-of-band communication channels',
          'Social media platforms'
        ],
        correctAnswer: 2,
        explanation: 'Out-of-band channels ensure secure communication when regular systems might be compromised.'
      },
      {
        question: 'How should vendor access be managed during the incident?',
        options: [
          'Maintain all vendor access',
          'Revoke all vendor access immediately',
          'Review and restrict based on necessity',
          'Grant additional access to all vendors'
        ],
        correctAnswer: 2,
        explanation: 'Reviewing and restricting vendor access helps maintain security while allowing necessary operations.'
      },
      {
        question: 'What documentation should be maintained during the operational disruption?',
        options: [
          'Only final resolution steps',
          'No documentation needed',
          'Comprehensive incident timeline and actions',
          'Only system logs'
        ],
        correctAnswer: 2,
        explanation: 'Comprehensive documentation helps with incident analysis and future improvements.'
      }
    ]
  },
  {
    id: 'ransom',
    title: 'Ransom Pay',
    description: 'The attackers demand $50 million as ransom and threaten to release data on public forums',
    icon: <Banknote className="h-12 w-12 text-yellow-500" />,
    impact: 'Operational loss',
    scenario: 'A multinational corporation discovers their critical data has been encrypted, and attackers are demanding $50 million in cryptocurrency. They threaten to publish sensitive customer data and intellectual property if the ransom isn\'t paid within 72 hours. The company must decide how to respond while considering legal implications, customer privacy, and business continuity.',
    questions: [
      {
        question: 'What is the recommended approach when receiving a ransom demand?',
        options: [
          'Pay the ransom immediately',
          'Ignore the demand completely',
          'Consult with legal team and law enforcement',
          'Negotiate with attackers directly'
        ],
        correctAnswer: 2,
        explanation: 'Consulting with legal experts and law enforcement ensures compliance and proper handling of the situation.',
        hints: [
          'Consider the legal implications of paying ransom',
          'Think about involving appropriate authorities'
        ]
      },
      {
        question: 'What should be the first step in evaluating a ransom demand?',
        options: [
          'Calculate if we can afford the ransom',
          'Assess the authenticity and scope of the attack',
          'Start cryptocurrency transfer preparations',
          'Announce it to the public'
        ],
        correctAnswer: 1,
        explanation: 'Verifying the attack\'s authenticity and understanding its scope is crucial before making any decisions.',
        hints: [
          'Think about validating the threat',
          'Consider the importance of understanding the full situation'
        ]
      },
      {
        question: 'How should the organization document the ransom demand?',
        options: [
          'Screenshot the demand only',
          'Ignore documentation to avoid liability',
          'Maintain comprehensive records of all communications and actions',
          'Only record the amount demanded'
        ],
        correctAnswer: 2,
        explanation: 'Complete documentation is essential for legal purposes, insurance claims, and post-incident analysis.',
        hints: [
          'Think about future legal requirements',
          'Consider what information might be needed later'
        ]
      },
      {
        question: 'What factor should NOT primarily influence the ransom payment decision?',
        options: [
          'Data recovery capabilities',
          'Legal implications',
          'The relatively low ransom amount',
          'Business impact assessment'
        ],
        correctAnswer: 2,
        explanation: 'The amount of ransom should not be the primary factor; focus should be on broader implications and alternatives.',
        hints: [
          'Consider long-term consequences',
          'Think about organizational principles'
        ]
      },
      {
        question: 'What should be prepared before making any ransom payment decision?',
        options: [
          'Just the cryptocurrency wallet',
          'A comprehensive impact and recovery assessment',
          'Public announcement draft',
          'New IT security policies'
        ],
        correctAnswer: 1,
        explanation: 'A thorough assessment helps understand the full implications and alternatives to paying the ransom.',
        hints: [
          'Think about what information decision-makers need',
          'Consider the broader business context'
        ]
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Loss',
    description: 'Assessment and management of financial impact from the ransomware attack',
    icon: <AlertTriangle className="h-12 w-12 text-orange-500" />,
    impact: 'Significant financial damage and potential long-term effects',
    scenario: 'A major financial services company has been hit by ransomware, affecting their trading systems and customer accounts. Initial estimates suggest potential losses of millions per day in trading revenue, recovery costs, and potential regulatory fines. The company needs to assess and manage both immediate and long-term financial impacts while maintaining market confidence.',
    questions: [
      {
        question: 'How should financial impact be assessed during a ransomware attack?',
        options: [
          'Only consider the ransom amount',
          'Wait until the incident is over',
          'Conduct immediate and ongoing assessment of direct and indirect costs',
          'Focus only on immediate losses'
        ],
        correctAnswer: 2,
        explanation: 'A comprehensive assessment including both direct and indirect costs provides a complete picture of the financial impact.',
        hints: [
          'Think about both short-term and long-term costs',
          'Consider various types of financial impacts'
        ]
      },
      {
        question: 'What should be included in the initial financial impact assessment?',
        options: [
          'Only system repair costs',
          'Just customer compensation estimates',
          'Comprehensive evaluation including business interruption, recovery, and reputation costs',
          'Only cyber insurance premiums'
        ],
        correctAnswer: 2,
        explanation: 'A complete initial assessment helps in making informed decisions and planning resource allocation.',
        hints: [
          'Consider all potential areas of financial impact',
          'Think about both tangible and intangible costs'
        ]
      },
      {
        question: 'How should the organization handle financial reporting during the incident?',
        options: [
          'Delay all financial reporting',
          'Report only to internal stakeholders',
          'Maintain transparent and accurate reporting while following regulatory requirements',
          'Underreport the impact to maintain stability'
        ],
        correctAnswer: 2,
        explanation: 'Transparent and accurate reporting maintains trust while ensuring regulatory compliance.',
        hints: [
          'Consider regulatory obligations',
          'Think about stakeholder trust'
        ]
      },
      {
        question: 'What financial reserves should be considered for activation?',
        options: [
          'Only cyber insurance',
          'Just emergency cash reserves',
          'Comprehensive contingency funds including insurance, reserves, and credit lines',
          'None until the full impact is known'
        ],
        correctAnswer: 2,
        explanation: 'Multiple financial resources may be needed to manage the incident effectively.',
        hints: [
          'Think about different sources of emergency funding',
          'Consider the scale of potential needs'
        ]
      },
      {
        question: 'How should long-term financial recovery be planned?',
        options: [
          'Wait until the incident is resolved',
          'Focus only on immediate costs',
          'Develop a comprehensive recovery plan including investment in prevention',
          'Consider only insurance claims'
        ],
        correctAnswer: 2,
        explanation: 'Long-term planning should include measures to prevent future incidents and strengthen financial resilience.',
        hints: [
          'Think about preventing future incidents',
          'Consider sustainable recovery measures'
        ]
      }
    ]
  },
  {
    id: 'regulatory',
    title: 'Regulatory Notification',
    description: 'Compliance with regulatory requirements and notification procedures',
    icon: <Bell className="h-12 w-12 text-purple-500" />,
    impact: 'Potential compliance violations and penalties',
    scenario: 'A healthcare provider discovers a ransomware attack has potentially exposed protected health information (PHI) of thousands of patients. They must navigate complex regulatory requirements including HIPAA, state breach notification laws, and other applicable regulations. Time is critical, and the organization must ensure all proper notifications are made while managing the incident.',
    questions: [
      {
        question: 'When should regulatory authorities be notified of a ransomware attack?',
        options: [
          'Only if data is confirmed stolen',
          'Within required timeframes based on applicable regulations',
          'After the incident is resolved',
          'Only if media reports the incident'
        ],
        correctAnswer: 1,
        explanation: 'Timely notification according to regulatory requirements is crucial for compliance and proper incident handling.',
        hints: [
          'Consider regulatory deadlines',
          'Think about the consequences of delayed reporting'
        ]
      },
      {
        question: 'What information should be included in regulatory notifications?',
        options: [
          'Basic incident details only',
          'Complete technical analysis',
          'Required information as specified by regulations and preliminary impact assessment',
          'Only the ransom demand'
        ],
        correctAnswer: 2,
        explanation: 'Notifications should include all required information while being accurate and thorough.',
        hints: [
          'Review regulatory requirements',
          'Consider what authorities need to know'
        ]
      },
      {
        question: 'How should multiple regulatory notification requirements be handled?',
        options: [
          'Notify only the main regulator',
          'Choose the strictest requirement only',
          'Comply with all applicable regulatory requirements systematically',
          'Wait for regulators to contact you'
        ],
        correctAnswer: 2,
        explanation: 'Organizations must comply with all applicable regulations, managing notifications systematically.',
        hints: [
          'Think about overlapping requirements',
          'Consider international regulations if applicable'
        ]
      },
      {
        question: 'What documentation should be maintained for regulatory compliance?',
        options: [
          'Only notification copies',
          'Just internal reports',
          'Comprehensive records of the incident, notifications, and response actions',
          'Only technical logs'
        ],
        correctAnswer: 2,
        explanation: 'Complete documentation demonstrates compliance and supports potential regulatory investigations.',
        hints: [
          'Think about proving compliance',
          'Consider future audits'
        ]
      },
      {
        question: 'How should ongoing regulatory communications be managed?',
        options: [
          'Respond only when contacted',
          'Provide updates rarely',
          'Maintain proactive and regular communication as required',
          'Delegate to junior staff'
        ],
        correctAnswer: 2,
        explanation: 'Proactive communication with regulators helps maintain compliance and demonstrates good faith.',
        hints: [
          'Consider building regulatory relationships',
          'Think about maintaining trust'
        ]
      }
    ]
  },
  {
    id: 'employee',
    title: 'Employee Notification',
    description: 'Communication strategy for employees during the incident',
    icon: <Users className="h-12 w-12 text-blue-500" />,
    impact: 'Employee awareness and response coordination',
    scenario: 'A global company with 50,000 employees across multiple time zones faces a ransomware attack affecting various systems. Employees need to be notified about the situation, work arrangements, security protocols, and their role in the recovery process. The communication must be clear, timely, and appropriate for different employee groups while maintaining security.',
    questions: [
      {
        question: 'What information should be included in employee notifications?',
        options: [
          'Technical details of the attack',
          'Clear instructions and immediate actions required',
          'Names of affected systems only',
          'Complete incident investigation results'
        ],
        correctAnswer: 1,
        explanation: 'Clear, actionable instructions help employees respond effectively while maintaining operational security.',
        hints: [
          'Think about what employees need to know',
          'Consider security implications'
        ]
      },
      {
        question: 'How should employee notifications be prioritized?',
        options: [
          'Notify everyone simultaneously',
          'Inform only affected departments',
          'Prioritize based on impact and role in response',
          'Wait for full investigation'
        ],
        correctAnswer: 2,
        explanation: 'Strategic notification ensures critical responders are informed first while managing communication effectively.',
        hints: [
          'Consider critical response roles',
          'Think about communication efficiency'
        ]
      },
      {
        question: 'What communication channels should be used for employee notifications?',
        options: [
          'Email only',
          'Internal messaging only',
          'Multiple secure channels appropriate to the situation',
          'Public social media'
        ],
        correctAnswer: 2,
        explanation: 'Using multiple appropriate channels ensures reliable communication reach.',
        hints: [
          'Think about communication reliability',
          'Consider backup channels'
        ]
      },
      {
        question: 'How should employee questions and concerns be managed?',
        options: [
          'Ignore until crisis is over',
          'Direct all to IT department',
          'Establish a structured response system with dedicated channels',
          'Let each department handle independently'
        ],
        correctAnswer: 2,
        explanation: 'A structured system ensures consistent, efficient handling of employee concerns.',
        hints: [
          'Consider scalability of response',
          'Think about consistency'
        ]
      },
      {
        question: 'What ongoing communication should be maintained with employees?',
        options: [
          'None after initial notification',
          'Daily technical updates',
          'Regular updates on status, actions needed, and recovery progress',
          'Only major milestones'
        ],
        correctAnswer: 2,
        explanation: 'Regular updates maintain employee awareness and engagement in the recovery process.',
        hints: [
          'Think about maintaining morale',
          'Consider information needs over time'
        ]
      }
    ]
  },
  {
    id: 'crisis',
    title: 'Crisis Communication',
    description: 'External communication management and stakeholder relations',
    icon: <MessageSquare className="h-12 w-12 text-green-500" />,
    impact: 'Public relations and stakeholder confidence',
    scenario: 'A prominent retail company suffers a ransomware attack during peak shopping season. The incident attracts media attention, and various stakeholders - including customers, investors, partners, and the public - demand information. The company must manage external communications while handling the technical crisis and maintaining stakeholder confidence.',
    questions: [
      {
        question: 'Who should be responsible for external communications during a ransomware incident?',
        options: [
          'IT team',
          'Any available manager',
          'Designated crisis communication team',
          'Security team'
        ],
        correctAnswer: 2,
        explanation: 'A designated crisis communication team ensures consistent, appropriate messaging and stakeholder management.',
        hints: [
          'Consider message consistency',
          'Think about communication expertise'
        ]
      },
      {
        question: 'How should initial public statements be handled?',
        options: [
          'Release all information immediately',
          'Deny any incident',
          'Provide confirmed facts and action being taken',
          'No comment until resolution'
        ],
        correctAnswer: 2,
        explanation: 'Transparent but careful communication maintains credibility while managing legal and security concerns.',
        hints: [
          'Think about balancing transparency',
          'Consider legal implications'
        ]
      },
      {
        question: 'What stakeholder groups should be prioritized in communications?',
        options: [
          'Media only',
          'Customers only',
          'Prioritize based on impact and relationship',
          'Whoever asks first'
        ],
        correctAnswer: 2,
        explanation: 'Strategic prioritization ensures critical stakeholders receive appropriate attention.',
        hints: [
          'Consider stakeholder importance',
          'Think about business relationships'
        ]
      },
      {
        question: 'How should media inquiries be managed?',
        options: [
          'Ignore all media',
          'Respond to each individually',
          'Coordinate through designated spokesperson with prepared statements',
          'Direct to website only'
        ],
        correctAnswer: 2,
        explanation: 'Coordinated media response ensures consistent, accurate message delivery.',
        hints: [
          'Think about message control',
          'Consider media management best practices'
        ]
      },
      {
        question: 'What should be included in stakeholder updates?',
        options: [
          'Technical details only',
          'Estimated losses only',
          'Progress, impact, and actions being taken',
          'Promise of compensation'
        ],
        correctAnswer: 2,
        explanation: 'Comprehensive but appropriate updates maintain stakeholder confidence and support.',
        hints: [
          'Consider information needs',
          'Think about maintaining trust'
        ]
      }
    ]
  },
  {
    id: 'strategic',
    title: 'Strategic Impact',
    description: 'Long-term business impact and recovery planning',
    icon: <Target className="h-12 w-12 text-indigo-500" />,
    impact: 'Business continuity and strategic objectives',
    scenario: 'A technology company suffers a sophisticated ransomware attack that exposes weaknesses in their security infrastructure and business processes. Beyond immediate recovery, they must assess how this incident affects their five-year strategic plan, market position, customer trust, and digital transformation initiatives. The board demands a comprehensive review of strategic implications.',
    questions: [
      {
        question: 'What should be the focus of strategic impact assessment?',
        options: [
          'Immediate technical fixes',
          'Short-term financial losses',
          'Long-term business implications and recovery strategy',
          'System upgrade plans'
        ],
        correctAnswer: 2,
        explanation: 'Focusing on long-term implications ensures comprehensive recovery and future resilience.',
        hints: [
          'Think about future business impact',
          'Consider organizational transformation'
        ]
      },
      {
        question: 'How should strategic objectives be re-evaluated after the incident?',
        options: [
          'Continue unchanged',
          'Abandon all current objectives',
          'Assess and adjust based on lessons learned and new risks',
          'Focus only on security'
        ],
        correctAnswer: 2,
        explanation: 'Strategic objectives should evolve to incorporate incident learnings and strengthen resilience.',
        hints: [
          'Consider organizational learning',
          'Think about balanced adaptation'
        ]
      },
      {
        question: 'What aspects of business strategy need review after a ransomware attack?',
        options: [
          'Only IT security',
          'Just disaster recovery',
          'Comprehensive review of processes, technology, and business model',
          'Financial plans only'
        ],
        correctAnswer: 2,
        explanation: 'A holistic review ensures all strategic aspects are strengthened against future threats.',
        hints: [
          'Think about organizational vulnerabilities',
          'Consider business model implications'
        ]
      },
      {
        question: 'How should strategic investments be prioritized post-incident?',
        options: [
          'All in security',
          'Maintain previous plans',
          'Balance security, resilience, and growth objectives',
          'Focus on cost cutting'
        ],
        correctAnswer: 2,
        explanation: 'Balanced investment ensures both security and business growth objectives are met.',
        hints: [
          'Consider multiple business needs',
          'Think about sustainable growth'
        ]
      },
      {
        question: 'What timeframe should strategic recovery planning cover?',
        options: [
          'Next quarter only',
          'Until systems are restored',
          'Multi-year comprehensive planning',
          'Next month only'
        ],
        correctAnswer: 2,
        explanation: 'Long-term planning ensures sustainable recovery and organizational transformation.',
        hints: [
          'Think about sustainable recovery',
          'Consider long-term resilience'
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
                  Ransomware Attack Scenario
                </h1>
                <p className="text-xl text-slate-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  The SOC identified multiple reports of file inaccessibility and ransom notes appearing on file servers. 
                  Employees encountered notifications indicating file encryption, while critical business applications ceased functioning. 
                  Recognizing a potential ransomware attack, the SOC swiftly escalated the incident, implemented containment measures 
                  to prevent further spread, and issued security advisories to alert affected teams.
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
                    {card.icon}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                    <p className="text-slate-700 dark:text-gray-300">{card.description}</p>
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

                <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg mb-8">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Scenario</h4>
                  <p className="text-slate-700 dark:text-gray-300">
                    {riskCards.find(c => c.id === selectedCard)?.scenario}
                  </p>
                </div>

                {showResults ? (
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Assessment Results</h4>
                    <div className="mb-6">
                      <p className="text-xl text-slate-900 dark:text-white mb-4">
                        Score: {calculateTotalScore()} out of 25
                      </p>
                      <p className="text-lg text-slate-700 dark:text-gray-300">
                        {getPerformanceMessage(calculateTotalScore(), 25)}
                      </p>
                    </div>
                    <button
                      onClick={handleRestartQuiz}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                    >
                      Restart Assessment
                    </button>
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
                      <div className="mb-6 p-4 bg-slate-200 dark:bg-slate-600 rounded-lg">
                        <p className="text-slate-900 dark:text-gray-200">
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