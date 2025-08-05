from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS
import random # Import random for simulated scores

app = Flask(__name__)
CORS(app)  # This allows your React app to make requests to this server

def _generate_single_report_data(url):
    """
    Helper function to simulate generating report data for a single URL.
    In a real batch scenario, this would involve actual scraping and API calls.
    """
    # Simulate GMB data, which may or may not include a business name.
    gmb_data = {
        "businessName": random.choice([None, "Creative Local Services", "Innovative Solutions Inc."]),
        "reviews": random.randint(10, 200),
        "photos": random.randint(5, 150),
        "posts": random.randint(0, 20),
    }

    # Simulate website data (e.g., from PageSpeed Insights or schema check)
    website_data = {
        "has_schema": random.choice([True, False]),
        "page_speed_score": random.randint(40, 95),
    }

    # Extract a business name, prioritizing the GMB data.
    business_name = gmb_data["businessName"]
    if not business_name:
        try:
            hostname = url.replace('http://', '').replace('https://', '').split('/')[0]
            business_name = hostname.replace('www.', '').split('.')[0]
            business_name = business_name.capitalize()
        except:
            business_name = 'Local Business'

    # Now, use simulated data to determine scores and issues.
    gmb_score = 0
    if gmb_data["reviews"] > 100: gmb_score += 3
    if gmb_data["photos"] > 50: gmb_score += 3
    if gmb_data["posts"] > 5: gmb_score += 2
    gmb_score = min(gmb_score + random.randint(1,2), 10) # Add a small random boost

    content_score = random.randint(1, 10) # You'd replace this with your LLM analysis
    schema_score = 9 if website_data["has_schema"] else random.randint(1, 5)
    technical_score = 9 if website_data["page_speed_score"] > 80 else random.randint(1, 7)
    ux_performance_score = technical_score # For simplicity, linking to technical score

    overall_score = round((gmb_score + content_score + schema_score + technical_score + ux_performance_score) / 5)
    ai_overall_score = round((content_score + schema_score + technical_score + ux_performance_score) / 4)

    gmb_issues = []
    if gmb_data["reviews"] < 50:
        gmb_issues.append({
            "issue": "Low Volume of Recent Reviews",
            "impact": "A low review count or a lack of recent reviews tells Google and potential customers that your business may be inactive or less reputable than competitors. This directly hurts your local search visibility and your ability to attract new business.",
            "action": "We will implement a Review Campaign to generate an influx of positive reviews. We'll also install an ongoing review management process to help you build a consistent stream of new reviews, boosting your ranking and credibility.",
        })
    if gmb_data["photos"] < 20:
        gmb_issues.append({
            "issue": "Minimal Photo and Video Content",
            "impact": "GBP listings with professional photos and videos receive significantly more engagement than those without. Without visual content, your profile looks unappealing and less trustworthy, causing potential customers to choose a competitor with a more vibrant, complete listing.",
            "action": "We will add high-quality, geotagged photos and videos of your business, services, and products. This makes your listing more engaging and helps your business stand out in local search results.",
        })
    if gmb_data["posts"] < 5:
         gmb_issues.append({
            "issue": "Lack of Regular Google Posts",
            "impact": "Google Business Profile posts are a free way to share updates, offers, and new content directly on your listing. By not using them, you're missing a key opportunity to attract attention, engage with your audience, and showcase what's new at your business.",
            "action": "We will create a monthly content calendar for your GBP, posting updates about your services, special offers, and company news. This keeps your profile fresh and shows Google that your business is active and engaged.",
        })
    if not gmb_issues: # Add a default issue if none are found for demo
        gmb_issues.append({
            "issue": "All Core GBP Elements Optimized",
            "impact": "Your Google Business Profile is well-optimized, contributing positively to your local search presence.",
            "action": "Continue to monitor and update your GBP regularly to maintain high performance.",
        })


    ai_next_steps = []
    if content_score < 7:
        ai_next_steps.append("Content & Authority Building: We recommend a Strategic Content Creation plan to build a foundation of authoritative content that demonstrates E-E-A-T. This will help your content get cited in AI Overviews.")
    if schema_score < 8:
        ai_next_steps.append("Foundational Services: A Website Audit & Technical SEO package is crucial. We will implement structured data to make your content machine-readable for AI and improve your chances of being featured in rich results.")
    if technical_score < 6:
        ai_next_steps.append("Foundational Services: Our Website Audit & Technical SEO service can identify and fix critical issues like slow page speed and mobile-friendliness, which are foundational for both user experience and AI visibility.")
    
    if not ai_next_steps:
        ai_next_steps.append("Your site is performing well across the board for AI search readiness. We recommend an ongoing check-in to ensure you stay ahead of the curve with our Specialized & Consulting Services to maintain your competitive edge.")


    return {
        "businessName": business_name,
        "overallScore": overall_score,
        "gmbReport": {
            "score": gmb_score,
            "overview": f"Thank you for the opportunity to review your Google Business Profile (GBP). It's great to see that {business_name} has an existing profile. You have a solid foundation with many glowing reviews that speak to your professionalism, punctuality, and quality of work. This is a huge asset! A strong GBP is more than just an online business card. It's your most important local marketing tool, acting as a virtual front door for potential customers. When someone in your area searches for a service you offer, your GBP is the most likely result they'll see. A well-optimized and active profile can significantly increase your visibility, drive more calls, and generate new leads, even if your website is not the top organic result.",
            "issues": gmb_issues,
            "offer": f"We understand that managing all these details can be time-consuming for a busy business owner. We can handle all of this for you! Our paid service includes a comprehensive **GBP Optimization** package that covers all of the above, along with ongoing management, a review strategy, and local citation building to ensure your business dominates local search results. Let's schedule a brief call to discuss how we can work together to implement this plan and turn your Google Business Profile into a powerful lead-generation machine for {business_name}.",
        },
        "aiAnalysis": {
            "score": ai_overall_score,
            "overallSummary": f"Your website's readiness for Google's AI-powered search is also a key part of your long-term strategy. The following analysis breaks down how well your site is positioned to be a trusted source for AI Overviews and other generative search features.",
            "scores": [
                {"title": "Content Quality & E-E-A-T", "summary": "AI-powered search prioritizes content that demonstrates Experience, Expertise, Authoritativeness, and Trustworthiness. Your content is a key factor in being cited by AI models.", "score": content_score},
                {"title": "Structured Data & Schema Markup", "summary": "Structured data (Schema markup) helps search engines and AI models understand your content's context. Implementing schema for FAQs and how-to guides is critical for rich results and AI Overviews.", "score": schema_score},
                {"title": "User Experience (UX) & Technical Health", "summary": "Core Web Vitals, page speed, and mobile-friendliness are essential for a good user experience and are foundational signals that Google's ranking systems (and AI) evaluate.", "score": ux_performance_score},
            ],
            "nextSteps": ai_next_steps,
        },
    }


