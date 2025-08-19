from flask import Flask, request, render_template, jsonify, Response
import uuid
from dotenv import load_dotenv
from flask_cors import CORS
import os
import logging
import traceback
import time
import json
from datetime import datetime
from functools import wraps
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory
from embedding import load_embeddings
from langchain_groq import ChatGroq

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
# Configure logging

def setup_logging():
    """Set up comprehensive logging configuration"""
    # Create logs directory if it doesn't exist
    os.makedirs('logs', exist_ok=True)
    
    # Configure logging format
    log_format = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s'
    )
    
    # Root logger configuration
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(log_format)
    
    # File handler for general logs
    file_handler = logging.FileHandler('logs/app.log')
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(log_format)
    
    # File handler for errors
    error_handler = logging.FileHandler('logs/errors.log')
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(log_format)
    
    # File handler for chat interactions
    chat_handler = logging.FileHandler('logs/chat.log')
    chat_handler.setLevel(logging.INFO)
    chat_formatter = logging.Formatter(
        '%(asctime)s - CHAT - %(message)s'
    )
    chat_handler.setFormatter(chat_formatter)
    
    # Add handlers to root logger
    root_logger.addHandler(console_handler)
    root_logger.addHandler(file_handler)
    root_logger.addHandler(error_handler)
    
    # Create chat logger
    chat_logger = logging.getLogger('chat')
    chat_logger.addHandler(chat_handler)
    chat_logger.setLevel(logging.INFO)
    
    return root_logger, chat_logger

# Initialize logging
logger, chat_logger = setup_logging()

# Request timing decorator
def log_request_time(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        start_time = time.time()
        request_id = str(uuid.uuid4())[:8]
                
        try:
            result = f(*args, **kwargs)
            execution_time = time.time() - start_time
            logger.info(f"[{request_id}] Request completed successfully in {execution_time:.2f}s")
            return result
        except Exception as e:
            execution_time = time.time() - start_time
            logger.error(f"[{request_id}] Request failed after {execution_time:.2f}s: {str(e)}")
            logger.error(f"[{request_id}] Traceback: {traceback.format_exc()}")
            raise
    return decorated_function

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

logger.info("=" * 50)
logger.info("STARTING PITB CHATBOT APPLICATION")
logger.info("=" * 50)

load_dotenv()
# Load environment variables
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
GROQ_API_KEY3 = os.getenv('GROQ_API_KEY3')

try:
    # Set up LLM with streaming enabled
  
    llm = ChatGroq(model='llama3-8b-8192',api_key=GROQ_API_KEY3)
    logger.info("LLM initialized successfully with streaming enabled")
    
    # Load embeddings from the embeddings module
    logger.info("Loading FAISS embeddings...")
    vectorstore = load_embeddings()
    
    if vectorstore is None:
        logger.error("Failed to load embeddings. Please run embeddings.py first to create the vector store.")
        exit(1)
    
    # Initialize retriever
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
    logger.info("Vector store and retriever loaded successfully")
    
except Exception as e:
    logger.error(f"Error during initialization: {str(e)}")
    logger.error(f"Traceback: {traceback.format_exc()}") 
    raise

# Set up prompts
contextualize_q_system_prompt = (
    "Given a chat history and the latest user question "
    "which might reference context in the chat history, "
    "formulate a standalone question which can be understood "
    "without the chat history. Do NOT answer the question, "
    "just reformulate it if needed and otherwise return it as is."
    "Only extract exact numbers as stated in the context. Do not estimate."
)

contextualize_q_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", contextualize_q_system_prompt),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
    ]
)

try:
    logger.info("Creating retrieval chains...")
    history_aware_retriever = create_history_aware_retriever(
        llm, retriever, contextualize_q_prompt 
    )
    
    system_prompt = (
    "You are a compassionate PCOS Health Assistant. "
    "Your purpose is to provide supportive, accurate, and concise information about PCOS.\n\n"

    "Conversation Style:\n"
    "- Keep responses short and focused (1–3 sentences by default).\n"
    "- For greetings or casual openers (e.g., 'hi', 'hello'), respond warmly but briefly.\n"
    "- Ask follow-up questions only if the user shares symptoms or concerns.\n"
    "- Expand answers (up to 4–5 sentences or bullet points) only when the user explicitly asks for details.\n"
    "- Use plain, empathetic language. Avoid sounding like a lecture.\n\n"

    "Guidelines:\n"
    "- Provide evidence-based information about PCOS symptoms, diagnosis, and management.\n"
    "- Offer supportive guidance but never diagnose or prescribe treatments.\n"
    "- If outside PCOS expertise, say: 'I recommend discussing this with a healthcare provider.'\n"
    "- If unsure, say: 'I don’t have enough information on that. Please consult a healthcare provider.'\n"
    "- For sensitive or distressing topics, respond with empathy but stay professional.\n\n"

    "Reminders:\n"
    "- Your guidance complements, not replaces, medical care.\n"
    "- Always protect user privacy.\n"
    "- Stay focused on PCOS and women's health topics.\n"
    "- Be culturally sensitive and respectful.\n\n"

    "{context}\n\n"
)



    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}"),
        ]
    )
    
    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)
    logger.info("Retrieval chains created successfully")
    
except Exception as e:
    logger.error(f"Error creating retrieval chains: {str(e)}")
    logger.error(f"Traceback: {traceback.format_exc()}")
    raise

store = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
        logger.info(f"Created new chat history for session: {session_id}")
    return store[session_id]

try:
    conversational_rag_chain = RunnableWithMessageHistory(
        rag_chain,
        get_session_history,
        input_messages_key="input",
        history_messages_key="chat_history",
        output_messages_key="answer",
    )
    logger.info("Conversational RAG chain initialized successfully")
