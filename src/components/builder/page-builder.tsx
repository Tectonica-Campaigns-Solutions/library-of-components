import React, { useState, useCallback, useEffect, useRef  } from 'react';
import html2canvas from 'html2canvas';
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
  Spinner,
} from 'reactstrap';
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { X, Save, Upload, Download, Cloud, CloudOff, Camera } from 'lucide-react';
import { db } from '../../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, orderBy, Timestamp } from 'firebase/firestore';

import accordionsImage from '../../images/Accordions.png';
import advancedNarrativeBlockPlusFormImage from '../../images/AdvancedNarrativeBlockForm1x.png';
import advancedNarrativeBlockImagesSlideImage from '../../images/AdvancedNarrativeBlockImagesslide1x.png';
import breadcrumbsImage from '../../images/Breadcrumbs1x.png';
import buttonImage from '../../images/Button1x.png';
import twoCardsRowImage from '../../images/Cards2Row.png';
import twoCardsRowIconImage from '../../images/Cards2Row-1.png';
import threeCardsRowImage from '../../images/Cards3Row.png';
import fourCardsRowImage from '../../images/Cards4Row.png';
import formImage from '../../images/Form1x.png';
import narrativeImageLeftImage from '../../images/Narrative1x.png';
import narrativeImageRightImage from '../../images/Narrative1x-1.png';
import filterRow1xImage from '../../images/Filter1Row1x.png';
import filterRow2xImage from '../../images/Filter2Row1x.png';
import footerImage from '../../images/Footer1x.png';
import headerImage from '../../images/Header1x.png';
import heroPlusBackgroundPlusFormImage from '../../images/HeroBackgroundForm1x.png';
import heroPlusFormImage from '../../images/HeroForm1x.png';
import heroPlusImagePlusButtonsImage from '../../images/HeroImageButtons1x.png';
import notificationImage from '../../images/Notification1x.png';
import secondaryHeaderImage from '../../images/SecondaryHeader1x.png';
import spacerImage from '../../images/spacer.png';
import sidebarPlusCardsImage from '../../images/Sidebar+Cards.png';
import sidebarPlusTextImage from '../../images/Sidebar+Text.png'

import './page-builder.scss';

