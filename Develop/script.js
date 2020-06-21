const headerDate = $("#currentDay");
const container = $(".container");
let currentHour;
let currentMinute;
let hourArr = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
//schedule data is an object with 2 elements, a date and an array of time:event pairs
let dateKey;
let todaysSchedule = {
    date : "",
    00 : "",
    01 : "",
    02 : "",
    03 : "",
    04 : "",
    05 : "",
    06 : "",
    07 : "",
    08 : "",
    09 : "",
    10 : "",
    11 : "",
    12 : "",
    13 : "",
    14 : "",
    15 : "",
    16 : "",
    17 : "",
    18 : "",
    19 : "",
    20 : "",
    21 : "",
    22 : "",
    23 : "",
    24 : ""
};
//start the MomentJS time request before document is fully loaded
function getDateTimeInfo(){
    let date = moment().format('dddd, MMM Do');
    headerDate.text(date);
    currentHour = moment().format('H');
    currentMinute = parseInt(moment().format('mm'));
    dateKey = moment().format('YYYYMMDD');
}

function getDayEvents(date){
    let dateCheck = localStorage.getItem(dateKey);
    if (dateCheck) {
        todaysSchedule = JSON.parse(dateCheck);
    }
}

function getHourEvent(hour){
    return(todaysSchedule[hour]);

}

$(document).ready(function() {
    //function to populate the page with time blocks for 5AM to 12AM. This will be called only on page load, and will populate any saved calander info. 
    function loadSchedule(){
        //can update this in the future to have the start index be a variable for user to dictate the start of the work day
        for (let i = 7; i < 18; i++) {
            let nextRow = $("<div>");
            let nextColumn;
            nextRow.addClass("row");

            for (let k = 0; k < 3; k++){

                //check if div or input column
                switch (k){               
                    case 0:
                        nextColumn = $("<div>");
                        nextColumn.addClass("col-1 hour");
                        nextColumn.text(hourArr[i]);
                        break;
                    //this is the description column which will take input and have dynamic style depending on current hour
                    case 1:
                        nextColumn = $("<textarea>");
                        nextColumn.text(getHourEvent(i));
                        if (i < currentHour){
                            nextColumn.addClass("col-10 description past");
                        }
                        else if (i == currentHour){
                            nextColumn.addClass("col-10 description present");
                        }
                        else{
                            nextColumn.addClass("col-10 description future");
                        }
                        break;
                    case 2:
                        nextColumn = $("<div>");
                        nextColumn.addClass("col-1 saveBtn text-center");
                        nextColumn.attr("name", hourArr[i]);
                        nextColumn.html("<i class='far fa-save mt-4'>");
                        break;
                }
                nextRow.append(nextColumn);
            }
            container.append(nextRow);        
        }
    }

    function saveLocal() {
        localStorage.setItem(dateKey, JSON.stringify(todaysSchedule));
    }

    //function to convert 12-hour time to 24 hour numeric values
    function convertTo24(time){
        switch (time){
            case "12AM":
                return 00;
                break;
            case "1AM":
                return 01;
                break;
            case "2AM":
                return 02;
                break;
            case "3AM":
                return 03;
                break;
            case "4AM":
                return 04;
                break;
            case "5AM":
                return 05;
                break;
            case "6AM":
                return 06;
                break;
            case "7AM":
                return 07;
                break;
            case "8AM":
                return 08;
                break;
            case "9AM":
                return 09;
                break;
            case "10AM":
                return 10;
                break;
            case "11AM":
                return 11;
                break;
            case "12PM":
                return 12;
                break;
            case "1PM":
                return 13;
                break;
            case "2PM":
                return 14;
                break;
            case "3PM":
                return 15;
                break;
            case "4PM":
                return 16;
                break;
            case "5PM":
                return 17;
                break;
            case "6PM":
                return 18;
                break;
            case "7PM":
                return 19;
                break;
            case "8PM":
                return 20;
                break;
            case "9PM":
                return 21;
                break;
            case "10PM":
                return 22;
                break;
            case "11PM":
                return 23;
                break;
        }
    }

    getDayEvents(dateKey);
    loadSchedule();
    
    //save new schedule text to the session data, then push to local storage
    $(".saveBtn").on("click", function(event){
        let eventUpdate = event.currentTarget.previousElementSibling.value;
        let timeBlock = convertTo24(event.currentTarget.attributes.name.value);
        todaysSchedule[timeBlock] = eventUpdate;
        saveLocal();
    })
    },
);

function clearAllData() {
    localStorage.clear();
}


getDateTimeInfo();
