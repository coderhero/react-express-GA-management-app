import React from 'react';
import { Menu, Dropdown, Icon, message} from 'antd';
import StudentDetails from './StudentDetails';
import InstructorCourses from './instructorCourses';
import InstructorInfo from './instructorInfo';
import InstructorEdit from './instructorEdit';
import axios from 'axios';
import { getInstrucStu } from '../services/studentAPIService';
const BASE_URL = 'http://localhost:3001';

class InstructorPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      current: 'user',
      instructorDetails: props.infoSentThrough,
      screen: '',
      courseInfo: []
    }
    this.getInstrucStudents = this.getInstrucStudents.bind(this);
    this.getCourseInfo = this.getCourseInfo.bind(this);
  }

  async setView(view){
    this.setState({
      screen: view
    });
    if(view=='course'){
      await this.getCourseInfo();
    }
    if(view=='stu'){
      await this.getInstrucStudents();
    }
    console.log('thie view is', this.state.screen);

  }

  handleClick = (e) => {
  this.setState({
    current: e.key,
  });
}


async getCourseInfo(){
  const pull= await axios(`${BASE_URL}/instructors/${this.state.instructorDetails.id}/courses`);
  console.log(pull);
  this.setState({
    courseInfo: pull.data?pull.data.course:false
  });

}


  async getInstrucStudents() {
      try{
        const response= await axios(`${BASE_URL}/instructors/${this.state.instructorDetails.id}/students`);
        // console.log(response);
        this.setState({
          students: response.data?response.data.students:false
        });

      }catch(e){

        console.log(e);
      }

  }


  render() {
    let content;
    console.log(this.state.courseInfo);
    // console.log(this.state.students);
    // console.log(this.state.instructorDetails.id)
    switch (this.state.screen) {
      case 'edit':
      content =(<InstructorEdit instinfo={this.state.instructorDetails} />);
      break;
      case 'stu':
        content = (this.state.students?<StudentDetails
                    students = {this.state.students}
                    instructorInfo={this.state.instructorDetails.id}
                    renderStudent={this.getInstrucStudents}/>
                  :<p>No Students in class</p>);
      break;
      case 'course':

        content = (<InstructorCourses
          courseInfo={this.state.courseInfo}/>);
      break;

      default:
      content =(<InstructorInfo instinfo={this.state.instructorDetails}  />);

    }

  const SubMenu = Menu.SubMenu;

    return (
      <div>

      <nav className='instructorMenu'>
        <Menu
          selectedKeys={[this.state.current]}
          mode="horizontal">
          <Menu.Item key="user">
            <Icon type="user"/>My Profile
          </Menu.Item>

        <SubMenu title={<span className="subMenu">
          <Icon type="form" />My Courses</span>}>

            <Menu.Item
              onClick={() => this.setView('course')}
              key="form:1">Course Info
            </Menu.Item>
            <Menu.Item
              onClick={() => this.setView('stu')}
              key="form:2">Student List
            </Menu.Item>

        </SubMenu>
        </Menu>
        </nav>
        {content}
        </div>
    )
  }
}
export default InstructorPortal;
