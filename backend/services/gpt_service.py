from openai import OpenAI
import os


openaiapi_key = ""

client = OpenAI(
    api_key=openaiapi_key  # This is the default and can be omitted
)

def call_gpt_api(prompt: str, retrieved_context: dict) -> str:
    
    # Construct the prompt with context
    system_message = "You are an AI assistant to help students plan and evaluate course schedules at UNC. Students will ask about the classes that fit their needs so provide detailed answers based on the provided course descriptions and information attached."
    user_message = f"Here is the relevant course information context:\n\n{retrieved_context}\n\nBased on this context, answer the following question asked by a college student:\n{prompt}"

    # Query OpenAI's API
    chatresponse = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_message}
        ],
        temperature=0.7
    )

    return chatresponse.choices[0].message.content