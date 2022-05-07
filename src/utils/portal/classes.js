import StudentData from '../../data/00264317-half.json';
import CourseOffersData from '../../data/course-offers.json';
import ProgramsData from '../../data/programs.json';

// Calcular as possibilidades de matrícula
const findCoursePossibilities = () => {
    const currentSemester = '2021/2';
    const student = StudentData;
    const courseOffers = CourseOffersData;
    const programs = ProgramsData;

    const thisSemesterOffers = courseOffers[currentSemester];
    const studentCurriculum = student.curriculum;
    const cicCurriculum = programs[0];

    const temp = [];
    let done = false;
    let coursePart = 1; // etapa
    const coursePartsLength = Object.keys(cicCurriculum.curriculum).length;
    let programPartKey = coursePart.toString();

    const canDoCourses = [];

    while (!done) {
        const programPartCourses = cicCurriculum.curriculum[programPartKey];
        const courses = Object.keys(programPartCourses);

        if (courses) {
            courses.forEach((courseCode) => {
                if (programPartCourses[courseCode].requires) {
                    let unlocks = true;
                    programPartCourses[courseCode].requires.forEach((requiredCourseCode) => {
                        if (studentCurriculum.filter((c) => c.code === requiredCourseCode).length === 0) {
                            unlocks = false;
                        }
                    });

                    if (unlocks) {
                        canDoCourses.push(courseCode);
                    }
                } else {
                    canDoCourses.push(courseCode);
                }
            });
        }

        if (coursePart < coursePartsLength) {
            coursePart += 1;
            if (coursePart < coursePartsLength) programPartKey = Object.keys(cicCurriculum.curriculum)[coursePart].toString();
        } else {
            done = true;
        }
    }

    const hasNotDone = canDoCourses.filter((courseCode) => studentCurriculum.filter((course) => course.code === courseCode).length === 0);

    return hasNotDone;
};

export default findCoursePossibilities;
