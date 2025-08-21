import {menuArray} from "./data";
const foodCard = document.getElementById('food-card')
const completeOrderBtn = document.getElementById('complete-order-btn')
const payBtn = document.getElementById('pay-btn')
const payForm = document.getElementById("form")
const userName = document.getElementById("your-name")
const userCard = document.getElementById("card-no")
const userCvv = document.getElementById("cvv")
const appreciation = document.querySelector(".appreciation")
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
        <div class="food-details">
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
    if (e.target.dataset.removeFood){
      const foodId = Number(e.target.dataset.removeFood);
      removeFromOrder(foodId);
    }
  })

completeOrderBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  payForm.style.display = "flex"})

payBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  if (userName.value && userCard.value && userCvv.value){
    form.style.display = "none"
    appreciation.style.display = 'flex'
    completeOrderCart.style.display = 'none'
    }
  })

//Function to render the order summary
function renderOrder(){
  const addedFoodContainer = document.getElementById("added-food-item")
  const totalContainer = document.querySelector(".total h3:last-child")
  //Clear the container first
  addedFoodContainer.innerHTML = ""

  if (orderFood.length > 0){
    completeOrderCart.style.display = 'flex'
  }else {
    completeOrderCart.style.display = 'none'
  }
  //Render each food in order
  orderFood.forEach(item => {
    addedFoodContainer.innerHTML += `
      <div class="cart-item">
        <div class="food">
          <h3>${item.name} (x${item.quantity}) </h3>
          <button class = "remove-btn" data-remove-food = "${item.id}">❌</button>
        </div>
        <h3>$${item.totalPrice}</h3>
      </div>
    `
  })
  //Calculate total price
  const total = orderFood.reduce((sum, current) => sum + current.totalPrice, 0)
  totalContainer.textContent = `$${total}`
}

//Function to remove food from order
function removeFromOrder(foodId){
  const index = orderFood.findIndex(item => item.id === foodId)
  if (index !== -1){
    if (orderFood[index].quantity > 1){
      orderFood[index].quantity -= 1
      orderFood[index].totalPrice = orderFood[index].price * orderFood[index].quantity
    }else{
      orderFood.splice(index, 1)
    }
  }
  renderOrder()
}