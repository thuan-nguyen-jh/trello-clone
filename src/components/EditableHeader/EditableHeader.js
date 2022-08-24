import { useEffect, useState } from 'react';
import useAutoHeight from '../../hooks/useAutoHeight';
import './EditableHeader.css';

export default function EditableHeader(props) {
  const [title, setTitle] = useState("");
  const textareaRef = useAutoHeight(title);

  useEffect(() => {
    setTitle(props.title);
  } , [props.title]);

  function handleChange(event) {
    setTitle(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      textareaRef.current.blur();
    }
  }

  async function handleBlur(event) {
    const isSaveSuccess = await props.onSave(title);
    if (!isSaveSuccess) {
      setTitle(props.title);
    }
  }

  return (
    <textarea
      className="editable-header"
      rows="1"
      value={title}
      placeholder={props.placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      ref={textareaRef}
    />
  );
}