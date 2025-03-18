import { Container, Text } from "typetailui";
import "./App.css";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import { useEffect, useState } from "react";
import { IStudent } from "./components/IStudent";
import { BACKEND_ENDPOINT } from "./components/common";

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchStudents = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) return <Text className="text-center text-gray-500">Loading...</Text>;
  if (error)
    return (
      <Text className="text-center text-red-500">
        {error}
      </Text>
    );

  return (
    <Container className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <AddStudent reload={fetchStudents}/>
      <StudentList students={students} reload={fetchStudents}/>
    </Container>
  );
}

export default App;
