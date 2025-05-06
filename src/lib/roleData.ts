export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hints?: string[];
  role: string;
  scenario?: string;
}

export interface RiskCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  impact: string;
  questions: Question[];
  roles: string[];
}

export const roles = [
  'Legal Division',
  'CFO',
  'Marketing',
  'IT System',
  'Security',
  'Vendor Manager',
  'Governance, Risk and Compliance',
  'Security Incident Manager'
];

// --- Populate riskCards directly with specific scenarios ---
export const riskCards: RiskCard[] = [
  {
    id: 'operational',
    title: 'Operational Disruptions',
    description: 'Managing business operations during system outages and service disruptions',
    icon: 'Building2',
    impact: 'Business Continuity',
    roles: roles,
    questions: [
      {
        question: 'As CFO, what financial measures should be implemented immediately during the operational disruption?',
        scenario: 'The ransomware attack has halted core business operations, stopping revenue generation. Emergency funds are available, but the duration of the outage is unknown.',
        options: [
          'Access emergency funds only',
          'Implement comprehensive financial contingency plan including emergency funds, credit lines, and insurance claims',
          'Wait for system restoration',
          'Only contact insurance provider'
        ],
        correctAnswer: 1, explanation: 'A comprehensive financial response ensures business continuity and recovery.', hints: ['Consider multiple financial resources', 'Think about immediate and short-term needs'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how should you handle customer communications during the disruption?',
        scenario: 'Customers cannot access services and are complaining on social media. Support lines are overwhelmed. A consistent message is needed urgently.',
        options: [
          'Delay all communications',
          'Develop a strategic communication plan with transparent updates',
          'Only respond to direct inquiries',
          'Delegate to customer service'
        ],
        correctAnswer: 1, explanation: 'Strategic communication maintains customer trust and manages expectations.', hints: ['Think about transparency', 'Consider customer relationships'], role: 'Marketing'
      },
      {
        question: 'From a CFO perspective, how should operational recovery costs be prioritized?',
        scenario: 'IT needs funds for decryption tools/recovery services, Sales needs resources to manage client relations, and Support needs overtime pay. Limited immediate funds are available.',
        options: [
          'Based on department size',
          'Based on revenue impact and critical business functions',
          'Equal distribution',
          'Based on request order'
        ],
        correctAnswer: 1, explanation: 'Prioritizing based on revenue impact ensures efficient resource allocation.', hints: ['Consider business impact', 'Think about revenue streams'], role: 'CFO'
      },
      {
        question: 'As Marketing lead, how should you manage brand reputation during the disruption?',
        scenario: 'News of the outage is spreading. Competitors might leverage this. Negative press could have long-term impact if not managed proactively.',
        options: [
          'Minimize public communication',
          'Implement proactive reputation management strategy',
          'Only address negative feedback',
          'Wait for full resolution'
        ],
        correctAnswer: 1, explanation: 'Proactive reputation management helps maintain stakeholder confidence.', hints: ['Think about stakeholder perception', 'Consider long-term impact'], role: 'Marketing'
      },
      {
        question: 'What financial metrics should the CFO monitor during the operational disruption?',
        scenario: 'The disruption is ongoing. To understand the daily financial bleed and inform recovery decisions, specific metrics need close tracking.',
        options: [
          'Only cash flow',
          'Comprehensive metrics including cash flow, recovery costs, revenue impact, and customer retention',
          'Just daily expenses',
          'Only system downtime costs'
        ],
        correctAnswer: 1, explanation: 'Monitoring comprehensive metrics ensures effective financial management.', hints: ['Consider multiple financial aspects', 'Think about long-term impacts'], role: 'CFO'
      },
      {
        question: 'As Legal Division, what is the primary legal concern regarding operational disruption caused by ransomware?',
        scenario: 'The service outage means the company is failing to meet guaranteed uptime in client Service Level Agreements (SLAs).',
        options: [
          'Employee overtime claims',
          'Breach of contract with customers/partners due to downtime',
          'Office lease violations',
          'Trademark infringement'
        ],
        correctAnswer: 1, explanation: 'Operational disruptions can lead to failure to meet contractual obligations, posing significant legal risk.', hints: ['Consider external agreements', 'Think about service level agreements (SLAs)'], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, what is the first technical step to ensure operational continuity?',
        scenario: 'Monitoring shows core production servers are encrypted and systems are offline. The priority is to restore essential services ASAP.',
        options: [
          'Order new hardware',
          'Activate the Disaster Recovery Plan (DRP) and failover systems',
          'Update antivirus software',
          'Reset all user passwords'
        ],
        correctAnswer: 1, explanation: 'The DRP outlines procedures for failing over to backup systems to minimize operational impact.', hints: ['Focus on immediate recovery actions', 'Consider predefined plans'], role: 'IT System'
      },
      {
        question: 'As Legal Division, what advice should be given regarding communication about service unavailability?',
        scenario: 'Marketing is preparing a statement for customers about the outage. Legal needs to review it before release to manage liability.',
        options: [
          'Avoid mentioning the ransomware attack specifically',
          'Be transparent about the disruption but follow approved legal language',
          'Promise a specific recovery timeline immediately',
          'Blame a third-party vendor'
        ],
        correctAnswer: 1, explanation: 'Legal review is crucial to ensure communications are accurate, compliant, and manage liability.', hints: ['Balance transparency with legal risk', 'Think about regulatory disclosure requirements'], role: 'Legal Division'
      }
    ]
  },
  {
    id: 'ransom',
    title: 'Ransom Pay',
    description: 'Evaluating and managing ransom payment considerations',
    icon: 'Banknote',
    impact: 'Financial and Legal Implications',
    roles: roles,
    questions: [
      {
        question: 'As CFO, what financial analysis is needed for the ransom payment decision?',
        scenario: 'The attackers demand a significant ransom. Paying might be faster than restoring, but recovery costs are high either way. A decision is needed soon.',
        options: [
          'Only ransom amount',
          'Comprehensive analysis of payment impact, recovery costs, and business losses',
          'Basic cost comparison',
          'Insurance coverage only'
        ],
        correctAnswer: 1, explanation: 'A comprehensive financial analysis ensures informed decision-making.', hints: ['Consider all financial implications', 'Think about long-term impact'], role: 'CFO'
      },
      {
        question: 'How should Marketing handle public perception if ransom payment is considered?',
        scenario: 'Internal discussions about potentially paying the ransom are occurring. There\'s a risk this information could leak.',
        options: [
          'No communication',
          'Develop strategic messaging focusing on business continuity and customer protection',
          'Deny all payment discussions',
          'Only internal communications'
        ],
        correctAnswer: 1, explanation: 'Strategic messaging helps manage stakeholder perceptions.', hints: ['Consider stakeholder concerns', 'Think about transparency levels'], role: 'Marketing'
      },
      {
        question: 'What financial contingencies should the CFO prepare for ransom scenarios?',
        scenario: 'Whether paying the ransom or funding a lengthy recovery, significant unplanned expenses are certain. Preparations are needed.',
        options: [
          'Only payment funds',
          'Comprehensive plan including payment options, recovery funds, and business continuity resources',
          'Basic emergency fund',
          'Wait for demands'
        ],
        correctAnswer: 1, explanation: 'Comprehensive contingency planning ensures readiness.', hints: ['Think about multiple scenarios', 'Consider resource allocation'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how should customer concerns about data security be addressed?',
        scenario: 'Regardless of ransom payment, customers are worried their data might have been stolen and could be misused. They need reassurance.',
        options: [
          'Ignore concerns',
          'Implement transparent communication strategy with regular updates (based on known facts)',
          'Minimal responses',
          'Defer all questions'
        ],
        correctAnswer: 1, explanation: 'Transparent communication maintains customer trust.', hints: ['Consider customer confidence', 'Think about information sharing'], role: 'Marketing'
      },
      {
        question: 'What financial documentation should the CFO maintain during ransom negotiations?',
        scenario: 'If negotiations occur, auditors and insurers will require detailed records of the process and any associated costs.',
        options: [
          'Basic payment records',
          'Comprehensive documentation of all costs, decisions, and impact assessments',
          'Only ransom amounts',
          'Minimal records'
        ],
        correctAnswer: 1, explanation: 'Thorough documentation supports decision-making and compliance.', hints: ['Think about audit requirements', 'Consider legal implications'], role: 'CFO'
      },
      {
        question: 'As Legal Division, what are the key legal risks associated with paying a ransom?',
        scenario: 'Paying the ransom might violate government sanctions if the attackers are on a restricted list. There could be severe penalties.',
        options: [
          'Tax implications',
          'Violation of anti-money laundering (AML) laws or sanctions (e.g., OFAC)',
          'Employee dissatisfaction',
          'Negative press coverage'
        ],
        correctAnswer: 1, explanation: 'Paying ransoms, especially to certain threat actor groups, can violate sanctions and AML regulations, leading to severe penalties.', hints: ['Consider regulatory compliance', 'Think about the recipient of the funds'], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, what technical factor most influences the "pay vs. don\'t pay" decision?',
        scenario: 'Management is weighing paying the ransom versus restoring from backups. The viability of the backups is critical information.',
        options: [
          'The availability and integrity of backups',
          'The cost of the ransom demand',
          'The attacker\'s reputation for providing decryption keys',
          'The type of data encrypted'
        ],
        correctAnswer: 0, explanation: 'If reliable, tested backups exist, restoring from them is often preferable to paying the ransom.', hints: ['Consider recovery options', 'Think about alternatives to payment'], role: 'IT System'
      },
      {
        question: 'As Legal Division, what documentation is essential if a decision is made to pay the ransom?',
        scenario: 'If payment proceeds, regulatory bodies and insurance may investigate. Legal must ensure the decision and process are meticulously documented.',
        options: [
          'Only the transaction record',
          'Documentation justifying the decision, proof of sanctions checks, and communication records',
          'A summary for the CEO',
          'Notes from the negotiation calls'
        ],
        correctAnswer: 1, explanation: 'Thorough documentation is vital for potential regulatory scrutiny and insurance claims.', hints: ['Consider audit trails', 'Think about potential investigations'], role: 'Legal Division'
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Loss',
    description: 'Managing financial impact and recovery costs',
    icon: 'Banknote',
    impact: 'Financial Management',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should you assess the total financial impact?',
        scenario: 'The incident involves direct costs (recovery, ransom if paid) and indirect costs (lost revenue, reputational harm). A full picture is needed.',
        options: [
          'Only direct costs',
          'Comprehensive analysis including direct costs, indirect losses, and long-term implications',
          'Basic damage estimate',
          'Wait for final numbers'
        ],
        correctAnswer: 1, explanation: 'A comprehensive analysis ensures all financial impacts are considered.', hints: ['Consider all cost types', 'Think about long-term effects'], role: 'CFO'
      },
      {
        question: 'How should Marketing communicate financial impacts to stakeholders?',
        scenario: 'The financial losses are substantial and must be reported. The messaging needs to be carefully crafted for investors and the public.',
        options: [
          'Share all details',
          'Develop strategic messaging that balances transparency with confidence in recovery',
          'No communication',
          'Only internal updates'
        ],
        correctAnswer: 1, explanation: 'Strategic communication maintains stakeholder confidence.', hints: ['Consider stakeholder needs', 'Think about market impact'], role: 'Marketing'
      },
      {
        question: 'What financial recovery strategies should the CFO implement?',
        scenario: 'Significant funds have been spent on incident response, and revenue was lost. Actions are needed to stabilize the company financially.',
        options: [
          'Cost cutting only',
          'Balanced approach including cost management, resource reallocation, and recovery investments',
          'Wait for insurance payout',
          'Minimal changes'
        ],
        correctAnswer: 1, explanation: 'A balanced strategy ensures effective recovery.', hints: ['Consider multiple approaches', 'Think about sustainability'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how do you maintain customer confidence during financial recovery?',
        scenario: 'News about the financial losses may worry customers about the company\'s future and the security of their ongoing services.',
        options: [
          'Ignore concerns',
          'Implement proactive communication strategy highlighting recovery efforts and future stability',
          'Minimal updates',
          'Only respond to queries'
        ],
        correctAnswer: 1, explanation: 'Proactive communication builds confidence.', hints: ['Think about customer retention', 'Consider brand trust'], role: 'Marketing'
      },
      {
        question: 'What financial reporting should the CFO prioritize?',
        scenario: 'During the recovery period, the board requires frequent updates on the financial situation beyond standard quarterly reports.',
        options: [
          'Basic reports',
          'Comprehensive reporting including impact analysis, recovery metrics, and forecasts',
          'Only mandatory reports',
          'Delay all reporting'
        ],
        correctAnswer: 1, explanation: 'Comprehensive reporting supports decision-making.', hints: ['Consider reporting needs', 'Think about stakeholder requirements'], role: 'CFO'
      },
      {
        question: 'As Legal Division, what steps must be taken if financial losses impact shareholder value significantly?',
        scenario: 'Analysis indicates the incident\'s financial impact is material and likely to affect stock price, triggering disclosure requirements.',
        options: [
          'Informal update to major shareholders',
          'Formal disclosure following securities regulations (e.g., SEC filings)',
          'Wait for the quarterly earnings report',
          'Consult with the marketing team only'
        ],
        correctAnswer: 1, explanation: 'Significant financial events often require formal disclosures to comply with securities laws and regulations.', hints: ['Consider investor protection laws', 'Think about material impact disclosure'], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, how can IT contribute to mitigating future financial losses from similar incidents?',
        scenario: 'The high cost of this incident highlights the need for preventative IT measures to reduce the financial impact of future attacks.',
        options: [
          'By reducing the IT budget',
          'By implementing enhanced security controls, improving backup strategies, and refining the DRP',
          'By outsourcing all IT functions',
          'By focusing only on endpoint protection'
        ],
        correctAnswer: 1, explanation: 'Proactive IT security measures and robust recovery plans are key to reducing the financial impact of future incidents.', hints: ['Focus on preventative measures', 'Consider resilience and recovery speed'], role: 'IT System'
      },
      {
        question: 'As Legal Division, what is the process for handling potential lawsuits from customers due to financial loss?',
        scenario: 'A customer whose business was impacted by the service outage is threatening legal action to recover their losses.',
        options: [
          'Ignore all communication',
          'Immediately offer settlements',
          'Establish a claims process, engage legal counsel, and preserve evidence',
          'Publish a public apology only'
        ],
        correctAnswer: 2, explanation: 'A structured legal approach is needed to manage litigation risk, involving counsel and proper procedures.', hints: ['Consider litigation management', 'Think about preserving legal privilege'], role: 'Legal Division'
      }
    ]
  },
  {
    id: 'regulatory',
    title: 'Regulatory Notification',
    description: 'Managing regulatory reporting and compliance requirements',
    icon: 'Shield',
    impact: 'Compliance and Reporting',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should regulatory notification costs be managed?',
        scenario: 'Notifying regulators involves legal fees, potential translation costs, and internal resource time. These costs need to be budgeted and controlled.',
        options: [
          'Minimize costs',
          'Allocate appropriate resources for comprehensive compliance',
          'Use standard budget',
          'Delay spending'
        ],
        correctAnswer: 1, explanation: 'Proper resource allocation ensures effective compliance.', hints: ['Consider compliance requirements', 'Think about resource needs'], role: 'CFO'
      },
      {
        question: 'How should Marketing handle public messaging around regulatory notifications?',
        scenario: 'If regulatory notification becomes public (e.g., via a press release), the messaging must align with legal requirements and manage public perception.',
        options: [
          'No communication',
          'Develop clear, compliant communication strategy, approved by Legal',
          'Minimal disclosure',
          'Defer to regulators'
        ],
        correctAnswer: 1, explanation: 'Clear communication maintains transparency.', hints: ['Consider compliance requirements', 'Think about public perception'], role: 'Marketing'
      },
      {
        question: 'What financial provisions should the CFO make for regulatory responses?',
        scenario: 'Beyond notification costs, potential regulatory fines or mandated remediation efforts could arise from the incident.',
        options: [
          'Basic budget',
          'Comprehensive budget including potential fines, compliance costs, legal fees, and communication expenses',
          'Minimal allocation',
          'Wait for requirements'
        ],
        correctAnswer: 1, explanation: 'Comprehensive budgeting ensures adequate resources.', hints: ['Consider all cost aspects', 'Think about contingencies'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how do you maintain brand integrity during regulatory processes?',
        scenario: 'Public knowledge of a regulatory investigation can damage the brand. Marketing needs a strategy to manage this.',
        options: [
          'Ignore impact',
          'Implement strategic communication plan aligned with regulatory requirements, emphasizing corrective actions',
          'Minimal engagement',
          'Only internal updates'
        ],
        correctAnswer: 1, explanation: 'Strategic alignment maintains brand integrity.', hints: ['Consider brand values', 'Think about compliance'], role: 'Marketing'
      },
      {
        question: 'How should the CFO document regulatory compliance expenses?',
        scenario: 'All costs related to regulatory notifications, legal advice, and potential fines must be meticulously tracked for audits and reporting.',
        options: [
          'Basic records',
          'Detailed documentation of all compliance-related costs (legal, consulting, notification, remediation) and activities',
          'Minimal tracking',
          'Only major expenses'
        ],
        correctAnswer: 1, explanation: 'Detailed documentation supports compliance.', hints: ['Consider audit requirements', 'Think about reporting needs'], role: 'CFO'
      },
      {
        question: 'As Legal Division, what determines if regulatory notification is required after a ransomware attack?',
        scenario: 'A ransomware attack occurred. Legal must assess if specific laws (like GDPR, CCPA, HIPAA) mandate notification based on the data potentially involved.',
        options: [
          'The size of the ransom demand',
          'The type of data potentially accessed *or* encrypted, and relevant laws (some laws trigger on access/encryption alone)',
          'Whether the attack was successful in getting ransom',
          'Guidance from the IT department'
        ],
        correctAnswer: 1, explanation: 'Regulatory notification obligations depend on specific laws; some trigger on unauthorized access/encryption, not just exfiltration.', hints: ['Consider data privacy laws carefully', 'Think about the definition of a \'breach\''], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, what technical information is crucial for Legal to assess regulatory notification requirements?',
        scenario: 'To determine if notification laws apply, Legal needs specific technical details from IT about what systems and data were potentially compromised.',
        options: [
          'The number of affected servers',
          'Detailed logs showing evidence of data access, encryption extent, data types involved, and any signs of exfiltration',
          'The time the attack started',
          'The IP address of the attackers'
        ],
        correctAnswer: 1, explanation: 'Legal needs specific technical evidence about data compromise to determine notification duties under relevant regulations.', hints: ['Focus on data access and exfiltration evidence', 'Consider forensic data needs'], role: 'IT System'
      },
      {
        question: 'As Legal Division, what are the consequences of failing to notify regulators within the required timeframe?',
        scenario: 'Some regulations have strict notification deadlines (e.g., 72 hours). Missing these can lead to significant repercussions.',
        options: [
          'A warning letter',
          'Significant fines (up to 4% of global revenue under GDPR), mandatory audits, and reputational damage',
          'A request for more information',
          'No consequences if the data is recovered later'
        ],
        correctAnswer: 1, explanation: 'Regulators impose strict deadlines and penalties for non-compliance with breach notification laws.', hints: ['Consider penalties under GDPR, CCPA etc.', 'Think about regulatory enforcement actions'], role: 'Legal Division'
      }
    ]
  },
  {
    id: 'employment',
    title: 'Employment Notification',
    description: 'Managing employee communications and support',
    icon: 'Users',
    impact: 'Employee Relations',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should employee-related costs be managed during the incident?',
        scenario: 'Incident response involves overtime pay, and if employee data is breached, costs for support services (like credit monitoring) may arise.',
        options: [
          'Cut all non-essential expenses',
          'Allocate specific resources for both incident response personnel costs and employee support/communication programs',
          'Delay decisions until after the incident',
          'Minimal spending only on critical response'
        ],
        correctAnswer: 1, explanation: 'Proper resource allocation ensures employee support and response effectiveness.', hints: ['Consider employee needs and response needs', 'Think about long-term impact'], role: 'CFO'
      },
      {
        question: 'How should Marketing handle internal communications?',
        scenario: 'Employees are anxious due to the incident. Clear, consistent, and reassuring internal communication is needed to maintain morale and trust.',
        options: [
          'No communication until everything is resolved',
          'Develop comprehensive internal communication strategy with regular, factual updates approved by Legal/HR',
          'Minimal updates via email only',
          'Only address emergency safety notices'
        ],
        correctAnswer: 1, explanation: 'Comprehensive communication maintains employee trust and morale.', hints: ['Think about transparency and accuracy', 'Consider employee morale'], role: 'Marketing'
      },
      {
        question: 'What financial support should the CFO consider for affected employees?',
        scenario: 'If HR data containing personal employee information was compromised, the company may need to offer financial assistance or protection services.',
        options: [
          'No support beyond legal requirements',
          'Comprehensive support including credit monitoring services, identity theft protection resources, and potentially direct assistance programs',
          'Minimal assistance like a list of resources',
          'Only legally required benefits'
        ],
        correctAnswer: 1, explanation: 'Comprehensive support maintains workforce stability and demonstrates care.', hints: ['Consider employee welfare', 'Think about retention and goodwill'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how do you maintain employee engagement?',
        scenario: 'The incident response is stressful, and employees may feel disconnected or unappreciated. Engagement efforts are important for morale.',
        options: [
          'Focus only on external marketing',
          'Partner with HR to implement engaging internal communication, recognize response efforts, and provide clear support information',
          'Send basic company updates',
          'Delegate entirely to HR'
        ],
        correctAnswer: 1, explanation: 'Engaging communication and recognizing efforts maintains employee morale.', hints: ['Think about internal branding', 'Consider morale impact'], role: 'Marketing'
      },
      {
        question: 'How should the CFO budget for employee support programs?',
        scenario: 'HR proposes offering credit monitoring to all employees impacted by a data breach. This has significant cost implications that need budgeting.',
        options: [
          'Use leftover funds from other budgets',
          'Develop a comprehensive budget based on estimated uptake, vendor costs, and program duration for support programs and resources',
          'No specific allocation, pay as needed',
          'Standard HR benefits budget'
        ],
        correctAnswer: 1, explanation: 'Proper budgeting ensures adequate support and financial control.', hints: ['Consider program scope and costs', 'Think about long-term benefits'], role: 'CFO'
      },
      {
        question: 'As Legal Division, what information must be communicated to employees if their personal data was potentially compromised?',
        scenario: 'Forensic evidence suggests employee PII (Personally Identifiable Information) was accessed. Specific laws dictate what employees must be told.',
        options: [
          'A general notice about the IT incident',
          'Specific details required by data breach notification laws (type of data, potential risk, protection steps, contact info)',
          'Only that an IT incident occurred, details later',
          'Instructions to change their work passwords only'
        ],
        correctAnswer: 1, explanation: 'Specific data breach notification laws dictate the content required when informing affected individuals.', hints: ['Consider specific legal requirements (state/federal)', 'Think about individual rights to information'], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, how can you support Legal in determining if employee data was compromised?',
        scenario: 'Legal needs confirmation and details about the potential compromise of employee data stored on HR systems to fulfill notification duties.',
        options: [
          'By providing a list of all HR systems',
          'By conducting forensic analysis of affected HR databases, access logs, and network traffic to identify specific data access/exfiltration',
          'By confirming HR system backups are available',
          'By reporting the total number of employee records'
        ],
        correctAnswer: 1, explanation: 'Forensic analysis is essential to understand the scope and nature of data access during the incident.', hints: ['Focus on evidence of specific data compromise', 'Consider the technical investigation details for HR data'], role: 'IT System'
      },
      {
        question: 'As Legal Division, what are the implications of delaying necessary employee notifications about a data breach?',
        scenario: 'There\'s pressure to delay employee notifications until recovery is complete, but data breach laws often have strict reporting timelines.',
        options: [
          'Improved employee morale by avoiding panic',
          'Potential violation of notification laws (which often have strict deadlines), leading to fines and lawsuits',
          'More time for IT to fix the issue without distraction',
          'Reduced communication costs'
        ],
        correctAnswer: 1, explanation: 'Delaying legally required notifications can result in significant legal and financial penalties.', hints: ['Consider notification deadlines in relevant laws', 'Think about regulatory consequences and employee lawsuits'], role: 'Legal Division'
      }
    ]
  },
  {
    id: 'crisis',
    title: 'Crisis Communication',
    description: 'Managing external communications and public relations',
    icon: 'MessageSquare',
    impact: 'Public Relations',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should communication costs be managed during the crisis?',
        scenario: 'A significant budget is requested for a PR campaign to manage the incident\'s narrative. This needs financial scrutiny.',
        options: [
          'Reject all non-essential spending',
          'Allocate appropriate resources based on a clear strategy and expected ROI for effective communication',
          'Use only the standard departmental budget',
          'Approve only minimal social media costs'
        ],
        correctAnswer: 1, explanation: 'Proper resource allocation ensures effective communication aligned with strategic goals.', hints: ['Consider communication strategy effectiveness', 'Think about impact vs. cost'], role: 'CFO'
      },
      {
        question: 'How should Marketing develop the crisis communication strategy?',
        scenario: 'The incident impacts customers, employees, and the public. A unified strategy is needed to address all stakeholders effectively.',
        options: [
          'Focus only on technical updates',
          'Develop comprehensive, multi-channel strategy addressing different stakeholders (customers, employees, media, regulators) with tailored messaging',
          'Only issue reactive statements to inquiries',
          'Delegate entirely to the external PR firm'
        ],
        correctAnswer: 1, explanation: 'A comprehensive strategy ensures consistent and effective communication across all audiences.', hints: ['Consider all stakeholder groups', 'Think about different communication channels and timing'], role: 'Marketing'
      },
      {
        question: 'What financial metrics should the CFO monitor during crisis communication?',
        scenario: 'To measure if the communication efforts are mitigating damage, the CFO needs to track relevant financial indicators (e.g., customer churn, sentiment impact).',
        options: [
          'Only PR agency fees',
          'Comprehensive metrics including communication costs, impact on sales/customer retention, brand sentiment analysis, and stock price (if applicable)',
          'Basic tracking of press mentions',
          'No specific financial monitoring needed'
        ],
        correctAnswer: 1, explanation: 'Comprehensive monitoring links communication efforts to business outcomes.', hints: ['Consider tangible and intangible impacts', 'Think about ROI of communication spend'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how do you maintain message consistency?',
        scenario: 'Media inquiries are coming in, and employees are talking. A single, approved message is crucial to avoid confusion or misstatements.',
        options: [
          'Allow each department to respond independently',
          'Implement centralized message control, provide approved talking points, and designate specific spokespersons',
          'Respond only through the CEO',
          'Use only automated responses'
        ],
        correctAnswer: 1, explanation: 'Centralized control and clear talking points ensure consistency and accuracy.', hints: ['Think about coordination and approval processes', 'Consider designated spokespersons'], role: 'Marketing'
      },
      {
        question: 'How should the CFO allocate resources for different communication channels?',
        scenario: 'The crisis plan uses multiple channels (press, social media, email). The budget needs to be allocated effectively across these channels.',
        options: [
          'Equal allocation to all channels',
          'Strategic allocation based on the target audience, impact, reach, and cost-effectiveness of each channel',
          'Minimal spending on all channels',
          'Allocate only to the cheapest channels'
        ],
        correctAnswer: 1, explanation: 'Strategic allocation maximizes the effectiveness of the communication budget.', hints: ['Consider channel effectiveness for specific audiences', 'Think about ROI and impact'], role: 'CFO'
      },
      {
        question: 'As Legal Division, what is the primary role during crisis communication development?',
        scenario: 'Marketing is drafting external statements about the incident. Legal must review these carefully before they are released.',
        options: [
          'Checking for typos and grammatical errors',
          'Reviewing all external communications for legal accuracy, compliance, privilege preservation, and liability management',
          'Ensuring the tone is sufficiently apologetic',
          'Approving the font choice'
        ],
        correctAnswer: 1, explanation: 'Legal ensures that crisis communications do not create unnecessary legal risks or violate regulations.', hints: ['Focus on legal risk mitigation', 'Consider accuracy, compliance, and potential admissions'], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, what information should be provided to the communications team about the technical situation?',
        scenario: 'The Marketing/PR team needs accurate, understandable updates on the technical recovery status to share with stakeholders.',
        options: [
          'Raw server logs and network diagrams',
          'Accurate, verified information about incident status, impact on services, and estimated recovery progress, translated into clear, non-technical terms',
          'Speculation about the specific malware variant used',
          'No information until the incident is fully resolved and forensics are complete'
        ],
        correctAnswer: 1, explanation: 'Clear, accurate technical updates, explained simply, are crucial for credible stakeholder communication.', hints: ['Focus on clarity and accuracy for a non-technical audience', 'Consider what information is safe to share'], role: 'IT System'
      },
      {
        question: 'As Legal Division, what should be avoided in public crisis communications?',
        scenario: 'Marketing has drafted a public statement about the incident for Legal review. Certain types of statements could significantly increase the company\'s legal liability.',
        options: [
          'Expressing empathy for affected parties and commitment to fixing the issue',
          'Speculating on unverified facts, blaming specific employees publicly, or admitting legal fault prematurely',
          'Providing contact information for customer inquiries or regulators',
          'Referring to the company\'s commitment to security and privacy'
        ],
        correctAnswer: 1, explanation: 'Premature admissions, speculation, or public blaming can significantly increase legal liability and damage reputation.', hints: ['Consider legal implications of statements', 'Focus on factual, verified information; avoid admitting liability'], role: 'Legal Division'
      }
    ]
  },
  {
    id: 'strategic',
    title: 'Strategic Impact',
    description: 'Evaluating long-term business impact and recovery',
    icon: 'Target',
    impact: 'Business Strategy',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should long-term financial strategy be adjusted?',
        scenario: 'This incident revealed vulnerabilities. Post-incident, the company needs to consider strategic financial adjustments for future resilience.',
        options: [
          'No changes needed, it was a one-off event',
          'Comprehensive strategy revision including increased contingency funds, cyber insurance review, and risk mitigation investments',
          'Minor adjustments to quarterly forecasts',
          'Wait and see how the market reacts'
        ],
        correctAnswer: 1, explanation: 'Strategic revision incorporating lessons learned ensures long-term financial resilience.', hints: ['Consider future risks and preparedness', 'Think about financial resilience'], role: 'CFO'
      },
      {
        question: 'How should Marketing adapt long-term brand strategy?',
        scenario: 'The incident has negatively impacted brand trust. The long-term marketing strategy must address how to rebuild this trust.',
        options: [
          'Maintain the current strategy and hope people forget',
          'Develop enhanced strategy incorporating transparency, rebuilding trust, and highlighting new security investments',
          'Minimal changes to messaging',
          'Focus marketing entirely on new products'
        ],
        correctAnswer: 1, explanation: 'Strategic adaptation is needed to rebuild trust and strengthen brand resilience.', hints: ['Consider brand perception and trust', 'Think about future positioning and messaging'], role: 'Marketing'
      },
      {
        question: 'What financial planning should the CFO implement for future resilience?',
        scenario: 'To better withstand future incidents, proactive investments in areas like security and improved backups are needed. This requires financial planning.',
        options: [
          'Standard operational budget planning',
          'Enhanced financial planning including dedicated budgets for risk mitigation, resilience resources (e.g., better backups), and regular security audits',
          'Update depreciation schedules only',
          'Assume no major incidents will happen again'
        ],
        correctAnswer: 1, explanation: 'Enhanced planning specifically addressing security risks improves future resilience.', hints: ['Consider proactive security investments', 'Think about long-term preparedness costs'], role: 'CFO'
      },
      {
        question: 'As Marketing Director, how do you rebuild long-term stakeholder confidence?',
        scenario: 'Following the incident, key stakeholders (investors, partners, customers) are concerned. A sustained effort is needed to restore their confidence.',
        options: [
          'Assume confidence will return over time',
          'Implement comprehensive confidence-building strategy involving consistent communication, showcasing improvements, and engaging stakeholders directly',
          'Send occasional positive news updates',
          'Focus only on acquiring new customers'
        ],
        correctAnswer: 1, explanation: 'A comprehensive, ongoing strategy is needed to actively rebuild stakeholder trust.', hints: ['Think about transparency and accountability', 'Consider long-term relationship building'], role: 'Marketing'
      },
      {
        question: 'How should the CFO structure long-term recovery investments?',
        scenario: 'Investing in better security or infrastructure post-incident shouldn\'t be seen just as a cost, but as a strategic investment needing proper financial structuring.',
        options: [
          'As minimal operational expenses',
          'As strategic investments in resilience (security tech, DRP) and potentially growth (modernizing systems), evaluated for ROI',
          'Within the standard IT maintenance budget',
          'Delay investments until profitability fully recovers'
        ],
        correctAnswer: 1, explanation: 'Treating recovery and resilience as strategic investments ensures adequate funding and focus.', hints: ['Consider long-term value vs. short-term cost', 'Think about ROI and strategic alignment'], role: 'CFO'
      },
      {
        question: 'As Legal Division, how can lessons learned from the incident inform future contract negotiations (e.g., with vendors)?',
        scenario: 'The post-incident review showed weaknesses in current vendor contracts regarding security obligations. Future contracts need strengthening.',
        options: [
          'By demanding lower prices',
          'By incorporating stronger clauses related to security requirements, liability limits, breach notification timelines, and audit rights',
          'By using standard contract templates only',
          'By avoiding contracts with IT vendors'
        ],
        correctAnswer: 1, explanation: 'Incidents highlight weaknesses; future contracts should address these through specific legal clauses.', hints: ['Consider vendor risk management', 'Think about contractual protections and liability'], role: 'Legal Division'
      },
      {
        question: 'As IT System lead, what strategic technology investments could prevent similar incidents in the future?',
        scenario: 'The root cause analysis points to specific technology gaps (e.g., lack of EDR, poor segmentation). Strategic investment is needed to address these.',
        options: [
          'Faster internet connections for the office',
          'Investments in advanced threat detection (EDR/XDR), zero-trust architecture, improved identity/access management, network segmentation, and enhanced backup/recovery solutions',
          'More user training videos about phishing',
          'New ergonomic keyboards for the IT team'
        ],
        correctAnswer: 1, explanation: 'Strategic IT investments should focus on core security capabilities and modern architectures to build long-term resilience.', hints: ['Think about layered security defense', 'Consider modern security frameworks like Zero Trust'], role: 'IT System'
      },
      {
        question: 'As Legal Division, how should the company\'s incident response plan be updated based on this event?',
        scenario: 'The response to this incident revealed flaws in the existing Incident Response Plan (IRP), such as unclear roles or communication steps.',
        options: [
          'It doesn\'t need updating, this was unique',
          'Update roles/responsibilities, clarify communication protocols, refine legal/regulatory checklists, and incorporate lessons learned based on identified gaps',
          'Make the plan shorter and less detailed',
          'Focus the plan only on the technical recovery steps'
        ],
        correctAnswer: 1, explanation: 'The incident response plan should be a living document, updated with lessons learned to improve future responses.', hints: ['Consider the post-incident review findings', 'Think about operationalizing lessons learned'], role: 'Legal Division'
      }
    ]
  }
]; 