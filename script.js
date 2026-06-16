let foodItem = JSON.parse(localStorage.getItem("foodItem")) || [];


const userForm = document.getElementById("userForm");
const foodName = document.getElementById("food-name");
const calorie = document.getElementById("calorie-input");
const listItem = document.getElementById("listItem");
const totalCalories = document.getElementById("totalCalories");
const resetBtn = document.getElementById("reset-btn");




function updateCalorie() {
    const total = foodItem.reduce((sum, item) => sum + item.calories, 0)
    totalCalories.textContent = `Total Calories = ${total}`;
}

function renderList() {
    listItem.innerHTML = "";
    foodItem.forEach((item, index) => {
       let li = document.createElement("li");
       li.className = "flex justify-center items-center py-2 text-gray-700"; 
       //creating text containing food name and calorie number
       let textSpan = document.createElement("span");
       textSpan.textContent = `${item.name} (${item.calories}) Kcal`;
       //creating remove button
       let removeBtn = document.createElement("button");
       removeBtn.textContent = "Delete";
       removeBtn.className = "text-red-500 hover:text-red-700 font-bold text-sm";
       
       removeBtn.addEventListener("click", ()=> {
        foodItem.splice(index, 1);
        localStorage.setItem("foodItem", JSON.stringify(foodItem));
        renderList();
        updateCalorie();
       });
       li.appendChild(textSpan);
       li.appendChild(removeBtn);

       //add the finished created row on to the webpage listItem
       listItem.appendChild(li)

    });
    updateCalorie();
    
   
}
//Form Handler
userForm.addEventListener("submit", async(event)=> {
    event.preventDefault()

    let name = foodName.value
    
    const calorieValue = parseInt(calorie.value);

    if(name && calorieValue) {
        foodItem.push({name: name, calories: calorieValue});
        localStorage.setItem("foodItem", JSON.stringify(foodItem));
        renderList()
        userForm.reset();
        updateCalorie();
    }
});
resetBtn.addEventListener("click", ()=> {
    if(confirm("Are you sure you want to reset all?")) {
        foodItem = [];
        localStorage.removeItem("foodItem");
        renderList();
        updateCalorie();
    }
})
