from pydantic import BaseModel, HttpUrl
from typing import Optional, List

# --- SCHEMAS DE CARPETAS ---
class FolderBase(BaseModel):
    name: str

class FolderCreate(FolderBase):
    pass

class Folder(FolderBase):
    id: int
    owner_id: int
    class Config:
        from_attributes = True

# --- SCHEMAS DE LINKS ---
class LinkBase(BaseModel):
    title: str
    url: HttpUrl
    image: Optional[str] = None
    folder_id: Optional[int] = None # Ahora aceptamos el ID de carpeta

class LinkCreate(LinkBase):
    pass

class Link(LinkBase):
    id: int
    owner_id: int
    folder_id: Optional[int] = None # Devolvemos el ID de carpeta

    class Config:
        from_attributes = True