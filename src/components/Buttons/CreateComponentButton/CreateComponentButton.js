import EditableHeader from "../../EditableHeader/EditableHeader";

export default function CreateComponentButton(props) {
  const { onCreate, placeholder } = props;
  async function handleSaveToCreateDocument(name) {
    await onCreate(name);
  }

  return (
    <EditableHeader
      title=""
      placeholder={placeholder}
      onSave={handleSaveToCreateDocument}
    />
  );
}