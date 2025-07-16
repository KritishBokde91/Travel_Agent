from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import google.generativeai as genai
from django.conf import settings
import logging
from .models import TripPlan

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)

class AITravelAgent:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def generate_trip_plans(self, location, num_people, budget_per_person, duration_days):
        """Generate dynamic trip plans for any Indian location"""
        total_budget = budget_per_person * num_people
        
        prompt = f"""
        You are an expert travel agent specializing in Indian destinations. Create a detailed, location-specific trip plan for:
        
        Location: {location}
        Number of People: {num_people}
        Budget per Person: ₹{budget_per_person}
        Total Budget: ₹{total_budget}
        Duration: {duration_days} days
        
        Provide the response in this exact JSON format with these 4 sections:
        {{
            "2": {{
                "title": "Transportation",
                "image": "relevant_unsplash_image_url",
                "text": "Detailed transportation options for {location}... with prices and booking tips in 100-150 words"
            }},
            "3": {{
                "title": "Where to Stay",
                "image": "relevant_unsplash_image_url",
                "text": "Detailed accommodation options in {location}... with prices and booking tips in 100-150 words"
            }},
            "4": {{
                "title": "Food",
                "image": "relevant_unsplash_image_url",
                "text": "Detailed dining options in {location}... with local specialties and prices in 100-150 words"
            }},
            "5": {{
                "title": "Places to Visit",
                "image": "relevant_unsplash_image_url",
                "text": "Detailed attractions in {location}... with their names, entry fees, and timings in 100-150 words"
            }}
        }}
        
        Requirements:
        1. All recommendations must be specific to {location}
        2. Include actual transportation modes, hotels, restaurants, and attractions
        3. Provide current Indian prices (2025) in INR
        4. Format text with bullet points and newlines for readability
        5. Ensure recommendations fit the specified budget and duration
        6. Return ONLY the JSON object without any additional text
        """
        
        try:
            response = self.model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Clean response if it includes markdown
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            trip_data = json.loads(response_text)
            return trip_data
            
        except Exception as e:
            logger.error(f"Error generating trip plans: {e}")
            return self._get_dynamic_fallback(location, num_people, budget_per_person, duration_days)
    
    def _get_dynamic_fallback(self, location, num_people, budget_per_person, duration_days):
        """Improved dynamic fallback response"""
        total_budget = budget_per_person * num_people
        
        # Generic image URLs that work for any location
        transport_img = "https://images.unsplash.com/photo-1501426026826-31c667bdf23d"
        stay_img = "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
        food_img = "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        places_img = "https://images.unsplash.com/photo-1601758173925-78a37f94f3d4"
        
        return {
            "2": {
                "title": "Transportation",
                "image": transport_img,
                "text": self._generate_transport_text(location, num_people, total_budget)
            },
            "3": {
                "title": "Where to Stay",
                "image": stay_img,
                "text": self._generate_accommodation_text(location, num_people, total_budget, duration_days)
            },
            "4": {
                "title": "Food",
                "image": food_img,
                "text": self._generate_food_text(location, num_people, budget_per_person, duration_days)
            },
            "5": {
                "title": "Places to Visit",
                "image": places_img,
                "text": self._generate_attractions_text(location, num_people, total_budget, duration_days)
            }
        }
    
    def _generate_transport_text(self, location, num_people, total_budget):
        return f"""• Getting to {location}:
- Train: Check IRCTC for trains to {location} station. AC tickets typically range ₹500-₹2000 depending on distance.
- Bus: State transport or private buses (₹300-₹1000) via RedBus or Abhibus.
- Flight: Check for nearest airport if budget allows (₹2000-₹8000 one-way).

• Local Transport:
- Auto-rickshaws: ₹50-₹200 per ride (negotiate first)
- Taxis: ₹800-₹1500 per day (use Ola/Uber for better rates)
- Local buses: ₹10-₹50 per ride (most economical)

Budget Tip: Allocate 10-15% of ₹{total_budget} for transport."""
    
    def _generate_accommodation_text(self, location, num_people, total_budget, duration_days):
        return f"""• Budget Options in {location}:
- Hostels: ₹300-₹600 per bed (Zostel, Backpacker Panda)
- Guesthouses: ₹800-₹1500 per room (check Booking.com)
- Budget Hotels: ₹1200-₹2500 (OYO, Treebo)

• Mid-Range Options:
- 3-star hotels: ₹2500-₹4000 (Taj, ITC budget properties)
- Homestays: ₹1500-₹3000 (Airbnb)

• Booking Tips:
- Book early for better rates
- Allocate ₹{total_budget//duration_days//num_people} per person per night
- Look for deals on MakeMyTrip/Goibibo"""
    
    def _generate_food_text(self, location, num_people, budget_per_person, duration_days):
        daily_food_budget = budget_per_person * duration_days
        return f"""• Local Eateries in {location}:
- Street food: ₹50-₹150 per item
- Local restaurants: ₹150-₹300 per meal
- Mid-range: ₹300-₹600 per meal

• Must-Try Foods:
- Local specialties (ask locals for recommendations)
- Regional thalis for best value

• Budget Tip:
Allocate ₹{daily_food_budget//duration_days} per person per day
Carry water bottles to save on drinks"""
    
    def _generate_attractions_text(self, location, num_people, total_budget, duration_days):
        return f"""• Top Attractions in {location}:
1. [Main historical site] - Entry ₹100-₹500
2. [Popular local market] - Free to explore
3. [Famous temple/monument] - Donation basis
4. [Natural attraction] - ₹50-₹300 entry

• Activities:
- Guided tours: ₹500-₹2000 per person
- Adventure activities: Prices vary
- Local experiences: Check with tourism office

• Budget Tip:
Prioritize 2-3 paid attractions daily within ₹{total_budget//duration_days} budget"""

@csrf_exempt
@require_http_methods(["POST"])
def generate_trip_plan(request):
    """API endpoint to generate trip plans"""
    try:
        data = json.loads(request.body)
        
        # Validation
        required_fields = ['location', 'number_of_people', 'budget_per_person', 'duration_days']
        for field in required_fields:
            if field not in data:
                return JsonResponse({'error': f'Missing required field: {field}'}, status=400)
        
        location = data['location']
        number_of_people = int(data['number_of_people'])
        budget_per_person = float(data['budget_per_person'])
        duration_days = int(data['duration_days'])
        
        # Input validation
        if number_of_people <= 0:
            return JsonResponse({'error': 'Number of people must be positive'}, status=400)
        if budget_per_person <= 0:
            return JsonResponse({'error': 'Budget must be positive'}, status=400)
        if duration_days <= 0:
            return JsonResponse({'error': 'Duration must be positive'}, status=400)
        
        # Generate trip plans
        ai_agent = AITravelAgent()
        trip_plans = ai_agent.generate_trip_plans(
            location, number_of_people, budget_per_person, duration_days
        )
        
        # Save to database (optional)
        try:
            TripPlan.objects.create(
                location=location,
                number_of_people=number_of_people,
                budget_per_person=budget_per_person,
                duration_days=duration_days,
                trip_plans=trip_plans
            )
        except Exception as e:
            logger.error(f"Error saving trip plan: {e}")
        
        return JsonResponse({
            'status': 'success',
            'data': trip_plans
        })
        
    except json.JSONDecodeError:
        logger.error("Invalid JSON received")
        return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return JsonResponse({'error': str(e)}, status=400)