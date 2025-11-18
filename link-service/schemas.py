from pydantic import BaseModel, HttpUrl
from typing import Optional 

class LinkBase(BaseModel):
    title: str
    url: HttpUrl
    image: Optional[str] = None # <--- AÑADIR ESTO

class LinkCreate(LinkBase):
    pass

class Link(LinkBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True