@app.route('/batch_scrape', methods=['POST'])
def batch_scrape_websites():
    """
    This endpoint accepts a list of URLs, scrapes each, and returns a list of reports.
    """
    data = request.json
    urls = data.get('urls')

    if not urls or not isinstance(urls, list):
        return jsonify({"error": "No list of URLs provided."}), 400

    reports = []
    for url_item in urls:
        try:
            # In a real scenario, you'd perform actual scraping for each URL here.
            # For this demo, we'll simulate data for each URL.
            # This is where you'd integrate Beautiful Soup, requests, etc., for each URL.
            
            # Example of basic scraping (replace with your actual scraping logic)
            # response = requests.get(url_item, timeout=5)
            # soup = BeautifulSoup(response.text, 'html.parser')
            # ... then extract data and calculate scores
            
            # For now, just simulate scores for each URL
            gmb_score = random.randint(1, 10)
            content_score = random.randint(1, 10)
            schema_score = random.randint(1, 10)
            technical_score = random.randint(1, 10)
            ux_performance_score = random.randint(1, 10)

            report = _generate_single_report_data(
                url_item,
                gmb_score,
                content_score,
                schema_score,
                technical_score,
                ux_performance_score
            )
            reports.append(report)
        except Exception as e:
            # Log the error for this specific URL but continue processing others
            print(f"Error processing {url_item}: {e}")
            reports.append({
                "url": url_item,
                "error": str(e),
                "message": "Could not generate report for this URL due to an error."
            })
    
    return jsonify({"reports": reports})

if __name__ == '__main__':
    # For local development, run with: python app.py
    # On PythonAnywhere, it runs via WSGI
    app.run(debug=True, port=5000)
