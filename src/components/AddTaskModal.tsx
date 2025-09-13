import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Button,
  MultiSelect,
  type MultiSelectProps,
  Avatar,
  Group,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
// import { useTaskFormStore } from "../store/TaskFormStore";
import { useTaskFormStore } from "../store/TaskFromStore1";

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string, dueDate: string | null,assignees: string[]) => void;
}
const usersData: Record<string, { image: string; email: string }> = {
  "Emily Johnson": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    email: "emily92@gmail.com",
  },
  "Ava Rodriguez": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    email: "ava_rose@gmail.com",
  },
  "Olivia Chen": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    email: "livvy_globe@gmail.com",
  },
  "Ethan Barnes": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    email: "ethan_explorer@gmail.com",
  },
  "Mason Taylor": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    email: "mason_musician@gmail.com",
  },
};



export default function AddTaskModal({
  opened,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const {
    title,
    description,
    dueDate,
     assignees,
     setTasks, // ใช้ชื่อตาม interface (แม้จะเป็น setTitle จริงๆ)
    setdescription, // ใช้ชื่อตาม interface
    setdueDate,
     setAssignees,
    resetForm,
  } = useTaskFormStore();
  const handleAdd = () => {
    if (!title.trim() || !description.trim() || !dueDate ||  assignees.length === 0) return;
    onAdd(title, description, dueDate,assignees);
    onClose();
    resetForm();
  };

  const dateValue = dueDate ? new Date(dueDate) : null;
  const users = Object.keys(usersData);
  
    const availableUsers = Object.keys(usersData).filter(
    (user) => !assignees.includes(user)
  );
  return (
    <Modal opened={opened} onClose={onClose} title="Add Task">
      <Stack>
        <TextInput
          label="Title"
          withAsterisk
          value={title}
          onChange={(e) => setTasks(e.currentTarget.value)}
          error={!title.trim() && "Title is required"}
        />
        <Textarea
          label="Description"
          withAsterisk
          value={description}
          onChange={(e) => setdescription(e.currentTarget.value)}
          error={!description.trim() && "Description is required"}
        />
        <DateInput
          label="Due Date"
          withAsterisk
          valueFormat="ddd MMM DD YYYY"
          minDate={new Date()}
          value={dateValue}
          onChange={(date) => setdueDate(date ? date : null)}
          error={!dueDate?.trim() ? "Due Date is required" : false}
        />
        {/* เพิ่ม MultiSelect ตรงนี้*/}
    <MultiSelect
          label="Assignees"
          placeholder="Search for Assignees"
          data={availableUsers}
          value={assignees}
          onChange={setAssignees}

          renderOption={({ option }) => (
            <Group  gap="xs">
              <Avatar src={usersData[option.value]?.image} size="sm" />
              <div>
                <Text>{option.label}</Text>
                <Text size="xs" color="dimmed">
                  {usersData[option.value]?.email}
                </Text>
              </div>
            </Group>
          )}
          searchable
            error={assignees.length === 0 && "Assignees is required"}
          limit={20}
          maxDropdownHeight={300}
        />
        <Button onClick={handleAdd}>Save</Button>
      </Stack>
    </Modal>
  );
}
