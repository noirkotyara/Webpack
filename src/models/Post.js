export default class Post {
    constructor(title, imageSrc){
        this.title = title
        this.date = new Date()
        this.imageSrc = imageSrc
    }
    toString(){
        return JSON.stringify({
            title: this.title,
            date: this.date,
            imageSrc: this.imageSrc
        }, null, 2)
    }
    get uppercaseTitle(){
        return this.title.toUpperCase()
    }
}