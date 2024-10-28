import React, { useState, useCallback, useEffect } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle, 
  CardText, 
  CardImg,
  Button as ReactstrapButton,
  Alert,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Spinner
} from "reactstrap";
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { X, Save, Upload, Download, Cloud, CloudOff } from 'lucide-react';
import { db } from '../../../firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  doc, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';

import heroImage from '../../images/hero-library-of-components.png';
import narrativeImage from '../../images/narrative-library-of-components.png';
import buttonImage from '../../images/btn-library-of-components.png';
import imageImage from '../../images/image-library-of-components.png';
import formImage from '../../images/form-library-of-components.png';
import './page-builder.scss';

// Define item types for drag and drop
const ItemTypes = {
  CARD: "card",
  DROPPED_COMPONENT: "dropped_component"
};

// Interfaces
interface DraggableCardProps {
  id: number;
  text: string;
  componentType: string;
}

interface DroppedComponent {
  uniqueId: string;
  id: number;
  text: string;
  componentType: string;
}

interface DroppableAreaProps {
  onDrop: (id: number) => void;
  children: React.ReactNode;
}

interface DroppedComponentProps {
  id: string;
  index: number;
  children: React.ReactNode;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: string) => void;
}

interface DeletedComponent extends DroppedComponent {
  timestamp: number;
}

interface SavedLayout {
  id: string;
  name: string;
  components: DroppedComponent[];
  lastModified: number;
}

interface FirebaseLayout extends SavedLayout {
  firestoreId?: string;
  synced: boolean;
}

// Simple component renderer
const renderPlaceholderComponent = (text: string) => {
  const img = () => {
    switch (text) {
      case "Header":
        return heroImage;
      case "Narrative":
        return narrativeImage;
      case "Image":
        return imageImage
      case "Button":
        return buttonImage
      case "Form":
        return formImage
      default:
    }
  }
  return (
    <Card className="mb-2">
      <CardBody>
        <CardTitle tag="h5">{text}</CardTitle>
        <CardImg top width="100%" src={img()} alt="Card image cap" />
      </CardBody>
    </Card>
  );
};

// Draggable component for sidebar
const DraggableCard: React.FC<DraggableCardProps> = ({ id, text, componentType }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, type: ItemTypes.CARD },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Card className="mb-2">
        <CardBody>
          <CardTitle tag="h6" className="mb-2">{text}</CardTitle>
          <CardText className="text-muted small">
            {componentType}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

// Draggable dropped component
const DroppedComponentWrapper: React.FC<DroppedComponentProps> = ({ 
  id, 
  index, 
  children, 
  moveComponent,
  onDelete 
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DROPPED_COMPONENT,
    item: () => ({ type: ItemTypes.DROPPED_COMPONENT, id, index }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.DROPPED_COMPONENT,
    hover(item: { type: string; id: string; index: number }, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#f8f9fa',
        border: '1px dashed #dee2e6',
        position: 'relative',
        borderRadius: '4px',
        transition: 'all 0.2s ease'
      }}
      className="hover:shadow-sm"
    >
      <button
        onClick={() => onDelete(id)}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'all 0.2s ease'
        }}
        title="Delete component"
        className="hover:bg-gray-100"
      >
        <X size={16} color="#666666" />
      </button>
      {children}
    </div>
  );
};

// Droppable area
const DroppableArea: React.FC<DroppableAreaProps> = ({ children, onDrop }) => {
  const [, drop] = useDrop({
    accept: [ItemTypes.CARD, ItemTypes.DROPPED_COMPONENT],
    drop: (item: { id: number; type: string }) => {
      if (item.type === ItemTypes.CARD) {
        onDrop(item.id);
      }
    },
  });

  return (
    <div
      ref={drop}
      className="droppable-area"
      style={{
        minHeight: '200px',
        padding: '1rem',
        backgroundColor: '#ffffff',
        border: '2px dashed #ced4da',
        borderRadius: '4px'
      }}
    >
      {children}
    </div>
  );
};

