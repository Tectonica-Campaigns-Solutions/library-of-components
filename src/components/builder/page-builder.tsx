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
  Button,
} from 'reactstrap';
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { X, Save, Upload, Download, Cloud, CloudOff, Camera, ImageOff, Folder } from 'lucide-react';
import { db } from '../../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, orderBy, Timestamp, where } from 'firebase/firestore';

import accordionsImage from '../../images/basic-elements/accordions.png';
import buttonImage from '../../images/basic-elements/button.png';
import buttonCenterImage from '../../images/basic-elements/buttonsCenter.png';
import buttonLeftImage from '../../images/basic-elements/buttonsLeft.png';
import horizontalFormImage from '../../images/basic-elements/horizontalForm.png';
import mediaPlusRightFormImage from '../../images/basic-elements/mediaPlusRightForm.png';
import socialShareImage from '../../images/basic-elements/socialShare.png';
import spacer16pxImage from '../../images/basic-elements/spacer16px.png';
import spacer32pxImage from '../../images/basic-elements/spacer32px.png';
import spacer49pxImage from '../../images/basic-elements/spacer49px.png';
import textPlusRightFormImage from '../../images/basic-elements/textPlusRightForm.png';

import breadcrumbsImage from '../../images/headers/Breadcrumbs.png';
import megamenuImage from '../../images/headers/Megamenu.png';
import secondaryMenuImage from '../../images/headers/SecondaryMenu.png';
import simpleMenuImage from '../../images/headers/SimpleMenu.png';
import notificationImage from '../../images/headers/TopNotification.png';

import heroPlusFormImage from '../../images/heroes/HeroPlusForm.png';
import heroPlusMediaImage from '../../images/heroes/HeroPlusMedia.png';
import heroPlusImagePlusButtonsImage from '../../images/heroes/HeroPlusMediaPlusCTAs.png';
import heroPlusBackgroundPlusFormImage from '../../images/heroes/HeroPlusMediaPlusForm.png';
import simpleInnerHeroImage from '../../images/heroes/SimpleInnerHero.png';

import twoCardsRowIconImage from '../../images/layout-components/2CardsRowIcon.png';
import twoCardsRowImage from '../../images/layout-components/2CardsRowMedia.png';
import threeCardsRowImage from '../../images/layout-components/3CardsRow.png';
import fourCardsRowImage from '../../images/layout-components/4CardsRow.png';
import filterRow1xImage from '../../images/layout-components/Filter.png';
import filterRow2xImage from '../../images/layout-components/FilterCombined.png';
import footerImage from '../../images/layout-components/Footer.png';
import footerPlusFormImage from '../../images/layout-components/FooterForm.png';
import narrativeImageLeftImage from '../../images/layout-components/NarrativeMediaLeft.png';
import narrativeImageRightImage from '../../images/layout-components/NarrativeMediaRight.png';
import narrativeImageSliderLeftImage from '../../images/layout-components/NarrativeMediaSliderLeft.png';
import narrativeImageSliderPlusFormImage from '../../images/layout-components/NarrativeMediaSliderPlusForm.png';

import sidebar2HorizontalCardsRowImage from '../../images/sidebar-components/Sidebar2HorizontalCardsRow.png';
import sidebar2VerticalCardsRowImage from '../../images/sidebar-components/Sidebar2VerticalCardsRow.png';
import sidebar3VerticalCardsRowImage from '../../images/sidebar-components/Sidebar3VerticalCardsRow.png';
import sidebarTextPlusFormImage from '../../images/sidebar-components/SidebarTextPlusForm.png';
import sidebarTextPlusMediaImage from '../../images/sidebar-components/SidebarTextPlusMedia.png';


// import formImage from '../../images/Form1x.png';
// import headerImage from '../../images/Header1x.png';
// import spacerImage from '../../images/spacer.png';


import './page-builder.scss';
import ProjectManagement from './ProjectManagement';
import migrateLayouts from './migrateLayouts';

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

interface FirebaseLayout extends Layout {
  firestoreId?: string;
  synced: boolean;
}

interface ComponentItem {
  id: number;
  text: string;
  componentType: string;
}

interface ComponentSubcategory {
  id: string;
  name: string;
  components: ComponentItem[];
  isOpen: boolean;
}

interface ComponentCategory {
  id: string;
  name: string;
  isOpen: boolean;
  components?: ComponentItem[]; // Direct components
  subcategories?: ComponentSubcategory[]; // Optional subcategories
}

// Add new interfaces for notes
interface LayoutNote {
  id: string;
  text: string;
  timestamp: number;
}

interface Project {
  firestoreId?: string;
  name: string;
  description?: string;
  createdAt: Timestamp;
  lastModified: Timestamp;
  layouts?: Layout[];
}

interface Layout {
  id: string;
  name: string;
  components: DroppedComponent[];
  notes: LayoutNote[];
  lastModified: Timestamp;
  firestoreId?: string;
  projectId: string | null; // Make projectId required but nullable
  synced?: boolean;
}

interface FirebaseLayout extends Layout {
  firestoreId?: string;
  synced: boolean;
}

