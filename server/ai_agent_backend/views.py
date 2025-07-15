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
        self.model = genai.GenerativeModel('gemini-2.0-flash-exp')
    
    def generate_trip_plans(self, location, num_people, budget_per_person, duration_days):
        """Generate multiple trip plans using Gemini AI"""
        
        total_budget = budget_per_person * num_people
        
        prompt = f"""
        You are an expert travel agent. Create 3 different trip plans for the following requirements:
        
        Location: {location}
        Number of People: {num_people}
        Budget per Person: ₹{budget_per_person}
        Total Budget: ₹{total_budget}
        Duration: {duration_days} days
        
        For each trip plan, provide detailed information in the following JSON format:
        
        {{
            "trip_plans": [
                {{
                    "plan_id": 1,
                    "plan_name": "Budget-Friendly Plan",
                    "total_cost": 0,
                    "cost_per_person": 0,
                    "duration": {duration_days},
                    "transportation": {{
                        "mode": "Train/Bus/Flight",
                        "cost": 0,
                        "details": "Transportation details"
                    }},
                    "accommodation": {{
                        "type": "Hotel/Guesthouse/Hostel",
                        "cost_per_night": 0,
                        "total_nights": 0,
                        "total_cost": 0,
                        "details": "Accommodation details"
                    }},
                    "meals": {{
                        "breakfast": {{
                            "cost_per_day": 0,
                            "total_cost": 0,
                            "suggestions": ["Local breakfast options"]
                        }},
                        "lunch": {{
                            "cost_per_day": 0,
                            "total_cost": 0,
                            "suggestions": ["Local lunch options"]
                        }},
                        "dinner": {{
                            "cost_per_day": 0,
                            "total_cost": 0,
                            "suggestions": ["Local dinner options"]
                        }}
                    }},
                    "daily_itinerary": [
                        {{
                            "day": 1,
                            "activities": [
                                {{
                                    "time": "Morning",
                                    "activity": "Activity name",
                                    "location": "Location name",
                                    "cost": 0,
                                    "duration": "2 hours",
                                    "description": "Activity description"
                                }}
                            ],
                            "total_day_cost": 0
                        }}
                    ],
                    "attractions": [
                        {{
                            "name": "Attraction name",
                            "entry_fee": 0,
                            "best_time_to_visit": "Morning/Afternoon/Evening",
                            "duration": "2 hours",
                            "description": "Attraction description"
                        }}
                    ],
                    "local_transportation": {{
                        "daily_cost": 0,
                        "total_cost": 0,
                        "options": ["Auto-rickshaw", "Taxi", "Bus"]
                    }},
                    "miscellaneous": {{
                        "shopping": 0,
                        "emergency_fund": 0,
                        "tips_and_extras": 0,
                        "total": 0
                    }},
                    "tips": [
                        "Money-saving tips",
                        "Best time to visit",
                        "Local customs to know"
                    ]
                }}
            ]
        }}
        
        Create 3 different plans:
        1. Budget-Friendly Plan (utilizing 80-90% of budget)
        2. Balanced Plan (utilizing 90-100% of budget)
        3. Premium Plan (utilizing 100% of budget with upgrades)
        
        Make sure to include all major attractions, local cuisine, and activities that can be covered within the specified duration and budget. Provide realistic costs based on current Indian market prices.
        
        Return ONLY the JSON response without any additional text or formatting.
        """
        
        try:
            response = self.model.generate_content(prompt)
            
            # Clean the response text
            response_text = response.text.strip()
            
            # Remove any markdown formatting if present
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            
            # Parse JSON response
            trip_data = json.loads(response_text)
            
            return trip_data
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON parsing error: {e}")
            return self._get_fallback_response(location, num_people, budget_per_person, duration_days)
        except Exception as e:
            logger.error(f"Error generating trip plans: {e}")
            return self._get_fallback_response(location, num_people, budget_per_person, duration_days)
    
    def _get_fallback_response(self, location, num_people, budget_per_person, duration_days):
        """Fallback response when AI generation fails"""
        total_budget = budget_per_person * num_people
        
        return {
            "trip_plans": [
                {
                    "plan_id": 1,
                    "plan_name": "Budget-Friendly Plan",
                    "total_cost": int(total_budget * 0.85),
                    "cost_per_person": int(budget_per_person * 0.85),
                    "duration": duration_days,
                    "transportation": {
                        "mode": "Train/Bus",
                        "cost": int(total_budget * 0.25),
                        "details": f"Round trip transportation to {location}"
                    },
                    "accommodation": {
                        "type": "Budget Hotel/Guesthouse",
                        "cost_per_night": int(budget_per_person * 0.25),
                        "total_nights": duration_days - 1,
                        "total_cost": int(budget_per_person * 0.25 * (duration_days - 1) * num_people),
                        "details": "Budget-friendly accommodation options"
                    },
                    "meals": {
                        "breakfast": {
                            "cost_per_day": int(budget_per_person * 0.1),
                            "total_cost": int(budget_per_person * 0.1 * duration_days * num_people),
                            "suggestions": ["Local breakfast options"]
                        },
                        "lunch": {
                            "cost_per_day": int(budget_per_person * 0.15),
                            "total_cost": int(budget_per_person * 0.15 * duration_days * num_people),
                            "suggestions": ["Local lunch options"]
                        },
                        "dinner": {
                            "cost_per_day": int(budget_per_person * 0.15),
                            "total_cost": int(budget_per_person * 0.15 * duration_days * num_people),
                            "suggestions": ["Local dinner options"]
                        }
                    },
                    "daily_itinerary": [
                        {
                            "day": i + 1,
                            "activities": [
                                {
                                    "time": "Morning",
                                    "activity": f"Explore {location}",
                                    "location": location,
                                    "cost": int(budget_per_person * 0.05),
                                    "duration": "3 hours",
                                    "description": f"Morning activities in {location}"
                                }
                            ],
                            "total_day_cost": int(budget_per_person * 0.4)
                        } for i in range(duration_days)
                    ],
                    "attractions": [
                        {
                            "name": f"Main attractions in {location}",
                            "entry_fee": 50,
                            "best_time_to_visit": "Morning",
                            "duration": "2-3 hours",
                            "description": f"Popular tourist attractions in {location}"
                        }
                    ],
                    "local_transportation": {
                        "daily_cost": int(budget_per_person * 0.05),
                        "total_cost": int(budget_per_person * 0.05 * duration_days * num_people),
                        "options": ["Auto-rickshaw", "Taxi", "Bus"]
                    },
                    "miscellaneous": {
                        "shopping": int(budget_per_person * 0.1 * num_people),
                        "emergency_fund": int(budget_per_person * 0.1 * num_people),
                        "tips_and_extras": int(budget_per_person * 0.05 * num_people),
                        "total": int(budget_per_person * 0.25 * num_people)
                    },
                    "tips": [
                        "Book transportation in advance for better prices",
                        "Try local street food for authentic experience",
                        "Carry cash as card acceptance might be limited"
                    ]
                }
            ]
        }


