import React, {Component} from "react";
import { Link , useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';


function withParams(Component) {
    return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
  }

class Addstudent extends Component 
{
    state = {
        name: '',
        course: '',
        email: '',
        phone: '',
        error_list: [],
    }
    
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    saveStudent = async (e) => {
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/add-student', this.state)

        if(res.data.status === 200)
        {
            console.log(res.data.message)

            swal({
                title: "Success!",
                text: res.data.message,
                icon: "success",
                button: "Done",
            });

            
            this.props.navigate('/');
            this.setState({
                name: '',
                course: '',
                email: '',
                phone: '',
            });
        }
        else
        {
            this.setState({
                error_list: res.data.validate_err,
            });
        }
    }

    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Add Students
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.saveStudent}>
                                    <div className="form-group mb-3">
                                        <label>Student Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Course</label>
                                        <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.course}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Student
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default withParams(Addstudent);