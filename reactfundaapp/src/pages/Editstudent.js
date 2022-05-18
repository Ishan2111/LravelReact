import React, {Component} from "react";
import { Link , useParams , useNavigate} from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';


function withParams(Component) {
  return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}

class Editstudent extends Component 
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

    async componentDidMount() {
        
        const { id } = this.props.params;
        // console.log(id)
        const res = await axios.get(`http://127.0.0.1:8000/api/edit-student/${id}`)
        if(res.data.status === 200) 
        {
            this.setState({
                name: res.data.student.name,
                course: res.data.student.course,
                email: res.data.student.email,
                phone: res.data.student.phone,
            });
        }
        else if(res.data.status === 404)
        {
            // alert('error')
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                button: "Done",
              });

              this.props.navigate('/');
        }
    }
    

    updateStudent = async (e) => {
        e.preventDefault();

        // document.getElementById('updatebtn').disabled = true;
        // document.getElementById('updatebtn').innerText ="Updating";
        const { id } = this.props.params;
        const res = await axios.put(`http://127.0.0.1:8000/api/update-student/${id}`, this.state)

        if(res.data.status === 200)
        {
            console.log(res.data.message);
            swal({
                title: "Updated!",
                text: res.data.message,
                icon: "success",
                button: "Done",
              });

              this.props.navigate('/');

            // document.getElementById('updatebtn').disabled = false;
            // document.getElementById('updatebtn').innerText ="Update Student";
        }
        else if(res.data.status === 404)
        {
            // alert('error')
            swal({
                title: "Warning!",
                text: res.data.message,
                icon: "warning",
                button: "Done",
              });

              this.props.navigate('/');
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
                                    Edit Students
                                    <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.updateStudent}>
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
                                        <button type="submit" id=
                                        "updatebtn" className="btn btn-primary">Update Student
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


export default withParams(Editstudent);