except Exception as e:
    logger.error(f"Error initializing conversational RAG chain: {str(e)}")
    logger.error(f"Traceback: {traceback.format_exc()}")
    raise

# Initialize session storage
sessions = {}

# @app.route('/')
# def index():
#     logger.info("Serving index page")
#     return render_template('test.html')

@app.route('/chat', methods=['POST'])
@log_request_time
def chat():
    request_start_time = time.time()
    session_id = request.form.get('session_id')
    user_input = request.form.get('input')
    
    logger.info(f"Chat request received - Session ID: {session_id}")
    
    # Log chat interaction
    chat_logger.info(f"SESSION: {session_id} | USER: {user_input}")
    
    try:
        # Session validation and initialization
        if not session_id or session_id not in sessions:
            if not session_id:
                session_id = str(uuid.uuid4())
                logger.info(f"Generated new session ID: {session_id}")
            sessions[session_id] = []
            logger.info(f"Initialized new session: {session_id}")
        
        if not user_input:
            logger.warning(f"Empty user input received for session: {session_id}")
            return jsonify({
                'error': 'No input provided',
                'session_id': session_id,
                'chat_history': sessions[session_id]
            }), 400
        
        # Process user input
        logger.info(f"Processing user input for session: {session_id}")
        sessions[session_id].append({"role": "Customer", "content": user_input})
        
        def generate_response():
            try:
                # Stream the response
                full_response = ""
                think_content = ""
                actual_response = ""
                in_think_tag = False
                
                for chunk in conversational_rag_chain.stream(
                    {
                        "input": user_input,
                        "chat_history": sessions[session_id],
                    },
                    config={"configurable": {"session_id": session_id}}
                ):
                    # Extract the answer content from the chunk
                    if 'answer' in chunk:
                        content = chunk['answer']
                        full_response += content
                        
                        # Process content to separate think tags from actual response
                        i = 0
                        while i < len(content):
                            if not in_think_tag and content[i:].startswith('<think>'):
                                # Start of think tag
                                in_think_tag = True
                                i += 7  # len('<think>')
                            elif in_think_tag and content[i:].startswith('</think>'):
                                # End of think tag
                                in_think_tag = False
                                i += 8  # len('</think>')
                            elif in_think_tag:
                                # Inside think tag
                                think_content += content[i]
                                i += 1
                            else:
                                # Outside think tag (actual response)
                                actual_response += content[i]
                                # Send only the actual response content
                                yield f"data: {json.dumps({'type': 'chunk', 'content': content[i], 'session_id': session_id})}\n\n"
                                i += 1
                
                # Append bot response to chat history (store the actual response only)
                sessions[session_id].append({"role": "PITB", "content": actual_response.strip()})
                
                # Log complete response
                chat_logger.info(f"SESSION: {session_id} | BOT: {actual_response.strip()}")
                if think_content.strip():
                    chat_logger.info(f"SESSION: {session_id} | THINK: {think_content.strip()}")
                
                # Send completion signal with both actual response and think content
                total_execution_time = time.time() - request_start_time
                yield f"data: {json.dumps({'type': 'complete', 'session_id': session_id, 'processing_time': f'{total_execution_time:.2f}s', 'chat_history': sessions[session_id], 'think_content': think_content.strip()})}\n\n"
                
            except Exception as e:
                error_msg = str(e)
                logger.error(f"Error in streaming response for session {session_id}: {error_msg}")
                logger.error(f"Traceback: {traceback.format_exc()}")
                
                # Log error in chat log as well
                chat_logger.error(f"SESSION: {session_id} | ERROR: {error_msg}")
                
                yield f"data: {json.dumps({'type': 'error', 'error': 'An error occurred while processing your request', 'session_id': session_id})}\n\n"
        
        return Response(
            generate_response(),
            mimetype='text/event-stream',
            headers={
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Cache-Control'
            }
        )
        
    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error processing chat request for session {session_id}: {error_msg}")
        logger.error(f"Traceback: {traceback.format_exc()}")
        
        # Log error in chat log as well
        chat_logger.error(f"SESSION: {session_id} | ERROR: {error_msg}")
        
        return jsonify({
            'error': 'An error occurred while processing your request',
            'session_id': session_id,
            'chat_history': sessions.get(session_id, [])
        }), 500

MODEL_PATH = "pcos_classifier_resnet50.pth"   # <-- make sure this file exists
CLASSES = ["infected", "noninfected"]
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Load Model Once
def load_classifier():
    model = models.resnet50(pretrained=False)
    model.fc = nn.Linear(model.fc.in_features, len(CLASSES))
    model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
    model.to(DEVICE)
    model.eval()
    return model

classifier_model = load_classifier()

# Transform for input images
img_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225]),
])

@app.route("/predict", methods=["POST"])
@log_request_time
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    try:
        # Preprocess image
        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img = img_transform(img).unsqueeze(0).to(DEVICE)

        # Inference
        with torch.no_grad():
            outputs = classifier_model(img)
            probs = torch.softmax(outputs, dim=1)[0]
            conf, pred_idx = torch.max(probs, 0)

        label = CLASSES[pred_idx.item()]
        confidence = round(conf.item(), 4)

        logger.info(f"Prediction -> {label} ({confidence})")
        
        return jsonify({
            "label": label,
            "probability": confidence
        })

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    try:
        app.run(debug=True, host='0.0.0.0',use_reloader=False, threaded=True, port=4933)
    except Exception as e:
        logger.error(f"Failed to start Flask application: {str(e)}")
        logger.error(f"Traceback: {traceback.format_exc()}")