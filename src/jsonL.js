let room = {
    number: 23
}

let meetup = {
    title: 'Conference',
    participants: [{ name: "John" }, { name: "Alice" }],
    place: room
}

room.occupiedBy = meetup
console.log(JSON.stringify(meetup, (key, value) => {
    // alert(`${key}: ${value}`)
    return (key == 'occupiedBy') ? undefined : value
}, 3))

//////toJSON in JSON.stringify
let room2 = {
    number: 23,
    toJSON() {
        return this.number;
    }
};

let meetup2 = {
    title: "Conference",
    room2
};

console.log(JSON.stringify(room2)) // 23
// тобто тут JSON.stringify викликає метод об'єкту toJSON і вертає room2 : 23
console.log(JSON.stringify(meetup2))


////// JSON.parse(str, [,reviver])
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

let meetup3 = JSON.parse(str, (key, value) => {
    return (key == 'date')? new Date(value) : value
})

console.log(meetup3.date.getDate())