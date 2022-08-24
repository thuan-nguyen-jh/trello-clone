import { useEffect, useState } from "react";
import useAutoHeight from "../../hooks/useAutoHeight";

import './EditableContent.css';

export default function EditableContent(props) {
  const { content, placeholder, onSave } = props;
  const [value, setValue] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useAutoHeight(value);

  useEffect(() => {
    setValue(content);
  }, [content]);

  function handleChange(e) {
    setIsEditing(true);
    setValue(e.target.value);
  }

  async function handleSubmit() {
    const isSaveSuccess = await onSave(value);
    if (!isSaveSuccess) {
      setValue(content);
    }
    setIsEditing(false);
  }

  return (
    <div className="editable-content">
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        ref={textareaRef}
      />
      {isEditing &&
        (<button
          className="save-button"
          onClick={handleSubmit}
        >
          Save
        </button>)
      }
    </div>
  );
}