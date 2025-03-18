import { useState } from "react";
import { Button, Container, H2, Input, Text } from "typetailui";
import { BACKEND_ENDPOINT } from "./common";
import { IStudent } from "./IStudent";

interface AddStudentProps {
  reload: () => void;
}

const AddStudent = ({reload}: AddStudentProps) => {
  const [student, setStudent] = useState<IStudent>({ id: "", name: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onAdd = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        `${BACKEND_ENDPOINT}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student)
        }
      );

      if (!response.ok) throw new Error("Failed to add student");

      setMessage("Student added successfully!");
      setStudent({ id: "", name: "" }); // Reset form
      reload();
    } catch (error) {
      setMessage("Error: Could not add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
      <H2 className="text-2xl font-bold text-center mb-4">Add New Student</H2>

      {message &&
        <Text className="text-center text-sm text-blue-500">
          {message}
        </Text>}

      <Input
        type="text"
        label="Student ID"
        value={student.id}
        onChangeText={text => setStudent({ ...student, id: text })}
        className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
      />
      <Input
        type="text"
        label="Student ID"
        value={student.name}
        onChangeText={text => setStudent({ ...student, name: text })}
        className="w-full p-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300"
      />

      <Button
        title={loading ? "Adding..." : "Add Student"}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
        onClick={onAdd}
      />
    </Container>
  );
};

export default AddStudent;
