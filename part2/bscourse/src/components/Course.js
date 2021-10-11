import React from "react"

export default (props) => {
    const {course} = props
    return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    )
}