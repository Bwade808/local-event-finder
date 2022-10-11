const results = document.querySelector('.results');
results.innerHTML = "";
const sMonth = document.querySelector('#month');
const sType = document.querySelector('#event_type');
const aMonth = document.querySelector('#add_month');
const aType = document.querySelector('#add_event_type');
const day = document.querySelector('#event_date');
const eName = document.querySelector('#e_name');

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

//FETCH POST
let addEvent = () => {
    let aMonthVal = aMonth.value;
    let newEvent = {
        "event_name": eName.value,
        "event_type": aType.value,
        "month_day": Number(day.value.substring(8, 10))
        
    };
    if(aMonthVal === "October"){
        fetch('http://localhost:8002/events/october', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent)
        })
        .then((data) => {
        alert('You have successfully added an event.  Thank you!')
        console.log('Success', data)
        })
    };
};


// let logDate = () => {
//     let day = document.querySelector('#event_date');
//     let dayVal = day.value.substring(8, 10);
//     console.log(dayVal);
// }