// Add this interface for layout creation
interface NewLayout {
  id: string;
  name: string;
  components: DroppedComponent[];
  notes: LayoutNote[];
  lastModified: Timestamp;
  projectId: string | null;
}

// Simple component renderer
const renderPlaceholderComponent = (text: string) => {
  const img = () => {
    switch (text) {
      case 'Accordion':
        return accordionsImage;
      case 'Button':
        return buttonImage;
      case 'Button Center':
        return buttonCenterImage;
      case 'Button Left':
        return buttonLeftImage;
      case 'Horizontal Form':
        return horizontalFormImage;
      case 'Text + Right Form':
        return textPlusRightFormImage;
      case 'Media + Right Form':
        return mediaPlusRightFormImage;
      case 'Social Share':
        return socialShareImage;
      case '16px Spacer':
        return spacer16pxImage;
      case '32px Spacer':
        return spacer32pxImage;
      case '49px Spacer':
        return spacer49pxImage;

      case '2 Cards Row':
        return twoCardsRowImage;
      case '3 Cards Row':
        return threeCardsRowImage;
      case '4 Cards Row':
        return fourCardsRowImage;
      case '2 Cards Row with Icon':  
        return twoCardsRowIconImage
      case 'Simple Filter':
        return filterRow1xImage;        
      case 'Combined Filter':
        return filterRow2xImage;  
      case 'Media Left':
        return narrativeImageLeftImage;
      case 'Media Right':
        return narrativeImageRightImage;
      case 'Media Slider Left':
        return narrativeImageSliderLeftImage
      case 'Media Slider + Form':
        return narrativeImageSliderPlusFormImage;

      case '2 Vertical Cards Row':
       return sidebar2VerticalCardsRowImage;
      case '3 Vertical Cards Row':
       return sidebar3VerticalCardsRowImage;
      case '2 Horizontal Cards Row':
        return sidebar2HorizontalCardsRowImage;       
      case 'Sidebar + Text and Form':
       return sidebarTextPlusFormImage;
      case 'Sidebar + Text and Media':
       return sidebarTextPlusMediaImage;

      case 'Filter Row':
        return filterRow1xImage;
      case 'Combined Filter Row':
        return filterRow2xImage;
      case 'Footer':
        return footerImage;
      case 'Footer + Form':
        return footerPlusFormImage;

      case 'Breadcrumbs':
        return breadcrumbsImage;
      case 'Megamenu':
        return megamenuImage;    
      case 'Secondary Menu':
        return secondaryMenuImage;
      case 'Simple Menu':
        return simpleMenuImage;    
      case 'Top Notification':
        return notificationImage;

      case 'Hero + Media + Form':
        return heroPlusBackgroundPlusFormImage;
      case 'Hero + Media':
        return heroPlusMediaImage;
      case 'Hero + Media + CTAs':
        return heroPlusImagePlusButtonsImage;
      case 'Hero + Form':
        return heroPlusFormImage;
      case 'Simple Inner Hero':
        return simpleInnerHeroImage

      default:
        return null;
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
      <div className="card-title">{text}</div>
      {/* <Card className="card">
        <CardBody>
          <CardTitle tag="h6" className="card-title">{text}</CardTitle>
        </CardBody>
      </Card> */}
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
      subcategories: [
        { 
          id: 'Buttons', 
          name: 'Buttons', 
          isOpen: false,
          components: [
            { id: 1, text: 'Button', componentType: 'buttonImage' },
            { id: 2, text: 'Button Center', componentType: 'Button Center' },
            { id: 3, text: 'Button Left', componentType: 'Button Left' },
          ]
        },
        { 
          id: 'Forms', 
          name: 'Forms', 
          isOpen: false,
          components: [
            { id: 4, text: 'Horizontal Form', componentType: 'Horizontal Form' },
            { id: 5, text: 'Text + Right Form', componentType: 'Text + Right Form' },
            { id: 6, text: 'Media + Right Form', componentType: 'Media + Right Form' },
          ]
        },
        {
          id: 'text',
          name: 'Spacers',
          isOpen: false,
          components: [
            { id: 7, text: '16px Spacer', componentType: '16px Spacer' },
            { id: 8, text: '32px Spacer', componentType: '32px Spacer' },
            { id: 9, text: '49px Spacer', componentType: '49px Spacer' },
          ]
        },
      ],
      components: [
        { id: 10, text: 'Accordion', componentType: 'Accordion' },
        { id: 11, text: 'Pagination', componentType: 'Pagination' },
        { id: 12, text: 'Social Share', componentType: 'Social Share' },
      ]
    },
    {
      id: 'layout',
      name: 'Layout Components',
      isOpen: false,
      subcategories: [
        {
          id: 'Cards',
          name: 'Card Rows',
          isOpen: false,
          components: [
            { id: 13, text: '2 Cards Row', componentType: '2 Cards Row' },
            { id: 14, text: '3 Cards Row', componentType: '3 Cards Row' },
            { id: 15, text: '4 Cards Row', componentType: '4 Cards Row' },
            { id: 16, text: '2 Cards Row with Icon', componentType: '2 Cards Row with Icon' },
          ]
        },
        {
          id: 'Narrative',
          name: 'Narrative Blocks',
          isOpen: false,
          components: [
            { id: 17, text: 'Media Left', componentType: 'Media Left' },
            { id: 18, text: 'Media Right', componentType: 'Media Right' },
            { id: 19, text: 'Media Slider Left', componentType: 'Media Slider Left' },
            { id: 20, text: 'Media Slider + Form', componentType: 'Media Right' },
          ]
        },
        {
          id: 'Filter',
          name: 'Filter',
          isOpen: false,
          components: [
            { id: 21, text: 'Simple Filter', componentType: 'Simple Filter' },
            { id: 22, text: 'Combined Filter', componentType: 'Combined Filter' },
          ]
        },
        {
          id: 'Footer',
          name: 'Footer',
          isOpen: false,
          components: [
            { id: 23, text: 'Footer', componentType: 'Footer' },
            { id: 24, text: 'Footer + Form', componentType: 'Footer + Form' },
          ]
        }
      ],
    },
    {
      id: 'headers',
      name: 'Headers',
      isOpen: false,
      subcategories: [
        { 
          id: 'Headers', 
          name: 'Headers', 
          isOpen: false,
          components: [
            { id: 25, text: 'Megamenu', componentType: 'Megamenu' },
            { id: 26, text: 'Secondary Menu', componentType: 'Secondary Menu' },
            { id: 27, text: 'Simple Menu', componentType: 'Simple Menu' },
            { id: 28, text: 'Top Notification', componentType: 'Top Notification' },
          ]
        },
      ],
      components: [
        { id: 29, text: 'Breadcrumbs', componentType: 'Breadcrumbs' },
      ]
    },
    {
      id: 'heros',
      name: 'Heros',
      isOpen: false,
      subcategories: [
        { 
          id: 'Landing Heroes', 
          name: 'Landing Heroes', 
          isOpen: false,
          components: [
            { id: 30, text: 'Hero + Media + Form', componentType: 'Hero + Media + Form' },
            { id: 31, text: 'Hero + Media', componentType: 'Hero + Media' },
            { id: 32, text: 'Hero + Media + CTAs', componentType: 'Hero + Media + CTAs' },
            { id: 33, text: 'Hero + Form', componentType: 'Hero + Form' },
          ]
        },
      ],
      components: [
        { id: 34, text: 'Simple Inner Hero', componentType: 'Simple Inner Hero' },
      ]
    },
    {
      id: 'sidebar',
      name: 'Sidebar Components',
      isOpen: false,
      subcategories: [
        { 
          id: 'Sidebar', 
          name: 'Sidebar + Cards', 
          isOpen: false,
          components: [
            { id: 35, text: '2 Vertical Cards Row', componentType: 'Sidebar + Cards' },
            { id: 36, text: '3 Vertical Cards Row', componentType: '3 Vertical Cards Row' },
            { id: 37, text: '2 Horizontal Cards Row', componentType: '2 Horizontal Cards Row' },
          ]
        },
      ],
      components: [
        { id: 38, text: 'Sidebar + Text and Form', componentType: 'Sidebar + Text and Form' },
        { id: 39, text: 'Sidebar + Text and Media', componentType: 'Sidebar + Text and Media' },
      ]
    }
  ]);

  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [deletedComponents, setDeletedComponents] = useState<DeletedComponent[]>([]);
  const [showUndoAlert, setShowUndoAlert] = useState(false);
  const [lastDeletedComponent, setLastDeletedComponent] = useState<DeletedComponent | null>(null);
  const [layouts, setLayouts] = useState<Layout[]>([]);
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

  // States for Notes
  const [notes, setNotes] = useState<LayoutNote[]>([]);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  // State for projects
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  // Add the function
const runMigration = async () => {
  try {
    setIsLoading(true);
    await migrateLayouts();
    // Reload layouts after migration
    await loadLayouts(currentProject?.firestoreId);
    setSaveMessage({ type: 'success', text: 'Database migration completed!' });
  } catch (error) {
    console.error('Migration error:', error);
    setSaveMessage({ type: 'danger', text: 'Migration failed. Check console.' });
  } finally {
    setIsLoading(false);
  }
};

  // Add new handlers
  const handleProjectCreated = (project: Project): void => {
    setCurrentProject(project);
    setIsProjectModalOpen(false);
  };

  // Update the project selection handler
  const handleProjectSelected = async (project: Project): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('Selecting project:', project.firestoreId); // Debug log
      
      // Clear current state
      setDroppedComponents([]);
      setCurrentLayoutId(null);
      setCurrentLayoutName('');
      setNotes([]);
      
      // Set current project
      setCurrentProject(project);
      
      // Load layouts for the selected project
      await loadLayouts(project.firestoreId);
      
    } catch (error) {
      console.error('Error selecting project:', error);
      setSaveMessage({ type: 'danger', text: 'Failed to load project layouts' });
    } finally {
      setIsLoading(false);
      setIsProjectModalOpen(false);
    }
  };
  
  const clearProjectSelection = async (): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('Clearing project selection'); // Debug log
      
      // Clear all state
      setCurrentProject(null);
      setDroppedComponents([]);
      setCurrentLayoutId(null);
      setCurrentLayoutName('');
      setNotes([]);
      
      // Load unassigned layouts
      await loadLayouts();
      
    } catch (error) {
      console.error('Error clearing project:', error);
      setSaveMessage({ type: 'danger', text: 'Failed to load layouts' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLayoutAssigned = (): void => {
    loadLayouts();
  };

  // Add toggle function
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };  
  
  // Load saved layouts from localStorage on mount
  // useEffect(() => {
  //   // Initial load - either load project layouts or all layouts
  //   loadLayouts(currentProject?.firestoreId);
  // }, [currentProject?.firestoreId]); // Add currentProject.firestoreId as dependency


  useEffect(() => {
    if (currentProject?.firestoreId) {
      loadLayouts(currentProject.firestoreId);
    } else {
      loadLayouts();
    }
  }, [currentProject?.firestoreId]);

// In page-builder.tsx
const loadLayouts = async (projectId?: string): Promise<void> => {
  setIsLoading(true);
  try {
    const layoutsCollection = collection(db, 'layouts');
    let layoutsQuery;
    
    if (projectId) {
      console.log('Loading layouts for project:', projectId);
      layoutsQuery = query(
        layoutsCollection,
        where('projectId', '==', projectId)
      );
    } else {
      console.log('Loading unassigned layouts');
      layoutsQuery = query(
        layoutsCollection,
        where('projectId', '==', null)
      );
    }

    const querySnapshot = await getDocs(layoutsQuery);
    console.log(`Found ${querySnapshot.docs.length} layouts`);
    
    const firestoreLayouts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log('Layout:', {
        id: doc.id,
        name: data.name,
        projectId: data.projectId
      });
      return {
        ...data,
        firestoreId: doc.id,
        synced: true,
      };
    }) as FirebaseLayout[];

    setLayouts(firestoreLayouts);
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
  const saveLayout = async (name: string): Promise<void> => {
    setIsSyncing(true);
    setSyncError(null);
    
    try {
      const projectId = currentProject?.firestoreId || null;
      
      const newLayout = {
        id: currentLayoutId || `layout-${Date.now()}`,
        name,
        components: droppedComponents,
        notes: notes,
        lastModified: Timestamp.now(),
        projectId: projectId // Explicitly set projectId
      };
  
      // Save to Firestore
      const layoutsCollection = collection(db, 'layouts');
      const docRef = await addDoc(layoutsCollection, newLayout);
  
      const updatedLayout = {
        ...newLayout,
        firestoreId: docRef.id,
        synced: true
      };
  
      // Update layouts state based on project context
      setLayouts(prevLayouts => {
        // If we're in a project context, only add if it belongs to this project
        if (currentProject?.firestoreId) {
          if (projectId === currentProject.firestoreId) {
            return [...prevLayouts, updatedLayout];
          }
          return prevLayouts;
        }
        // If no project context, only add if it's unassigned
        if (!projectId) {
          return [...prevLayouts, updatedLayout];
        }
        return prevLayouts;
      });
  
      setCurrentLayoutId(newLayout.id);
      setCurrentLayoutName(name);
      setSaveMessage({ type: 'success', text: 'Layout saved to cloud!' });
      
      // Reload layouts to ensure proper filtering
      await loadLayouts(projectId);
      
    } catch (error) {
      console.error('Error saving layout:', error);
      setSaveMessage({ type: 'danger', text: 'Failed to save to cloud.' });
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
      setCurrentLayoutName(layout.name);
      setNotes(layout.notes || []); // Load notes
      setIsLoadModalOpen(false);

      if (!layout.synced && layout.firestoreId) {
        try {
          setIsSyncing(true);
          const layoutRef = doc(db, 'layouts', layout.firestoreId);
          await updateDoc(layoutRef, {
            components: layout.components,
            notes: layout.notes || [], // Include notes in sync
            lastModified: Timestamp.fromDate(new Date())
          });
          
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

  const newLayout = async() => {
    setDroppedComponents([]);
  }

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random()}`;
  };

  const handleDrop = (id: number) => {
    const component = categories.reduce<ComponentItem | undefined>((found, category) => {
      if (found) return found;
      
      // Check direct components
      if (category.components) {
        const directComponent = category.components.find(comp => comp.id === id);
        if (directComponent) return directComponent;
      }
      
      // Check subcategories
      if (category.subcategories) {
        const subcategoryComponent = category.subcategories
          .flatMap(sub => sub.components)
          .find(comp => comp.id === id);
        if (subcategoryComponent) return subcategoryComponent;
      }
      
      return found;
    }, undefined);
  
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

  // Add note handlers
  const addNote = async () => {
    if (!newNote.trim() || !currentLayoutId) return;

    setIsSavingNote(true);
    try {
      const note: LayoutNote = {
        id: generateUniqueId(),
        text: newNote.trim(),
        timestamp: Date.now()
      };

      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      setNewNote('');

      // Update Firestore if we have a current layout
      if (currentLayoutId) {
        const layout = layouts.find(l => l.id === currentLayoutId);
        if (layout?.firestoreId) {
          const layoutRef = doc(db, 'layouts', layout.firestoreId);
          await updateDoc(layoutRef, {
            notes: updatedNotes,
            lastModified: Timestamp.fromDate(new Date())
          });

          // Update local layouts state
          setLayouts(prevLayouts =>
            prevLayouts.map(l =>
              l.id === currentLayoutId
                ? { ...l, notes: updatedNotes, lastModified: Date.now() }
                : l
            )
          );
        }
      }
    } catch (error) {
      console.error('Error saving note:', error);
      setSaveMessage({ type: 'danger', text: 'Failed to save note to cloud' });
    } finally {
      setIsSavingNote(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!currentLayoutId) return;

    try {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);

      // Update Firestore if we have a current layout
      if (currentLayoutId) {
        const layout = layouts.find(l => l.id === currentLayoutId);
        if (layout?.firestoreId) {
          const layoutRef = doc(db, 'layouts', layout.firestoreId);
          await updateDoc(layoutRef, {
            notes: updatedNotes,
            lastModified: Timestamp.fromDate(new Date())
          });

          // Update local layouts state
          setLayouts(prevLayouts =>
            prevLayouts.map(l =>
              l.id === currentLayoutId
                ? { ...l, notes: updatedNotes, lastModified: Date.now() }
                : l
            )
          );
        }
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      setSaveMessage({ type: 'danger', text: 'Failed to delete note from cloud' });
    }
  };

  // Add search filter function
  const filterComponents = (category: ComponentCategory) => {
    const searchLower = searchTerm.toLowerCase();
    
    if (category.components) {
      // Filter direct components
      const filteredComponents = category.components.filter(comp =>
        comp.text.toLowerCase().includes(searchLower) ||
        comp.componentType.toLowerCase().includes(searchLower)
      );
      
      if (filteredComponents.length > 0) {
        return {
          ...category,
          components: filteredComponents
        };
      }
    }
    
    if (category.subcategories) {
      // Filter subcategories and their components
      const filteredSubcategories = category.subcategories
        .map(sub => ({
          ...sub,
          components: sub.components.filter(comp =>
            comp.text.toLowerCase().includes(searchLower) ||
            comp.componentType.toLowerCase().includes(searchLower)
          )
        }))
        .filter(sub => sub.components.length > 0);
      
      if (filteredSubcategories.length > 0) {
        return {
          ...category,
          subcategories: filteredSubcategories
        };
      }
    }
    
    return null;
  };

  // Get filtered categories
  const filteredCategories = searchTerm
    ? categories
        .map(filterComponents)
        .filter((cat): cat is ComponentCategory => cat !== null)
    : categories;

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

// Add a way to display current project context in the UI
const renderProjectContext = () => (
  <div className="mb-3">
    {currentProject ? (
      <div className="d-flex align-items-center gap-2">
        <Folder size={16} className="text-primary" />
        <span>Project: {currentProject.name}</span>
        <Button
          color="link"
          size="sm"
          className="p-0 ms-2"
          onClick={clearProjectSelection}
        >
          (Show All Layouts)
        </Button>
      </div>
    ) : (
      <div className="text-muted d-flex align-items-center gap-2">
        <Folder size={16} />
        <span>Showing Unassigned Layouts</span>
      </div>
    )}
  </div>
);

  const toggleCategory = (categoryId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, isOpen: !category.isOpen }
          : category
      )
    );
  };

  // Add toggle function for subcategories
  const toggleSubcategory = (categoryId: string, subcategoryId: string) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId && category.subcategories
          ? {
              ...category,
              subcategories: category.subcategories.map(subcategory =>
                subcategory.id === subcategoryId
                  ? { ...subcategory, isOpen: !subcategory.isOpen }
                  : subcategory
              )
            }
          : category
      )
    );
  };

  const renderComponentsList = (components: DroppedComponent[]) => {
    if (!components || components.length === 0) return null;
  
    // Group components by type and count them
    const componentCounts = components.reduce((acc: { [key: string]: number }, component) => {
      acc[component.text] = (acc[component.text] || 0) + 1;
      return acc;
    }, {});
  
    return (
      <div className="components-list-display">
        <div className="d-flex flex-wrap gap-2">
          {Object.entries(componentCounts).map(([componentName, count]) => (
            <span 
              key={componentName}
              className="badge rounded-pill bg-light text-dark border"
              style={{ fontSize: '0.8em' }}
            >
              {componentName} {count > 1 && `(${count})`}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="page-builder">
      <DndProvider backend={HTML5Backend}>
        <Container fluid={true}>

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
              {renderProjectContext()}
              {layouts.length === 0 ? (
                <p>No saved layouts found.</p>
              ) : (
                layouts.map((layout) => (
                  <Card key={layout.id} className="mb-2">
                    <CardBody>
                      <div className="d-flex justify-content-between align-items-start">
                        <div style={{ flex: 1 }}>
                          <h6 className="d-flex align-items-center gap-2 mb-2">
                            {layout.name}
                            {layout.synced ? (
                              <Cloud size={16} className="text-success" />
                            ) : (
                              <CloudOff size={16} className="text-warning" />
                            )}
                          </h6>
                          {renderComponentsList(layout.components)}
                          <small className="text-muted d-block mt-2">
                            Last modified: {new Date(layout.lastModified).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="d-flex gap-2">
                          <ReactstrapButton 
                            color="primary" 
                            size="sm" 
                            onClick={() => loadLayout(layout.id)}
                          >
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
            <Col md={2} style={{ backgroundColor: '#F8F8F8' }}>
            
              <div className="components-sidebar">
                <div className="components-header">
                  <div className="search-container">
                    <Input
                      type="text"
                      placeholder="Search component..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    {searchTerm && (
                      <button
                        className="search-clear"
                        onClick={() => setSearchTerm('')}
                        title="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <h6>
                    {/* <button
                      onClick={toggleSidebar}
                      className="sidebar-toggle me-2"
                      title={isSidebarVisible ? "Hide Components" : "Show Components"}
                    >
                      {isSidebarVisible ? '◀' : '▶'}
                    </button>  */}
                    Arrange components into the build area
                  </h6>
                </div>
                <div className="components-list">
                  {filteredCategories.length === 0 ? (
                    <div className="no-results">
                      No components found for "{searchTerm}"
                    </div>
                  ) : (
                    filteredCategories.map((category) => (
                      <div key={category.id} className="component-category">
                        <button
                          className="category-header"
                          onClick={() => toggleCategory(category.id)}
                        >
                          <span className="category-name">{category.name}</span>
                          <span className={`category-icon ${category.isOpen ? 'open' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                              <path d="M9 1L5 5L1 1" stroke="#C6C9CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </span>
                        </button>
                        <div className={`category-items ${category.isOpen ? 'open' : ''}`}>
                          {/* Render direct components if they exist */}
                          {category.components && (
                            <div className="category-direct-items">
                              {category.components.map((comp) => (
                                <DraggableCard
                                  key={comp.id}
                                  id={comp.id}
                                  text={comp.text}
                                  componentType={comp.componentType}
                                />
                              ))}
                            </div>
                          )}
                          
                          {/* Render subcategories if they exist */}
                          {category.subcategories && category.subcategories.map((subcategory) => (
                            <div key={subcategory.id} className="subcategory">
                              <button
                                className="subcategory-header"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleSubcategory(category.id, subcategory.id);
                                }}
                              >
                                <span className="subcategory-name">{subcategory.name}</span>
                                <span className={`subcategory-icon ${subcategory.isOpen ? 'open' : ''}`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                    <path d="M9 1L5 5L1 1" stroke="#C6C9CE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </span>
                              </button>
                              <div className={`subcategory-items ${subcategory.isOpen ? 'open' : ''}`}>
                                {subcategory.components.map((comp) => (
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
                    ))
                  )}
                </div>
              </div>
            </Col>

            <Col md={10}>
              <Container className='builder-panel'>
                {/* Current Layout Display */}
                <Row className="mb-3">
                  <Col>
                    <div className="d-flex align-items-center">
                        {currentLayoutName && (
                          <div className="d-flex align-items-center current-layout">
                            <h2 className="mb-2 mr-2">{currentLayoutName}</h2>
                          </div>
                        )}
                        {currentProject && (
                          <div className="current-project">
                            <h4>{currentProject.name}</h4>
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
                        color="transparent"
                        onClick={() => {
                          setIsProjectModalOpen(true);
                          // clearProjectSelection()
                        }}
                        className="d-flex align-items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M1.875 10.625V10C1.875 9.50272 2.07254 9.02581 2.42417 8.67417C2.77581 8.32254 3.25272 8.125 3.75 8.125H16.25C16.7473 8.125 17.2242 8.32254 17.5758 8.67417C17.9275 9.02581 18.125 9.50272 18.125 10V10.625M10.8833 5.25833L9.11667 3.49167C9.0006 3.37546 8.86278 3.28327 8.71107 3.22035C8.55936 3.15744 8.39674 3.12504 8.2325 3.125H3.75C3.25272 3.125 2.77581 3.32254 2.42417 3.67417C2.07254 4.02581 1.875 4.50272 1.875 5V15C1.875 15.4973 2.07254 15.9742 2.42417 16.3258C2.77581 16.6775 3.25272 16.875 3.75 16.875H16.25C16.7473 16.875 17.2242 16.6775 17.5758 16.3258C17.9275 15.9742 18.125 15.4973 18.125 15V7.5C18.125 7.00272 17.9275 6.52581 17.5758 6.17417C17.2242 5.82254 16.7473 5.625 16.25 5.625H11.7675C11.4361 5.62471 11.1175 5.49282 10.8833 5.25833Z" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Projects
                      </ReactstrapButton>
                      <ReactstrapButton
                        color="transparent"
                        onClick={() => {
                          newLayout();
                        }}
                        className="d-flex align-items-center gap-2"
                        disabled={isSyncing}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M14.0517 3.73913L15.4575 2.33246C15.7506 2.0394 16.148 1.87476 16.5625 1.87476C16.977 1.87476 17.3744 2.0394 17.6675 2.33246C17.9606 2.62553 18.1252 3.02301 18.1252 3.43746C18.1252 3.85192 17.9606 4.2494 17.6675 4.54246L8.81833 13.3916C8.37777 13.8319 7.83447 14.1556 7.2375 14.3333L5 15L5.66667 12.7625C5.8444 12.1655 6.16803 11.6222 6.60833 11.1816L14.0517 3.73913ZM14.0517 3.73913L16.25 5.93746M15 11.6666V15.625C15 16.1222 14.8025 16.5992 14.4508 16.9508C14.0992 17.3024 13.6223 17.5 13.125 17.5H4.375C3.87772 17.5 3.40081 17.3024 3.04917 16.9508C2.69754 16.5992 2.5 16.1222 2.5 15.625V6.87496C2.5 6.37768 2.69754 5.90077 3.04917 5.54914C3.40081 5.19751 3.87772 4.99996 4.375 4.99996H8.33333" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Create layout
                        {isSyncing && <Spinner size="sm" className="ms-2" />}
                      </ReactstrapButton>
                      <ReactstrapButton
                        color="transparent"
                        onClick={() => {
                          setNewLayoutName(currentLayoutName); // Pre-fill current name if editing
                          setIsSaveModalOpen(true);
                        }}
                        className="d-flex align-items-center gap-2"
                        disabled={isSyncing}
                      >
                        {/* <Save size={16} /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 11V12.5C2 12.8978 2.15804 13.2794 2.43934 13.5607C2.72064 13.842 3.10218 14 3.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5V11M11 8L8 11M8 11L5 8M8 11V2" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {currentLayoutId ? 'Update' : 'Save'} layout
                        {isSyncing && <Spinner size="sm" className="ms-2" />}
                      </ReactstrapButton>
                      <ReactstrapButton
                        color="transparent"
                        onClick={() => setIsLoadModalOpen(true)}
                        className="d-flex align-items-center gap-2"
                        disabled={isLoading}
                      >
                        {/* <Upload size={16} /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 11V12.5C2 12.8978 2.15804 13.2794 2.43934 13.5607C2.72064 13.842 3.10218 14 3.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5V11" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M5 5L8 2M8 2L11 5M8 2L8 11" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Load layout
                        {isLoading && <Spinner size="sm" className="ms-2" />}
                      </ReactstrapButton>
                      <ReactstrapButton
                        color="transparent"
                        onClick={loadLayouts}
                        className="d-flex align-items-center gap-2"
                        disabled={isSyncing}
                      >
                        {/* <Cloud size={16} /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M10.682 6.23196H14.01L11.8894 4.10996C11.2066 3.42721 10.3562 2.93622 9.42352 2.68636C8.49086 2.4365 7.50885 2.43658 6.57623 2.68658C5.6436 2.93657 4.79322 3.42768 4.11058 4.11054C3.42794 4.79339 2.93709 5.64392 2.68738 6.57663M1.99005 13.096V9.76796M1.99005 9.76796H5.31805M1.99005 9.76796L4.11005 11.89C4.79279 12.5727 5.64324 13.0637 6.57591 13.3136C7.50857 13.5634 8.49057 13.5633 9.4232 13.3133C10.3558 13.0633 11.2062 12.5722 11.8888 11.8894C12.5715 11.2065 13.0623 10.356 13.312 9.42329M14.01 2.90396V6.23063" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Sync
                        {isSyncing && <Spinner size="sm" className="ms-2" />}
                      </ReactstrapButton>
                      <ReactstrapButton
                        color="transparent"
                        onClick={exportToPNG}
                        className="d-flex align-items-center gap-2"
                        disabled={isExporting || droppedComponents.length === 0}
                        title={droppedComponents.length === 0 ? "Add components to export" : "Export as PNG"}
                      >
                        {/* <Camera size={16} /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                          <path d="M4.55133 3.11656C4.43133 3.3065 4.27121 3.46788 4.08222 3.58938C3.89324 3.71088 3.67995 3.78956 3.45733 3.81989C3.204 3.85589 2.95267 3.89456 2.70133 3.93656C1.99933 4.05323 1.5 4.67123 1.5 5.38256V10.9999C1.5 11.3977 1.65804 11.7792 1.93934 12.0606C2.22064 12.3419 2.60218 12.4999 3 12.4999H13C13.3978 12.4999 13.7794 12.3419 14.0607 12.0606C14.342 11.7792 14.5 11.3977 14.5 10.9999V5.38256C14.5 4.67123 14 4.05323 13.2987 3.93656C13.0471 3.89465 12.7951 3.85576 12.5427 3.81989C12.3202 3.78947 12.107 3.71075 11.9181 3.58925C11.7293 3.46775 11.5693 3.30642 11.4493 3.11656L10.9013 2.23923C10.7783 2.03929 10.6088 1.87196 10.4074 1.75138C10.2059 1.63081 9.97836 1.56055 9.744 1.54656C8.58217 1.48415 7.41783 1.48415 6.256 1.54656C6.02164 1.56055 5.7941 1.63081 5.59264 1.75138C5.39118 1.87196 5.22174 2.03929 5.09867 2.23923L4.55133 3.11656Z" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M11 7.5C11 8.29565 10.6839 9.05871 10.1213 9.62132C9.55871 10.1839 8.79565 10.5 8 10.5C7.20435 10.5 6.44129 10.1839 5.87868 9.62132C5.31607 9.05871 5 8.29565 5 7.5C5 6.70435 5.31607 5.94129 5.87868 5.37868C6.44129 4.81607 7.20435 4.5 8 4.5C8.79565 4.5 9.55871 4.81607 10.1213 5.37868C10.6839 5.94129 11 6.70435 11 7.5ZM12.5 6H12.5053V6.00533H12.5V6Z" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Export PNG
                        {isExporting && <Spinner size="sm" className="ms-2" />}
                      </ReactstrapButton>
                      <ReactstrapButton 
                        color="transparent" 
                        onClick={exportLayout} 
                        className="d-flex align-items-center gap-2"
                      >
                        {/* <Download size={16} /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 11V12.5C2 12.8978 2.15804 13.2794 2.43934 13.5607C2.72064 13.842 3.10218 14 3.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5V11M11 8L8 11M8 11L5 8M8 11V2" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Export JSON
                      </ReactstrapButton>
                      <ReactstrapButton 
                        color="transparent" 
                        className="d-flex align-items-center gap-2">
                        <label style={{ cursor: 'pointer', marginBottom: 0, gap: '.5rem', display: 'flex' }}>
                          {/* <Upload size={16} /> */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 11V12.5C2 12.8978 2.15804 13.2794 2.43934 13.5607C2.72064 13.842 3.10218 14 3.5 14H12.5C12.8978 14 13.2794 13.842 13.5607 13.5607C13.842 13.2794 14 12.8978 14 12.5V11" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 5L8 2M8 2L11 5M8 2L8 11" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
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

                <Row className="align-items-center mb-3">
                  <Col>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">Build Area</h6>
                      <ReactstrapButton
                        color="transparent" 
                        onClick={() => setIsNotesOpen(!isNotesOpen)}
                        className="d-flex align-items-center gap-2 btn btn-transparent"
                      >
                        {isNotesOpen ? (
                          <>
                            <X size={16} />
                            Close Notes
                          </>
                        ) : (
                          <>
                            Add Notes
                          </>
                        )}
                      </ReactstrapButton>
                    </div>
                  </Col>
                </Row>
                {/* Notes Section */}
                {isNotesOpen && (
                <Row className="mb-4">
                  <Col>
                    <Card className="notes-section">
                      <CardBody>
                        <div className="notes-header mb-3">
                          <h5 className="mb-3">Notes</h5>
                          <div className="d-flex gap-2">
                            <Input
                              type="textarea"
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder={currentLayoutId 
                                ? "Add a note about this layout..." 
                                : "Save or load a layout to add notes"}
                              rows={2}
                              className="flex-grow-1"
                              disabled={!currentLayoutId || isSavingNote}
                            />
                            <Button
                              color="primary"
                              onClick={addNote}
                              disabled={!newNote.trim() || !currentLayoutId || isSavingNote}
                            >
                              {isSavingNote ? (
                                <>
                                  <span>Saving...</span>
                                  <Spinner size="sm" className="ms-2" />
                                </>
                              ) : (
                                'Add Note'
                              )}
                            </Button>
                          </div>
                          {!currentLayoutId && (
                            <small className="text-muted mt-2 d-block">
                              Save or load a layout to start adding notes
                            </small>
                          )}
                        </div>
                        
                        <div className="notes-list">
                          {notes.length === 0 ? (
                            <div className="text-muted text-center py-3">
                              {currentLayoutId 
                                ? "No notes yet. Add one above!" 
                                : "Notes will appear here when you load a layout"}
                            </div>
                          ) : (
                            notes.map((note) => (
                              <Card key={note.id} className="note-item mb-2">
                                <CardBody>
                                  <div className="d-flex justify-content-between align-items-start">
                                    <div className="note-content">
                                      <p className="mb-1">{note.text}</p>
                                      <small className="text-muted">
                                        {new Date(note.timestamp).toLocaleString()}
                                      </small>
                                    </div>
                                    <Button
                                      color="link"
                                      className="p-0 text-danger"
                                      onClick={() => deleteNote(note.id)}
                                    >
                                      <X size={16} />
                                    </Button>
                                  </div>
                                </CardBody>
                              </Card>
                            ))
                          )}
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              )}

                {/* Build Area */}
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

          <ProjectManagement
            isOpen={isProjectModalOpen}
            toggle={() => setIsProjectModalOpen(!isProjectModalOpen)}
            onProjectCreated={handleProjectCreated}
            onProjectSelected={handleProjectSelected}
            currentProject={currentProject}
            layouts={layouts}
            onLayoutAssigned={handleLayoutAssigned}
          />
        </Container>
      </DndProvider>
    </div>
  );
}

// Add some optional styling to improve the exported image
const styles = `
  .droppable-area {
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
