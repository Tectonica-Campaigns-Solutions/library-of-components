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
import { X, Save, Upload, Download, Cloud, CloudOff, Camera, ImageOff } from 'lucide-react';
import { db } from '../../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc, query, orderBy, Timestamp } from 'firebase/firestore';

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

interface SavedLayout {
  id: string;
  name: string;
  components: DroppedComponent[];
  notes: LayoutNote[];
  lastModified: number;
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

  // States for Notes
  const [notes, setNotes] = useState<LayoutNote[]>([]);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

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
      const newLayout: SavedLayout = {
        id: currentLayoutId || `layout-${Date.now()}`,
        name,
        components: droppedComponents,
        notes: notes,
        lastModified: Date.now()
      };

      // Save to Firestore
      const layoutsCollection = collection(db, 'layouts');
      const docRef = await addDoc(layoutsCollection, {
        ...newLayout,
        lastModified: Timestamp.fromDate(new Date())
      });

      const updatedLayout = {
        ...newLayout,
        firestoreId: docRef.id,
        synced: true
      };

      // Update layouts state
      setLayouts(prevLayouts => {
        const layoutIndex = prevLayouts.findIndex(l => l.id === newLayout.id);
        if (layoutIndex >= 0) {
          const updatedLayouts = [...prevLayouts];
          updatedLayouts[layoutIndex] = updatedLayout;
          return updatedLayouts;
        } else {
          return [...prevLayouts, updatedLayout];
        }
      });

      setCurrentLayoutId(newLayout.id);
      setCurrentLayoutName(name);
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

  // Add function to toggle category
  // const toggleCategory = (categoryId: string) => {
  //   setCategories(prevCategories =>
  //     prevCategories.map(category =>
  //       category.id === categoryId
  //         ? { ...category, isOpen: !category.isOpen }
  //         : category
  //     )
  //   );
  // };

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
            <Col md={2} style={{ backgroundColor: '#F8F8F8' }}>
            
              <div className="components-sidebar">
                <div className="components-header">
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
                  {categories.map((category) => (
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
                  ))}
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
                        <div className="d-flex align-items-center">
                          <h2 className="mb-2">{currentLayoutName}</h2>
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
                          newLayout();
                        }}
                        className="d-flex align-items-center gap-2"
                        disabled={isSyncing}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9.563 15.654L8.75 18.5L7.937 15.654C7.72687 14.9189 7.3329 14.2494 6.79226 13.7087C6.25162 13.1681 5.58214 12.7741 4.847 12.564L2 11.75L4.846 10.937C5.58114 10.7269 6.25062 10.3329 6.79126 9.79226C7.3319 9.25162 7.72587 8.58214 7.936 7.847L8.75 5L9.563 7.846C9.77313 8.58114 10.1671 9.25062 10.7077 9.79126C11.2484 10.3319 11.9179 10.7259 12.653 10.936L15.5 11.75L12.654 12.563C11.9189 12.7731 11.2494 13.1671 10.7087 13.7077C10.1681 14.2484 9.77413 14.9179 9.564 15.653L9.563 15.654ZM18.009 8.465L17.75 9.5L17.491 8.465C17.3427 7.87159 17.036 7.32962 16.6036 6.89703C16.1712 6.46444 15.6294 6.15749 15.036 6.009L14 5.75L15.036 5.491C15.6294 5.34251 16.1712 5.03556 16.6036 4.60297C17.036 4.17038 17.3427 3.62841 17.491 3.035L17.75 2L18.009 3.035C18.1573 3.62854 18.4642 4.17059 18.8968 4.60319C19.3294 5.03579 19.8715 5.34267 20.465 5.491L21.5 5.75L20.465 6.009C19.8715 6.15733 19.3294 6.46421 18.8968 6.89681C18.4642 7.32941 18.1573 7.87147 18.009 8.465ZM16.644 20.317L16.25 21.5L15.856 20.317C15.7455 19.9856 15.5594 19.6845 15.3125 19.4375C15.0655 19.1906 14.7644 19.0045 14.433 18.894L13.25 18.5L14.433 18.106C14.7644 17.9955 15.0655 17.8094 15.3125 17.5625C15.5594 17.3155 15.7455 17.0144 15.856 16.683L16.25 15.5L16.644 16.683C16.7545 17.0144 16.9406 17.3155 17.1875 17.5625C17.4345 17.8094 17.7356 17.9955 18.067 18.106L19.25 18.5L18.067 18.894C17.7356 19.0045 17.4345 19.1906 17.1875 19.4375C16.9406 19.6845 16.7545 19.9856 16.644 20.317Z" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Create
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
                        {currentLayoutId ? 'Update' : 'Save'}
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
                        Load
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M1.5 10.5L4.93933 7.06067C5.07862 6.92138 5.24398 6.81089 5.42597 6.7355C5.60796 6.66012 5.80302 6.62132 6 6.62132C6.19698 6.62132 6.39204 6.66012 6.57403 6.7355C6.75602 6.81089 6.92138 6.92138 7.06067 7.06067L10.5 10.5M9.5 9.5L10.4393 8.56067C10.5786 8.42138 10.744 8.31089 10.926 8.2355C11.108 8.16012 11.303 8.12132 11.5 8.12132C11.697 8.12132 11.892 8.16012 12.074 8.2355C12.256 8.31089 12.4214 8.42138 12.5607 8.56067L14.5 10.5M2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V4C14.5 3.73478 14.3946 3.48043 14.2071 3.29289C14.0196 3.10536 13.7652 3 13.5 3H2.5C2.23478 3 1.98043 3.10536 1.79289 3.29289C1.60536 3.48043 1.5 3.73478 1.5 4V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13ZM9.5 5.5H9.50533V5.50533H9.5V5.5ZM9.75 5.5C9.75 5.5663 9.72366 5.62989 9.67678 5.67678C9.62989 5.72366 9.5663 5.75 9.5 5.75C9.4337 5.75 9.37011 5.72366 9.32322 5.67678C9.27634 5.62989 9.25 5.5663 9.25 5.5C9.25 5.4337 9.27634 5.37011 9.32322 5.32322C9.37011 5.27634 9.4337 5.25 9.5 5.25C9.5663 5.25 9.62989 5.27634 9.67678 5.32322C9.72366 5.37011 9.75 5.4337 9.75 5.5Z" stroke="#0044C8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
