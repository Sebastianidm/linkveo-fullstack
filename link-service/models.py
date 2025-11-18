from sqlalchemy import Column, Integer, String, ForeignKey # Asegúrate de importar String
from database import Base

class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    url = Column(String)
    image = Column(String, nullable=True) 
    owner_id = Column(Integer)