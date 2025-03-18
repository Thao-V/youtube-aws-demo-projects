import { Button, Container, Text } from "typetailui";
import { IStudent } from "./IStudent";
import { BACKEND_ENDPOINT } from "./common";
interface StudentProps {
  student: IStudent;
  reload: () => void;
}
export default function Student({ student, reload }: StudentProps) {
  const onDelete = async () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!isConfirmed) return;
    const response = await fetch(`${BACKEND_ENDPOINT}/students/${student.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) throw new Error("Failed to add student");
    reload();
  };
  return (
    <Container
      key={student.id}
      className="border border-gray-300 shadow-sm rounded-lg p-4 flex justify-between items-center gap-4 bg-white"
    >
      <Text className="text-lg font-semibold text-gray-800">
        {student.name}
      </Text>
      <Text className="block text-sm text-gray-500">
        ID: {student.id}
      </Text>
      <Button
        title="Delete"
        onClick={onDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md transition-all"
      />
    </Container>
  );
}
