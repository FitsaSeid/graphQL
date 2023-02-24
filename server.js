const { ApolloServer, gql } = require('apollo-server');




const student_data = [{
    id: "123",
    f_name: "Fitsum",
    department: "Computer Science",
    GPA: 3.6
},
{
    id: "123",
    f_name: "Fitsum",
    department: "Computer Science",
    GPA: 3.6,
    position_id: "2"

},
{
    id: "1",
    f_name: "Abrish",
    department: "SE",
    GPA: 3.6,
    position_id: "3"

},
{
    id: "12",
    f_name: "Kidus",
    department: "Computer Science",
    GPA: 3.6,
    position_id: "1"

},
{
    id: "1234",
    f_name: "Konjit",
    department: "Computer Science",
    GPA: 3.6,
    position_id: "2"
},
]


const position_list = [{
    position_id: "1",
    position_name: "Front-End Dev"
},
{
    position_id: "2",
    position_name: "Back-End Dev"
},
{
    position_id: "3",
    position_name: "FullStack Dev"
}]

const typeDefs = gql`
    type Query {
        students: [student]
        student(id: String): student
        stud(f_name: String): [student]
        positions: [position]
        position(id: String): position
    }

    type student {
        id: String,
        f_name: String,
        GPA: Float,
        department: String
        position_id: String
        position: [position]
    }

    type position {
        position_id: String,
        position_name: String
        student: [student]!
    }
`

const resolvers = {
    Query: {

        students: () => {
            return student_data
        },

        student: (parent, args, context) => {
            const stud_id = args.id;
            const student = student_data.find(item => item.id === stud_id);

            return student;
        },
        stud: (parent, args, context) => {
            const stud_fname = args.f_name;
            let student = new Array;
            student_data.find(item => {
                if (item.f_name === stud_fname) {
                    student.push(item);
                }
            });
            console.log(student)

            return student;
        },
        positions: () => {
            return position_list
        },

        position: (parent, args, context) => {
            const { id } = args;
            const position = position_list.find(item => item.position_id === id);

            return position;
        }
    },

    position: {
        student: (parent, args, context) => {
            console.log(parent)
            const position_id = parent.position_id;
            return student_data.filter((student) => student.position_id == position_id);
        }
    },

    student: {
        position: (parent, args, context) => {
            const position_id = parent.position_id;
            return position_list.filter((position) => position.position_id === position_id);
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