
//page id points to the page that I created
const page_id = "520210097853519"
//access token is specific token needed for the api
const access_token = "EAAQ8VuSIa8MBO1Fl8LbIpClEwTZBqUelvDpO7JVMl8ZCiTi62FtqIZAdUuaA4ZCSsCBslIK5jeN7sfYS1nwyNr7AZAukHvO3xPo7BACOHjbbUM365ZAzzQ4wMwff4yZARqPf9nIA4k2xjpni81HlJLgSZBWJXFfPwkXvU96GZAMuXnF6XRxz6QarLi6KQOBfdOUOpM4ZBJwPZC2rL9ob1YWjgZDZD"

//fetch event info from given page. Only return name, start time, and place information
fetch('https://graph.facebook.com/v19.0/'+page_id+'/events?fields=name,start_time,place&access_token='+access_token)
  .then(response => response.json())
  .then(data => {
    const events = data.data
    console.log(events)
    events.forEach(writeEvent)
  })
  .catch(error => console.error('Error fetching event:', error));

//create a table for the event that is passed in
  function writeEvent(event){
    const name = event.name;
    //place information not guaranteed guaranteed
    const place = event.place?.name ?? 'place not available';
    const starttime = new Date(event.start_time);
    //address and location information not guaranteed
    const location = event.place?.location ?? null;


    const table = document.createElement('table');

    //Create name row and add to table
    const row1 = document.createElement('tr');
    const nameHead = document.createElement('th');
    nameHead.textContent = 'Name';
    const nameVal = document.createElement('td');
    nameVal.textContent = name;
    row1.appendChild(nameHead);
    row1.appendChild(nameVal);
    table.appendChild(row1);

    //Create Start Time row and add to table
    const row2 = document.createElement('tr');
    const timeHead = document.createElement('th');
    timeHead.textContent = 'Start Time';
    const timeVal = document.createElement('td');
    timeVal.textContent = starttime.toLocaleString();
    row2.appendChild(timeHead);
    row2.appendChild(timeVal);
    table.appendChild(row2);

    //Create Place row and add to table
    const row3 = document.createElement('tr');
    const placeHead = document.createElement('th');
    placeHead.textContent = 'Place';
    const placeVal = document.createElement('td');
    placeVal.textContent = place;
    row3.appendChild(placeHead);
    row3.appendChild(placeVal);
    table.appendChild(row3);

    //Create Address row and add to table
    const row4 = document.createElement('tr');
    const addressHead = document.createElement('th');
    addressHead.textContent = 'Address';
    const addressVal = document.createElement('td');
    if(location){
      addressVal.textContent = location.street + " " + location.city +", " + location.state + " " + location.zip;
    }
    else{
        addressVal.textContent = "Address not available";
    }
    row4.appendChild(addressHead);
    row4.appendChild(addressVal);
    table.appendChild(row4);

    //Add table to document
    document.body.appendChild(table);
  }

