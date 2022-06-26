// import { Component } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import api from '../../services/api';
import { FoodType } from '../../types/Food';

interface FoodProps {
  food: FoodType;
  foods: FoodType[];
  handleDelete: (id: number) => Promise<void>;
  setFoods: React.Dispatch<React.SetStateAction<FoodType[]>>;
  handleEditFood: (food: FoodType) => void;
}

const Food = ({ food, foods, handleEditFood, handleDelete, setFoods }: FoodProps) => {

  const toggleAvailable = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !food.available,
    });
    const foodsClone = [...foods]
    const updatedFood = foodsClone.find(f => f.id === food.id);
    if (!updatedFood) return;
    updatedFood.available = !food.available;
    setFoods(foodsClone);
  }

  const setEditingFood = () => {
    handleEditFood(food);
  }

  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}

export default Food;
