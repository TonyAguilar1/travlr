export interface Trip {
    _id: string, //internal primary key in MongoDB
    code: string,
    name: string,
    resort: string,
    length: string,
    start: Date,
    perPerson: String,
    description: string,
    image: string
}