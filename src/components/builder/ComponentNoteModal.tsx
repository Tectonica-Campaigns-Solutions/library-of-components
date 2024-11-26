import React, { useState } from 'react';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Card,
  CardBody,
  Spinner
} from 'reactstrap';
import { X } from 'lucide-react';
import { DroppedComponent, ComponentNote } from '../../types';

interface ComponentNoteModalProps {
  isOpen: boolean;
  toggle: () => void;
  component: DroppedComponent;
  onAddNote: (componentId: string, note: string) => void;
  onDeleteNote: (componentId: string, noteId: string) => void;
  isSaving: boolean;
}

const ComponentNoteModal: React.FC<ComponentNoteModalProps> = ({
  isOpen,
  toggle,
  component,
  onAddNote,
  onDeleteNote,
  isSaving
}) => {
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(component.uniqueId, newNote);
      setNewNote('');
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      toggle={toggle}
      className='component-note-modal'
    >
      <ModalHeader toggle={toggle}>
        Notes for {component.text}
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <div className="d-flex gap-2 mb-3">
            <Input
              type="textarea"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a note about this component..."
              rows={2}
              className='mb-0'
            />
            <Button
              color="primary"
              className='mb-0'
              onClick={handleAddNote}
              disabled={!newNote.trim() || isSaving}
            >
              {isSaving ? <Spinner size="sm" /> : 'Add'}
            </Button>
          </div>
          
          <div className="component-notes">
            {component.notes?.length ? (
              component.notes.map((note) => (
                <Card key={note.id} className="mb-2">
                  <CardBody className="p-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <p className="mb-1">{note.text}</p>
                        <small className="text-muted">
                          {new Date(note.timestamp).toLocaleString()}
                        </small>
                      </div>
                      <Button
                        color="link"
                        className="p-0 text-danger"
                        onClick={() => onDeleteNote(component.uniqueId, note.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
                          <path d="M8.82667 6.0001L8.596 12.0001M5.404 12.0001L5.17333 6.0001M11.8187 3.8601C12.0467 3.89477 12.2733 3.93144 12.5 3.97077M11.8187 3.8601L11.1067 13.1154C11.0776 13.4923 10.9074 13.8442 10.63 14.1009C10.3527 14.3577 9.9886 14.5002 9.61067 14.5001H4.38933C4.0114 14.5002 3.64735 14.3577 3.36999 14.1009C3.09262 13.8442 2.92239 13.4923 2.89333 13.1154L2.18133 3.8601M11.8187 3.8601C11.0492 3.74378 10.2758 3.6555 9.5 3.59544M2.18133 3.8601C1.95333 3.8941 1.72667 3.93077 1.5 3.9701M2.18133 3.8601C2.95076 3.74378 3.72416 3.6555 4.5 3.59544M9.5 3.59544V2.98477C9.5 2.1981 8.89333 1.5421 8.10667 1.51744C7.36908 1.49386 6.63092 1.49386 5.89333 1.51744C5.10667 1.5421 4.5 2.19877 4.5 2.98477V3.59544M9.5 3.59544C7.83581 3.46682 6.16419 3.46682 4.5 3.59544" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <div className="text-center text-muted py-3">
                No notes yet for this component
              </div>
            )}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ComponentNoteModal;