@csrf_exempt
@require_http_methods(["POST"])
def generate_trip_plan(request):
    """API endpoint to generate trip plans"""
    try:
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['location', 'number_of_people', 'budget_per_person', 'duration_days']
        for field in required_fields:
            if field not in data:
                return JsonResponse({
                    'error': f'Missing required field: {field}'
                }, status=400)
        
        location = data['location']
        number_of_people = int(data['number_of_people'])
        budget_per_person = float(data['budget_per_person'])
        duration_days = int(data['duration_days'])
        
        # Validate input ranges
        if number_of_people <= 0 or number_of_people > 50:
            return JsonResponse({
                'error': 'Number of people must be between 1 and 50'
            }, status=400)
        
        if budget_per_person <= 0 or budget_per_person > 1000000:
            return JsonResponse({
                'error': 'Budget per person must be between ₹1 and ₹10,00,000'
            }, status=400)
        
        if duration_days <= 0 or duration_days > 30:
            return JsonResponse({
                'error': 'Duration must be between 1 and 30 days'
            }, status=400)
        
        # Generate trip plans using AI
        ai_agent = AITravelAgent()
        trip_plans = ai_agent.generate_trip_plans(
            location, number_of_people, budget_per_person, duration_days
        )
        
        # Save to database (optional)
        try:
            trip_record = TripPlan.objects.create(
                location=location,
                number_of_people=number_of_people,
                budget_per_person=budget_per_person,
                duration_days=duration_days,
                trip_plans=trip_plans
            )
            logger.info(f"Trip plan saved with ID: {trip_record.id}")
        except Exception as e:
            logger.error(f"Error saving trip plan: {e}")
        
        return JsonResponse({
            'status': 'success',
            'data': trip_plans
        })
        
    except json.JSONDecodeError:
        return JsonResponse({
            'error': 'Invalid JSON format'
        }, status=400)
    except ValueError as e:
        return JsonResponse({
            'error': f'Invalid input: {str(e)}'
        }, status=400)
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return JsonResponse({
            'error': 'An unexpected error occurred'
        }, status=500)