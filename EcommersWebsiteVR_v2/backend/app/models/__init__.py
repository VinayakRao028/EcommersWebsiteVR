from sqlalchemy.orm import declarative_base
from .product_model import Product

class Base:
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

Base = declarative_base(cls=Base)

# If we add more models in the future, we'd import them here
# from .other_model import OtherModel