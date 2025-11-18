from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt


# Estas constantes DEBEN ser EXACTAMENTE las mismas que en el user-service.
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http://127.0.0.1:8000/auth/token")
def get_current_user_id(token: str = Depends(oauth2_scheme)) -> int:
    """
    Decodifica el token JWT para extraer el ID del usuario (el 'sub').
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str: str = payload.get("sub")
        if user_id_str is None:
            raise credentials_exception

        # Convertimos el ID del token (que es un string) a un entero
        user_id_int = int(user_id_str)
        return user_id_int

    except (JWTError, ValueError):
        # Si el token es inválido o el 'sub' no es un número, falla.
        raise credentials_exception