// Main PageBuilder component
function PageBuilder() {
  // Simplified components list
  const [components] = useState<{ id: number; text: string; componentType: string }[]>([
    { id: 1, text: "Header", componentType: "Header" },
    { id: 2, text: "Narrative", componentType: "Narrative Block" },
    { id: 3, text: "Image", componentType: "Image" },
    { id: 4, text: "Button", componentType: "Button" },
    { id: 5, text: "Form", componentType: "Form" }
  ]);

  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [deletedComponents, setDeletedComponents] = useState<DeletedComponent[]>([]);
  const [showUndoAlert, setShowUndoAlert] = useState(false);
  const [lastDeletedComponent, setLastDeletedComponent] = useState<DeletedComponent | null>(null);
  const [layouts, setLayouts] = useState<SavedLayout[]>([]);
  const [currentLayoutId, setCurrentLayoutId] = useState<string | null>(null);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [newLayoutName, setNewLayoutName] = useState('');
  const [saveMessage, setSaveMessage] = useState<{type: string; text: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  // Load saved layouts from localStorage on mount
  useEffect(() => {
    loadLayouts();
  }, []);

  const loadLayouts = async () => {
    setIsLoading(true);
    try {
      // Load from localStorage
      const localLayouts = JSON.parse(localStorage.getItem('pageBuilderLayouts') || '[]');
      
      // Load from Firestore
      const layoutsCollection = collection(db, 'layouts');
      const layoutsQuery = query(layoutsCollection, orderBy('lastModified', 'desc'));
      const querySnapshot = await getDocs(layoutsQuery);
      
      const firestoreLayouts = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        firestoreId: doc.id,
        synced: true
      })) as FirebaseLayout[];

      // Merge layouts, preferring Firestore versions
      const mergedLayouts = mergeLayouts(localLayouts, firestoreLayouts);
      setLayouts(mergedLayouts);
      
      // Update localStorage with merged layouts
      localStorage.setItem('pageBuilderLayouts', JSON.stringify(mergedLayouts));
    } catch (error) {
      console.error('Error loading layouts:', error);
      setSyncError('Failed to load layouts from cloud');
    } finally {
      setIsLoading(false);
    }
  };

  const mergeLayouts = (local: FirebaseLayout[], remote: FirebaseLayout[]): FirebaseLayout[] => {
    const merged = [...local];
    remote.forEach(remoteLayout => {
      const localIndex = merged.findIndex(l => l.id === remoteLayout.id);
      if (localIndex >= 0) {
        // Update existing layout if remote is newer
        if (remoteLayout.lastModified > merged[localIndex].lastModified) {
          merged[localIndex] = remoteLayout;
        }
      } else {
        // Add new remote layout
        merged.push(remoteLayout);
      }
    });
    return merged;
  };

  // Save layout to both localStorage and Firestore
  const saveLayout = async (name: string) => {
    setIsSyncing(true);
    setSyncError(null);
    
    try {
      const newLayout: FirebaseLayout = {
        id: currentLayoutId || `layout-${Date.now()}`,
        name,
        components: droppedComponents,
        lastModified: Date.now(),
        synced: false
      };

      // Save to Firestore
      const layoutsCollection = collection(db, 'layouts');
      const docRef = await addDoc(layoutsCollection, {
        ...newLayout,
        lastModified: Timestamp.fromDate(new Date())
      });

      newLayout.firestoreId = docRef.id;
      newLayout.synced = true;

      // Update layouts state
      setLayouts(prevLayouts => {
        const layoutIndex = prevLayouts.findIndex(l => l.id === newLayout.id);
        if (layoutIndex >= 0) {
          const updatedLayouts = [...prevLayouts];
          updatedLayouts[layoutIndex] = newLayout;
          return updatedLayouts;
        } else {
          return [...prevLayouts, newLayout];
        }
      });

      setCurrentLayoutId(newLayout.id);
      setSaveMessage({ type: 'success', text: 'Layout saved to cloud!' });
      
      // Update localStorage
      localStorage.setItem('pageBuilderLayouts', JSON.stringify(layouts));
    } catch (error) {
      console.error('Error saving layout:', error);
      setSaveMessage({ type: 'danger', text: 'Failed to save to cloud. Layout saved locally.' });
      setSyncError('Failed to sync with cloud');
    } finally {
      setIsSyncing(false);
      setIsSaveModalOpen(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  // Load layout with Firestore sync
  const loadLayout = async (layoutId: string) => {
    const layout = layouts.find(l => l.id === layoutId);
    if (layout) {
      setDroppedComponents(layout.components);
      setCurrentLayoutId(layout.id);
      setIsLoadModalOpen(false);

      // If layout hasn't been synced to Firestore, sync it
      if (!layout.synced && layout.firestoreId) {
        try {
          setIsSyncing(true);
          const layoutRef = doc(db, 'layouts', layout.firestoreId);
          await updateDoc(layoutRef, {
            components: layout.components,
            lastModified: Timestamp.fromDate(new Date())
          });
          
          // Update sync status
          setLayouts(prevLayouts => 
            prevLayouts.map(l => 
              l.id === layoutId ? { ...l, synced: true } : l
            )
          );
        } catch (error) {
          console.error('Error syncing layout:', error);
          setSyncError('Failed to sync with cloud');
        } finally {
          setIsSyncing(false);
        }
      }
    }
  };

  // Save layouts to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem('pageBuilderLayouts', JSON.stringify(layouts));
  // }, [layouts]);

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random()}`;
  };

  const handleDrop = (id: number) => {
    const component = components.find((comp) => comp.id === id);
    if (component) {
      const newDroppedComponent = {
        ...component,
        uniqueId: generateUniqueId(),
      };
      setDroppedComponents([...droppedComponents, newDroppedComponent]);
    }
  };

  const moveComponent = useCallback((dragIndex: number, hoverIndex: number) => {
    setDroppedComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      const [removed] = newComponents.splice(dragIndex, 1);
      newComponents.splice(hoverIndex, 0, removed);
      return newComponents;
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    const componentToDelete = droppedComponents.find(comp => comp.uniqueId === id);
    if (componentToDelete) {
      const deletedComponent = {
        ...componentToDelete,
        timestamp: Date.now()
      };
      
      setDroppedComponents(prev => prev.filter(comp => comp.uniqueId !== id));
      setDeletedComponents(prev => [...prev, deletedComponent]);
      setLastDeletedComponent(deletedComponent);
      setShowUndoAlert(true);

      // Hide undo alert after 5 seconds
      setTimeout(() => {
        setShowUndoAlert(false);
        setLastDeletedComponent(null);
      }, 5000);
    }
  }, [droppedComponents]);

  const handleUndo = useCallback(() => {
    if (lastDeletedComponent) {
      const { timestamp, ...componentWithoutTimestamp } = lastDeletedComponent;
      setDroppedComponents(prev => [...prev, componentWithoutTimestamp]);
      setDeletedComponents(prev => prev.filter(comp => comp.uniqueId !== lastDeletedComponent.uniqueId));
      setShowUndoAlert(false);
      setLastDeletedComponent(null);
    }
  }, [lastDeletedComponent]);


  // Export layout
  const exportLayout = () => {
    const layout = {
      components: droppedComponents,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(layout, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `layout-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import layout
  const importLayout = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedLayout = JSON.parse(e.target?.result as string);
          setDroppedComponents(importedLayout.components);
          setSaveMessage({ type: 'success', text: 'Layout imported successfully!' });
          setTimeout(() => setSaveMessage(null), 3000);
        } catch (error) {
          setSaveMessage({ type: 'danger', text: 'Error importing layout. Please check the file format.' });
          setTimeout(() => setSaveMessage(null), 3000);
        }
      };
      reader.readAsText(file);
    }
  };  

  return (
    <div className="page-builder">
      <DndProvider backend={HTML5Backend}>
        <Container fluid={true}>
          {/* Save/Load Controls */}
          <Row className="mb-4">
            <Col>
              <ButtonGroup>
              <ReactstrapButton
                  color="primary"
                  onClick={() => setIsSaveModalOpen(true)}
                  className="d-flex align-items-center gap-2"
                  disabled={isSyncing}
                >
                  <Save size={16} />
                  Save Layout
                  {isSyncing && <Spinner size="sm" className="ms-2" />}
                </ReactstrapButton>
                
                <ReactstrapButton
                  color="secondary"
                  onClick={() => setIsLoadModalOpen(true)}
                  className="d-flex align-items-center gap-2"
                  disabled={isLoading}
                >
                  <Upload size={16} />
                  Load Layout
                  {isLoading && <Spinner size="sm" className="ms-2" />}
                </ReactstrapButton>

                <ReactstrapButton
                  color="info"
                  onClick={loadLayouts}
                  className="d-flex align-items-center gap-2"
                  disabled={isSyncing}
                >
                  <Cloud size={16} />
                  Sync
                  {isSyncing && <Spinner size="sm" className="ms-2" />}
                </ReactstrapButton>

                <ReactstrapButton
                  color="primary"
                  onClick={() => setIsSaveModalOpen(true)}
                  className="d-flex align-items-center gap-2"
                >
                  <Save size={16} />
                  Save Layout
                </ReactstrapButton>
                <ReactstrapButton
                  color="secondary"
                  onClick={() => setIsLoadModalOpen(true)}
                  className="d-flex align-items-center gap-2"
                >
                  <Upload size={16} />
                  Load Layout
                </ReactstrapButton>
                <ReactstrapButton
                  color="info"
                  onClick={exportLayout}
                  className="d-flex align-items-center gap-2"
                >
                  <Download size={16} />
                  Export
                </ReactstrapButton>
                <ReactstrapButton
                  color="info"
                  className="d-flex align-items-center gap-2"
                >
                  <label style={{ cursor: 'pointer', marginBottom: 0 }}>
                    <Upload size={16} />
                    Import
                    <Input
                      type="file"
                      accept=".json"
                      style={{ display: 'none' }}
                      onChange={importLayout}
                      onClick={(e) => { (e.target as HTMLInputElement).value = '' }}
                    />
                  </label>
                </ReactstrapButton>
              </ButtonGroup>
            </Col>
          </Row>

          {/* Save/Load Message */}
          {saveMessage && (
            <Row className="mb-3">
              <Col>
                <Alert color={saveMessage.type}>
                  {saveMessage.text}
                </Alert>
              </Col>
            </Row>
          )}

          {/* Save Modal */}
          <Modal isOpen={isSaveModalOpen} toggle={() => setIsSaveModalOpen(false)}>
            <ModalHeader toggle={() => setIsSaveModalOpen(false)}>Save Layout</ModalHeader>
            <ModalBody>
              <Label for="layoutName">Layout Name</Label>
              <Input
                id="layoutName"
                value={newLayoutName}
                onChange={(e) => setNewLayoutName(e.target.value)}
                placeholder="Enter a name for your layout"
              />
            </ModalBody>
            <ModalFooter>
              <ReactstrapButton color="secondary" onClick={() => setIsSaveModalOpen(false)}>
                Cancel
              </ReactstrapButton>
              <ReactstrapButton
                color="primary"
                onClick={() => saveLayout(newLayoutName)}
                disabled={!newLayoutName.trim()}
              >
                Save
              </ReactstrapButton>
            </ModalFooter>
          </Modal>

          {/* Load Modal */}
          <Modal isOpen={isLoadModalOpen} toggle={() => setIsLoadModalOpen(false)}>
            <ModalHeader toggle={() => setIsLoadModalOpen(false)}>Load Layout</ModalHeader>
            <ModalBody>
              {layouts.length === 0 ? (
                <p>No saved layouts found.</p>
              ) : (
                layouts.map(layout => (
                  <Card key={layout.id} className="mb-2">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>{layout.name}</h6>
                          <small className="text-muted">
                            Last modified: {new Date(layout.lastModified).toLocaleDateString()}
                          </small>
                        </div>
                        <ReactstrapButton
                          color="primary"
                          size="sm"
                          onClick={() => loadLayout(layout.id)}
                        >
                          Load
                        </ReactstrapButton>
                      </div>
                    </CardBody>
                  </Card>
                ))
              )}
            </ModalBody>
            <ModalFooter>
              <ReactstrapButton color="secondary" onClick={() => setIsLoadModalOpen(false)}>
                Close
              </ReactstrapButton>
            </ModalFooter>
          </Modal>

          {showUndoAlert && lastDeletedComponent && (
            <div style={{ 
              position: 'fixed', 
              bottom: '1rem', 
              right: '1rem', 
              zIndex: 1000,
              width: '300px'
            }}>
              <Alert color="info" style={{ marginBottom: 0 }}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Component deleted</span>
                  <ReactstrapButton
                    color="link"
                    size="sm"
                    onClick={handleUndo}
                    style={{ padding: '0 0.5rem' }}
                  >
                    Undo
                  </ReactstrapButton>
                </div>
              </Alert>
            </div>
          )}
          
          <Row>
            <Col md={2}>
              <h4>Components</h4>
              {components.map((comp) => (
                <DraggableCard
                  key={comp.id}
                  id={comp.id}
                  text={comp.text}
                  componentType={comp.componentType}
                />
              ))}
            </Col>
            <Col md={10}>
              <Container>
                <h4>Build Area</h4>
                <DroppableArea onDrop={handleDrop}>
                  {droppedComponents.map((comp, index) => (
                    <DroppedComponentWrapper
                      key={comp.uniqueId}
                      id={comp.uniqueId}
                      index={index}
                      moveComponent={moveComponent}
                      onDelete={handleDelete}
                    >
                      {renderPlaceholderComponent(comp.text)}
                    </DroppedComponentWrapper>
                  ))}
                </DroppableArea>
              </Container>
            </Col>
          </Row>
        </Container>
      </DndProvider>
    </div>
  );
}

export default PageBuilder;
