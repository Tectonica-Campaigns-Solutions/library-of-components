import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button as ReactstrapButton } from "reactstrap";
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { X } from 'lucide-react'; // Import X icon for delete button

import './page-builder.scss';

// Import custom components from 'tectonica-ui'
import {
  Accordion,
  AudioPlayer,
  Breadcrumbs,
  Button,
  ButtonList,
  Card as TectonicaCard,
  CardGrid,
  Carousel,
  FloatingButton,
  FloatingShareButtons,
  Footer,
  HandlerButton,
  Hero,
  HubspotForm,
  ImageGallery,
  ListPaginated,
  LoadingButton,
  MapboxPopup,
  MapboxWrapper,
  NarrativeBlock,
  NarrativeBlockAdvanced,
  Notification,
  ParallaxContentSection,
  PeopleDetail,
  ShareButtons,
  SidebarWrapper,
  Tabs,
  VideoModal,
  SplashPage,
} from 'tectonica-ui';

// Define item types for drag and drop
const ItemTypes = {
  CARD: "card",
  DROPPED_COMPONENT: "dropped_component"
};

// Define the type for a draggable component
interface DraggableCardProps {
  id: number;
  text: string;
  componentType: string;
}

// Define the type for a dropped component
interface DroppedComponent {
  uniqueId: string;
  id: number;
  text: string;
  componentType: string;
}

// Define the type for a dropped area component
interface DroppableAreaProps {
  onDrop: (id: number) => void;
  children: React.ReactNode;
}

// Add interface for draggable dropped component
interface DroppedComponentProps {
  id: string;
  index: number;
  children: React.ReactNode;
  moveComponent: (dragIndex: number, hoverIndex: number) => void;
  onDelete: (id: string) => void; // Add delete handler prop
}

interface Block {
  __typename: string;
  id: string;
  title: string;
  link: string;
  items: { title: string | ''; text: string }[];
  test?: any;
  content: string;
  hubspot: {
    id: string;
    formId: string;
    region: string;
    portalId: string;
  };
  ctas: any[];
  image: any;
}

interface BlocksBuilderProps {
  blocks: Block[];
  footer: any;
  activeItem?: number;
}

// Mapping component names to actual components
const componentMap: { [key: string]: React.ElementType } = {
  Accordion,
  AudioPlayer,
  Breadcrumbs,
  Button,
  ButtonList,
  Card: TectonicaCard,
  CardGrid,
  Carousel,
  FloatingButton,
  FloatingShareButtons,
  Footer,
  HandlerButton,
  Hero,
  HubspotForm,
  ImageGallery,
  ListPaginated,
  LoadingButton,
  MapboxPopup,
  MapboxWrapper,
  NarrativeBlock,
  NarrativeBlockAdvanced,
  Notification,
  ParallaxContentSection,
  PeopleDetail,
  ShareButtons,
  SidebarWrapper,
  Tabs,
  VideoModal,
  SplashPage,
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
      <Card className="card">
        <CardBody>
          <CardTitle className="card-title">{text}</CardTitle>
          <CardText className="card-text">{componentType}</CardText>
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
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DROPPED_COMPONENT,
    item: { type: ItemTypes.DROPPED_COMPONENT, id, index },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.DROPPED_COMPONENT,
    hover(item: any) {
      if (!item) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveComponent(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div 
      ref={(node) => drag(drop(node))} 
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '0.5rem',
        marginBottom: '0.5rem',
        backgroundColor: '#f8f9fa',
        border: '1px dashed #dee2e6',
        position: 'relative' // Added for absolute positioning of delete button
      }}
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
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }}
        title="Delete component"
      >
        <X size={16} color="#666666" />
      </button>
      {children}
    </div>
  );
};

// Droppable area for receiving dropped components
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
        border: '2px dashed #ced4da'
      }}
    >
      {children}
    </div>
  );
};

