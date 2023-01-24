
let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLS = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLS) {
    myLeads = leadsFromLS
    render(myLeads)
}


tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow : true}, function(tabs){
        
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    inputEl.value = ""
    render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
       listItems += `
          <li> 
             <a target='_blank' href='${leads[i]}' >
                ${leads[i]}
             </a> 
          </li> 
        `

    }
    ulEl.innerHTML = listItems
    inputEl.textContent = ""
}

let btnClick = document.getElementById("input-btn").addEventListener("click", function () {
    myLeads.push(inputEl.value)
    console.log(myLeads);
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

document.getElementById("delete-btn").addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
