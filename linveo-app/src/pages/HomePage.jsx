import React, { useState, useEffect } from 'react';
import { Menu, Plus, Folder, Trash2, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { apiGetLinks, apiDeleteLink } from '../services/linkService';
import axios from 'axios'; 

// URL de tu microservicio
const API_URL = 'http://localhost:8001'; 

export default function HomePage() {
  const { user, logout, token } = useAuth();
  
  // --- ESTADOS ---
  const [links, setLinks] = useState([]);
  const [folders, setFolders] = useState([]);
  
  const [activeFolder, setActiveFolder] = useState(null); // null = 'All Links'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [selectedFolderForNewLink, setSelectedFolderForNewLink] = useState(null);
  
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- CARGA DE DATOS ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Cargar Links
        const fetchedLinks = await apiGetLinks(token);
        setLinks(fetchedLinks);
        
        // 2. Cargar Carpetas
        const resFolders = await axios.get(`${API_URL}/folders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFolders(resFolders.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  // --- LÓGICA ---
  
  const filteredLinks = 
    activeFolder === 'uncategorized' // CASO 1: Vista "Sin Carpeta"
      ? links.filter(link => link.folder_id === null)
      : activeFolder // CASO 2: Una carpeta específica
        ? links.filter(link => link.folder_id === activeFolder)
        : links; // CASO 3: Vista "Todos" (Default)

  const handleAddLink = async () => {
    if (!newLinkUrl) return;
    try {
      let title = newLinkUrl;
      try { 
        title = new URL(newLinkUrl).hostname; 
      } catch(e){
        console.log("No se pudo extraer hostname:", e);
      }

      const response = await axios.post(`${API_URL}/links`, 
        { title, url: newLinkUrl, folder_id: selectedFolderForNewLink }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setLinks([response.data, ...links]);
      setNewLinkUrl('');
    } catch (error) {
      console.error("Error creando link:", error);
      alert("Error al crear link");
    }
  };

  const handleDeleteLink = async (id) => {
    if(!confirm("¿Eliminar enlace?")) return;
    try {
      await apiDeleteLink(id, token);
      setLinks(links.filter(l => l.id !== id));
    } catch (error) {
      console.error("Error eliminando link:", error);
      alert("Error al eliminar");
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName) return;
    try {
      const res = await axios.post(`${API_URL}/folders`, 
        { name: newFolderName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFolders([...folders, res.data]);
      setNewFolderName('');
      setIsCreatingFolder(false);
    } catch (error) {
      console.error("Error creando carpeta:", error);
      alert("Error creando carpeta");
    }
  };

  // --- COMPONENTES INTERNOS ---

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white/50 backdrop-blur-md border-r border-white/20">
      {/* Perfil */}
      <div className="flex flex-col items-center gap-4 border-b border-gray-200/50 p-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Linkveo</h1>
        <div className="flex items-center gap-3 w-full bg-white/60 p-2 rounded-xl shadow-sm">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-gray-500 truncate">Plan Gratuito</p>
          </div>
          <button onClick={logout} className="p-1.5 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Lista de Carpetas */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Mis Colecciones
        </h2>
        <div className="space-y-1">
          <button
            onClick={() => { setActiveFolder(null); setMobileMenuOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              activeFolder === null 
                ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
            }`}
          >
            <Folder className="h-4 w-4" />
            <span className="flex-1 text-left">Todos los Links</span>
            <span className="text-xs opacity-70">{links.length}</span>
          </button>

          {/* Botón "Sin Clasificar" */}
          <button
            onClick={() => { setActiveFolder('uncategorized'); setMobileMenuOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              activeFolder === 'uncategorized'
                ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span className="flex-1 text-left">Sin Clasificar</span>
            <span className="text-xs opacity-70">
              {links.filter(l => l.folder_id === null).length}
            </span>
          </button>

          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => { setActiveFolder(folder.id); setMobileMenuOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                activeFolder === folder.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                  : "text-gray-600 hover:bg-white/60 hover:text-gray-900"
              }`}
            >
              <Folder className="h-4 w-4" />
              <span className="flex-1 text-left">{folder.name}</span>
              <span className="text-xs opacity-70">
                {links.filter(l => l.folder_id === folder.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200/50">
        <button 
          onClick={() => setIsCreatingFolder(true)}
          className="flex w-full items-center gap-2 rounded-xl border border-dashed border-gray-300 p-3 text-sm font-medium text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
        >
          <Plus className="h-4 w-4" />
          Nueva Carpeta
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F5F5F7] overflow-hidden font-sans">
      <aside className="hidden lg:block w-[280px] h-full shadow-xl shadow-gray-200/50 z-20">
        <SidebarContent />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[280px] bg-[#F5F5F7] shadow-2xl animate-in slide-in-from-left">
            <SidebarContent />
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="lg:hidden flex items-center p-4 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-4 font-bold text-lg text-gray-800">Linkveo</span>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            
            <div className="relative mb-8 group z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition" />
              <div className="relative flex items-center bg-white rounded-full shadow-lg shadow-gray-200/50 p-2 pl-6">
                <input 
                  type="text"
                  placeholder="Pega un enlace para guardar..."
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-lg"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                />
                
                <div className="relative ml-2 border-l border-gray-100 pl-2">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 text-sm font-medium text-gray-600 transition"
                  >
                    <Folder className="h-4 w-4 text-blue-500" />
                    <span className="max-w-[80px] truncate">
                      {folders.find(f => f.id === selectedFolderForNewLink)?.name || "General"}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden z-50">
                      <button
                        onClick={() => { setSelectedFolderForNewLink(null); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      >
                        General (Sin carpeta)
                      </button>
                      {folders.map(folder => (
                        <button
                          key={folder.id}
                          onClick={() => { setSelectedFolderForNewLink(folder.id); setIsDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 truncate"
                        >
                          {folder.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleAddLink}
                  className="ml-2 bg-gray-900 hover:bg-black text-white rounded-full p-3 transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {/* --- CORRECCIÓN DEL TÍTULO --- */}
                {activeFolder === 'uncategorized' 
                  ? "Sin Clasificar" 
                  : activeFolder 
                    ? folders.find(f => f.id === activeFolder)?.name 
                    : "Todos los Links"}
              </h2>
              <span className="text-sm text-gray-400">{filteredLinks.length} links</span>
            </div>

            {filteredLinks.length === 0 ? (
              <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-white/50">
                <Folder className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">Esta carpeta está vacía</p>
                <p className="text-sm text-gray-400">¡Agrega tu primer link arriba!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {filteredLinks.map((link) => (
                  <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col relative overflow-hidden"
                  >
                    <div className="h-40 w-full rounded-2xl bg-gray-100 overflow-hidden mb-4 relative">
                      {link.image ? (
                        <img src={link.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-blue-50 to-purple-50">🔗</div>
                      )}
                      <button 
                        onClick={(e) => { e.preventDefault(); handleDeleteLink(link.id); }}
                        className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur text-red-500 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-blue-600 transition">
                      {link.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate">{link.url}</p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {isCreatingFolder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Nueva Colección</h3>
            <input 
              autoFocus
              placeholder="Nombre (ej: Trabajo, Ideas)"
              className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={newFolderName}
              onChange={e => setNewFolderName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreateFolder()}
            />
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setIsCreatingFolder(false)}
                className="flex-1 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreateFolder}
                className="flex-1 py-2.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}