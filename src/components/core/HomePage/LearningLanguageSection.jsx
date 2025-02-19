import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../Asset/Image/Know_your_progress.png";
import Compare_with_others from "../../../Asset/Image/Compare_with_others.svg";
import Plan_your_lessons from "../../../Asset/Image/Plan_your_lessons.svg";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
    return (
        <div className='mt-[130px] mb-32'>
            <div className='flex flex-col items-center gap-5'>
                <div className='text-4xl font-semibold text-center'>
                    Your Swiss Knife for
                    <HighlightText text={"learning any language"} />
                </div>

                <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
                    Using spin making learning multiple languages easy. with 20+
                    languages realistic voice-over, progress tracking, custom schedule
                    and more.
                </div>

                <div className='flex items-center justify-center mt-5'>
                    <img
                        src={Know_your_progress}
                        alt='KnowYourProgress'
                        className='object-contain -mr-32'
                    />
                    <img
                        src={Compare_with_others}
                        alt='Know_your_progress'
                        className='object-contain'
                    />
                    <img
                        src={Plan_your_lessons}
                        alt='Plan_your_lessons'
                        className='object-contain -ml-36'
                    />
                </div>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}> 
                        Learn more
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection