import React, { useState, useCallback } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardBody, 
  CardTitle, 
  CardText, 
  Button as ReactstrapButton,
  Alert
} from "reactstrap";
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { X } from 'lucide-react';
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

// Simple component renderer
const renderPlaceholderComponent = (text: string) => {
  return (
    <Card className="mb-2">
      <CardBody>
        <CardTitle tag="h5">{text}</CardTitle>
        <CardText>
          This is a placeholder for the {text} component.
        </CardText>
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
          <CardText className="text-muted small">{componentType}</CardText>
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
    { id: 2, text: "Text Block", componentType: "TextBlock" },
    { id: 3, text: "Image", componentType: "Image" },
    { id: 4, text: "Button", componentType: "Button" },
    { id: 5, text: "Form", componentType: "Form" }
  ]);

  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [deletedComponents, setDeletedComponents] = useState<DeletedComponent[]>([]);
  const [showUndoAlert, setShowUndoAlert] = useState(false);
  const [lastDeletedComponent, setLastDeletedComponent] = useState<DeletedComponent | null>(null);

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

  return (
    <div className="page-builder">
      <DndProvider backend={HTML5Backend}>
        <Container fluid={true}>
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
