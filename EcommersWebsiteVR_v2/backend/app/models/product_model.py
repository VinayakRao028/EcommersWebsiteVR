from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500))
    image = Column(String(200))
    price = Column(Float, nullable=False)
    orders_id = Column(Integer)

    def __init__(self, name, description, image, price, orders_id=None):
        self.name = name
        self.description = description
        self.image = image
        self.price = price
        self.orders_id = orders_id

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price})>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'price': self.price,
            'orders_id': self.orders_id
        }