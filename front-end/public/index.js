const results = document.querySelector('.results');
results.innerHTML = "";
const resultsH2 = document.querySelector('.results-h2');
const h2Text = resultsH2.innerHTML;
resultsH2.innerHTML = "";
const sMonth = document.querySelector('#month');
const sType = document.querySelector('#event_type');
const aMonth = document.querySelector('#add_month');
const aType = document.querySelector('#add_event_type');
const day = document.querySelector('#event_date');
const eName = document.querySelector('#e_name');
const clickCard = document.querySelectorAll('.newCard');
let deleteIcon;

//RENDER and LOCALHOST URLs
    const url = "https://event-finder-api.onrender.com";
    // const url = "http://localhost:8002";

//FUNCTION TO CREATE RESULT CARDS
let cardCreator = (name, type, date, data) => {
        let newCard = document.createElement('div');
        newCard.className = "newCard";
        newCard.id = data.event_id;
        let eventName = document.createElement('h2');
        eventName.className = "cardEvent";
        eventName.textContent = name;
        let eventTypeDate = document.createElement('h3');
        eventTypeDate.className = "cardTypeDate";
        eventTypeDate.textContent = `${type} / October ${date}, 2022`;
        deleteIcon = document.createElement('button');
        deleteIcon.className = "fa fa-trash";
        deleteIcon.id = data.event_id;
        let updateIcon = document.createElement('button');
        updateIcon.className = "fas fa-edit";
        newCard.append(eventName, eventTypeDate, deleteIcon, updateIcon);
        return newCard;
};

//FUNCTION TO QUERY SEARCH EVENT TYPES in OCTOBER
let querySearch = () => {
        results.innerHTML = "";
        let typeVal = sType.value;
        let monthVal = sMonth.value;
        // if(sMonth.value === "october" && sType.value === "All"){
        fetch(`${url}/events/${monthVal}/${typeVal}`)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .then((data) => {
            for (var i = 0; i < data.length; i++){
                let data1 = data[i].event_name;
                let data2 = data[i].event_type;
                let data3 = data[i].month_day;
                let dataInd = data[i];
                let createCard = cardCreator(data1, data2, data3, dataInd);
                results.append(createCard);
            //DELETE ICON EVENT LISTENER
                deleteIcon.addEventListener('click', (e) => {
                    console.log(e.target.id)
                    let eId = e.target.id;
                    let isConfirmed = confirm('Are you sure you want to delete this event?');
                    if(isConfirmed){
                        fetch(`${url}/events/october/${eId}`,{
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((data) => {
                            alert('You have successfully deleted an event');
                            console.log('Successfully delete', data)
                        })
                    }
                });
            }
        })
};

//FUNCTION TO SEARCH ALL of OCTOBER
let searchAll = () => {
        results.innerHTML = "";
        resultsH2.innerHTML = h2Text;
        if(sMonth.value === "october" && sType.value === "All"){
        fetch(`${url}/events/october`)
        .then((response)=> response.json())
        .then((data)=>{
            return data;
        })
        .then((data)=>{
            for (var i = 0; i < data.length; i++){
                    let data1 = data[i].event_name;
                    let data2 = data[i].event_type;
                    let data3 = data[i].month_day;
                    let dataInd = data[i];
                    let createCard = cardCreator(data1, data2, data3, dataInd);
                    results.append(createCard);
            }
        });
        } else {
            querySearch();
        }
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
            fetch(`${url}/events/october`, {
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












