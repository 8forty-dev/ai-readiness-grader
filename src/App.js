{
  "name": "ai-readiness-grader",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
import React, { useState } from 'react';

// Your JSON Service Catalog integrated as a JavaScript constant
const SERVICE_CATALOG = {
  "service_catalog": {
    "foundational_services": {
      "category_name": "Foundational Services (The Essentials)",
      "description": "These are the core services every small business needs for a robust online presence. They are designed for quick wins and establishing a solid digital foundation.",
      "services": [
        {
          "service_id": "service_01_gbp_optimization",
          "service_name": "Google Business Profile (GBP) Optimization",
          "benefits": [
            "Top priority for local search and AI Overviews.",
            "Increases visibility in local search results.",
            "Builds trust and credibility with potential customers." 
          ],
          "deliverables": [
            "Claiming and verifying GBP.",
            "Optimizing business information (NAP, hours, etc.).",
            "Writing a compelling business description.",
            "Correct business categorization.",
            "Uploading high-quality photos and videos.",
            "Setting up and managing Q&A sections.",
            "Creating and posting updates and offers."
          ]
        },
        {
          "service_id": "service_02_google_review_campaign",
          "service_name": "Google Review Campaign & Management",
          "benefits": [
            "Generates quick wins with an influx of positive reviews.",
            "Filters negative reviews before they go public.",
            "Supports all other marketing efforts by building social proof.",
            "Establishes a source of monthly recurring revenue (MRR) through ongoing management."
          ],
          "deliverables": [
            "Initial review campaign to generate positive reviews.",
            "Installation of a review funnel to filter feedback.",
            "Ongoing review monitoring and management."
          ]
        },
        {
          "service_id": "service_03_database_reactivation",
          "service_name": "Database Reactivation Campaign",
          "benefits": [
            "Generates immediate results within days.",
            "Requires no ad spend, leveraging existing customer data.",
            "Creates quick wins that impress new clients.",
            "Can produce thousands in revenue in the first week."
          ],
          "deliverables": [
            "Strategy for reaching out to past customers/leads.",
            "Creation of a special re-engagement offer.",
            "Execution of the campaign across chosen channels (e.g., email, SMS)."
          ]
        },
        {
          "service_id": "service_04_conversational_ai",
          "service_name": "Conversational AI Integration",
          "benefits": [
            "Handles customer inquiries 24/7.",
            "Functions as an employee that never sleeps or takes time off.",
            "Maintains customer engagement to prevent them from contacting competitors.",
            "Automatically books appointments."
          ],
          "deliverables": [
            "Integration of an AI chatbot on the website or social media.",
            "Configuration of common questions and responses.",
            "Automated appointment booking setup.",
            "Testing and optimization of the AI."
          ]
        },
        {
          "service_id": "service_05_local_seo_citations",
          "service_name": "Local SEO & Citation Building",
          "benefits": [
            "Enhances visibility in local search beyond just GBP.",
            "Builds authority through consistent NAP information.",
            "Improves local search rankings and customer trust."
          ],
          "deliverables": [
            "Listing the business on key directories (Yelp, Yellow Pages, etc.).",
            "Ensuring NAP consistency across all platforms.",
            "Review monitoring and management.",
            "Local backlink and partnership building."
          ]
        },
        {
          "service_id": "service_06_website_audit",
          "service_name": "Website Audit & Technical SEO",
          "benefits": [
            "Identifies and fixes technical issues hindering performance.",
            "Improves website crawlability and indexability.",
            "Helps AI understand the website's content for better summaries and citations."
          ],
          "deliverables": [
            "Comprehensive technical audit (page speed, mobile-friendliness).",
            "Fixing on-page SEO issues (meta descriptions, title tags).",
            "Implementing schema markup."
          ]
        }
      ]
    },
    "content_authority_services": {
      "category_name": "Content & Authority Building (The 'New SEO')",
      "description": "Services focused on building credibility, E-E-A-T, and high-quality content to thrive in an AI-driven search landscape.",
      "services": [
        {
          "service_id": "service_07_content_creation",
          "service_name": "Strategic Content Creation",
          "benefits": [
            "Develops authoritative, E-E-A-T-friendly content.",
            "Addresses customer pain points and conversational queries.",
            "Positions the business as an industry leader."
          ],
          "deliverables": [
            "In-depth keyword and topic research.",
            "Content calendar creation.",
            "Writing blog posts, articles, and landing pages.",
            "Optimizing existing content for quality and relevance."
          ]
        },
        {
          "service_id": "service_08_link_building_pr",
          "service_name": "Link Building & Digital PR",
          "benefits": [
            "Builds authority through external validation.",
            "Increases domain authority and search rankings.",
            "Generates press mentions and brand visibility."
          ],
          "deliverables": [
            "Backlink acquisition strategy.",
            "Outreach to journalists and bloggers.",
            "Creation of link-worthy content."
          ]
        },
        {
          "service_id": "service_09_reputation_management",
          "service_name": "Review and Reputation Management",
          "benefits": [
            "A key trust signal for customers and AI.",
            "Protects brand reputation by proactively managing feedback.",
            "Increases customer trust and loyalty."
          ],
          "deliverables": [
            "Setting up systems to encourage reviews.",
            "Monitoring and responding to all reviews.",
            "Crisis management plan for negative feedback."
          ]
        }
      ]
    },
    "traffic_conversion_services": {
      "category_name": "Traffic & Conversion Services (Driving Results)",
      "description": "Services designed to increase online visibility and turn visitors into paying customers.",
      "services": [
        {
          "service_id": "service_10_ppc_management",
          "service_name": "Paid Search (PPC) Management",
          "benefits": [
            "Provides an immediate boost in website traffic.",
            "Highly targeted campaigns to reach specific customers.",
            "Optimized for maximum ROI and lower cost-per-click."
          ],
          "deliverables": [
            "Google Ads and Bing Ads campaign management.",
            "Keyword research and ad copy creation.",
            "Campaign optimization and transparent reporting."
          ]
        },
        {
          "service_id": "service_11_social_media_ads",
          "service_name": "Social Media Marketing & Advertising",
          "benefits": [
            "Builds an active community and brand presence.",
            "Drives traffic from social platforms.",
            "Allows for highly targeted advertising campaigns."
          ],
          "deliverables": [
            "Social media profile creation and management.",
            "Content strategy for social media.",
            "Targeted paid ad campaigns."
          ]
        },
        {
          "service_id": "service_12_cro",
          "service_name": "Conversion Rate Optimization (CRO)",
          "benefits": [
            "Makes the existing website more effective.",
            "Turns more visitors into customers without increasing traffic.",
            "Provides data-driven insights on user behavior."
          ],
          "deliverables": [
            "User behavior analysis.",
            "A/B testing of different headlines, CTAs, and layouts.",
            "Optimization of forms and checkout processes."
          ]
        }
      ]
    },
    "specialized_services": {
      "category_name": "Specialized & Consulting Services (Premium Offerings)",
      "description": "Higher-value services for businesses ready to invest in advanced, data-driven strategies.",
      "services": [
        {
          "service_id": "service_13_custom_strategy",
          "service_name": "Customized Digital Marketing Strategy",
          "benefits": [
            "A complete, data-driven roadmap for business growth.",
            "Provides a competitive advantage through deep analysis.",
            "Includes measurable KPIs to track success."
          ],
          "deliverables": [
            "Full audit and competitive analysis.",
            "Detailed plan of action.",
            "Identification of measurable key performance indicators (KPIs)."
          ]
        },
        {
          "service_id": "service_14_email_marketing",
          "service_name": "Email Marketing Strategy & Management",
          "benefits": [
            "Builds a direct line of communication with customers.",
            "Nurtures leads and encourages repeat business.",
            "High ROI channel for targeted promotions."
          ],
          "deliverables": [
            "Email marketing platform setup.",
            "Lead magnet creation.",
            "Designing and writing email newsletters and automated campaigns."
          ]
        },
        {
          "service_id": "service_15_ai_readiness",
          "service_name": "AI Readiness & Training",
          "benefits": [
            "Helps the business adapt to the new search landscape.",
            "Positions the business to be cited by AI Overviews.",
            "Empowers business owners with knowledge of AI tools."
          ],
          "deliverables": [
            "Content strategy for 'AI-friendly' content.",
            "Training on using AI tools for marketing.",
            "Consulting on leveraging AI-powered local search."
          ]
        }
      ]
    }
  }
};


// Helper function to simulate generating report data for a single URL.
const _generateSingleReportData = (url, gmbScore, contentScore, schemaScore, technicalScore, uxPerformanceScore) => {
  let businessName = '';
  try {
    const hostname = new URL(url).hostname;
    businessName = hostname.replace('www.', '').split('.')[0];
    businessName = businessName.charAt(0).toUpperCase() + businessName.slice(1);
  } catch (e) {
    businessName = 'Local Business';
  }

  const overallScore = Math.floor((gmbScore + contentScore + schemaScore + technicalScore + uxPerformanceScore) / 5);
  const aiOverallScore = Math.floor((contentScore + schemaScore + technicalScore + uxPerformanceScore) / 4);

  // --- Dynamic GMB Issues based on score ---
  const gmbIssues = [];
  if (gmbScore < 5) {
    gmbIssues.push({
      issue: "Incomplete Service and Product Listings",
      impact: "When your core information (like hours, address, or phone number) is wrong or incomplete, it creates a poor customer experience. Google's AI, which can now call businesses on a user's behalf, will also get confused, leading to missed calls and lost leads. This inconsistency erodes trust with both customers and search engines.",
      action: "We'll perform a complete audit of your profile and business citations to ensure all information is 100% accurate and consistent everywhere online. This provides a single source of truth for both customers and AI.",
    });
    gmbIssues.push({
      issue: "Low Volume of Recent Reviews",
      impact: "A low review count or a lack of recent reviews tells Google and potential customers that your business may be inactive or less reputable than competitors. This directly hurts your local search visibility and your ability to attract new business.",
      action: "We will implement a Review Campaign to generate an influx of positive reviews. We'll also install an ongoing review management process to help you build a consistent stream of new reviews, boosting your ranking and credibility.",
    });
  } else if (gmbScore < 7) {
    gmbIssues.push({
      issue: "Minimal Photo and Video Content",
      impact: "GBP listings with professional photos and videos receive significantly more engagement than those without. Without visual content, your profile looks unappealing and less trustworthy, causing potential customers to choose a competitor with a more vibrant, complete listing.",
      action: "We will add high-quality, geotagged photos and videos of your business, services, and products. This makes your listing more engaging and helps your business stand out in local search results.",
    });
    gmbIssues.push({
      issue: "No Posts or Updates",
      impact: "Google Business Profile posts are a free way to share updates, offers, and events directly on your listing. By not using them, you're missing a key opportunity to attract attention, engage with your audience, and showcase what's new at your business.",
      action: "We will create a monthly content calendar for your GBP, posting updates about your services, special offers, and company news. This keeps your profile fresh and shows Google that your business is active and engaged.",
    });
  } else {
    gmbIssues.push({
      issue: "All Core GBP Elements Optimized",
      impact: "Your Google Business Profile is well-optimized, contributing positively to your local search presence.",
      action: "Continue to monitor and update your GBP regularly to maintain high performance.",
    });
  }

  // --- Dynamic AI Next Steps based on scores and SERVICE_CATALOG ---
  const aiNextSteps = new Set(); // Use a Set to avoid duplicate service recommendations

  if (contentScore < 7) {
    const service = SERVICE_CATALOG.service_catalog.content_authority_services.services.find(s => s.service_id === "service_07_content_creation");
    if (service) aiNextSteps.add(`${service.service_name}: ${service.benefits[0] || ''}`);
  }
  if (schemaScore < 8 || technicalScore < 6 || uxPerformanceScore < 6) {
    const service = SERVICE_CATALOG.service_catalog.foundational_services.services.find(s => s.service_id === "service_06_website_audit");
    if (service) aiNextSteps.add(`${service.service_name}: ${service.benefits[0] || ''}`);
  }
  if (gmbScore < 7) { // GBP issues also impact AI readiness through local signals
    const service = SERVICE_CATALOG.service_catalog.foundational_services.services.find(s => s.service_id === "service_01_gbp_optimization");
    if (service) aiNextSteps.add(`${service.service_name}: ${service.benefits[0] || ''}`);
  }
  if (aiNextSteps.size === 0) {
    const service = SERVICE_CATALOG.service_catalog.specialized_services.services.find(s => s.service_id === "service_13_custom_strategy");
    if (service) aiNextSteps.add(`Your site is performing well across the board for AI search readiness. We recommend an ongoing check-in to ensure you stay ahead of the curve with our ${service.service_name} to maintain your competitive edge.`);
  }

  return {
    businessName,
    overallScore,
    gmbReport: {
      score: gmbScore,
      overview: `Thank you for the opportunity to review your Google Business Profile (GBP). It's great to see that ${businessName} has an existing profile. You have a solid foundation with many glowing reviews that speak to your professionalism, punctuality, and quality of work. This is a huge asset! A strong GBP is more than just an online business card. It's your most important local marketing tool, acting as a virtual front door for potential customers. When someone in your area searches for a service you offer, your GBP is the most likely result they'll see. A well-optimized and active profile can significantly increase your visibility, drive more calls, and generate new leads, even if your website is not the top organic result.`,
      issues: selectedIssues,
      offer: `We understand that managing all these details can be time-consuming for a busy business owner. We can handle all of this for you! Our paid service includes a comprehensive **GBP Optimization** package that covers all of the above, along with ongoing management, a review strategy, and local citation building to ensure your business dominates local search results. Let's schedule a brief call to discuss how we can work together to implement this plan and turn your Google Business Profile into a powerful lead-generation machine for your business.`,
    },
    aiAnalysis: {
      score: aiOverallScore,
      overallSummary: `Your website's readiness for Google's AI-powered search is also a key part of your long-term strategy. The following analysis breaks down how well your site is positioned to be a trusted source for AI Overviews and other generative search features.`,
      scores: [
        {
          title: "Content Quality & E-E-A-T",
          summary: "AI-powered search prioritizes content that demonstrates Experience, Expertise, Authoritativeness, and Trustworthiness. Your content is a key factor in being cited by AI models.",
          score: contentScore,
        },
        {
          title: "Structured Data & Schema Markup",
          summary: "Structured data (Schema markup) helps search engines and AI models understand your content's context. Implementing schema for FAQs and how-to guides is critical for rich results and AI Overviews.",
          score: schemaScore,
        },
        {
          title: "User Experience (UX) & Technical Health",
          summary: "Core Web Vitals, page speed, and mobile-friendliness are essential for a good user experience and are foundational signals that Google's ranking systems (and AI) evaluate.",
          score: uxPerformanceScore,
        },
      ],
      nextSteps: Array.from(aiNextSteps), // Convert Set to Array for rendering
    },
  };
};


// Component for the Glossary
const Glossary = () => (
  <div className="bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Glossary of Terms</h2>
    <dl className="space-y-4 text-gray-700 text-sm">
      <div>
        <dt className="font-semibold text-gray-900">Google Business Profile (GBP)</dt>
        <dd className="ml-5">A free tool that allows businesses to manage their online presence across Google, including Search and Maps. It's a critical tool for local businesses to attract new customers.</dd>
      </div>
      <div>
        <dt className="font-semibold text-gray-900">Local SEO</dt>
        <dd className="ml-5">The practice of optimizing a business's online presence to rank higher in local search results. A key part of this is a strong GBP and consistent online information.</dd>
      </div>
      <div>
        <dt className="font-semibold text-gray-900">E-E-A-T</dt>
        <dd className="ml-5">An acronym for Experience, Expertise, Authoritativeness, and Trustworthiness. It's the framework Google uses to evaluate the quality and credibility of web content, which is a major factor for AI citation.</dd>
      </div>
      <div>
        <dt className="font-semibold text-gray-900">Structured Data / Schema Markup</dt>
        <dd className="ml-5">A standardized format for providing information about a web page to search engines. It helps AI models and search crawlers understand the content's context and meaning, making it easier to be featured in rich results.</dd>
      </div>
      <div>
        <dt className="font-semibold text-gray-900">AI Overviews</dt>
        <dd className="ml-5">The generative AI-powered summaries that appear at the top of Google Search results for certain queries, providing a quick answer derived from multiple web sources.</dd>
      </div>
      <div>
        <dt className="font-semibold text-gray-900">Citations</dt>
        <dd className="ml-5">Mentions of your business's name, address, and phone number on other websites, suchs as online directories. Consistent citations are crucial for local search ranking.</dd>
      </div>
    </dl>
  </div>
);

// Main App Component
const App = () => {
  const [url, setUrl] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  // This function handles the actual fetching from the backend for a single URL
  const processUrl = async (inputUrl) => {
    try {
      // Prepend https:// if missing
      let formattedUrl = inputUrl;
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      // Call the backend's scraping endpoint
      const response = await fetch('https://8forty.pythonanywhere.com/scrape', { // Using single scrape endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formattedUrl }), // Use formatted URL here
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from the backend.');
      }

      const data = await response.json();
      
      // The backend should return a single report data object
      if (data) {
        setReport(data);
      } else {
        setError('Backend did not return report in expected format.');
      }

    } catch (err) {
      setError(`An error occurred during analysis: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // This function handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReport(null); // Clear previous report

    if (url) {
      await processUrl(url); // Process single URL
    } else {
      setError('Please enter a URL.');
      setLoading(false);
    }
  };


  const copyReportToClipboard = () => {
    if (!report) return;

    const htmlReportContent = `
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .document-container { max-width: 800px; margin: 40px auto; padding: 40px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; }
        .header img { height: 60px; margin-bottom: 10px; }
        .header h1 { font-size: 28px; color: #1e293b; margin-bottom: 5px; }
        .header p { margin: 0; font-size: 14px; color: #64748b; }
        .section-title { font-size: 22px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
        .subsection-title { font-size: 18px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; }
        .intro-text, .list-item, .pitch-text { font-size: 16px; margin-bottom: 10px; }
        .list-item { margin-left: 20px; }
        .bullet-point-list { list-style: none; padding-left: 0; }
        .bullet-point-list li { margin-bottom: 10px; position: relative; padding-left: 20px; }
        .bullet-point-list li::before { content: '•'; position: absolute; left: 0; font-size: 1.2em; line-height: 1; }
        .impact-analysis, .action-plan { font-weight: bold; }
        .offer-section { font-style: italic; margin-top: 20px; }
        .score-display { font-size: 18px; margin-bottom: 10px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b; }
        .footer-info { margin-top: 5px; }
      </style>
      <div class="document-container">
        <div class="header">
          
          <h1>Audit Report for ${report.businessName}: Google Business Profile & AI Readiness</h1>
          <p>Prepared for: ${report.businessName}</p>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Prepared by: 8forty</p>
        </div>

        <div class="section">
          <h2 class="section-title">Executive Summary</h2>
          <p class="intro-text">This report provides a comprehensive audit of your Google Business Profile and an analysis of your website's readiness for Google's AI-powered search. The overall readiness score for your business is <span style="font-weight: bold;">${report.overallScore}/10</span>. A well-optimized online presence is crucial for local businesses to not only attract new customers today but also to be prepared for the future of search.</p>
          <p class="intro-text">Let's discuss your results and learn how we can help you turn your online presence into a POWERFUL LEAD-GENERATION MACHINE, please call us directly: 1-888-279-0806, visit our website: www.8forty.com, or email: info@8forty.com.</p>
          <p class="intro-text" style="font-weight: bold;">Let's start getting your business found by more local customers today!</p>
        </div>

        <div class="section">
          <h2 class="section-title">Overall Readiness Score</h2>
          <p class="score-display">Your business has an overall readiness score of <span style="font-weight: bold;">${report.overallScore}/10</span>.</p>
        </div>

        <div class="section">
          <h2 class="section-title">Google Business Profile Performance Audit</h2>
          <h3 class="subsection-title">GMB Audit Score: ${report.gmbReport.score}/10</h3>
          <h3 class="subsection-title">Profile Overview</h3>
          <p class="intro-text">${report.gmbReport.overview}</p>
        </div>

        <div class="section">
          <h3 class="subsection-title">Key Issues Identified</h3>
          <p class="intro-text">After a thorough analysis of your current Google Business Profile, I've identified several key areas that are either missing or not fully optimized. Addressing these issues will help your business stand out from competitors and capture a larger share of the local market.</p>
          <ul class="bullet-point-list">
            ${report.gmbReport.issues.map(issue => `
              <li>
                <p><span class="impact-analysis">${issue.issue}:</span> ${issue.impact}</p>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="section">
          <h3 class="subsection-title">Action Plan</h3>
          <p class="intro-text">Here are the specific, actionable steps you can take to immediately improve your Google Business Profile:</p>
          <ul class="bullet-point-list">
            ${report.gmbReport.issues.map((issue, index) => `
              <li><p><span class="action-plan">**${index + 1}. ${issue.issue}:</span>** ${issue.action}</p></li>
            `).join('')}
          </ul>
        </div>

        <div class="section">
          <h3 class="subsection-title">We Can Help You Grow</h3>
          <p class="intro-text">${report.gmbReport.offer}</p>
          <ul style="list-style: disc; margin-top: 15px; margin-left: 20px;">
            <li>Comprehensive GBP management, including ongoing optimization and updates.</li>
            <li>Building a complete review strategy to get more five-star ratings.</li>
            <li>Citations and directory listings to improve your local authority.</li>
            <li>Local SEO services to help your website rank for important keywords.</li>
          </ul>
        </div>

        <div class="section">
          <h2 class="section-title">AI Search Readiness Audit</h2>
          <h3 class="subsection-title">AI Search Readiness Audit Score: ${report.aiAnalysis.score}/10</h3>
          <p class="intro-text">${report.aiAnalysis.overallSummary}</p>
          <div style="margin-top: 20px;">
            <h4 style="font-size: 16px; font-weight: bold;">Key Factors for Success:</h4>
            <ul class="bullet-point-list">
              ${report.aiAnalysis.scores.map(item => `
                <li>
                  <p><span style="font-weight: bold;">${item.title}:</span> ${item.summary}</p>
                  <p>Your Score: <span style="font-weight: bold;">${item.score}/10</span></p>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <div class="section">
          <h3 class="subsection-title">Recommended Services to Increase Readiness</h3>
          <ul>
            ${report.aiAnalysis.nextSteps.map(step => `
              <li class="list-item">${step}</li>
            `).join('')}
          </ul>
        </div>

        <div class="section">
          <h2 class="section-title">Glossary of Terms</h2>
          <dl style="margin-top: 15px;">
            <dt style="font-weight: bold; margin-top: 10px;">Google Business Profile (GBP)</dt>
            <dd style="margin-left: 20px;">A free tool that allows businesses to manage their online presence across Google, including Search and Maps. It's a critical tool for local businesses to attract new customers.</dd>
            <dt style="font-weight: bold; margin-top: 10px;">Local SEO</dt>
            <dd style="margin-left: 20px;">The practice of optimizing a business's online presence to rank higher in local search results. A key part of this is a strong GBP and consistent online information.</dd>
            <dt style="font-weight: bold; margin-top: 10px;">E-E-A-T</dt>
            <dd style="margin-left: 20px;">An acronym for Experience, Expertise, Authoritativeness, and Trustworthiness. It's the framework Google uses to evaluate the quality and credibility of web content, which is a major factor for AI citation.</dd>
            <dt style="font-weight: bold; margin-top: 10px;">Structured Data / Schema Markup</dt>
            <dd style="margin-left: 20px;">A standardized format for providing information about a web page to search engines. It helps AI models and search crawlers understand the content's context and meaning, making it easier to be featured in rich results.</dd>
            <dt style="font-weight: bold; margin-top: 10px;">AI Overviews</dt>
            <dd style="ml-5 text-gray-700">The generative AI-powered summaries that appear at the top of Google Search results for certain queries, providing a quick answer derived from multiple web sources.</dd>
            <dt style="font-weight: bold; margin-top: 10px;">Citations</dt>
            <dd style="ml-5 text-gray-700">Mentions of your business's name, address, and phone number on other websites, such as online directories. Consistent citations are crucial for local search ranking.</dd>
          </dl>
        </div>

        <div class="footer" style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
          <p>Prepared by: 8forty</p>
          <p>Phone: 1-888-279-0806 | Email: info@8forty.com</p>
          <p style="margin-top: 10px;">&copy; 2025 8forty a dahlstrom lumber llc. company. All rights reserved. | <a href="https://www.8forty.com" style="color: #4f46e5; text-decoration: none;">www.8forty.com</a></p>
        </div>
      </div>
    `;
    
    const reportContent = document.createElement('div');
    reportContent.innerHTML = htmlReportContent;
    document.body.appendChild(reportContent);
    
    const range = document.createRange();
    range.selectNodeContents(reportContent);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      setCopyStatus('Report copied to clipboard! You can now paste it into a Google Doc.');
    } catch (err) {
      setCopyStatus('Failed to copy report. Please try again or copy the text manually.');
      console.error('Failed to copy report to clipboard:', err);
    }

    selection.removeAllRanges();
    document.body.removeChild(reportContent);

    setTimeout(() => setCopyStatus(''), 5000);
  };

  const scoreColor = (score) => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-start justify-center font-sans">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 transition-all duration-500 ease-in-out">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-2">GMB Performance and AI Readiness Grader</h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Enter a website URL to get a comprehensive audit report.
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g., https://www.example.com"
              className="flex-1 p-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition duration-200"
              required
            />
            <button
              type="submit"
              disabled={loading || !url}
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Generate Report'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </form>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-indigo-500 mb-4"></div>
            <p className="text-center">Generating professional audit report...</p>
          </div>
        )}

        {report && (
          <div className="space-y-10">
            {/* Copy button with status message */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <button
                onClick={copyReportToClipboard}
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-700 transition duration-300"
              >
                Copy Report to Clipboard
              </button>
              {copyStatus && <p className="text-sm text-gray-600 mt-2">{copyStatus}</p>}
            </div>

            <div className="report-preview p-6 border border-gray-200 rounded-xl space-y-6">
              <div className="text-center mb-8">
                <img src="https://res.cloudinary.com/dfsxxbjqk/image/upload/v1754406956/8_forty_logo-black_dpwz78.png" alt="8forty Logo" className="mx-auto h-16" />
                <h1 className="text-3xl font-bold text-gray-800 mt-4">Audit Report for {report.businessName}: Google Business Profile & AI Readiness</h1>
                <p className="text-gray-600 mt-2">Prepared for: {report.businessName}</p>
                <p className="text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                <p className="600">Prepared by: 8forty</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold border-b pb-2 mb-4">Executive Summary</h2>
                <p className="text-lg">This report provides a comprehensive audit of your Google Business Profile and an analysis of your website's readiness for Google's AI-powered search. The overall readiness score for your business is <span className="font-extrabold">{report.overallScore}/10</span>. A well-optimized online presence is crucial for local businesses to not only attract new customers today but also to be prepared for the future of search.</p>
                <p className="mt-4 text-gray-800">Let's discuss your results and learn how we can help you turn your online presence into a <span className="font-bold">POWERFUL LEAD-GENERATION MACHINE</span>, please call us directly: 1-888-279-0806, visit our website: www.8forty.com, or email: info@8forty.com.</p>
                <p className="mt-2 font-bold text-gray-800">Let's start getting your business found by more local customers today!</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold border-b pb-2 mb-4">Google Business Profile Performance Audit</h2>
                <p className="text-lg font-bold">GMB Audit Score: {report.gmbReport.score}/10</p>
                
                <h3 className="text-xl font-bold mt-4">Profile Overview</h3>
                <p className="mt-2 text-gray-700">{report.gmbReport.overview}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold">Key Issues Identified</h3>
                <p className="mt-2 text-gray-700">After a thorough analysis of your current Google Business Profile, I've identified several key areas that are either missing or not fully optimized. Addressing these issues will help your business stand out from competitors and capture a larger share of the local market.</p>
                <ul className="list-disc ml-5 space-y-4 mt-4">
                  {report.gmbReport.issues.map((issue, index) => (
                    <li key={index}>
                      <p className="font-bold">{issue.issue}:</p>
                      <p className="mt-1"><span className="font-bold">Impact Analysis:</span> {issue.impact}</p>
                      <p className="mt-1"><span className="font-bold">Action Plan:</span> {issue.action}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold">We Can Help You Grow</h3>
                <p className="mt-2 text-gray-700">{report.gmbReport.offer}</p>
                <ul className="list-disc ml-5 mt-4">
                  <li>Comprehensive GBP management, including ongoing optimization and updates.</li>
                  <li>Building a complete review strategy to get more five-star ratings.</li>
                  <li>Citations and directory listings to improve your local authority.</li>
                  <li>Local SEO services to help your website rank for important keywords.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold border-b pb-2 mb-4">AI Search Readiness Audit</h2>
                <p className="text-lg font-bold">AI Search Readiness Audit Score: {report.aiAnalysis.score}/10</p>
                
                <p className="mt-2 text-gray-700">{report.aiAnalysis.overallSummary}</p>
                <ul className="list-disc ml-5 space-y-4 mt-4">
                  {report.aiAnalysis.scores.map((item, index) => (
                    <li key={index}>
                      <p className="font-bold">{item.title}:</p>
                      <p className="mt-1">{item.summary}</p>
                      <p className="mt-1">Your Score: <span className="font-extrabold">{item.score}/10</span></p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold">Recommended Services to Increase Readiness</h3>
                <ul className="list-disc ml-5 mt-2 space-y-2">
                  {report.aiAnalysis.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold border-b pb-2 mb-4">Glossary of Terms</h2>
                <dl className="mt-4">
                  <dt className="font-bold mt-2">Google Business Profile (GBP)</dt>
                  <dd className="ml-5 text-gray-700">A free tool that allows businesses to manage their online presence across Google, including Search and Maps. It's a critical tool for local businesses to attract new customers.</dd>
                  <dt className="font-bold mt-2">Local SEO</dt>
                  <dd className="ml-5 text-gray-700">The practice of optimizing a business's online presence to rank higher in local search results. A key part of this is a strong GBP and consistent online information.</dd>
                  <dt className="font-bold mt-2">E-E-A-T</dt>
                  <dd className="ml-5 text-gray-700">An acronym for Experience, Expertise, Authoritativeness, and Trustworthiness. It's the framework Google uses to evaluate the quality and credibility of web content, which is a major factor for AI citation.</dd>
                  <dt className="font-bold mt-2">Structured Data / Schema Markup</dt>
                  <dd className="ml-5 text-gray-700">A standardized format for providing information about a web page to search engines. It helps AI models and search crawlers understand the content's context and meaning, making it easier to be featured in rich results.</dd>
                  <dt className="font-bold mt-2">AI Overviews</dt>
                  <dd style="ml-5 text-gray-700">The generative AI-powered summaries that appear at the top of Google Search results for certain queries, providing a quick answer derived from multiple web sources.</dd>
                  <dt style="font-weight: bold; margin-top: 10px;">Citations</dt>
                  <dd style="ml-5 text-gray-700">Mentions of your business's name, address, and phone number on other websites, such as online directories. Consistent citations are crucial for local search ranking.</dd>
                </dl>
              </div>

              <div className="text-center text-gray-600 mt-8 pt-4 border-t">
                <p>Prepared by: 8forty</p>
                <p>Phone: 1-888-279-0806 | Email: info@8forty.com</p>
                <p style="margin-top: 10px;">&copy; 2025 8forty a dahlstrom lumber llc. company. All rights reserved.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
