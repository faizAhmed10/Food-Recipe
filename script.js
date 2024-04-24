const search_btn = document.getElementById('search-btn')
const meal_list = document.getElementById('meal')
const meal_det = document.querySelector('.det')
const close_btn = document.querySelector('.recipe-btn')
const search_resh2 = document.querySelector('.your')

let category = ['Chicken', 'Beef', 'Egg', 'Tomato', 'Potato', 'Onion', 'Fish']
let html = ""
let num = Math.floor(Math.random()*6)+1
console.log(category[num])

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category[num]}`)
.then(res=>res.json())
.then(data => {
    if(data.meals){
        data.meals.forEach(meal => {
            html += `
            <div class = "meal-item" data-id = "${meal.idMeal}">
                    <div class = "meal-img">
                        <img src = "${meal.strMealThumb}" alt = "food">
                    </div>
                    <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                       <a href = "#" class = "card-btn">Get Recipe</a>
                    </div>
                </div>`
        })};
    meal_list.innerHTML = html
})

search_btn.addEventListener('click',getMealList)
meal_list.addEventListener('click', getMealRecipe)

close_btn.addEventListener('click', ()=>{
    meal_det.parentElement.classList.remove('showRecipe')
})

function getMealList(){
    let search_inp = document.getElementById('search-input').value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search_inp}`)
    .then(response=> response.json())
    .then(data => {
        search_resh2.innerHTML = "Your search results"
        html = ""
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                           <a href = "#" class = "card-btn">Get Recipe</a>
                        </div>
                    </div>`
            });
            meal_list.classList.remove('notFound');
        }else{
            html = "Sorry, we didn't find any meal!";
            meal_list.classList.add('notFound');
        }
        meal_list.innerHTML = html
    })
}

function getMealRecipe(e){
    e.preventDefault()
    if(e.target.classList.contains('card-btn')){
        let mealItem = e.target.parentElement.parentElement
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal){
    meal = meal[0]
    let h2 =  document.querySelector('.recipe-title')
    h2.innerHTML = `<h2 class = "recipe-title">${meal.strMeal}</h2>`
    let modal = `
    
    <p class = "recipe-category text-center gen-margin">${meal.strCategory}</p>
    <div class = "recipe-instruct">
        <h3  class="text-center gen-margin">Instructions:</h3>
        <p class="text-center gen-margin back-white color">${meal.strInstructions}</p>
    </div>
    <div class = "recipe-meal-img">
        <img src = "${meal.strMealThumb}" alt = "">
    </div>
    <div class = "recipe-link">
    <button id="watch-btn"class="card-btn"><a href = "${meal.strYoutube}" target = "_blank">Watch Video</a></button>
    </div>
    `;
    meal_det.innerHTML = modal;
    meal_det.parentElement.classList.add('showRecipe');
}