import EditableHeader from "../../EditableHeader/EditableHeader";

export default function CreateComponentButton(props) {
  const { onCreate, placeholder } = props;
  async function handleSaveToCreate(name) {
    await onCreate(name);
  }

  return (
    <EditableHeader
      title=""
      placeholder={placeholder}
      onSave={handleSaveToCreate}
    />
  );
}