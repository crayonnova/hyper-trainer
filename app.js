import { brotliDecompressSync } from "zlib";

// 'use strict'
const shuffle = array => array.sort(() => Math.random() - 0.5)
let questions = '';
const selector = document.getElementById('chapter-selector')
const status = document.getElementById('status')
const requestForm = document.getElementById('form')
const topic = document.getElementById('topic')
const multipleChoice = document.getElementById('multiple_choice')
const order = ['a','b','c','d']
let isStart = false


window.showAnswer = () => {
  const answer = document.querySelectorAll(".answer")
  answer.forEach( e => {
    e.style.cssText = 'color : white ; background-color : red'
  })
  isStart = false
}

// submit form 
requestForm.onsubmit = (e) => {
  e.preventDefault()
  const chapter = selector.value
  const data = questions[chapter]
  
  if(!isStart){
    render(data)
    isStart = true
  }else{
    alert('finish the current')
  }
  
}

// 3 render data
const render = (data) => {
  let output = ''
  topic.innerHTML = `<h1> ${data.topic} </h1>`
  shuffle(data.multiple_choice)
  data.multiple_choice.forEach((element,index) => {

    
     output +=`<li>
                  <p>${element.question}</p> <span class="status"></span>`


    // add list including answer
    element.choice.forEach( (t,i) => {
      // console.log(t);
      if(element.answer == i){
        output += `
        <div><input type="radio" value="0" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}${i}"> <label  class="px-3 answer" for="${index}${i}">${order[i]}. ${t}</label></div>`
      }else{
        output += `
        <div><input type="radio" value="0" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}${i}"> <label  class="px-3" for="${index}${i}">${order[i]}. ${t}</label></div>`
      }
    })

    // output +=
    //   `
    //   <div><input type="radio" value="0" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}0"> <label class="px-3" for="${index}0">a. ${element.choice[0]}</label></div>
    //   <div><input type="radio" value="1" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}1"> <label class="px-3" for="${index}1">b. ${element.choice[1]} </label></div>
    //   <div><input type="radio" value="2" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}2"> <label class="px-3" for="${index}2">c. ${element.choice[2]} </label></div>
    //   <div><input type="radio" value="3" onchange="handleChange(this,${element.answer})" name="${index}" id="${index}3"> <label class="px-3" for="${index}3">d. ${element.choice[3]} </label></div>
    //   `
      output += "</li>"
  })
  output += `<button id="btnShow" onclick="showAnswer()">show answer</button>`
  multipleChoice.innerHTML = output
  // console.log(data.multiple_choice);
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
  // console.log(xhr.onprogress);
  xhr.open('GET','https://jsonstorage.net/api/items/0b50b099-a82e-4944-a8af-5fbbcc02a147',true)
  // xhr.open('GET','data.json',true)
  // console.log(xhr.readyState);
  // onload
  xhr.onload = () => {
    if(xhr.status === 200){
     callback(JSON.parse(xhr.responseText))
    }
  }
  // on error 
  xhr.onerror = () => {
    alert('try again later!')
  }

  xhr.send(null)
}
getQuestions(showChapter)