// Define item types for drag and drop
const ItemTypes = {
  CARD: 'card',
  DROPPED_COMPONENT: 'dropped_component',
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

interface ComponentCategory {
  id: string;
  name: string;
  components: ComponentItem[];
  isOpen: boolean;
}

interface ComponentItem {
  id: number;
  text: string;
  componentType: string;
}

// Simple component renderer
const renderPlaceholderComponent = (text: string) => {
  const img = () => {
    switch (text) {
      case 'Accordion':
        return accordionsImage;
      case 'Advanced Narrative Block + Form':
        return advancedNarrativeBlockPlusFormImage;
      case 'Advanced Narrative Block + Images slider':
        return advancedNarrativeBlockImagesSlideImage;
      case 'Breadcrumbs':
        return breadcrumbsImage;
      case 'Button':
        return buttonImage;
      case '2 Cards Row':
        return twoCardsRowImage;
      case '2 Cards with Icon Row':
        return twoCardsRowIconImage;
      case '3 Cards Row':
        return threeCardsRowImage;
      case '4 Cards Row':
        return fourCardsRowImage;
      case 'Form':
        return formImage;
      case 'Narrative Left Image':
        return narrativeImageLeftImage;
      case 'Narrative Right Image':
        return narrativeImageRightImage;
      case 'Filter Row':
        return filterRow1xImage;
      case 'Combined Filter Row':
        return filterRow2xImage;
      case 'Footer':
        return footerImage;
      case 'Header':
        return headerImage;
      case 'Secondary Header':
        return secondaryHeaderImage;
      case 'Hero + Background + Form':
        return heroPlusBackgroundPlusFormImage;
      case 'Hero + Form':
        return heroPlusFormImage;
      case 'Hero + Image + Buttons':
        return heroPlusImagePlusButtonsImage;
      case 'Notification':
        return notificationImage;
      case 'Sidebar + Cards':
        return sidebarPlusCardsImage;
      case 'Sidebar + Text':
        return sidebarPlusTextImage;
      default:
        return spacerImage;
    }
  };
  return (
    <Card className="mb-2" style={{
      border: 'none',
      padding: 0,
    }}>
      <CardBody style={{ padding: 0 }}>
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
    <div 
      ref={drag} 
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab'
      }}
    >
      <Card className="card">
        <CardBody>
          <CardTitle tag="h6" className="card-title">{text}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

// Main PageBuilder component
function PageBuilder() {
  // Simplified components list
  const [categories, setCategories] = useState<ComponentCategory[]>([

    {
      id: 'basic',
      name: 'Basic Elements',
      isOpen: true,
      components: [
        { id: 0, text: 'Spacer', componentType: 'Spacer' },
        { id: 1, text: 'Accordion', componentType: 'Accordion' },
        { id: 5, text: 'Button', componentType: 'Button' },
      ]
    },
    {
      id: 'header',
      name: 'Header',
      isOpen: false,
      components: [
        { id: 4, text: 'Breadcrumbs', componentType: 'Breadcrumbs' },
        { id: 21, text: 'Notification', componentType: 'Notification' },
        { id: 16, text: 'Header', componentType: 'Header' },
        { id: 17, text: 'Secondary Header', componentType: 'Secondary Header' },
      ]
    },
    {
      id: 'heros',
      name: 'Heros',
      isOpen: false,
      components: [
        { id: 18, text: 'Hero + Background + Form', componentType: 'Hero + Background + Form' },
        { id: 19, text: 'Hero + Form', componentType: 'Hero + Form' },
        { id: 20, text: 'Hero + Image + Buttons', componentType: 'Hero + Image + Buttons' },
      ]
    },
    {
      id: 'layout',
      name: 'Layout',
      isOpen: false,
      components: [
        { id: 11, text: 'Narrative Left Image', componentType: 'Narrative Left Image' },
        { id: 12, text: 'Narrative Right Image', componentType: 'Narrative Right Image' },
        { id: 2, text: 'Advanced Narrative Block + Form', componentType: 'Advanced Narrative Block + Form' },
        {
          id: 3,
          text: 'Advanced Narrative Block + Images slider',
          componentType: 'Advanced Narrative Block + Images slider',
        },
        { id: 6, text: '2 Cards Row', componentType: '2 Cards Row' },
        { id: 7, text: '2 Cards with Icon Row', componentType: '2 Cards with Icon Row' },
        { id: 8, text: '3 Cards Row', componentType: '3 Cards Row' },
        { id: 9, text: '4 Cards Row', componentType: '4 Cards Row' },
        { id: 10, text: 'Form', componentType: 'Form' },
        { id: 13, text: 'Filter Row', componentType: 'Filter Row' },
        { id: 14, text: 'Combined Filter Row', componentType: 'Combined Filter Row' },
        { id: 15, text: 'Footer', componentType: 'Footer' },
      ]
    },
    {
      id: 'sidebar',
      name: 'Sidebar',
      isOpen: false,
      components: [
        { id: 22, text: 'Sidebar + Cards', componentType: 'Sidebar + Cards' },
        { id: 23, text: 'Sidebar + Text', componentType: 'Sidebar + Text' },
      ]
    }
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
  const [saveMessage, setSaveMessage] = useState<{ type: string; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [deleteLayoutId, setDeleteLayoutId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentLayoutName, setCurrentLayoutName] = useState<string>('');
  // Add ref for the droppable area
  const droppableAreaRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);  

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Add toggle function
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };  
  
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

      const firestoreLayouts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        firestoreId: doc.id,
        synced: true,
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
    remote.forEach((remoteLayout) => {
      const localIndex = merged.findIndex((l) => l.id === remoteLayout.id);
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
        synced: false,
      };

      // Save to Firestore
      const layoutsCollection = collection(db, 'layouts');
      const docRef = await addDoc(layoutsCollection, {
        ...newLayout,
        lastModified: Timestamp.fromDate(new Date()),
      });

      newLayout.firestoreId = docRef.id;
      newLayout.synced = true;

      // Update layouts state
      setLayouts((prevLayouts) => {
        const layoutIndex = prevLayouts.findIndex((l) => l.id === newLayout.id);
        if (layoutIndex >= 0) {
          const updatedLayouts = [...prevLayouts];
          updatedLayouts[layoutIndex] = newLayout;
          return updatedLayouts;
        } else {
          return [...prevLayouts, newLayout];
        }
      });

      setCurrentLayoutId(newLayout.id);
      setCurrentLayoutName(name); // Update current layout name
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
    const layout = layouts.find((l) => l.id === layoutId);
    if (layout) {
      setDroppedComponents(layout.components);
      setCurrentLayoutId(layout.id);
      setCurrentLayoutName(layout.name); // Update current layout name
      setIsLoadModalOpen(false);

      if (!layout.synced && layout.firestoreId) {
        try {
          setIsSyncing(true);
          const layoutRef = doc(db, 'layouts', layout.firestoreId);
          await updateDoc(layoutRef, {
            components: layout.components,
            lastModified: Timestamp.fromDate(new Date()),
          });

          setLayouts((prevLayouts) => prevLayouts.map((l) => (l.id === layoutId ? { ...l, synced: true } : l)));
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
  useEffect(() => {
    localStorage.setItem('pageBuilderLayouts', JSON.stringify(layouts));
  }, [layouts]);

  // Add delete layout function
  const deleteLayout = async (layoutId: string) => {
    setIsSyncing(true);
    setSyncError(null);

    try {
      const layoutToDelete = layouts.find((l) => l.id === layoutId);

      if (layoutToDelete?.firestoreId) {
        const layoutRef = doc(db, 'layouts', layoutToDelete.firestoreId);
        await deleteDoc(layoutRef);
      }

      setLayouts((prevLayouts) => prevLayouts.filter((l) => l.id !== layoutId));

      const updatedLayouts = layouts.filter((l) => l.id !== layoutId);
      localStorage.setItem('pageBuilderLayouts', JSON.stringify(updatedLayouts));

      // Clear current layout if it was deleted
      if (currentLayoutId === layoutId) {
        setCurrentLayoutId(null);
        setCurrentLayoutName(''); // Clear current layout name
        setDroppedComponents([]);
      }

      setSaveMessage({ type: 'success', text: 'Layout deleted successfully!' });
    } catch (error) {
      console.error('Error deleting layout:', error);
      setSaveMessage({ type: 'danger', text: 'Failed to delete layout from cloud' });
      setSyncError('Failed to delete from cloud');
    } finally {
      setIsSyncing(false);
      setIsDeleteModalOpen(false);
      setDeleteLayoutId(null);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random()}`;
  };

  const handleDrop = (id: number) => {
    const component = categories
      .flatMap(category => category.components)
      .find(comp => comp.id === id);
  
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

  const handleDelete = useCallback(
    (id: string) => {
      const componentToDelete = droppedComponents.find((comp) => comp.uniqueId === id);
      if (componentToDelete) {
        const deletedComponent = {
          ...componentToDelete,
          timestamp: Date.now(),
        };

        setDroppedComponents((prev) => prev.filter((comp) => comp.uniqueId !== id));
        setDeletedComponents((prev) => [...prev, deletedComponent]);
        setLastDeletedComponent(deletedComponent);
        setShowUndoAlert(true);

        // Hide undo alert after 5 seconds
        setTimeout(() => {
          setShowUndoAlert(false);
          setLastDeletedComponent(null);
        }, 5000);
      }
    },
    [droppedComponents]
  );

  const handleUndo = useCallback(() => {
    if (lastDeletedComponent) {
      const { timestamp, ...componentWithoutTimestamp } = lastDeletedComponent;
      setDroppedComponents((prev) => [...prev, componentWithoutTimestamp]);
      setDeletedComponents((prev) => prev.filter((comp) => comp.uniqueId !== lastDeletedComponent.uniqueId));
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

  // export to PNG function
  const exportToPNG = async () => {
    if (!droppableAreaRef.current) return;
    
    setIsExporting(true);
    try {
      // First, create a clone of the droppable area to remove any drag-drop styling
      const element = droppableAreaRef.current;
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Remove drag-drop related classes and styles
      clone.style.border = 'none';
      clone.style.backgroundColor = 'white';
      clone.style.padding = '20px';
      const deleteButtons = clone.getElementsByClassName('delete-button');
      while (deleteButtons.length > 0) {
        deleteButtons[0].remove();
      }

      // Temporarily append clone to document
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);

      // Capture the clone
      const canvas = await html2canvas(clone, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Remove clone
      document.body.removeChild(clone);

      // Create download link
      const link = document.createElement('a');
      link.download = `${currentLayoutName || 'layout'}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setSaveMessage({ type: 'success', text: 'Layout exported as PNG successfully!' });
    } catch (error) {
      console.error('Error exporting PNG:', error);
      setSaveMessage({ type: 'danger', text: 'Failed to export layout as PNG' });
    } finally {
      setIsExporting(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
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
        ref={(node) => {
          drop(node);
          if (node) {
            droppableAreaRef.current = node;
          }
        }}
        className="droppable-area"
        style={{
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          border: '2px dashed #ced4da',
        }}
      >
        {children}
      </div>
    );
  };

// Draggable dropped component
const DroppedComponentWrapper: React.FC<DroppedComponentProps> = ({ id, index, children, moveComponent, onDelete }) => {
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
        position: 'relative',
        transition: 'all 0.2s ease',
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
          transition: 'all 0.2s ease',
        }}
        title="Delete component"
        className="delete-button hover:bg-gray-100"
      >
        <X size={16} color="#666666" />
      </button>
      {children}
    </div>
  );
};  

  // Add function to toggle category
  const toggleCategory = (categoryId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, isOpen: !category.isOpen }
          : category
      )
    );
  };

  return (
    <div className="page-builder">
      <DndProvider backend={HTML5Backend}>
        <Container fluid={true}>
          {/* Current Layout Display */}
          <h1>Page Builder</h1>
          <Row className="mb-3">
            <Col>
              <div className="d-flex align-items-center">
                {currentLayoutName && (
                  <div className="d-flex align-items-center">
                    <h4 className="mb-2">
                      <span className="text-muted me-2">Current Layout:</span>
                      <span className="fw-bold">{currentLayoutName}</span>
                    </h4>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          {/* Save/Load Controls */}
          <Row className="mb-4">
            <Col>
              <ButtonGroup>
                <ReactstrapButton
                  color="primary"
                  onClick={() => {
                    setNewLayoutName(currentLayoutName); // Pre-fill current name if editing
                    setIsSaveModalOpen(true);
                  }}
                  className="d-flex align-items-center gap-2"
                  disabled={isSyncing}
                >
                  <Save size={16} />
                  {currentLayoutId ? 'Update Layout' : 'Save Layout'}
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
                  color="info"
                  onClick={exportToPNG}
                  className="d-flex align-items-center gap-2"
                  disabled={isExporting || droppedComponents.length === 0}
                  title={droppedComponents.length === 0 ? "Add components to export" : "Export as PNG"}
                >
                  <Camera size={16} />
                  Export PNG
                  {isExporting && <Spinner size="sm" className="ms-2" />}
                </ReactstrapButton>
                <ReactstrapButton color="info" onClick={exportLayout} className="d-flex align-items-center gap-2">
                  <Download size={16} />
                  Export JSON
                </ReactstrapButton>
                <ReactstrapButton color="info" className="d-flex align-items-center gap-2">
                  <label style={{ cursor: 'pointer', marginBottom: 0 }}>
                    <Upload size={16} />
                    Import JSON
                    <Input
                      type="file"
                      accept=".json"
                      style={{ display: 'none' }}
                      onChange={importLayout}
                      onClick={(e) => {
                        (e.target as HTMLInputElement).value = '';
                      }}
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
                <Alert color={saveMessage.type}>{saveMessage.text}</Alert>
              </Col>
            </Row>
          )}

          {/* Save Modal */}
          <Modal isOpen={isSaveModalOpen} toggle={() => setIsSaveModalOpen(false)}>
            <ModalHeader toggle={() => setIsSaveModalOpen(false)}>
              {currentLayoutId ? 'Update Layout' : 'Save Layout'}
            </ModalHeader>
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
                {currentLayoutId ? 'Update' : 'Save'}
              </ReactstrapButton>
            </ModalFooter>
          </Modal>

          {/* Load Modal */}
          <Modal isOpen={isLoadModalOpen} toggle={() => setIsLoadModalOpen(false)} size="lg">
            <ModalHeader toggle={() => setIsLoadModalOpen(false)}>Saved Layouts</ModalHeader>
            <ModalBody>
              {layouts.length === 0 ? (
                <p>No saved layouts found.</p>
              ) : (
                layouts.map((layout) => (
                  <Card key={layout.id} className="mb-2">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="d-flex align-items-center gap-2">
                            {layout.name}
                            {layout.synced ? (
                              <Cloud size={16} className="text-success" />
                            ) : (
                              <CloudOff size={16} className="text-warning" />
                            )}
                          </h6>
                          <small className="text-muted">
                            Last modified: {new Date(layout.lastModified).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="d-flex gap-2">
                          <ReactstrapButton color="primary" size="sm" onClick={() => loadLayout(layout.id)}>
                            Load
                          </ReactstrapButton>
                          <ReactstrapButton
                            color="danger"
                            size="sm"
                            onClick={() => {
                              setDeleteLayoutId(layout.id);
                              setIsDeleteModalOpen(true);
                            }}
                          >
                            Delete
                          </ReactstrapButton>
                        </div>
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

          {/* Delete Confirmation Modal */}
          <Modal isOpen={isDeleteModalOpen} toggle={() => setIsDeleteModalOpen(false)}>
            <ModalHeader toggle={() => setIsDeleteModalOpen(false)}>Delete Layout</ModalHeader>
            <ModalBody>Are you sure you want to delete this layout? This action cannot be undone.</ModalBody>
            <ModalFooter>
              <ReactstrapButton
                color="secondary"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteLayoutId(null);
                }}
              >
                Cancel
              </ReactstrapButton>
              <ReactstrapButton
                color="danger"
                onClick={() => deleteLayoutId && deleteLayout(deleteLayoutId)}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <>
                    <span>Deleting</span>
                    <Spinner size="sm" className="ms-2" />
                  </>
                ) : (
                  'Delete'
                )}
              </ReactstrapButton>
            </ModalFooter>
          </Modal>

          {/* Add success/error messages for delete operations */}
          {saveMessage && (
            <Alert
              color={saveMessage.type}
              className="position-fixed"
              style={{
                bottom: '1rem',
                right: '1rem',
                zIndex: 1050,
                minWidth: '250px',
              }}
            >
              {saveMessage.text}
            </Alert>
          )}

          {showUndoAlert && lastDeletedComponent && (
            <div
              style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                zIndex: 1000,
                width: '300px',
              }}
            >
              <Alert color="info" style={{ marginBottom: 0 }}>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Component deleted</span>
                  <ReactstrapButton color="link" size="sm" onClick={handleUndo} style={{ padding: '0 0.5rem' }}>
                    Undo
                  </ReactstrapButton>
                </div>
              </Alert>
            </div>
          )}

          <Row>
            <Col md={2}>
            
              <div className="components-sidebar">
                <div className="components-header">
                  <h5 className="mb-0">
                    {/* <button
                      onClick={toggleSidebar}
                      className="sidebar-toggle me-2"
                      title={isSidebarVisible ? "Hide Components" : "Show Components"}
                    >
                      {isSidebarVisible ? '◀' : '▶'}
                    </button>  */}
                    Components
                  </h5>
                </div>
                <div className="components-list">
                  {categories.map((category) => (
                    <div key={category.id} className="component-category">
                      <button
                        className="category-header"
                        onClick={() => toggleCategory(category.id)}
                      >
                        <span className="category-name">{category.name}</span>
                        <span className={`category-icon ${category.isOpen ? 'open' : ''}`}>
                          ▾
                        </span>
                      </button>
                      <div 
                        className={`category-items ${category.isOpen ? 'open' : ''}`}
                        style={{
                          // Add these inline styles for smoother animation
                          visibility: category.isOpen ? 'visible' : 'hidden',
                          marginBottom: category.isOpen ? '0.5rem' : '0'
                        }}
                      >
                        {category.components.map((comp) => (
                          <DraggableCard
                            key={comp.id}
                            id={comp.id}
                            text={comp.text}
                            componentType={comp.componentType}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

// Add some optional styling to improve the exported image
const styles = `
  .droppable-area {
    background-color: white !important;
    page-break-inside: avoid;
  }

  .droppable-area > div {
    page-break-inside: avoid;
    margin-bottom: 1rem;
  }

  @media print {
    .droppable-area {
      border: none !important;
    }
  }
`;

export default PageBuilder;
