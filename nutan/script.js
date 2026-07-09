const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

const update = () => {

const target = +counter.getAttribute("data-target");

const count = +counter.innerText;

const increment = target / 100;

if(count < target){

counter.innerText = Math.ceil(count + increment);

setTimeout(update,20);

}

else{

counter.innerText = target;

}

}

update();

});

window.addEventListener("scroll",()=>{

document.querySelectorAll(".reveal").forEach(el=>{

const top=el.getBoundingClientRect().top;

const windowHeight=window.innerHeight;

if(top<windowHeight-100){

el.classList.add("active");

}

});

});

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

});

});

});