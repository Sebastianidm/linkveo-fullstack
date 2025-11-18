from sqlalchemy.orm import Session
import models
import schemas
from scraper import get_metadata

def get_links_by_owner(db: Session, owner_id: int):
    #Buscamos los links por owner_id
    return db.query(models.Link).filter(models.Link.owner_id == owner_id).all()

def create_user_link(db: Session, link: schemas.LinkCreate, owner_id: int):
    
    # 1. Intentamos obtener metadata automática
    scraped_title, scraped_image = get_metadata(str(link.url))
    
    # 2. Decidimos qué título usar
    # Si el usuario mandó un título (o el frontend puso la URL como título),
    # preferimos el título real de la web si lo encontramos.
    final_title = scraped_title if scraped_title else link.title
    
    # 3. Creamos el objeto
    db_link = models.Link(
        title=final_title,
        url=str(link.url),
        image=scraped_image, # <--- GUARDAMOS LA IMAGEN
        owner_id=owner_id
    )

    db.add(db_link)
    db.commit()
    db.refresh(db_link)

    return db_link