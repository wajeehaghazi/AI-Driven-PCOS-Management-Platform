import os
import logging
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, CSVLoader
from langchain_community.vectorstores import FAISS
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_ollama import OllamaEmbeddings
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv  
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
def setup_logging():
    """Set up basic logging for embeddings creation"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    return logging.getLogger(__name__)

def create_embeddings():
    """Create and save FAISS embeddings from PDF documents"""
    logger = setup_logging()
    
    try:
        # Initialize embeddings
        logger.info("Initializing embeddings model...")
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        logger.info("Embeddings model initialized successfully")
        
        # Check if documents directory exists
        docs_dir = "docs2"
        if not os.path.exists(docs_dir):
            logger.error(f"Documents directory '{docs_dir}' not found!")
            return False
            
        # Load and process documents
        logger.info("Loading csv documents...")
        # loader = CSVLoader('PITB.csv')
        loader = DirectoryLoader(
            docs_dir,
            glob="**/*.pdf",
            loader_cls=PyPDFLoader,
            show_progress=True
        )
        docs = loader.load()
        logger.info(f"Loaded {len(docs)} documents from csv files")
        
        if not docs:
            logger.error("No documents found to process!")
            return False
        
        # Split documents
        logger.info("Splitting documents into chunks...")
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000, 
            chunk_overlap=200
        )
        splits = text_splitter.split_documents(docs)
        logger.info(f"Created {len(splits)} document chunks")
        
        # Create vectorstore from documents
        logger.info("Creating FAISS vector store...")
        vectorstore = FAISS.from_documents(documents=splits, embedding=embeddings)
        
        # Save the index locally
        faiss_index_path = 'faiss_index'
        logger.info(f"Saving FAISS index to '{faiss_index_path}'...")
        vectorstore.save_local(faiss_index_path)
        logger.info("FAISS index created and saved successfully!")
        
        return True
        
    except Exception as e:
        logger.error(f"Error during embeddings creation: {str(e)}")
        logger.error(f"Exception details:", exc_info=True)
        return False

def load_embeddings():
    """Load existing FAISS embeddings"""
    logger = setup_logging()
    
    try:
        # Initialize embeddings
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        
        # Check if FAISS index exists
        faiss_index_path = 'faiss_index'
        if not (os.path.exists(faiss_index_path) and os.path.isdir(faiss_index_path)):
            logger.error(f"FAISS index not found at '{faiss_index_path}'. Please run create_embeddings() first.")
            return None
            
        # Load existing FAISS index
        logger.info("Loading existing FAISS index...")
        vectorstore = FAISS.load_local(
            faiss_index_path, 
            embeddings, 
            allow_dangerous_deserialization=True
        )
        logger.info("FAISS index loaded successfully")
        
        return vectorstore
        
    except Exception as e:
        logger.error(f"Error loading embeddings: {str(e)}")
        logger.error(f"Exception details:", exc_info=True)
        return None

if __name__ == "__main__":
    """Run this script to create embeddings from PDF documents"""
    print("Creating embeddings from PDF documents...")
    success = create_embeddings()
    
    if success:
        print("✅ Embeddings created successfully!")
        print("You can now run inference.py to start the chatbot.")
    else:
        print("❌ Failed to create embeddings. Check the logs for details.")