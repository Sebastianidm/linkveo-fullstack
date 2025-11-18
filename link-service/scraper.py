import requests
from bs4 import BeautifulSoup

def get_metadata(url: str):
    try:
        # Usamos un User-Agent para que las webs no nos bloqueen pensando que somos un bot malicioso
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        # Descargamos la web (timeout de 5 segundos para no colgar el server)
        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 1. Buscar Título
        title = None
        if soup.title and soup.title.string:
            title = soup.title.string
        
        # 2. Buscar Imagen (Open Graph image estándar de Facebook/Twitter/WhatsApp)
        image = None
        og_image = soup.find("meta", property="og:image")
        if og_image:
            image = og_image.get("content")
            
        return title, image

    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None, None