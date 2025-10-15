import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

axios.defaults.baseURL = "http://localhost:5000/edufusion/api/v2/"
axios.defaults.headers.common['Content-Type'] = 'application/json'


export const useCourse = () => {
        const [course, setCourse] = useState()

        const createCourse = () => {
            // create course
        }


        const getCourses = async () => {
            const response =  axios.get(`courses/get-courses`)
             response.then((res) =>res.data).then((res)=>setCourse(res.data))
        }


        return {
            getCourses,
            course
        }
}

