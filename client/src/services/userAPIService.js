import axios from 'axios';

const BASE_URL = "http://localhost:3001";

async function userStudentSignup(userData) {
  const response = await axios.post(`${BASE_URL}/users/students`, userData);
  return response.user;
}

async function userInstructorSignup(userData) {
  const response = await axios.post(`${BASE_URL}/users/instructors`, userData);
  return response.user;
}


async function userLogin(userData) {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  console.log(response.data);
  sessionStorage.setItem('Token',response.data.token);


  console.log(`sessionStorage has: ${sessionStorage.getItem('Token')}`  )
  return response.data;
}

export {
  userStudentSignup,
  userInstructorSignup,
  userLogin
}
