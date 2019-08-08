import React ,{Component} from 'react';
import axios from 'axios';
export default class CreateUser extends Component{
    constructor(props){
        //Must always call super when defining constructor of subclass
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    
    
        //State is how we create variables in react
        this.state={
            username: '',
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

onSubmit(e){
   
    //Prevent what it normally does
    e.preventDefault();
    const user = {
        username:this.state.username,
    }
    console.log(user);
    //Allow our front-end to send HTTP request to the backend
    //Post request that is sent to and endpoint 
    axios.post('http://localhost:5000/users/add',user)
    .then(res=>console.log(res.data));
    //Go to list of exercises
    this.setState({
        username: ' '
    })
}


    render(){
        return(
            <div>
                <h1>Create New User</h1> 
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div>
                        <input type="submit" value="Create User" className="btn btn-primary" /> 
                    </div>
                </form>
            </div>
        )
    }
}