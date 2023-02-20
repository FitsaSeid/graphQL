const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        Students: [Student]
        Student(id: String): Student
    }

    type Student {
        id: String,
        name: String,
        GPA: Float,
        Department: String
    }
`
const students_list = [{
    id: "123",
    first_name: "Fitsum",
    last_name: "Seid",
    email: "abc@gmail.com",
    phone_number: 0911001122,
    GPA: 3.6,
    Department: "Computer science",
    profile_mage: "student image",
}];


const resolvers = {
    Query: {
        Students: () => {
            return students_list;
        },
        Student: (parent, args, context) => {
            const student_id = args.id;
            const student = students_list.find(item => item.id === student_id);

            return student;
        }

        //Retrieve data filtered by name. if there is multiple record with the same name print all of thus
    }
}

const server = new ApolloServer({
    //schema
    //resolver
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
    console.log("Server started at" + url);
})