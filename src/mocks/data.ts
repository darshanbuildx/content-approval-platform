import { ContentItem } from '../types';

export const mockData: ContentItem[] = [
  // Twitter Thread
  {
    id: '1X1',
    platform: 'Twitter',
    topic: 'AI Automation Success Story',
    content: `Want to make $10k-20k/month? 🚀

I'm helping local businesses automate their operations with AI and the results are INSANE.

Here's how to get started:

1. Identify repetitive tasks
2. Implement AI solutions
3. Scale your services

Thread below 👇`,
    status: 'Draft',
    createdAt: new Date('2024-10-23T08:36:50.971Z')
  },
  {
    id: '1X2',
    platform: 'Twitter',
    topic: 'AI Automation Success Story',
    content: `1/ First, look for businesses struggling with:

• Customer support
• Data entry
• Appointment scheduling
• Email management
• Social media

These are GOLD MINES for AI automation.`,
    status: 'In Review',
    createdAt: new Date('2024-10-23T08:36:50.972Z')
  },
  {
    id: '1X3',
    platform: 'Twitter',
    topic: 'AI Automation Success Story',
    content: `2/ Real case study:

Helped a local restaurant implement:
• AI-powered reservation system
• Automated inventory management
• Smart staff scheduling

Results after 30 days:
• 45% reduction in no-shows
• 3 hours saved daily
• $8,000 increase in revenue

Here's how we did it:`,
    status: 'Changes Requested',
    createdAt: new Date('2024-10-23T08:36:50.973Z'),
    lastFeedback: 'Add more specific details about the AI tools used',
    lastFeedbackDate: new Date('2024-10-24T10:00:00.000Z').toISOString()
  },

  // Instagram Posts
  {
    id: '1I1',
    platform: 'Instagram',
    topic: 'AI Business Transformation',
    content: `🤖 Transforming Businesses with AI: Before & After

📊 Latest Client Results:
→ 300% ROI in 30 days
→ 40+ hours saved weekly
→ $15k+ additional revenue

🎯 We specialize in:
• Automated Customer Support
• Smart Inventory Management
• AI-Powered Scheduling
• Data Analytics & Reporting

💡 Ready to transform your business with AI?
DM "INFO" to learn more!

#AIAutomation #BusinessGrowth #Innovation #Scale360X #SmallBusiness #Automation #BusinessTransformation #AI #ArtificialIntelligence #Tech #Future #Business`,
    status: 'In Review',
    createdAt: new Date('2024-10-23T09:30:00.000Z')
  },
  {
    id: '1I2',
    platform: 'Instagram',
    topic: 'Client Success Story',
    content: `🌟 Client Success Spotlight 🌟

Before AI Automation:
📉 50+ hours on manual tasks
📉 $3,000 lost to errors monthly
📉 24hr+ customer response time

After AI Automation:
📈 90% reduction in manual work
📈 Zero processing errors
📈 Instant customer responses
📈 $12,000 monthly savings

Swipe to see the transformation! ➡️

#AITransformation #BusinessAutomation #Scale360X #Innovation`,
    status: 'Approved',
    createdAt: new Date('2024-10-23T10:30:00.000Z'),
    dateApproved: new Date('2024-10-24T11:00:00.000Z').toISOString(),
    approvedBy: 'Hamza'
  },

  // LinkedIn Posts
  {
    id: '1L1',
    platform: 'LinkedIn',
    topic: 'AI Automation Case Study',
    content: `🎯 Milestone Achievement: Just transformed our 100th local business with AI automation!

📊 Average Results After Implementation:
• 40+ hours saved per week
• 300% ROI in first month
• 95% reduction in manual tasks
• 80% faster customer response time

🔑 Key Success Factors:
1. Custom AI solution design
2. Seamless integration with existing systems
3. Comprehensive staff training
4. Continuous optimization

💡 The best part? These results are repeatable across ANY industry.

🤔 Running a local business? Let's discuss how AI can transform your operations.

#AIAutomation #BusinessTransformation #Innovation #Scale360X`,
    status: 'Approved',
    createdAt: new Date('2024-10-23T10:00:00.000Z'),
    dateApproved: new Date('2024-10-24T15:00:00.000Z').toISOString(),
    approvedBy: 'Hamza'
  },
  {
    id: '1L2',
    platform: 'LinkedIn',
    topic: 'AI Implementation Guide',
    content: `🚀 The Ultimate Guide to Implementing AI in Your Business

After helping 100+ businesses implement AI solutions, here's what I've learned:

1. Start Small, Think Big
- Begin with one process
- Measure results meticulously
- Scale what works

2. Choose the Right Processes
- High volume, repetitive tasks
- Error-prone manual work
- Time-consuming customer interactions

3. Focus on ROI
- Track time savings
- Measure error reduction
- Monitor customer satisfaction

4. Common Pitfalls to Avoid
- Trying to automate everything at once
- Neglecting employee training
- Forgetting to document processes

Want to learn more? Check out our free AI implementation checklist in the comments!

#AIImplementation #BusinessStrategy #Scale360X #Innovation`,
    status: 'In Review',
    createdAt: new Date('2024-10-24T09:00:00.000Z')
  },

  // Skool Posts
  {
    id: '1S1',
    platform: 'Skool',
    topic: 'AI Automation Mastery Course - Module 1',
    content: `🎓 Module 1: Foundations of AI Business Automation

Welcome to your first step in mastering AI business automation! This comprehensive module will equip you with the fundamental knowledge and practical skills needed to start transforming local businesses with AI solutions.

📚 Module Overview:

1. Understanding AI Automation Fundamentals
   • What is AI automation and why it matters
   • Key technologies and their applications
   • Common misconceptions and reality checks
   • Success metrics and KPIs

2. Market Analysis & Opportunity Identification
   • Identifying high-impact automation opportunities
   • Industry-specific pain points
   • Cost-benefit analysis framework
   • Risk assessment strategies

3. Technical Implementation Foundations
   • Basic automation architecture
   • Popular automation tools and platforms
   • Integration considerations
   • Security best practices

4. Client Communication & Project Management
   • Needs assessment methodology
   • Proposal creation guide
   • Timeline management
   • Progress tracking systems

5. Case Studies & Real-World Applications
   • Restaurant automation success story
   • Retail business transformation
   • Service business optimization

🎯 Learning Objectives:
By the end of this module, you will be able to:
• Identify viable automation opportunities
• Assess business readiness for AI implementation
• Create basic automation proposals
• Understand key technical requirements
• Communicate value proposition effectively

⏱️ Estimated Completion Time: 4-6 hours

Ready to begin your journey into AI automation mastery? Let's dive in! 🚀`,
    status: 'In Review',
    createdAt: new Date('2024-10-23T09:00:00.000Z')
  },

  // Reddit Posts
  {
    id: '1R1',
    platform: 'Reddit',
    topic: 'AI Automation AMA',
    content: `I've helped 100+ local businesses implement AI automation, generating $10k-20k/month in recurring revenue. AMA!

Hey r/AIautomation! 👋

I'm an AI automation consultant specializing in helping local businesses streamline their operations using artificial intelligence. Over the past year, I've:

• Worked with 100+ businesses across various industries
• Generated $2M+ in additional revenue for clients
• Achieved average ROI of 300% within 30 days
• Built a successful consulting practice ($15k/month)

Common implementations include:
• Customer service automation
• Inventory management
• Appointment scheduling
• Marketing automation
• Data analysis & reporting

I'm here to answer any questions about:
• Getting started in AI automation consulting
• Finding and closing clients
• Implementing AI solutions
• Scaling your practice
• Common challenges and solutions

Proof: [Verified by mods]

Ask me anything!

Edit: Wow, this blew up! I'll be here for the next few hours answering questions. Thanks for all the great discussions!`,
    status: 'Changes Requested',
    createdAt: new Date('2024-10-23T11:00:00.000Z'),
    lastFeedback: 'Add more specific examples of automation implementations',
    lastFeedbackDate: new Date('2024-10-24T10:00:00.000Z').toISOString()
  }
];
