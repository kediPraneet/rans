export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hints?: string[];
  role: string;
  scenario?: string;
  cardTitle?: string;
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
  'Chief Finance Officer (CFO)',
  'IT System Leader',
  'Legal Division Head',
  'Marketing & Communication',
  'Vendor/Supply Chain Manager',
  'Governance & Compliance Officer',
  'Security Incident Manager'
];

// --- Populate riskCards directly with specific scenarios ---
export const riskCards: RiskCard[] = [
  {
    id: 'operational',
    title: 'Operational Disruptions',
    description: 'Managing business operations during ransomware attacks and service disruptions',
    icon: 'Building2',
    impact: 'Business Continuity',
    roles: roles,
    questions: [
      {
        question: 'As CFO, what financial measures should be implemented immediately during the operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The ransomware attack has encrypted critical business systems, causing significant operational disruption. Emergency funds are available, but the duration of the impact is unknown.</strong>',
        options: [
          'Access emergency funds only',
          'Implement comprehensive financial contingency plan including emergency funds, credit lines, and insurance claims',
          'Wait for situation resolution',
          'Only contact insurance provider'
        ],
        correctAnswer: 1, explanation: 'A comprehensive financial response ensures business continuity and recovery.', hints: ['Consider multiple financial resources', 'Think about immediate and short-term needs'], role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Marketing Director, how should you handle customer communications during the disruption?',
        scenario: '<strong style="font-size: 1.25em">Customers are experiencing service outages and data access issues. Support lines are overwhelmed. A consistent message is needed urgently.</strong>',
        options: [
          'Delay all communications',
          'Develop a strategic communication plan with transparent updates',
          'Only respond to direct inquiries',
          'Delegate to customer service'
        ],
        correctAnswer: 1, explanation: 'Strategic communication maintains customer trust and manages expectations.', hints: ['Think about transparency', 'Consider customer relationships'], role: 'Marketing & Communication'
      },
      {
        question: 'From a CFO perspective, how should operational recovery costs be prioritized?',
        scenario: '<strong style="font-size: 1.25em">IT needs funds for system restoration, Legal needs resources for breach notifications, and Support needs overtime pay. Limited immediate funds are available.</strong>',
        options: [
          'Based on department size',
          'Based on revenue impact and critical business functions',
          'Equal distribution',
          'Based on request order'
        ],
        correctAnswer: 1, explanation: 'Prioritizing based on revenue impact ensures efficient resource allocation.', hints: ['Consider business impact', 'Think about revenue streams'], role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Marketing lead, how should you manage brand reputation during the disruption?',
        scenario: '<strong style="font-size: 1.25em">News of the ransomware attack is spreading. Competitors might leverage this. Negative press could have long-term impact if not managed proactively.</strong>',
        options: [
          'Minimize public communication',
          'Implement proactive reputation management strategy',
          'Only address negative feedback',
          'Wait for full resolution'
        ],
        correctAnswer: 1, explanation: 'Proactive reputation management helps maintain stakeholder confidence.', hints: ['Think about stakeholder perception', 'Consider long-term impact'], role: 'Marketing & Communication'
      },
      {
        question: 'What financial metrics should the CFO monitor during the operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The ransomware disruption is ongoing. To understand the daily financial impact and inform recovery decisions, specific metrics need close tracking.</strong>',
        options: [
          'Only cash flow',
          'Comprehensive metrics including cash flow, recovery costs, revenue impact, and customer retention',
          'Just daily expenses',
          'Only system downtime costs'
        ],
        correctAnswer: 1, explanation: 'Monitoring comprehensive metrics ensures effective financial management.', hints: ['Consider multiple financial aspects', 'Think about long-term impacts'], role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Legal Division, what is the primary legal concern regarding operational disruption caused by ransomware?',
        scenario: '<strong style="font-size: 1.25em">The encrypted systems mean the company is failing to meet its obligations to provide services to customers and partners.</strong>',
        options: [
          'Employee overtime claims',
          'Breach of contract with customers/partners due to service unavailability',
          'Office lease violations',
          'Trademark infringement'
        ],
        correctAnswer: 1, explanation: 'Operational disruptions can lead to failure to meet contractual obligations, posing significant legal risk.', hints: ['Consider external agreements', 'Think about service level agreements (SLAs)'], role: 'Legal Division Head'
      },
      {
        question: 'As IT System lead, what is the first technical step to ensure operational continuity?',
        scenario: '<strong style="font-size: 1.25em">Critical systems are encrypted. The priority is to restore essential services and establish secure communication channels ASAP.</strong>',
        options: [
          'Order new hardware',
          'Activate the Business Continuity Plan and implement secure communication channels',
          'Update antivirus software',
          'Reset all user passwords'
        ],
        correctAnswer: 1, explanation: 'The Business Continuity Plan outlines procedures for restoring essential services and establishing secure communication channels.', hints: ['Focus on immediate recovery actions', 'Consider predefined plans'], role: 'IT System Leader'
      },
      {
        question: 'As Legal Division, what advice should be given regarding communication about service unavailability?',
        scenario: '<strong style="font-size: 1.25em">Marketing is preparing a statement for customers about the ransomware situation. Legal needs to review it before release to manage liability.</strong>',
        options: [
          'Avoid mentioning the ransomware attack specifically',
          'Be transparent about the disruption but follow approved legal language',
          'Promise a specific recovery timeline immediately',
          'Blame a third-party vendor'
        ],
        correctAnswer: 1, explanation: 'Legal review is crucial to ensure communications are accurate, compliant, and manage liability.', hints: ['Balance transparency with legal risk', 'Think about regulatory disclosure requirements'], role: 'Legal Division Head'
      },
      {
        question: 'As Security Incident Manager, what is your immediate priority when ransomware is detected?',
        scenario: '<strong style="font-size: 1.25em">Ransomware has been detected encrypting files on multiple systems. The attack is actively spreading across the network.</strong>',
        options: [
          'Start decryption attempts immediately',
          'Activate incident response team and establish command structure',
          'Notify all employees via email',
          'Begin backup restoration'
        ],
        correctAnswer: 1,
        explanation: 'Establishing command and control through incident response is critical for coordinated response.',
        hints: ['Think about coordination and control', 'Consider established procedures'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, what is the immediate concern during operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The ransomware has affected systems used to communicate with vendors and manage supply chain operations.</strong>',
        options: [
          'Renegotiate all contracts',
          'Notify critical vendors and activate alternative communication channels',
          'Suspend all vendor relationships',
          'Only focus on payment systems'
        ],
        correctAnswer: 1,
        explanation: 'Maintaining critical vendor relationships through alternative channels ensures supply chain continuity.',
        hints: ['Think about business continuity', 'Consider vendor communication'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, what immediate compliance concerns arise from operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The ransomware attack has disrupted systems that ensure regulatory compliance and reporting.</strong>',
        options: [
          'Ignore compliance temporarily',
          'Assess regulatory notification requirements and implement alternative compliance measures',
          'Only focus on financial compliance',
          'Wait for systems to be restored'
        ],
        correctAnswer: 1,
        explanation: 'Immediate assessment of compliance obligations ensures regulatory requirements are met despite the disruption.',
        hints: ['Consider regulatory deadlines', 'Think about notification requirements'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Chief Finance Officer, how should emergency funding be prioritized during system outages?',
        scenario: '<strong style="font-size: 1.25em">Multiple departments are requesting emergency funds for ransomware response. IT needs $2M for new hardware, Legal needs $500K for external counsel, and HR needs $300K for employee support services.</strong>',
        options: [
          'Approve all requests equally',
          'Prioritize based on business impact analysis and recovery timeline',
          'Deny all non-essential requests',
          'Only approve IT requests'
        ],
        correctAnswer: 1,
        explanation: 'Strategic prioritization based on business impact ensures optimal resource allocation during crisis.',
        hints: ['Consider which functions are most critical', 'Think about recovery dependencies'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As IT System Leader, what is the priority order for system restoration during ransomware recovery?',
        scenario: '<strong style="font-size: 1.25em">All systems are down. You must decide the restoration sequence: customer databases, internal email, payment processing, inventory management, and employee access systems.</strong>',
        options: [
          'Start with internal email for communication',
          'Prioritize revenue-generating systems: payment processing, then customer databases',
          'Restore everything simultaneously',
          'Begin with the simplest systems first'
        ],
        correctAnswer: 1,
        explanation: 'Revenue-generating systems should be prioritized to minimize financial impact and restore customer service.',
        hints: ['Think about business revenue streams', 'Consider customer impact first'],
        role: 'IT System Leader'
      },
      {
        question: 'As Marketing & Communication, how should you handle social media during the operational crisis?',
        scenario: '<strong style="font-size: 1.25em">Customers are posting complaints about service outages on social media. Negative posts are gaining traction and competitors are responding to frustrated customers.</strong>',
        options: [
          'Ignore social media until systems are restored',
          'Implement proactive social media response with regular updates and customer support',
          'Only respond to direct mentions',
          'Delete negative comments'
        ],
        correctAnswer: 1,
        explanation: 'Proactive social media engagement helps control the narrative and maintain customer relationships.',
        hints: ['Think about brand reputation protection', 'Consider real-time customer concerns'],
        role: 'Marketing & Communication'
      },
      {
        question: 'As Legal Division Head, what contracts should be reviewed immediately during operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The ransomware attack is preventing the company from meeting various contractual obligations. Service level agreements, vendor contracts, and customer agreements may all be affected.</strong>',
        options: [
          'Only review customer contracts',
          'Systematically review all contracts with service level commitments and force majeure clauses',
          'Wait until systems are restored',
          'Focus only on the largest contracts'
        ],
        correctAnswer: 1,
        explanation: 'Systematic contract review helps identify legal risks and potential remedies during the crisis.',
        hints: ['Consider force majeure provisions', 'Think about service level agreement penalties'],
        role: 'Legal Division Head'
      },
      {
        question: 'As Security Incident Manager, how should you coordinate with external agencies during the incident?',
        scenario: '<strong style="font-size: 1.25em">Law enforcement, cyber insurance investigators, and third-party forensics teams all want access to evidence and systems. Coordination is critical to avoid conflicts.</strong>',
        options: [
          'Allow each agency independent access',
          'Establish a coordination protocol with designated liaison points and evidence preservation procedures',
          'Limit access to law enforcement only',
          'Delay external coordination until internal assessment is complete'
        ],
        correctAnswer: 1,
        explanation: 'Proper coordination ensures all stakeholders get needed access while preserving evidence integrity.',
        hints: ['Think about evidence preservation', 'Consider multiple stakeholder needs'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should supplier payments be handled during system outages?',
        scenario: '<strong style="font-size: 1.25em">The ransomware has encrypted accounts payable systems. Critical suppliers are expecting payments and threatening to suspend deliveries if payments are delayed.</strong>',
        options: [
          'Delay all payments until systems are restored',
          'Implement alternative payment processing for critical suppliers while maintaining audit controls',
          'Pay all suppliers to avoid issues',
          'Negotiate extended payment terms with all vendors'
        ],
        correctAnswer: 1,
        explanation: 'Alternative payment processes maintain critical supplier relationships while preserving financial controls.',
        hints: ['Think about supply chain continuity', 'Consider financial control requirements'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, what regulatory notifications must be prioritized during operational disruption?',
        scenario: '<strong style="font-size: 1.25em">The company operates in healthcare and financial services sectors. Multiple regulators may require notification of the operational disruption within specific timeframes.</strong>',
        options: [
          'Notify all regulators simultaneously with generic messages',
          'Prioritize notifications based on regulatory deadlines and sector-specific requirements',
          'Wait until the full impact is known',
          'Only notify if specifically asked'
        ],
        correctAnswer: 1,
        explanation: 'Prioritized, sector-specific notifications ensure compliance with various regulatory frameworks.',
        hints: ['Consider different regulatory deadlines', 'Think about sector-specific requirements'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Security Incident Manager, how should network segmentation be implemented during active ransomware spread?',
        scenario: '<strong style="font-size: 1.25em">The ransomware is actively spreading through the network. Immediate containment is critical to prevent further damage while maintaining essential business functions.</strong>',
        options: [
          'Shut down the entire network immediately',
          'Implement tactical network segmentation to isolate infected systems while preserving critical business functions',
          'Only monitor the spread without intervention',
          'Focus solely on endpoint protection'
        ],
        correctAnswer: 1,
        explanation: 'Tactical segmentation balances containment needs with business continuity requirements.',
        hints: ['Think about containment strategy', 'Consider business impact'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor security assessments be conducted during the incident?',
        scenario: '<strong style="font-size: 1.25em">Multiple vendors may have been affected by the same attack vector. Rapid assessment is needed to identify potential vendor-related security risks.</strong>',
        options: [
          'Trust all existing vendor certifications',
          'Conduct rapid vendor security questionnaires focusing on recent security incidents and current protective measures',
          'Suspend relationships with all vendors',
          'Only assess vendors with direct network access'
        ],
        correctAnswer: 1,
        explanation: 'Rapid vendor assessment helps identify additional security risks and potential compromise vectors.',
        hints: ['Think about vendor compromise indicators', 'Consider supply chain security'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should regulatory reporting timelines be managed during the crisis?',
        scenario: '<strong style="font-size: 1.25em">Multiple regulatory deadlines are approaching during the incident response. Some reports require affected system data that may not be accessible.</strong>',
        options: [
          'Skip all regulatory reporting until systems are restored',
          'Develop regulatory communication plan addressing reporting delays and alternative compliance measures',
          'File all reports with incomplete data',
          'Only focus on the most critical regulatory requirements'
        ],
        correctAnswer: 1,
        explanation: 'Proactive regulatory communication demonstrates good faith compliance efforts despite technical difficulties.',
        hints: ['Think about regulator relationships', 'Consider compliance alternatives'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Security Incident Manager, what threat intelligence should be gathered during the incident?',
        scenario: '<strong style="font-size: 1.25em">Understanding the specific threat actor and attack methods could inform response decisions and help prevent similar future attacks.</strong>',
        options: [
          'Focus only on immediate containment',
          'Gather threat intelligence including attacker TTPs, indicators of compromise, and similar attack patterns',
          'Wait until recovery is complete for threat analysis',
          'Only collect basic attack signatures'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive threat intelligence informs response decisions and improves long-term security posture.',
        hints: ['Think about attack attribution', 'Consider future prevention'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should emergency vendor onboarding be handled during the crisis?',
        scenario: '<strong style="font-size: 1.25em">The incident response requires specialized services from new vendors (forensics, legal counsel, crisis communication). Normal onboarding processes are too slow.</strong>',
        options: [
          'Use only existing pre-approved vendors',
          'Implement expedited vendor onboarding with essential security checks and emergency contracting procedures',
          'Skip all vendor vetting during the emergency',
          'Delay new vendor engagement until normal processes resume'
        ],
        correctAnswer: 1,
        explanation: 'Expedited onboarding enables access to critical expertise while maintaining essential security controls.',
        hints: ['Think about essential security requirements', 'Consider specialized expertise needs'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, what documentation standards must be maintained during the incident?',
        scenario: '<strong style="font-size: 1.25em">All incident response activities must be properly documented for regulatory review, insurance claims, and legal proceedings.</strong>',
        options: [
          'Focus only on technical documentation',
          'Establish comprehensive documentation protocols covering all response activities, decisions, and compliance actions',
          'Document only major decisions',
          'Handle documentation after incident resolution'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive documentation ensures regulatory compliance and supports legal and insurance requirements.',
        hints: ['Think about audit trails', 'Consider multiple stakeholder needs'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Security Incident Manager, how should backup integrity be verified before restoration?',
        scenario: '<strong style="font-size: 1.25em">Backups are available for system restoration, but they must be verified as clean and uncorrupted before use to prevent reintroducing malware.</strong>',
        options: [
          'Trust backup systems completely',
          'Implement comprehensive backup verification including malware scanning, integrity checks, and isolated testing environments',
          'Only verify the most recent backups',
          'Restore backups immediately without verification'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive verification prevents reintroduction of malware and ensures data integrity.',
        hints: ['Think about backup contamination', 'Consider testing environments'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor contract modifications be handled during the crisis?',
        scenario: '<strong style="font-size: 1.25em">The incident may trigger contract modifications, force majeure claims, or require emergency contract amendments for critical services.</strong>',
        options: [
          'Maintain all existing contract terms',
          'Work with legal to implement appropriate contract modifications including force majeure provisions and emergency service amendments',
          'Renegotiate all vendor contracts',
          'Ignore contractual obligations during the crisis'
        ],
        correctAnswer: 1,
        explanation: 'Strategic contract modifications help manage vendor relationships and legal obligations during the crisis.',
        hints: ['Think about legal protections', 'Consider vendor relationship preservation'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should cross-border compliance issues be addressed during the incident?',
        scenario: '<strong style="font-size: 1.25em">The company operates internationally, and different countries have varying requirements for incident notification and data breach reporting.</strong>',
        options: [
          'Apply only domestic regulations',
          'Develop jurisdiction-specific compliance strategy addressing varying international requirements and reporting obligations',
          'Use the most restrictive requirements for all jurisdictions',
          'Address international compliance after domestic requirements'
        ],
        correctAnswer: 1,
        explanation: 'Jurisdiction-specific compliance ensures all international obligations are met appropriately.',
        hints: ['Think about regulatory differences', 'Consider international obligations'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Security Incident Manager, how should evidence preservation be balanced with business recovery needs?',
        scenario: '<strong style="font-size: 1.25em">Law enforcement and legal teams need evidence preserved, but business teams need systems restored quickly. These requirements may conflict.</strong>',
        options: [
          'Prioritize business recovery over evidence preservation',
          'Develop evidence preservation strategy that supports both legal requirements and business recovery timelines',
          'Focus solely on evidence preservation',
          'Let legal and business teams resolve conflicts independently'
        ],
        correctAnswer: 1,
        explanation: 'Balanced approach ensures legal compliance while enabling business recovery within reasonable timeframes.',
        hints: ['Think about legal requirements', 'Consider business continuity needs'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor data security be enhanced post-incident?',
        scenario: '<strong style="font-size: 1.25em">The incident highlighted vulnerabilities in vendor data security practices. Enhanced security requirements need to be implemented for future vendor relationships.</strong>',
        options: [
          'Maintain existing vendor security standards',
          'Develop enhanced vendor security requirements including incident response capabilities, security monitoring, and regular assessments',
          'Only require security certifications',
          'Focus solely on data encryption requirements'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced vendor security requirements improve overall supply chain security posture.',
        hints: ['Think about supply chain security', 'Consider comprehensive security requirements'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should board reporting be structured during the incident?',
        scenario: '<strong style="font-size: 1.25em">The board requires regular updates on the incident, response efforts, and compliance status. Reporting must be comprehensive yet accessible.</strong>',
        options: [
          'Provide only technical updates',
          'Develop structured board reporting covering incident status, business impact, compliance actions, and strategic implications',
          'Limit reporting to financial impacts only',
          'Defer board reporting until incident resolution'
        ],
        correctAnswer: 1,
        explanation: 'Structured board reporting ensures governance oversight and supports strategic decision-making during the crisis.',
        hints: ['Think about governance requirements', 'Consider strategic oversight needs'],
        role: 'Governance & Compliance Officer'
      }
    ]
  },
  {
    id: 'ransom',
    title: 'Ransom Pay',
    description: 'Evaluating and managing ransom demands',
    icon: 'Banknote',
    impact: 'Financial and Legal Implications',
    roles: roles,
    questions: [
      {
        question: 'As CFO, what financial analysis is needed for the ransom payment decision?',
        scenario: '<strong style="font-size: 1.25em">The attackers demand payment to decrypt systems. Paying might restore access, but recovery costs are high either way. A decision is needed soon.</strong>',
        options: [
          'Only payment amount',
          'Comprehensive analysis of payment impact, recovery costs, and business losses',
          'Basic cost comparison',
          'Insurance coverage only'
        ],
        correctAnswer: 1, explanation: 'A comprehensive financial analysis ensures informed decision-making.', hints: ['Consider all financial implications', 'Think about long-term impact'], role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'How should Marketing handle public perception if ransom payment is considered?',
        scenario: '<strong style="font-size: 1.25em">Internal discussions about potentially paying the ransom are occurring. There\'s a risk this information could leak.</strong>',
        options: [
          'No communication',
          'Develop strategic messaging focusing on business continuity and customer protection',
          'Deny all payment discussions',
          'Only internal communications'
        ],
        correctAnswer: 1, explanation: 'Strategic messaging helps manage stakeholder perceptions.', hints: ['Consider stakeholder concerns', 'Think about transparency levels'], role: 'Marketing & Communication'
      },
      {
        question: 'What financial contingencies should the CFO prepare for ransom scenarios?',
        scenario: '<strong style="font-size: 1.25em">Whether paying the ransom or funding a lengthy recovery, significant unplanned expenses are certain. Preparations are needed.</strong>',
        options: [
          'Only payment funds',
          'Comprehensive plan including payment options, recovery funds, and business continuity resources',
          'Basic emergency fund',
          'Wait for demands'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive contingency planning ensures readiness.',
        hints: ['Think about multiple scenarios', 'Consider resource allocation'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Marketing Director, how should customer concerns about data security be addressed?',
        scenario: '<strong style="font-size: 1.25em">Regardless of payment, customers are worried about their data and need reassurance about security measures.</strong>',
        options: [
          'Ignore concerns',
          'Implement transparent communication strategy with regular updates (based on known facts)',
          'Minimal responses',
          'Defer all questions'
        ],
        correctAnswer: 1,
        explanation: 'Transparent communication maintains customer trust.',
        hints: ['Consider customer confidence', 'Think about information sharing'],
        role: 'Marketing & Communication'
      },
      {
        question: 'What financial documentation should the CFO maintain during ransom negotiations?',
        scenario: '<strong style="font-size: 1.25em">If negotiations occur, auditors and insurers will require detailed records of the process and any associated costs.</strong>',
        options: [
          'Basic payment records',
          'Comprehensive documentation of all costs, decisions, and impact assessments',
          'Only payment amounts',
          'Minimal records'
        ],
        correctAnswer: 1,
        explanation: 'Thorough documentation supports decision-making and compliance.',
        hints: ['Think about audit requirements', 'Consider legal implications'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Legal Division, what are the key legal risks associated with paying ransom?',
        scenario: '<strong style="font-size: 1.25em">Paying the ransom might violate government sanctions if the attackers are on a restricted list. There could be severe penalties.</strong>',
        options: [
          'Tax implications',
          'Violation of anti-money laundering (AML) laws or sanctions (e.g., OFAC)',
          'Employee dissatisfaction',
          'Negative press coverage'
        ],
        correctAnswer: 1,
        explanation: 'Paying ransom, especially to certain groups, can violate sanctions and AML regulations, leading to severe penalties.',
        hints: ['Consider regulatory compliance', 'Think about the recipient of the funds'],
        role: 'Legal Division Head'
      },
      {
        question: 'As IT System lead, what technical factor most influences the "pay vs. don\'t pay" decision?',
        scenario: '<strong style="font-size: 1.25em">Management is weighing paying the ransom versus implementing technical solutions. The ability to restore from backups is critical information.</strong>',
        options: [
          'The availability and integrity of system backups',
          'The cost of the ransom demand',
          'The attacker\'s reputation for providing decryption keys',
          'The type of data encrypted'
        ],
        correctAnswer: 0,
        explanation: 'If reliable backups exist, restoring systems is often preferable to paying ransom.',
        hints: ['Consider technical solutions', 'Think about alternatives to payment'],
        role: 'IT System Leader'
      },
      {
        question: 'As Legal Division, what documentation is essential if a decision is made to pay the ransom?',
        scenario: '<strong style="font-size: 1.25em">If payment proceeds, regulatory bodies and insurance may investigate. Legal must ensure the decision and process are meticulously documented.</strong>',
        options: [
          'Only the transaction record',
          'Documentation justifying the decision, proof of sanctions checks, and communication records',
          'A summary for the CEO',
          'Notes from the negotiation calls'
        ],
        correctAnswer: 1,
        explanation: 'Thorough documentation is vital for potential regulatory scrutiny and insurance claims.',
        hints: ['Consider audit trails', 'Think about potential investigations'],
        role: 'Legal Division Head'
      },
      {
        question: 'As Security Incident Manager, what technical assessment is needed before any ransom payment decision?',
        scenario: '<strong style="font-size: 1.25em">Management is considering paying the ransom. As the incident manager, you need to provide technical input on the viability of payment versus recovery alternatives.</strong>',
        options: [
          'Recommend payment to speed recovery',
          'Conduct comprehensive assessment of backup integrity, decryption feasibility, and alternative recovery options',
          'Defer to management decision',
          'Focus only on payment logistics'
        ],
        correctAnswer: 1,
        explanation: 'Technical assessment provides critical information for informed decision-making about payment versus recovery.',
        hints: ['Consider all technical alternatives', 'Think about recovery feasibility'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor relationships be managed during ransom negotiations?',
        scenario: '<strong style="font-size: 1.25em">Key suppliers are aware of the ransomware incident and are concerned about payment delays and data security. Some are requesting additional security assurances.</strong>',
        options: [
          'Inform all vendors about ransom payment plans',
          'Develop vendor communication strategy focusing on business continuity and security improvements',
          'Avoid vendor communication until resolution',
          'Only communicate with critical suppliers'
        ],
        correctAnswer: 1,
        explanation: 'Strategic vendor communication maintains relationships while protecting sensitive information about ransom decisions.',
        hints: ['Think about information sensitivity', 'Consider vendor confidence'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, what compliance implications arise from ransom payment decisions?',
        scenario: '<strong style="font-size: 1.25em">The company operates in multiple jurisdictions with different regulations regarding ransom payments. Some countries prohibit payments to certain groups, while others have reporting requirements.</strong>',
        options: [
          'Ignore international variations',
          'Assess jurisdiction-specific regulations and reporting requirements before any payment decision',
          'Follow only domestic regulations',
          'Consult legal counsel only after payment'
        ],
        correctAnswer: 1,
        explanation: 'Multi-jurisdictional compliance assessment is essential before making any payment decisions.',
        hints: ['Consider international regulations', 'Think about reporting obligations'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Chief Finance Officer, how should insurance claims be coordinated with ransom payment decisions?',
        scenario: '<strong style="font-size: 1.25em">The cyber insurance policy covers ransom payments and recovery costs. The insurer wants to be involved in payment decisions and may have preferred negotiators.</strong>',
        options: [
          'Make payment decisions independently of insurance',
          'Coordinate closely with insurer, following policy requirements while maintaining decision authority',
          'Let the insurance company make all decisions',
          'Avoid involving insurance until after payment'
        ],
        correctAnswer: 1,
        explanation: 'Insurance coordination ensures policy compliance while maintaining control over critical business decisions.',
        hints: ['Consider policy requirements', 'Think about coverage optimization'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As IT System Leader, what security measures should be implemented during ransom negotiations?',
        scenario: '<strong style="font-size: 1.25em">Communication with attackers requires secure channels. There\'s risk of further compromise during negotiations, and evidence must be preserved for law enforcement.</strong>',
        options: [
          'Use regular email for attacker communication',
          'Implement secure communication protocols, network isolation, and evidence preservation procedures',
          'Rely on third-party negotiators only',
          'Focus only on payment logistics'
        ],
        correctAnswer: 1,
        explanation: 'Secure communication and evidence preservation are critical during sensitive negotiations.',
        hints: ['Think about communication security', 'Consider evidence integrity'],
        role: 'IT System Leader'
      },
      {
        question: 'As Marketing & Communication, how should internal communications handle ransom payment discussions?',
        scenario: '<strong style="font-size: 1.25em">Employees are aware of the ransomware attack and rumors about potential ransom payments are circulating. Clear internal communication is needed to prevent speculation and leaks.</strong>',
        options: [
          'Deny any ransom payment considerations',
          'Provide factual updates about response efforts while maintaining confidentiality on sensitive decisions',
          'Share all payment deliberation details',
          'Avoid internal communication about the incident'
        ],
        correctAnswer: 1,
        explanation: 'Balanced internal communication maintains transparency while protecting sensitive decision-making processes.',
        hints: ['Think about information security', 'Consider employee concerns'],
        role: 'Marketing & Communication'
      },
      {
        question: 'As Security Incident Manager, how should ransom communication channels be secured?',
        scenario: '<strong style="font-size: 1.25em">Direct communication with the ransomware operators is necessary for negotiations. This communication must be secure and monitored while preserving evidence.</strong>',
        options: [
          'Use corporate email systems',
          'Establish isolated, monitored communication channels with encryption and comprehensive logging',
          'Only communicate through third parties',
          'Use personal devices for security'
        ],
        correctAnswer: 1,
        explanation: 'Isolated, monitored channels provide security while maintaining evidence integrity for investigations.',
        hints: ['Think about communication isolation', 'Consider evidence preservation'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor concerns about ransomware payment be addressed?',
        scenario: '<strong style="font-size: 1.25em">Vendors are worried that ransom payment might indicate weak security that could affect their data. They need reassurance about future security measures.</strong>',
        options: [
          'Dismiss vendor security concerns',
          'Develop comprehensive vendor security assurance program highlighting security improvements and monitoring capabilities',
          'Only provide basic security updates',
          'Avoid discussing security with vendors'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive security assurance maintains vendor confidence and strengthens business relationships.',
        hints: ['Think about vendor confidence', 'Consider security demonstration'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, what regulatory disclosure requirements apply to ransom payments?',
        scenario: '<strong style="font-size: 1.25em">If ransom payment occurs, various regulatory bodies may require specific disclosures about the payment, decision process, and business impact.</strong>',
        options: [
          'No disclosure required for ransom payments',
          'Assess sector-specific disclosure requirements including financial, data protection, and operational reporting obligations',
          'Only disclose if payment exceeds certain thresholds',
          'Wait for regulatory inquiries before disclosure'
        ],
        correctAnswer: 1,
        explanation: 'Proactive assessment of disclosure requirements ensures compliance across all applicable regulatory frameworks.',
        hints: ['Consider multiple regulatory frameworks', 'Think about disclosure triggers'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Security Incident Manager, how should payment verification be handled to ensure decryption keys work?',
        scenario: '<strong style="font-size: 1.25em">If payment is made, the decryption keys provided by attackers must be verified as functional before considering the transaction complete.</strong>',
        options: [
          'Test keys on all systems immediately',
          'Implement controlled testing protocol using isolated systems to verify decryption effectiveness before full deployment',
          'Trust the attackers\' provided keys without testing',
          'Only test keys on least critical systems'
        ],
        correctAnswer: 1,
        explanation: 'Controlled testing ensures decryption keys work effectively while minimizing risk of additional compromise.',
        hints: ['Think about controlled testing', 'Consider isolation protocols'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor payment schedules be adjusted during ransom situations?',
        scenario: '<strong style="font-size: 1.25em">The ransom situation has disrupted normal vendor payment processes. Vendors need clarity on how their payment schedules will be affected.</strong>',
        options: [
          'Suspend all vendor payments until resolution',
          'Implement priority-based vendor payment schedule with clear communication about payment timing and methods',
          'Pay all vendors immediately to avoid issues',
          'Make vendors wait without communication'
        ],
        correctAnswer: 1,
        explanation: 'Priority-based payment scheduling maintains critical vendor relationships while managing cash flow during crisis.',
        hints: ['Think about vendor prioritization', 'Consider cash flow management'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should ransom payment decisions be documented for audit purposes?',
        scenario: '<strong style="font-size: 1.25em">All aspects of the ransom payment decision process must be thoroughly documented to meet audit requirements and demonstrate proper governance.</strong>',
        options: [
          'Document only the final payment decision',
          'Create comprehensive audit trail including decision rationale, alternatives considered, approvals obtained, and compliance assessments',
          'Keep minimal documentation to reduce liability',
          'Focus only on financial documentation'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive audit documentation demonstrates proper governance and supports regulatory compliance.',
        hints: ['Think about audit requirements', 'Consider governance demonstration'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Security Incident Manager, how should network monitoring be enhanced during ransom negotiations?',
        scenario: '<strong style="font-size: 1.25em">During ransom negotiations, network activity must be closely monitored to detect any additional compromise attempts or lateral movement.</strong>',
        options: [
          'Maintain normal monitoring levels',
          'Implement enhanced network monitoring with real-time threat detection and behavioral analysis',
          'Focus monitoring only on critical systems',
          'Reduce monitoring to avoid interference with negotiations'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced monitoring during negotiations helps detect additional threats and protects against further compromise.',
        hints: ['Think about threat detection', 'Consider ongoing protection'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor risk assessments be updated following ransom incidents?',
        scenario: '<strong style="font-size: 1.25em">The ransom incident highlights the need to reassess vendor risks and update risk management procedures for all vendor relationships.</strong>',
        options: [
          'Keep existing vendor risk assessments unchanged',
          'Conduct comprehensive vendor risk reassessment focusing on cyber security capabilities and incident response preparedness',
          'Only assess vendors who were directly affected',
          'Postpone risk assessments until after full recovery'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive risk reassessment strengthens supply chain security and improves vendor selection processes.',
        hints: ['Think about comprehensive risk evaluation', 'Consider vendor security capabilities'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should compliance monitoring be enhanced during ransom payment processes?',
        scenario: '<strong style="font-size: 1.25em">The ransom payment process involves multiple compliance considerations that require enhanced monitoring and documentation throughout the process.</strong>',
        options: [
          'Rely on standard compliance procedures',
          'Implement enhanced compliance monitoring with real-time tracking of regulatory requirements and decision checkpoints',
          'Focus only on payment compliance',
          'Handle compliance review after payment completion'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced compliance monitoring ensures all regulatory requirements are met throughout the payment decision process.',
        hints: ['Think about real-time compliance', 'Consider regulatory checkpoints'],
        role: 'Governance & Compliance Officer'
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
        scenario: '<strong style="font-size: 1.25em">The incident involves direct costs (recovery, extortion if paid) and indirect costs (lost revenue, reputational harm). A full picture is needed.</strong>',
        options: [
          'Only direct costs',
          'Comprehensive analysis including direct costs, indirect losses, and long-term implications',
          'Basic damage estimate',
          'Wait for final numbers'
        ],
        correctAnswer: 1,
        explanation: 'A comprehensive analysis ensures all financial impacts are considered.',
        hints: ['Consider all cost types', 'Think about long-term effects'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'How should Marketing communicate financial impacts to stakeholders?',
        scenario: '<strong style="font-size: 1.25em">The financial losses are substantial and must be reported. The messaging needs to be carefully crafted for investors and the public.</strong>',
        options: [
          'Share all details',
          'Develop strategic messaging that balances transparency with confidence in recovery',
          'No communication',
          'Only internal updates'
        ],
        correctAnswer: 1,
        explanation: 'Strategic communication maintains stakeholder confidence.',
        hints: ['Consider stakeholder needs', 'Think about market impact'],
        role: 'Marketing & Communication'
      },
      {
        question: 'What financial recovery strategies should the CFO implement?',
        scenario: '<strong style="font-size: 1.25em">Significant funds have been spent on incident response, and revenue was lost. Actions are needed to stabilize the company financially.</strong>',
        options: [
          'Cost cutting only',
          'Balanced approach including cost management, resource reallocation, and recovery investments',
          'Wait for insurance payout',
          'Minimal changes'
        ],
        correctAnswer: 1,
        explanation: 'A balanced strategy ensures effective recovery.',
        hints: ['Consider multiple approaches', 'Think about sustainability'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Marketing Director, how do you maintain customer confidence during financial recovery?',
        scenario: '<strong style="font-size: 1.25em">News about the financial losses may worry customers about the company\'s future and the security of their ongoing services.</strong>',
        options: [
          'Ignore concerns',
          'Implement proactive communication strategy highlighting recovery efforts and future stability',
          'Minimal updates',
          'Only respond to queries'
        ],
        correctAnswer: 1,
        explanation: 'Proactive communication builds confidence.',
        hints: ['Think about customer retention', 'Consider brand trust'],
        role: 'Marketing & Communication'
      },
      {
        question: 'What financial reporting should the CFO prioritize?',
        scenario: '<strong style="font-size: 1.25em">During the recovery period, the board requires frequent updates on the financial situation beyond standard quarterly reports.</strong>',
        options: [
          'Basic reports',
          'Comprehensive reporting including impact analysis, recovery metrics, and forecasts',
          'Only mandatory reports',
          'Delay all reporting'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive reporting supports decision-making.',
        hints: ['Consider reporting needs', 'Think about stakeholder requirements'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Legal Division, what steps must be taken if financial losses impact shareholder value significantly?',
        scenario: '<strong style="font-size: 1.25em">Analysis indicates the incident\'s financial impact is material and likely to affect stock price, triggering disclosure requirements.</strong>',
        options: [
          'Informal update to major shareholders',
          'Formal disclosure following securities regulations (e.g., SEC filings)',
          'Wait for the quarterly earnings report',
          'Consult with the marketing team only'
        ],
        correctAnswer: 1,
        explanation: 'Significant financial events often require formal disclosures to comply with securities laws and regulations.',
        hints: ['Consider investor protection laws', 'Think about material impact disclosure'],
        role: 'Legal Division Head'
      },
      {
        question: 'As IT System lead, how can IT contribute to mitigating future financial losses from similar incidents?',
        scenario: '<strong style="font-size: 1.25em">The high cost of this incident highlights the need for preventative IT measures to reduce the financial impact of future ransomware attacks.</strong>',
        options: [
          'By reducing the IT budget',
          'By implementing enhanced ransomware detection, improving content verification systems, and refining the crisis response plan',
          'By outsourcing all IT functions',
          'By focusing only on endpoint protection'
        ],
        correctAnswer: 1,
        explanation: 'Proactive IT security measures and robust detection systems are key to reducing the financial impact of future incidents.',
        hints: ['Focus on preventative measures', 'Consider resilience and detection speed'],
        role: 'IT System Leader'
      },
      {
        question: 'As Legal Division, what are the potential legal costs associated with ransomware incidents?',
        scenario: '<strong style="font-size: 1.25em">The company may face lawsuits from affected parties, regulatory investigations, and costs for legal representation.</strong>',
        options: [
          'Only court filing fees',
          'Comprehensive legal costs including litigation, regulatory compliance, and potential settlements',
          'Basic legal consultation fees',
          'Minimal legal expenses'
        ],
        correctAnswer: 1,
        explanation: 'Ransomware incidents can lead to significant legal costs across multiple areas.',
        hints: ['Consider all potential legal actions', 'Think about regulatory compliance'],
        role: 'Legal Division Head'
      },
      {
        question: 'As Security Incident Manager, how should financial impact assessment be supported with technical data?',
        scenario: '<strong style="font-size: 1.25em">The CFO needs detailed technical information to accurately assess the financial impact, including system downtime, data loss, and recovery complexity.</strong>',
        options: [
          'Provide only basic incident details',
          'Deliver comprehensive technical impact assessment including downtime metrics, affected systems inventory, and recovery time estimates',
          'Focus only on security measures implemented',
          'Wait until technical analysis is complete'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive technical data enables accurate financial impact assessment and recovery planning.',
        hints: ['Think about financial decision support', 'Consider measurable technical impacts'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor-related financial impacts be assessed?',
        scenario: '<strong style="font-size: 1.25em">The incident has caused vendor relationship issues, potential contract penalties, and supply chain disruptions with financial implications.</strong>',
        options: [
          'Ignore vendor-related costs',
          'Conduct comprehensive assessment of vendor penalties, alternative sourcing costs, and relationship repair expenses',
          'Only consider direct vendor payments',
          'Focus solely on contract violations'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive vendor impact assessment ensures all supply chain-related financial effects are captured.',
        hints: ['Think about total vendor costs', 'Consider relationship repair costs'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, what compliance-related financial impacts should be tracked?',
        scenario: '<strong style="font-size: 1.25em">Regulatory compliance failures during the incident may result in fines, additional reporting costs, and mandatory security improvements.</strong>',
        options: [
          'Only track direct regulatory fines',
          'Comprehensive tracking of fines, compliance remediation costs, audit expenses, and mandatory improvement investments',
          'Focus only on immediate penalties',
          'Wait for final regulatory decisions'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive compliance cost tracking ensures accurate financial impact assessment and budget planning.',
        hints: ['Think about total compliance costs', 'Consider future compliance investments'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Security Incident Manager, how should cyber insurance coordination affect financial planning?',
        scenario: '<strong style="font-size: 1.25em">Cyber insurance coverage may offset some costs, but coordination requirements and coverage limitations affect financial recovery planning.</strong>',
        options: [
          'Assume full insurance coverage',
          'Work with finance to assess actual coverage limits, deductibles, and coordination requirements affecting net financial impact',
          'Focus only on immediate expenses',
          'Ignore insurance coordination'
        ],
        correctAnswer: 1,
        explanation: 'Accurate insurance coordination ensures realistic financial impact assessment and recovery planning.',
        hints: ['Think about coverage limitations', 'Consider coordination requirements'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should emergency vendor costs be managed financially?',
        scenario: '<strong style="font-size: 1.25em">Emergency vendors for forensics, legal support, and crisis management command premium rates that significantly impact incident costs.</strong>',
        options: [
          'Accept all emergency vendor rates',
          'Implement strategic emergency vendor management with cost negotiation, scope control, and performance monitoring',
          'Only use the cheapest available vendors',
          'Delay vendor engagement to reduce costs'
        ],
        correctAnswer: 1,
        explanation: 'Strategic vendor management balances urgent response needs with cost control and value optimization.',
        hints: ['Think about cost-benefit balance', 'Consider urgency vs. cost trade-offs'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should regulatory response costs be budgeted and tracked?',
        scenario: '<strong style="font-size: 1.25em">Multiple regulatory responses require legal representation, compliance consulting, and administrative resources with significant cost implications.</strong>',
        options: [
          'Handle regulatory costs as they arise',
          'Develop comprehensive regulatory response budget including legal fees, consulting costs, and internal resource allocation',
          'Only budget for immediate regulatory requirements',
          'Wait for regulatory guidance before budgeting'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive regulatory cost budgeting ensures adequate resources for compliance response and financial planning.',
        hints: ['Think about multiple regulatory interactions', 'Consider ongoing compliance costs'],
        role: 'Governance & Compliance Officer'
      }
    ]
  },
  {
    id: 'regulatory',
    title: 'Regulatory Notification',
    description: 'Managing regulatory reporting and compliance requirements',
    icon: 'FileText',
    impact: 'Compliance',
    roles: roles,
    questions: [
      {
        question: 'As Legal Division, what regulatory notifications are required for ransomware incidents?',
        scenario: '<strong style="font-size: 1.25em">The ransomware attack has potentially exposed sensitive data and affected multiple stakeholders. Regulatory bodies need to be notified.</strong>',
        options: [
          'Only notify major regulators',
          'Comprehensive notification plan covering all relevant regulatory bodies based on data types and jurisdictions affected',
          'Wait for regulator inquiries',
          'Only notify if data was confirmed stolen'
        ],
        correctAnswer: 1,
        explanation: 'A comprehensive notification plan ensures compliance with all relevant regulations.',
        hints: ['Consider data protection laws', 'Think about industry-specific regulations'],
        role: 'Legal Division Head'
      },
      {
        question: 'As CFO, what financial reporting is required for regulatory compliance?',
        scenario: '<strong style="font-size: 1.25em">The incident has financial implications that may need to be reported to financial regulators.</strong>',
        options: [
          'Only report if material impact',
          'Assess and report all financial impacts according to regulatory requirements',
          'Include in next quarterly report',
          'Only report direct costs'
        ],
        correctAnswer: 1,
        explanation: 'Complete financial reporting ensures regulatory compliance.',
        hints: ['Consider materiality thresholds', 'Think about reporting timelines'],
        role: 'Chief Finance Officer (CFO)'
      }
    ]
  },
  {
    id: 'employment',
    title: 'Employee Notification',
    description: 'Managing employee communications and support',
    icon: 'Users',
    impact: 'Employee Relations',
    roles: roles,
    questions: [
      {
        question: 'As CFO, how should employee-related costs be managed during the incident?',
        scenario: '<strong style="font-size: 1.25em">Incident response involves overtime pay, and if employee data is compromised, costs for support services may arise.</strong>',
        options: [
          'Cut all non-essential expenses',
          'Allocate specific resources for both incident response personnel costs and employee support/communication programs',
          'Delay decisions until after the incident',
          'Minimal spending only on critical response'
        ],
        correctAnswer: 1,
        explanation: 'Proper resource allocation ensures employee support and response effectiveness.',
        hints: ['Consider employee needs and response needs', 'Think about long-term impact'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'How should Marketing handle internal communications?',
        scenario: '<strong style="font-size: 1.25em">Employees are anxious due to the ransomware incident. Clear, consistent, and reassuring internal communication is needed to maintain morale and trust.</strong>',
        options: [
          'No communication until everything is resolved',
          'Develop comprehensive internal communication strategy with regular, factual updates approved by Legal/HR',
          'Minimal updates via email only',
          'Only address emergency safety notices'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive communication maintains employee trust and morale.',
        hints: ['Think about transparency and accuracy', 'Consider employee morale'],
        role: 'Marketing & Communication'
      },
      {
        question: 'What financial support should the CFO consider for affected employees?',
        scenario: '<strong style="font-size: 1.25em">If employee information was used in ransomware content, the company may need to offer support services.</strong>',
        options: [
          'No support beyond legal requirements',
          'Comprehensive support including identity protection services, mental health resources, and potentially direct assistance programs',
          'Minimal assistance like a list of resources',
          'Only legally required benefits'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive support maintains workforce stability and demonstrates care.',
        hints: ['Consider employee welfare', 'Think about retention and goodwill'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Marketing Director, how do you maintain employee engagement?',
        scenario: '<strong style="font-size: 1.25em">The incident response is stressful, and employees may feel disconnected or unappreciated. Engagement efforts are important for morale.</strong>',
        options: [
          'Focus only on external marketing',
          'Partner with HR to implement engaging internal communication, recognize response efforts, and provide clear support information',
          'Send basic company updates',
          'Delegate entirely to HR'
        ],
        correctAnswer: 1,
        explanation: 'Engaging communication and recognizing efforts maintains employee morale.',
        hints: ['Think about internal branding', 'Consider morale impact'],
        role: 'Marketing & Communication'
      },
      {
        question: 'How should the CFO budget for employee support programs?',
        scenario: '<strong style="font-size: 1.25em">HR proposes offering identity protection to all employees impacted by the ransomware incident. This has significant cost implications that need budgeting.</strong>',
        options: [
          'Use leftover funds from other budgets',
          'Develop a comprehensive budget based on estimated uptake, vendor costs, and program duration for support programs and resources',
          'No specific allocation, pay as needed',
          'Standard HR benefits budget'
        ],
        correctAnswer: 1,
        explanation: 'Proper budgeting ensures adequate support and financial control.',
        hints: ['Consider program scope and costs', 'Think about long-term benefits'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Legal Division, what information must be communicated to employees if their images or data were used in ransomware?',
        scenario: '<strong style="font-size: 1.25em">Forensic evidence suggests employee images or data were used in fake content. Specific laws dictate what employees must be told.</strong>',
        options: [
          'A general notice about the IT incident',
          'Specific details required by privacy laws (type of data used, potential risk, protection steps, contact info)',
          'Only that an IT incident occurred, details later',
          'Instructions to change their work passwords only'
        ],
        correctAnswer: 1,
        explanation: 'Specific privacy laws dictate the content required when informing affected individuals.',
        hints: ['Consider specific legal requirements (state/federal)', 'Think about individual rights to information'],
        role: 'Legal Division Head'
      },
      {
        question: 'As IT System lead, how can you support Legal in determining if employee data was compromised?',
        scenario: '<strong style="font-size: 1.25em">Legal needs confirmation and details about the potential use of employee data in ransomware content to fulfill notification duties.</strong>',
        options: [
          'By providing a list of all HR systems',
          'By conducting forensic analysis of affected content, access logs, and network traffic to identify specific data usage',
          'By confirming HR system backups are available',
          'By reporting the total number of employee records'
        ],
        correctAnswer: 1,
        explanation: 'Forensic analysis is essential to understand the scope and nature of data usage during the incident.',
        hints: ['Focus on evidence of specific data usage', 'Consider the technical investigation details for HR data'],
        role: 'IT System Leader'
      },
      {
        question: 'As Legal Division, what are the implications of delaying necessary employee notifications about data usage in ransomware?',
        scenario: '<strong style="font-size: 1.25em">There\'s pressure to delay employee notifications until recovery is complete, but privacy laws often have strict reporting timelines.</strong>',
        options: [
          'Improved employee morale by avoiding panic',
          'Potential violation of notification laws (which often have strict deadlines), leading to fines and lawsuits',
          'More time for IT to fix the issue without distraction',
          'Reduced communication costs'
        ],
        correctAnswer: 1,
        explanation: 'Delaying legally required notifications can result in significant legal and financial penalties.',
        hints: ['Consider notification deadlines in relevant laws', 'Think about regulatory consequences and employee lawsuits'],
        role: 'Legal Division Head'
      },
      {
        question: 'As Security Incident Manager, how should employee access be managed during the incident?',
        scenario: '<strong style="font-size: 1.25em">Employees need access to systems for business continuity, but security requires limiting access to prevent further compromise. Balance is critical.</strong>',
        options: [
          'Shut down all employee access',
          'Implement risk-based access controls with continuous monitoring and secure communication channels',
          'Maintain normal access levels',
          'Only allow management access'
        ],
        correctAnswer: 1,
        explanation: 'Risk-based access balances security needs with business continuity requirements.',
        hints: ['Think about risk assessment', 'Consider business needs'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor employee access be handled during the incident?',
        scenario: '<strong style="font-size: 1.25em">Several vendors have employees who regularly access company systems. During the ransomware incident, their access poses additional security risks.</strong>',
        options: [
          'Immediately revoke all vendor access',
          'Implement enhanced vendor access controls with additional authentication and monitoring',
          'Maintain existing vendor access',
          'Only allow critical vendor access'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced controls balance vendor business needs with increased security requirements.',
        hints: ['Consider vendor criticality', 'Think about security enhancement'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, what employee data protection compliance issues arise during the incident?',
        scenario: '<strong style="font-size: 1.25em">The ransomware incident may have exposed employee personal data. Multiple privacy regulations apply to employee data protection.</strong>',
        options: [
          'Treat employee data like customer data',
          'Apply specific employee data protection requirements including workplace privacy laws and notification obligations',
          'Focus only on external stakeholder notifications',
          'Wait for investigation completion'
        ],
        correctAnswer: 1,
        explanation: 'Employee data has specific protection requirements under workplace privacy laws.',
        hints: ['Consider employment privacy laws', 'Think about notification requirements'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As IT System Leader, what technical support should be provided to employees during the incident?',
        scenario: '<strong style="font-size: 1.25em">Employees are experiencing system access issues and need technical support. The IT team is focused on incident response but employees need assistance.</strong>',
        options: [
          'Postpone all employee support',
          'Establish dedicated employee support channels with clear escalation procedures and workaround solutions',
          'Direct employees to external support',
          'Provide only basic troubleshooting'
        ],
        correctAnswer: 1,
        explanation: 'Dedicated support channels maintain employee productivity while managing incident response priorities.',
        hints: ['Think about resource allocation', 'Consider employee productivity'],
        role: 'IT System Leader'
      },
      {
        question: 'As Security Incident Manager, how should employee security awareness be enhanced during the incident?',
        scenario: '<strong style="font-size: 1.25em">The ransomware incident highlights security vulnerabilities. Employees need immediate awareness updates to prevent further incidents.</strong>',
        options: [
          'Wait until incident resolution for training',
          'Implement immediate security awareness communications with specific threat indicators and protective measures',
          'Send generic security reminders',
          'Focus only on technical controls'
        ],
        correctAnswer: 1,
        explanation: 'Immediate security awareness helps prevent additional compromises during the incident.',
        hints: ['Think about immediate threats', 'Consider preventive measures'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Governance & Compliance Officer, what employee rights notifications are required during a ransomware incident?',
        scenario: '<strong style="font-size: 1.25em">Employees whose data may have been compromised have specific rights under privacy laws, including rights to information and protection services.</strong>',
        options: [
          'Provide general incident information only',
          'Comprehensive notification of specific rights including data access, correction, and protection service eligibility',
          'Refer employees to HR for all questions',
          'Provide minimal legally required information'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive rights notification ensures compliance with privacy law requirements.',
        hints: ['Consider individual privacy rights', 'Think about legal obligations'],
        role: 'Governance & Compliance Officer'
      },
      {
        question: 'As Security Incident Manager, how should employee device security be enhanced during the incident?',
        scenario: '<strong style="font-size: 1.25em">Employee devices may have been compromised or could be vectors for additional attacks. Enhanced device security measures are needed.</strong>',
        options: [
          'Continue with normal device policies',
          'Implement enhanced device security including forced updates, additional monitoring, and restricted access controls',
          'Only secure company-owned devices',
          'Block all personal devices from network access'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced device security prevents additional compromise and protects against ongoing threats.',
        hints: ['Think about device compromise vectors', 'Consider comprehensive device protection'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor employee background checks be enhanced post-incident?',
        scenario: '<strong style="font-size: 1.25em">The incident raises concerns about vendor employee access to sensitive systems. Enhanced background check requirements may be needed.</strong>',
        options: [
          'Maintain existing background check requirements',
          'Implement enhanced vendor employee screening including security clearances and ongoing monitoring for sensitive access',
          'Only require checks for new vendor employees',
          'Focus solely on vendor company credentials'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced screening helps ensure vendor employees with system access meet appropriate security standards.',
        hints: ['Think about access-based risk', 'Consider ongoing security monitoring'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should employee training compliance be enhanced following the incident?',
        scenario: '<strong style="font-size: 1.25em">The incident highlights gaps in employee security awareness. Enhanced training compliance programs may be required by regulators.</strong>',
        options: [
          'Continue with existing training programs',
          'Develop enhanced security training compliance program with regular assessments, role-specific training, and performance tracking',
          'Only provide basic security awareness updates',
          'Focus training solely on technical staff'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced training compliance ensures all employees receive appropriate security education and demonstrates commitment to prevention.',
        hints: ['Think about comprehensive training requirements', 'Consider regulatory expectations'],
        role: 'Governance & Compliance Officer'
      }
    ]
  },
  {
    id: 'crisis',
    title: 'Crisis Communication',
    description: 'Managing public relations and stakeholder communications',
    icon: 'Megaphone',
    impact: 'Reputation Management',
    roles: roles,
    questions: [
      {
        question: 'As Marketing Director, how should the crisis communication plan be activated?',
        scenario: '<strong style="font-size: 1.25em">The ransomware incident is gaining media attention. A coordinated communication response is needed.</strong>',
        options: [
          'Issue a single press release',
          'Implement comprehensive crisis communication plan with regular updates and stakeholder engagement',
          'Only respond to media inquiries',
          'Wait for situation to resolve'
        ],
        correctAnswer: 1,
        explanation: 'A comprehensive crisis communication plan helps manage stakeholder perceptions.',
        hints: ['Consider stakeholder needs', 'Think about message consistency'],
        role: 'Marketing & Communication'
      },
      {
        question: 'As Legal Division, what legal considerations are crucial for crisis communications?',
        scenario: '<strong style="font-size: 1.25em">Public statements about the ransomware incident must be carefully crafted to avoid legal issues.</strong>',
        options: [
          'Focus only on technical details',
          'Balance transparency with legal requirements, avoiding speculation and maintaining accuracy',
          'Minimize public statements',
          'Only communicate through legal channels'
        ],
        correctAnswer: 1,
        explanation: 'Balanced communication protects legal interests while maintaining transparency.',
        hints: ['Consider liability implications', 'Think about regulatory requirements'],
        role: 'Legal Division Head'
      },
      {
        question: 'As Chief Finance Officer, how should financial impacts be communicated during the crisis?',
        scenario: '<strong style="font-size: 1.25em">Investors and analysts are asking about the financial impact of the ransomware incident. Accurate but strategic communication is needed.</strong>',
        options: [
          'Provide detailed cost breakdowns immediately',
          'Develop strategic financial communication focusing on response effectiveness and recovery planning',
          'Avoid discussing financial impacts',
          'Only provide information when legally required'
        ],
        correctAnswer: 1,
        explanation: 'Strategic financial communication maintains investor confidence while providing necessary transparency.',
        hints: ['Think about investor relations', 'Consider market impact'],
        role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As IT System Leader, what technical information should be shared in crisis communications?',
        scenario: '<strong style="font-size: 1.25em">Stakeholders want to understand the technical aspects of the incident and recovery efforts. Information must be accurate but not compromise security.</strong>',
        options: [
          'Share detailed technical specifics',
          'Provide high-level technical information focusing on response capabilities and security improvements',
          'Avoid technical details completely',
          'Only discuss completed recovery steps'
        ],
        correctAnswer: 1,
        explanation: 'High-level technical communication builds confidence without compromising security.',
        hints: ['Think about security implications', 'Consider stakeholder understanding'],
        role: 'IT System Leader'
      },
      {
        question: 'As Security Incident Manager, how should security measures be communicated during the crisis?',
        scenario: '<strong style="font-size: 1.25em">Customers and partners want reassurance about security measures being taken. Communication must be informative without revealing vulnerabilities.</strong>',
        options: [
          'Share all security measures implemented',
          'Communicate security improvements and response capabilities without revealing specific vulnerabilities or tactics',
          'Avoid discussing security measures',
          'Only mention basic security practices'
        ],
        correctAnswer: 1,
        explanation: 'Strategic security communication provides reassurance while protecting operational security.',
        hints: ['Think about operational security', 'Consider reassurance needs'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should vendor relationships be managed during crisis communications?',
        scenario: '<strong style="font-size: 1.25em">Key vendors are concerned about the incident\'s impact on their operations and data. Clear communication is needed to maintain partnerships.</strong>',
        options: [
          'Minimize communication with vendors',
          'Implement transparent vendor communication strategy addressing their specific concerns and security assurances',
          'Only communicate with critical vendors',
          'Refer all vendor questions to legal'
        ],
        correctAnswer: 1,
        explanation: 'Transparent vendor communication maintains critical business relationships during the crisis.',
        hints: ['Think about vendor confidence', 'Consider partnership maintenance'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should regulatory compliance be addressed in crisis communications?',
        scenario: '<strong style="font-size: 1.25em">Multiple regulators are monitoring the situation. Public communications must demonstrate regulatory compliance and cooperation.</strong>',
        options: [
          'Avoid mentioning regulatory aspects',
          'Emphasize regulatory cooperation and compliance efforts in public communications',
          'Only address regulatory issues privately',
          'Minimize regulatory compliance discussions'
        ],
        correctAnswer: 1,
        explanation: 'Emphasizing regulatory cooperation demonstrates responsible corporate behavior during crisis.',
        hints: ['Think about regulatory relationships', 'Consider compliance demonstration'],
        role: 'Governance & Compliance Officer'
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
        scenario: '<strong style="font-size: 1.25em">This incident revealed vulnerabilities. Post-incident, the company needs to consider strategic financial adjustments for future resilience.</strong>',
        options: [
          'No changes needed, it was a one-off event',
          'Comprehensive strategy revision including increased contingency funds, cyber insurance review, and risk mitigation investments',
          'Minor adjustments to quarterly forecasts',
          'Wait and see how the market reacts'
        ],
        correctAnswer: 1, explanation: 'Strategic revision incorporating lessons learned ensures long-term financial resilience.', hints: ['Consider future risks and preparedness', 'Think about financial resilience'], role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'How should Marketing adapt long-term brand strategy?',
        scenario: '<strong style="font-size: 1.25em">The incident has negatively impacted brand trust. The long-term marketing strategy must address how to rebuild this trust.</strong>',
        options: [
          'Maintain the current strategy and hope people forget',
          'Develop enhanced strategy incorporating transparency, rebuilding trust, and highlighting new security investments',
          'Minimal changes to messaging',
          'Focus marketing entirely on new products'
        ],
        correctAnswer: 1, explanation: 'Strategic adaptation is needed to rebuild trust and strengthen brand resilience.', hints: ['Consider brand perception and trust', 'Think about future positioning and messaging'], role: 'Marketing & Communication'
      },
      {
        question: 'What financial planning should the CFO implement for future resilience?',
        scenario: '<strong style="font-size: 1.25em">To better withstand future incidents, proactive investments in areas like ransomware detection and improved content verification are needed. This requires financial planning.</strong>',
        options: [
          'Standard operational budget planning',
          'Enhanced financial planning including dedicated budgets for risk mitigation, resilience resources, and regular security audits',
          'Update depreciation schedules only',
          'Assume no major incidents will happen again'
        ],
        correctAnswer: 1, explanation: 'Enhanced planning specifically addressing security risks improves future resilience.', hints: ['Consider proactive security investments', 'Think about long-term preparedness costs'], role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Marketing Director, how do you rebuild long-term stakeholder confidence?',
        scenario: '<strong style="font-size: 1.25em">Following the incident, key stakeholders (investors, partners, customers) are concerned. A sustained effort is needed to restore their confidence.</strong>',
        options: [
          'Assume confidence will return over time',
          'Implement comprehensive confidence-building strategy involving consistent communication, showcasing improvements, and engaging stakeholders directly',
          'Send occasional positive news updates',
          'Focus only on acquiring new customers'
        ],
        correctAnswer: 1, explanation: 'A comprehensive, ongoing strategy is needed to actively rebuild stakeholder trust.', hints: ['Think about transparency and accountability', 'Consider long-term relationship building'], role: 'Marketing & Communication'
      },
      {
        question: 'How should the CFO structure long-term recovery investments?',
        scenario: '<strong style="font-size: 1.25em">Investing in better ransomware detection and content verification post-incident shouldn\'t be seen just as a cost, but as a strategic investment needing proper financial structuring.</strong>',
        options: [
          'As minimal operational expenses',
          'As strategic investments in resilience (detection tech, verification systems) and potentially growth (modernizing systems), evaluated for ROI',
          'Within the standard IT maintenance budget',
          'Delay investments until profitability fully recovers'
        ],
        correctAnswer: 1, explanation: 'Treating recovery and resilience as strategic investments ensures adequate funding and focus.', hints: ['Consider long-term value vs. short-term cost', 'Think about ROI and strategic alignment'], role: 'Chief Finance Officer (CFO)'
      },
      {
        question: 'As Legal Division, how can lessons learned from the incident inform future contract negotiations (e.g., with vendors)?',
        scenario: '<strong style="font-size: 1.25em">The post-incident review showed weaknesses in current vendor contracts regarding content verification obligations. Future contracts need strengthening.</strong>',
        options: [
          'By demanding lower prices',
          'By incorporating stronger clauses related to content verification, liability limits, notification timelines, and audit rights',
          'By using standard contract templates only',
          'By avoiding contracts with IT vendors'
        ],
        correctAnswer: 1, explanation: 'Incidents highlight weaknesses; future contracts should address these through specific legal clauses.', hints: ['Consider vendor risk management', 'Think about contractual protections and liability'], role: 'Legal Division Head'
      },
      {
        question: 'As IT System lead, what strategic technology investments could prevent similar incidents in the future?',
        scenario: '<strong style="font-size: 1.25em">The root cause analysis points to specific technology gaps (e.g., lack of ransomware detection, poor content verification). Strategic investment is needed to address these.</strong>',
        options: [
          'Faster internet connections for the office',
          'Investments in advanced ransomware detection, content verification systems, improved identity/access management, and enhanced monitoring solutions',
          'More user training videos about phishing',
          'New ergonomic keyboards for the IT team'
        ],
        correctAnswer: 1, explanation: 'Strategic IT investments should focus on core security capabilities and modern architectures to build long-term resilience.', hints: ['Think about layered security defense', 'Consider modern security frameworks'], role: 'IT System Leader'
      },
      {
        question: 'As Legal Division, how should the company\'s incident response plan be updated based on this event?',
        scenario: '<strong style="font-size: 1.25em">The response to this incident revealed flaws in the existing Incident Response Plan (IRP), such as unclear roles or communication steps.</strong>',
        options: [
          'It doesn\'t need updating, this was unique',
          'Update roles/responsibilities, clarify communication protocols, refine legal/regulatory checklists, and incorporate lessons learned based on identified gaps',
          'Make the plan shorter and less detailed',
          'Focus the plan only on the technical recovery steps'
        ],
        correctAnswer: 1, explanation: 'The incident response plan should be a living document, updated with lessons learned to improve future responses.', hints: ['Consider the post-incident review findings', 'Think about operationalizing lessons learned'], role: 'Legal Division Head'
      },
      {
        question: 'As Security Incident Manager, how should long-term security strategy be evolved?',
        scenario: '<strong style="font-size: 1.25em">The incident highlighted security gaps and response challenges. A strategic security evolution is needed for long-term resilience.</strong>',
        options: [
          'Focus only on the specific attack vector',
          'Develop comprehensive security strategy including threat intelligence, advanced detection capabilities, and response automation',
          'Only update existing security policies',
          'Wait for next incident to assess needs'
        ],
        correctAnswer: 1,
        explanation: 'Comprehensive security strategy evolution builds resilience against current and future threats.',
        hints: ['Think about threat landscape evolution', 'Consider proactive security capabilities'],
        role: 'Security Incident Manager'
      },
      {
        question: 'As Vendor/Supply Chain Manager, how should supply chain risk management be strengthened?',
        scenario: '<strong style="font-size: 1.25em">The incident exposed vulnerabilities in vendor relationships and supply chain dependencies. Strategic improvements are needed.</strong>',
        options: [
          'Reduce vendor relationships only',
          'Implement enhanced supply chain risk management including vendor security assessments, alternative sourcing strategies, and continuous monitoring',
          'Only require additional insurance from vendors',
          'Maintain existing vendor management practices'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced supply chain risk management builds resilience while maintaining business relationships.',
        hints: ['Think about vendor risk assessment', 'Consider supply chain diversification'],
        role: 'Vendor/Supply Chain Manager'
      },
      {
        question: 'As Governance & Compliance Officer, how should governance frameworks be enhanced?',
        scenario: '<strong style="font-size: 1.25em">The incident revealed governance gaps in cyber risk oversight and compliance management. Strategic enhancements are needed.</strong>',
        options: [
          'No changes to governance frameworks',
          'Develop enhanced governance frameworks including cyber risk oversight, regular compliance assessments, and board-level security reporting',
          'Only update existing policies',
          'Focus solely on compliance documentation'
        ],
        correctAnswer: 1,
        explanation: 'Enhanced governance frameworks ensure better oversight and management of cyber risks.',
        hints: ['Think about governance oversight', 'Consider board-level awareness'],
        role: 'Governance & Compliance Officer'
      }
    ]
  }
]; 