import EditableHeader from "../../EditableHeader/EditableHeader";

export default function CreateComponentButton(props) {
  const { wrapperClassName, onCreate, placeholder } = props;
  async function handleSaveToCreate(name) {
    await onCreate(name);
  }

  return (
    <div className={wrapperClassName}>
      <EditableHeader
        title=""
        placeholder={placeholder}
        onSave={handleSaveToCreate}
      />
    </div>
  );
}