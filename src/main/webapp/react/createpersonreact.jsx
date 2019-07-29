
class CreatePerson extends React.Component {

    constructor(props) {

      super(props);
      this.state = {name: '', email:'', age: '' };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

     const state = this.state
     state[event.target.name] = event.target.value
     this.setState(state);

    }
    handleSubmit(event) {

     event.preventDefault();

     fetch('jax-rs/person-jersey/person/', {
     method: 'POST',
     body: JSON.stringify({
         name: this.state.name,
         email: this.state.email,
         age: this.state.age
     }),
     headers: {
         "Content-type": "application/json; charset=UTF-8"
     }

    }).then(response => {

      //alert("Status: " + response.status);

      // If the New Person was create the server will responde with 201
      if( response.status == 200 || response.status == 201 ) {
      
        alert("The Person was created successfully");
        
        // Note: The user is redirected to the admin list of Persons
        window.location.href = "/clientrestreactlist";
       }
       else
           alert("One or more values may be wrong and the Person was not created!");
     });
    }


    render() {
      return (
         <div id="container">
                       
          <a href="/clientrestreactlist" target="_top">View the list of Persons</a>
             <br/> <br/>  
              
          <form onSubmit={this.handleSubmit}>
           <p>
             <label>Name:</label>&nbsp;&nbsp;
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Length 2 to 30 letters" />
           </p>

           <p>
             <label>Email:</label>&nbsp;&nbsp;
             <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="xxx@yyy.com" />
           </p>

           <p>
              <label>Age:</label>&nbsp;&nbsp;&nbsp;&nbsp;
             <input type="text" name="age" value={this.state.age} onChange={this.handleChange} placeholder="Number from 18 to 125" />
           </p>

           <p>
             <input type="submit" value="Submit" />
           </p>
      
           </form>
     
        </div>
      )
    }
  }

  

ReactDOM.render(
    <CreatePerson />,
    document.getElementById('rootapi')
);
  