#!/usr/bin/env python3
"""
Osmofilter Lead Finder - Script de búsqueda automática
Busca empresas del sector de tratamiento de agua usando Google Custom Search API
"""

import json
import os
import time
from datetime import datetime
from urllib.parse import urlparse
import requests

# Configuración de API
API_KEY = os.environ.get('GOOGLE_API_KEY', '')
SEARCH_ENGINE_ID = os.environ.get('SEARCH_ENGINE_ID', '')

# Archivos de datos
DATA_DIR = 'data'
COMPANIES_FILE = f'{DATA_DIR}/companies.json'
KEYWORDS_FILE = f'{DATA_DIR}/keywords.json'
DOUBTS_FILE = f'{DATA_DIR}/doubts.json'

class LeadFinder:
    def __init__(self):
        self.api_key = API_KEY
        self.search_engine_id = SEARCH_ENGINE_ID
        self.companies = self.load_json(COMPANIES_FILE)
        self.keywords = self.load_json(KEYWORDS_FILE)
        self.doubts = self.load_json(DOUBTS_FILE)
        self.existing_urls = set(c['url'] for c in self.companies)
        
    def load_json(self, filepath):
        """Carga un archivo JSON"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            return []
    
    def save_json(self, filepath, data):
        """Guarda datos en un archivo JSON"""
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def extract_domain(self, url):
        """Extrae el dominio de una URL"""
        try:
            parsed = urlparse(url)
            return parsed.netloc.replace('www.', '')
        except:
            return url
    
    def is_duplicate_domain(self, url):
        """Verifica si el dominio ya existe en las empresas"""
        domain = self.extract_domain(url)
        existing_domains = [self.extract_domain(c['url']) for c in self.companies]
        return domain in existing_domains
    
    def search_google(self, keyword, num_results=10):
        """Realiza una búsqueda en Google Custom Search API"""
        url = 'https://www.googleapis.com/customsearch/v1'
        
        params = {
            'key': self.api_key,
            'cx': self.search_engine_id,
            'q': keyword,
            'num': num_results,
            'gl': 'es',  # Geolocalización España
            'lr': 'lang_es',  # Idioma español
        }
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            results = []
            if 'items' in data:
                for item in data['items']:
                    results.append({
                        'title': item.get('title', ''),
                        'url': item.get('link', ''),
                        'snippet': item.get('snippet', ''),
                        'displayUrl': item.get('displayLink', '')
                    })
            
            return results
        except requests.exceptions.RequestException as e:
            print(f'❌ Error en búsqueda "{keyword}": {e}')
            return []
    
    def analyze_result(self, result):
        """Analiza un resultado para determinar si es relevante"""
        url = result['url'].lower()
        title = result['title'].lower()
        snippet = result['snippet'].lower()
        
        # Palabras clave que indican que es relevante
        relevant_keywords = [
            'tratamiento', 'agua', 'osmosis', 'purificador', 'descalcificador',
            'filtro', 'potabilizadora', 'industrial', 'hidrico', 'potable',
            'desaladora', 'depuradora', 'dispensador', 'fuente', 'ionfilter',
            'hidrosalud'
        ]
        
        # Palabras que indican que NO es relevante
        exclude_keywords = [
            'wikipedia', 'amazon', 'mercadolibre', 'aliexpress', 'ebay',
            'youtube', 'facebook', 'twitter', 'instagram', 'linkedin',
            'blog', 'foro', 'noticia', 'articulo', 'pdf'
        ]
        
        # Verificar exclusiones
        for word in exclude_keywords:
            if word in url or word in title:
                return False
        
        # Verificar relevancia
        text = f'{title} {snippet}'
        relevant_count = sum(1 for word in relevant_keywords if word in text)
        
        # Es relevante si tiene al menos 2 palabras clave relevantes
        return relevant_count >= 2
    
    def run_search(self):
        """Ejecuta búsquedas para todas las palabras clave"""
        print('🔍 Iniciando búsqueda de empresas...\n')
        
        new_companies_count = 0
        new_doubts_count = 0
        
        for keyword_obj in self.keywords:
            keyword = keyword_obj['text']
            print(f'🔎 Buscando: "{keyword}"')
            
            results = self.search_google(keyword, num_results=10)
            
            if not results:
                print(f'   ⚠️  No se encontraron resultados\n')
                continue
            
            print(f'   ✅ {len(results)} resultados encontrados')
            
            for result in results:
                url = result['url']
                
                # Saltar si ya existe
                if url in self.existing_urls or self.is_duplicate_domain(url):
                    continue
                
                # Analizar relevancia
                if self.analyze_result(result):
                    # Empresa relevante - añadir directamente
                    company = {
                        'id': str(int(time.time() * 1000)),
                        'name': result['title'],
                        'url': url,
                        'status': 'pending',
                        'products': [],
                        'foundDate': datetime.now().isoformat(),
                        'foundBy': keyword,
                        'snippet': result['snippet'],
                        'notes': ''
                    }
                    
                    self.companies.append(company)
                    self.existing_urls.add(url)
                    new_companies_count += 1
                    print(f'   ✅ Empresa añadida: {result["title"][:50]}...')
                    
                else:
                    # Resultado dudoso - añadir a revisión manual
                    doubt = {
                        'id': str(int(time.time() * 1000)),
                        'title': result['title'],
                        'url': url,
                        'snippet': result['snippet'],
                        'foundBy': keyword,
                        'foundDate': datetime.now().isoformat()
                    }
                    
                    self.doubts.append(doubt)
                    new_doubts_count += 1
                    print(f'   ❓ Duda añadida: {result["title"][:50]}...')
                
                # Pequeña pausa para no saturar la API
                time.sleep(0.5)
            
            # Actualizar contador de resultados del keyword
            keyword_obj['results'] = len(results)
            keyword_obj['lastSearch'] = datetime.now().isoformat()
            
            print()
            # Pausa entre keywords
            time.sleep(1)
        
        # Guardar datos actualizados
        self.save_json(COMPANIES_FILE, self.companies)
        self.save_json(KEYWORDS_FILE, self.keywords)
        self.save_json(DOUBTS_FILE, self.doubts)
        
        print('='*60)
        print(f'✅ Búsqueda completada!')
        print(f'📊 Nuevas empresas: {new_companies_count}')
        print(f'❓ Páginas en duda: {new_doubts_count}')
        print(f'📋 Total empresas: {len(self.companies)}')
        print('='*60)

if __name__ == '__main__':
    if not API_KEY or not SEARCH_ENGINE_ID:
        print('❌ Error: Faltan credenciales de API')
        print('Configura GOOGLE_API_KEY y SEARCH_ENGINE_ID en GitHub Secrets')
        exit(1)
    
    finder = LeadFinder()
    finder.run_search()
