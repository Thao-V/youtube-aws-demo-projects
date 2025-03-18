import { Container, H2, Text } from "typetailui";
import { IStudent } from "./IStudent";
import Student from "./Student";

interface StudentListProps{
  students: IStudent[];
  reload: () => void;
}

const StudentList = ({students, reload}: StudentListProps) => {
  return (
    <Container>
      <H2 className="text-2xl font-bold mb-4 text-center">Student List</H2>
      {students.length === 0
        ? <Text className="text-center text-gray-500">No students found.</Text>
        : <Container>
            {students.map((student: IStudent) =>
              <Student key={student.id} student={student} reload={reload}/>
            )}
          </Container>}
    </Container>
  );
};

export default StudentList;
