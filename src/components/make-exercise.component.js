import React ,{Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
export default class MakeExercise extends Component{

//Add exercises into the database
constructor(props){
    //Must always call super when defining constructor of subclass
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit=this.onSubmit.bind(this);


    //State is how we create variables in react
    this.state={
        username: "",
        description: "",
        duration:0,
        date: new Date(),
        users:[] //For drop down menu
    }
}

//React Lifecycle Method

componentDidMount(){
    axios.get("http://localhost:5000/users/")
    .then(res=> {
        if(res.data.length>0){
            this.setState({
                users: res.data.map(user=>user.username),
                username: res.data[0].username

            })
        }
    })

}

//Add a method
//To ensure that the this is defined for the setState we need to bind all of them
onChangeUsername(e){
    this.setState({
        username:e.target.value
    });
}

onChangeDescription(e){
    this.setState({
        description:e.target.value
    });
}

onChangeDuration(e){
    this.setState({
        duration:e.target.value
    });
}

onChangeDate(date){
    this.setState({
        date:date
    });
}

onSubmit(e){
    //Prevent what it normally does
    e.preventDefault();
    const exercise = {
        username:this.state.username,
        description:this.state.description,
        duration: this.state.duration,
        date: this.state.date
    }
    console.log(exercise);
    axios.post('http://localhost:5000/exercises/add',exercise)
    .then(res=>console.log(res.data));
    //Go to list of exercises
    window.location ='/';
}
    render(){
        return(
            <div>
                <h1>Create New Exercise Log</h1>
                <form onSubmit ={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {
                                this.state.users.map(function(user){
                                    return <option
                                        key={user}
                                        value={user}>
                                        {user}
                                        </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Desciption:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange= {this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Date:</label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}