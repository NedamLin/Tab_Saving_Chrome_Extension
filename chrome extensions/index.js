// Using addEventListner is better practice than using onclick
let myLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const tabBtn= document.getElementById("tab-btn")
// Everything inside of localstorage has to be a string
// turning myLeads back into an array with JSON.parse so we can add the new inputs into an array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
// We are not ReAssigning leadsFromLocalStorage the value of myStorage is being changes instead

const deleteBtn = document.getElementById("delete-btn")

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}



tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//We get access to the chrome variable then get the tabs information by asking a query.
//The active:true represents the active tab we are trying to extract information from
myLeads.push(tabs[0].url)
localStorage.setItem("myLeads", JSON.stringify(myLeads))
render(myLeads)

     })
})
inputBtn.addEventListener("click", function(){
// inputEl.value takes the value from the input-el Id
// Then is pushed inside the myLeads matrix

 myLeads.push(inputEl.value)
  // This is used to clear the input field
   inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) 
     render(myLeads)

})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    // once doubleButton is clicked myLeads array is set to zero then the render leads
    // goes through the arrray and prints out the empty array
    
    render(myLeads)
})

function render(leads){
let listItems = ""
for (let i = 0; i < leads.length ; i++){

// listItems +=  "<li><a target='_blank' href='" +  myLeads[i] +  "'>" + myLeads[i] + "</a></li>"

// target='_blank' inside of the <a></a> opens a new tab when clicking on the link

listItems +=  `<li> 
                   <a target='_blank' href='${leads[i]}'>
                    ${leads[i]} 
                     </a>
               </li>`


// The variables inside the matrix is then added inside another variable called listItems
// The listItems are then displated into the html side by ulEl.innerHTML = listItems
}
ulEl.innerHTML = listItems
}

// 