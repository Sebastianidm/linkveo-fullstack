from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Folder(Base):
    __tablename__ = "folders"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    owner_id = Column(Integer) # Cada carpeta pertenece a un usuario

    # Una carpeta tiene muchos links
    links = relationship("Link", back_populates="folder", cascade="all, delete-orphan")

class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    url = Column(String)
    image = Column(String, nullable=True)
    owner_id = Column(Integer)
    
    # NUEVO: El link pertenece a una carpeta (puede ser nulo si no tiene carpeta)
    folder_id = Column(Integer, ForeignKey("folders.id"), nullable=True)
    
    # Relación con la carpeta
    folder = relationship("Folder", back_populates="links")