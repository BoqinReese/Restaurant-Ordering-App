import {menuArray} from "./data";
const foodCard = document.getElementById('food-card')
const completeOrderCart = document.getElementById('complete-order-cart')

//Render menu items from data
let menuItemHtml = ``
menuArray.map((item)=>{
  const {name, ingredients, id, price, emoji} = item
  menuItemHtml += `
    <div class="menu-item" id="menu-item">
        <div class = "food-img">
            <p>${emoji}</p>
        </div>
        <div>
            <h2>${name}</h2>
            <p>${ingredients}</p>
            <h3>$${price}</h3>
        </div>
        <button class='add-food-item' data-add-food='${id}'>
            +
        </button>
    </div>
  `
  })
foodCard.innerHTML = menuItemHtml

const orderFood = []

document.addEventListener('click', (e)=>{
  if(e.target.dataset.addFood){
    const foodId = Number(e.target.dataset.addFood);
    const selectedFood = menuArray.find(menu => menu.id === foodId);
    if (selectedFood){
      const existingFood = orderFood.find(item => item.id === foodId)
      if (existingFood){
        existingFood.quantity += 1
        existingFood.totalPrice = existingFood.price * existingFood.quantity
        } else {
          orderFood.push({
          ...selectedFood, 
          quantity: 1,
          totalPrice: selectedFood.price
          })
        }
      }
      renderOrder()
    }
  })

//Function to render the order summary
function renderOrder(){
  const addedFoodContainer = document.getElementById("added-food-item")
  const totalContainer = document.querySelector(".total h3:last-child")
  //Clear the container first
  addedFoodContainer.innerHTML = ""
  //Render each food in order
  orderFood.forEach(item => {
    addedFoodContainer.innerHTML += `
      <div class="food">
        <h3>${item.name} (x${item.quantity}) </h3>
        <p>${item.ingredients.join(", ")}</p>
      </div>
      <h3>$${item.totalPrice}</h3>
    `
  })
  //Calculate total price
  const total = orderFood.reduce((sum, current) => sum + current.totalPrice, 0)
  totalContainer.textContent = `$${total}`
}