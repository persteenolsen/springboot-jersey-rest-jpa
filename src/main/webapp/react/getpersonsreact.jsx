
class GetPersons extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            persons: []

        };

    }

    componentDidMount() {

        // Getting the data from the DB by the Jersey Web API
         fetch('jax-rs/person-jersey/persons')
        .then(response => response.json())
        .then(data => { this.setState({ persons: data }) })

        //.catch(error => console.log('error fetching', error))

        // Note: Using for testing locally as an alternative to the data at the DB
        // this.setState({ persons: [ { "id": 8, "name": "Ole", "email": "ole@test.dk", "age": "46" }, { "id": 10, "name": "Lars", "email": "lars@test.dk", "age": "33" }] });


    }


    render() {

        return (
            <div>
                <div><b>Name Email Age</b></div>
                {this.state.persons.map(person =>
                    <div key={person.id}> {person.name} {person.email} {person.age}  </div>)}
            </div>
        );
    }


}


ReactDOM.render(
    <GetPersons />,
    document.getElementById('rootapi')
);
