let foodItem = JSON.parse(localStorage.getItem("foodItem")) || [];


const userForm = document.getElementById("userForm");
const foodName = document.getElementById("food-name");
const calorie = document.getElementById("calorie-input");
const listItem = document.getElementById("listItem");
const resetBtn = document.getElementById("reset-btn");
const totalCalories = document.getElementById("totalCalories");


const APP_ID = "85e0f743";
const APP_KEY = "e4cec4f49de9a6e67ab385041a2383e6";



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
        renderList();
       });
       li.appendChild(textSpan);
       li.appendChild(removeBtn);

       //add the finished created row on to the webpage listItem
       listItem.appendChild(li)

    });
    updateCalorie();
    
   
}
//Fetch API and Form Handler
userForm.addEventListener("submit", async(event)=> {
    event.preventDefault()

    let name = foodName.value
    if (!name) return;
    
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}$ingr=${encodeURIComponent(name)}`; 

    try{
         
        const response = await fetch(url);
        const data = await response.json();
        if(data.parsed && data.parsed.length > 0) {
        const officialName = data.parsed.food.label;
        const energyValue = Math.round(data.parsed.food.nutrients.ENERC_KCAL);

        foodItem.push({name: officialName, calorie: energyValue });
        localStorage.setItem("foodItem", JSON.stringify(foodItem));
         renderList();
        userForm.reset();
        updateCalorie();
        }
      else {alert("Food profile not found")}  
    }
    catch (error) {
        alert("Oops! Could not find that food or internet is down")
        console.log(error);
    }

    if(name && !isNaN(calories)) {
        foodItem.push({name, calories});
        localStorage.setItem("foodItem", JSON.stringify(foodItem));
        renderList()
        userForm.reset();
        updateCalorie();
    }
});
resetBtn.addEventListener("click", ()=> {
    if(confirm("Are you sure you want to reset all?")) {
        foodItem = [];
        renderList();
    }
})
