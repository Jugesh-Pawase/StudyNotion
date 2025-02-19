import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection, deleteSubSection } from '../../../../../services/Operation/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);

  const handleDeleteSection = async(sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async(subSectionId, sectionId) => {
    const result = await deleteSubSection({subSectionId, sectionId, token})
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  };

  return (
    <div>
      <div className="rounded-lg bg-richblack-700 p-6 px-8">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex flex-row justify-between gap-x-3 border-b-2 text-white">
              <div className="flex flex-row items-center gap-x-3">
                <RxDropdownMenu />
                <p>{section.sectionName}</p>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(section._id, section.sectionName)
                  }
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this section",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin5Line />
                </button>
                <span>|</span>
                <IoMdArrowDropdown className="text-xl text-richblack-300" />
              </div>
            </summary>

            <div>
              {
                section.subSection.map((data) => (
                  <div
                    key={data?._id}
                    onClick={() => setViewSubSection(data)}
                    className='flex items-center justify-between gap-x-3 border-b-2'
                  >
                    <div className="flex flex-row items-center gap-x-3">
                      <RxDropdownMenu />
                      <p>{data.title}</p>
                    </div>

                    <div
                      onClick={(e)=>e.stopPropagation()}
                      className='flex items-center gap-x-3 '
                    >
                      <button
                        onClick={() => setEditSubSection({ ...data, sectionId: section._id })}
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Delete this Sub section",
                            text2: "Selected lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </div>
                ))
              }
              <button
                onClick={() => setAddSubSection(section._id)}
                className='mt-4 flex items-center gap-x-2 text-yellow-50'
              >
                <AiOutlinePlus />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {
        addSubSection ? (<SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />)
          : viewSubSection ? (<SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />)
            : editSubSection ? (<SubSectionModal
              modalData={editSubSection}
              setModalData={setEditSubSection}
              edit={true}
            />)
              : (<div></div>)
      }

      {
        confirmationModal ?
          (<ConfirmationModal modalData={confirmationModal}/>)
          :(<div></div>)
      }
    </div>
  );
}

export default NestedView