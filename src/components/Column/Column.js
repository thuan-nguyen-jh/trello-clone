import { useEffect, useState } from 'react';
import EditableHeader from '../EditableHeader/EditableHeader';
import { editColumnName, getDoc } from '../../utils/firebase';

import './Column.css';

export default function Column(props) {
  const { columnRef } = props;
  const [title, setTitle] = useState("");

  useEffect(() => {
    getDoc(columnRef).then(snapshot => {
      const columnData = snapshot.data();
      setTitle(columnData.name);
    });
  }, [columnRef]);

  async function handleSaveTitle(newTitle) {
    if (newTitle === "") {
      return false;
    }

    await editColumnName(columnRef, newTitle);
    setTitle(newTitle);
    return true;
  }

  return (
    <div className='column'>
      <div className='column-header'>
        <EditableHeader
          title={title}
          onSave={handleSaveTitle}
        />
      </div>
      <div className='column-content'>
      </div>
    </div>
  );
}