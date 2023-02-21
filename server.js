const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`
    type Query {
        students: [student]
        student(id: String): student
    }

    type student {
        id: String,
        f_name: String,
        GPA: Float,
        department: String
    }
`

const student_data = [{
    id: "123",
    f_name: "Fitsum",
    department: "Computer Science",
    GPA: 3.6
},
{
    id: "1",
    f_name: "Abrish",
    department: "SE",
    GPA: 3.6
},
{
    id: "12",
    f_name: "Kidus",
    department: "Computer Science",
    GPA: 3.6
},
{
    id: "1234",
    f_name: "Konjit",
    department: "Computer Science",
    GPA: 3.6
},


]
const resolvers = {
    Query: {

        students: () => {
            return student_data
        },

        student: (parent, args, context) => {
            const stud_id = args.id;
            const student = student_data.find(item => item.id === stud_id);

            return student;
        }
    }

    //Retrieve data filtered by f_name. if there is a multiple records print thus records
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});


server.listen().then(({ url }) => {
    console.log("Server running at " + url
    )
})