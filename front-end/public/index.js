const results = document.querySelector('.results');
results.innerHTML = "";
const sMonth = document.querySelector('#month');
const sType = document.querySelector('#event_type');

// let cardCreator = (name, type, date) => {
//     let newCard = document.createElement('div');
//     newCard.className = "newCard";
//     let eventName = document.createElement('h2');
//     eventName.className = "cardEvent";
//     eventName.textContent = name;
//     let eventTypeDate = document.createElement('h3');
//     eventTypeDate.className = "cardTypeDate";
//     eventTypeDate.textContent = `${type} / October ${date}, 2022`;
//     newCard.append(eventName, eventTypeDate);
//     return newCard;
//     // results.append(newCard);
// };


let searchAll = () =>{
    
if(sMonth.value === "October" && sType.value === "All"){
fetch('http://localhost:8002/events/october')
.then((response)=> response.json())
.then((data)=>{
    return data;
})
.then((data)=>{
    for (var i = 0; i < data.length; i++){
        let data1 = data[i].event_name;
        let data2 = data[i].event_type;
        let data3 = data[i].month_day;
        let newCard = document.createElement('div');
        newCard.className = "newCard";
        let eventName = document.createElement('h2');
        eventName.className = "cardEvent";
        eventName.textContent = data1;
        let eventTypeDate = document.createElement('h3');
        eventTypeDate.className = "cardTypeDate";
        eventTypeDate.textContent = `${data2} / October ${data3}, 2022`;
        newCard.append(eventName, eventTypeDate);
        results.append(newCard);
    }
});
} else {
    querySearch();
}
};

let querySearch = () => {
    results.innerHTML = "";
    let typeVal = sType.value;
    let monthVal = sMonth.value;
    fetch(`http://localhost:8002/events/${monthVal}/${typeVal}`)
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .then((data) => {
        for (var i = 0; i < data.length; i++){
            let data1 = data[i].event_name;
            let data2 = data[i].event_type;
            let data3 = data[i].month_day;
            let newCard = document.createElement('div');
            newCard.className = "newCard";
            let eventName = document.createElement('h2');
            eventName.className = "cardEvent";
            eventName.textContent = data1;
            let eventTypeDate = document.createElement('h3');
            eventTypeDate.className = "cardTypeDate";
            eventTypeDate.textContent = `${data2} / October ${data3}, 2022`;
            newCard.append(eventName, eventTypeDate);
            results.append(newCard);
        }
        
    })
};

let logDate = () => {
    let day = document.querySelector('#event_date');
    let dayVal = day.value.substring(8, 10);
    console.log(dayVal);
}