import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInstructorCourses } from '../../../services/Operation/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import CourseTable from './InstructorCourses/CourseTable';
import { Navigate, useNavigate } from 'react-router-dom';
import { VscAdd } from "react-icons/vsc"
import Spinner from "../../common/Spinner"

function MyCourses() {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCourses = async () => {
        setLoading(true);
        const result = await fetchInstructorCourses(token);
        setLoading(false);
        if (result) {
            setCourses(result);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [])
    return (
        <div>
            <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-14 gap-y-5' >
                <h1 className='text-3xl font-medium text-richblack-5 lg:text-left text-center uppercase tracking-wider' >
                    My Courses
                </h1>
                <div className='hidden md:block'>
                    <IconBtn
                        type="btn"
                        text="Add Course"
                        customClasses="hidden md:block uppercase tracking-wider"
                        onClickHandler={() => navigate("/dashboard/add-course")}
                    >
                        <VscAdd />
                    </IconBtn>
                </div>
            </div>

            <div >
                {
                    loading ?
                        (
                            <div>
                                <Spinner />
                            </div>
                        )
                        :
                        !courses || courses.length === 0 ?
                            (
                                <div>
                                    <div className='h-[1px] mb-10  mx-auto bg-richblack-500' ></div>
                                    <p className='text-center text-2xl font-medium text-richblack-100 select-none' >No Courses Found</p>
                                </div>
                            )
                            :
                            <CourseTable courses={courses} setCourses={setCourses} />
                }
            </div>
        </div>
    )
}

export default MyCourses