// Function to render dropped components dynamically
const renderDroppedComponent = (comp: DroppedComponent) => {
  const ComponentToRender = componentMap[comp.componentType];

  switch (ComponentToRender) {
    case Accordion:
      const accordionBlock = {
        items: [
          { title: "Accordion Item 1", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
          { title: "Accordion Item 2", text: "Nullam nec purus ac libero" },
        ],
      };
      return (
        <Accordion key={comp.uniqueId} block={accordionBlock} variant="default" />
      );
    case Breadcrumbs:
      const breadcrumbsBlock = {
        items: [
          { title: "Home", link: "/" },
          { title: "Products", link: "/products" },
          { title: "Product 1", link: "/products/product-1" },
        ],
      };
      return (
        <Breadcrumbs key={comp.uniqueId} block={breadcrumbsBlock} currentPage="Builder" />
      );
    case Button:
      const buttonBlock = {
        title: "Click Me",
        link: "https://example.com",
        variant: "primary",
        size: "lg",
        icon: "🔔",
      };
      return (
        <Button key={comp.uniqueId} block={buttonBlock} />
      );
    case Card:
      const cardBlock = {
        title: "Card title",
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        cta: { 
          title: "Learn More", 
          link: "https://example.com"
        },
        backgroundColor: "#ffffff",
        tags: [{ 
          id: 1,
          name: "tag1", 
        }],
        date: "2023-10-01",
        image: { 
          id: "1",
          url: "https://via.placeholder.com/400x200" 
        },
        typeOfCard: "default",
        displayCta: true,
      };
      console.log('Card component is not implemented yet. Please implement it first.');
      return (
        <>
        </>
      );
    case Hero:
      const heroBlock = {
        title: "This is a Welcome message",
        subtitle: "This is the subtitle",
        introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ac libero",
        ctas: [{
          title: "Learn More",
          link: "https://example.com",
        }],
      };
      return (
        <Hero key={comp.uniqueId} {...heroBlock} />
      );
  }

  return ComponentToRender ? <ComponentToRender key={comp.uniqueId} /> : null;
};

function PageBuilder({ blocks }: BlocksBuilderProps) {
  // Initial available components
  const [components] = useState<{ id: number; text: string; componentType: string }[]>([
    { id: 1, text: "Accordion", componentType: "Accordion" },
    { id: 2, text: "Audio Player", componentType: "AudioPlayer" },
    { id: 3, text: "Breadcrumbs", componentType: "Breadcrumbs" },
    { id: 4, text: "Button", componentType: "Button" },
    { id: 5, text: "Button List", componentType: "ButtonList" },
    { id: 6, text: "Card", componentType: "Card" },
    { id: 7, text: "Card Grid", componentType: "CardGrid" },
    { id: 8, text: "Carousel", componentType: "Carousel" },
    { id: 9, text: "Floating Button", componentType: "FloatingButton" },
    { id: 10, text: "Floating Share Buttons", componentType: "FloatingShareButtons" },
    { id: 11, text: "Footer", componentType: "Footer" },
    { id: 12, text: "Handler Button", componentType: "HandlerButton" },
    { id: 13, text: "Hero", componentType: "Hero" },
    { id: 14, text: "Hubspot Form", componentType: "HubspotForm" },
    { id: 15, text: "Image Gallery", componentType: "ImageGallery" },
    { id: 16, text: "List Paginated", componentType: "ListPaginated" },
    { id: 17, text: "Loading Button", componentType: "LoadingButton" },
    { id: 18, text: "Mapbox Popup", componentType: "MapboxPopup" },
    { id: 19, text: "Mapbox Wrapper", componentType: "MapboxWrapper" },
    { id: 20, text: "Narrative Block", componentType: "NarrativeBlock" },
    { id: 21, text: "Narrative Block Advanced", componentType: "NarrativeBlockAdvanced" },
    { id: 22, text: "Notification", componentType: "Notification" },
    { id: 23, text: "Parallax Content Section", componentType: "ParallaxContentSection" },
    { id: 24, text: "People Detail", componentType: "PeopleDetail" },
    { id: 25, text: "Share Buttons", componentType: "ShareButtons" },
    { id: 26, text: "Sidebar Wrapper", componentType: "SidebarWrapper" },
    { id: 27, text: "Tabs", componentType: "Tabs" },
    { id: 28, text: "Video Modal", componentType: "VideoModal" },
    { id: 29, text: "Splash Page", componentType: "SplashPage" },
  ]);

  // State to track dropped components
  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);

  // Generate unique identifier for each dropped instance
  const generateUniqueId = () => {
    return `${Date.now()}-${Math.random()}`;
  };  

  // Handle the initial drop action
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

  // Handle reordering of components
  const moveComponent = (dragIndex: number, hoverIndex: number) => {
    const dragComponent = droppedComponents[dragIndex];
    setDroppedComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      newComponents.splice(dragIndex, 1);
      newComponents.splice(hoverIndex, 0, dragComponent);
      return newComponents;
    });
  };

  // Add delete handler
  const handleDelete = (id: string) => {
    setDroppedComponents(prevComponents => 
      prevComponents.filter(comp => comp.uniqueId !== id)
    );
  };  

  return (
    <div className="page-builder">
      <DndProvider backend={HTML5Backend}>
        <Container fluid={true}>
          <Row>
            <Col md={2}>
              <h4>Available Components</h4>
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
                      {renderDroppedComponent(comp)}
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
