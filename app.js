// 'use strict'

const shuffle = array => array.sort(() => Math.random() - 0.5)
let questions = '';
const selector = document.getElementById('chapter-selector')
const status = document.getElementById('status')
const requestForm = document.getElementById('form')
const topic = document.getElementById('topic')
const multipleChoice = document.getElementById('multiple_choice')
let state = true


// submit form 
requestForm.onsubmit = (e) => {
  e.preventDefault()
  const chapter = selector.value
  const data = questions[chapter]
  if(state){
    render(data)
    state = false
  }else{
    alert('finish the current')
  }
  
}

// render data
const render = (data) => {
  // set topic
  // topic.innerHTML = data.topic
  topic.innerHTML = `<h1> ${data.topic} </h1>`
  data.multiple_choice.forEach((element,index) => {
    console.log(element);
     multipleChoice.innerHTML +=
    ` 
    <li>
      <p>${element.question}</p> <span class="status"></span>  
      <div><input type="radio" value="0" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}0"> <label class="px-3" for="${index}0">a. ${element.choice[0]}</label></div>
      <div><input type="radio" value="1" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}1"> <label class="px-3" for="${index}1">b. ${element.choice[1]} </label></div>
      <div><input type="radio" value="2" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}2"> <label class="px-3" for="${index}2">c. ${element.choice[2]} </label></div>
      <div><input type="radio" value="3" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}3"> <label class="px-3" for="${index}3">d. ${element.choice[3]} </label></div>
    </li>
    `
  })
  
  console.log(data.multiple_choice);
}

  const handleChange = (element,answer) => {
     if(element.value == answer){
       const sibling = element.nextSibling.nextSibling
       sibling.classList.add('answer')
     }
  }

// 2 show chapter
function showChapter(data) {
  questions = Object.values(data)
  
  questions.forEach((element,index) => {
    let option = document.createElement("option")
    option.value = index
    option.text = element.topic
    selector.add(option)
  });
}

// 1 get question 
const getQuestions = (callback) => 
{
  const xhr = new XMLHttpRequest()
  // xhr.open('GET','https://api.myjson.com/bins/blts0',true)
  xhr.open('GET','data.json',true)

  xhr.onload = () => {
    if(xhr.status === 200){
     callback(JSON.parse(xhr.responseText))
    }
  }
  xhr.send(null)
}
getQuestions(showChapter)


