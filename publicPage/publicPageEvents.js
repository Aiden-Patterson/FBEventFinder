

const page_id = "520210097853519"
const app_token = "1192243805842371|G4RZ0kSLdd66NvytyH3JJlB_kQ8"
const access_token = "EAAQ8VuSIa8MBO1Fl8LbIpClEwTZBqUelvDpO7JVMl8ZCiTi62FtqIZAdUuaA4ZCSsCBslIK5jeN7sfYS1nwyNr7AZAukHvO3xPo7BACOHjbbUM365ZAzzQ4wMwff4yZARqPf9nIA4k2xjpni81HlJLgSZBWJXFfPwkXvU96GZAMuXnF6XRxz6QarLi6KQOBfdOUOpM4ZBJwPZC2rL9ob1YWjgZDZD"

fetch('https://graph.facebook.com/v19.0/'+page_id+'/events?fields=name,start_time,place&access_token='+access_token)
  .then(response => response.json())
  .then(data => {
    const events = data.data
    console.log(events)
    events.forEach(writeEvent)
  })
  .catch(error => console.error('Error fetching event:', error));


  function writeEvent(event){
    const name = event.name;
    const place = event.place?.name ?? 'place not available';
    const starttime = new Date(event.start_time);
    const location = event.place?.location ?? null;


    const table = document.createElement('table');

    const row1 = document.createElement('tr');
    const nameHead = document.createElement('th');
    nameHead.textContent = 'Name';
    const nameVal = document.createElement('td');
    nameVal.textContent = name;

    row1.appendChild(nameHead);
    row1.appendChild(nameVal);
    table.appendChild(row1);

    const row2 = document.createElement('tr');
    const timeHead = document.createElement('th');
    timeHead.textContent = 'Start Time';
    const timeVal = document.createElement('td');
    timeVal.textContent = starttime.toLocaleString();

    row2.appendChild(timeHead);
    row2.appendChild(timeVal);
    table.appendChild(row2);

    const row3 = document.createElement('tr');
    const placeHead = document.createElement('th');
    placeHead.textContent = 'place';
    const placeVal = document.createElement('td');
    placeVal.textContent = place;

    row3.appendChild(placeHead);
    row3.appendChild(placeVal);
    table.appendChild(row3);

    const row4 = document.createElement('tr');
    const addressHead = document.createElement('th');
    addressHead.textContent = 'address';
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

    document.body.appendChild(table);
    // document.getElementById('FBAddress').textContent = address;
  }