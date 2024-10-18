import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button as ReactstrapButton } from "reactstrap";
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './page-builder.css'; // Importing the styles

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
};

// Define the type for a draggable component
interface DraggableCardProps {
    id: number;
    text: string;
    componentType: string;
  }
  
  // Define the type for a dropped component
  interface DroppedComponent {
    uniqueId: string; // Unique ID for each dropped instance
    id: number;
    text: string;
    componentType: string;
  }
  
  // Define the type for a dropped area component
  interface DroppableAreaProps {
    onDrop: (id: number) => void;
    children: React.ReactNode;
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

// Draggable component
const DraggableCard: React.FC<DraggableCardProps> = ({ id, text, componentType }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id },
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

// Droppable area for receiving dropped components
const DroppableArea: React.FC<DroppableAreaProps> = ({ children, onDrop }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: { id: number }) => onDrop(item.id),
  });

  return (
    <div
      ref={drop}
      className="droppable-area"
    >
      {children}
    </div>
  );
};

// Function to render dropped components dynamically
const renderDroppedComponent = (comp: DroppedComponent) => {
  const ComponentToRender = componentMap[comp.componentType];

  // Handling the Button component with block object
  if (ComponentToRender === Button) {
    const buttonBlock = {
      title: "Click Me",
      link: "https://example.com",
      variant: "primary", // e.g., "primary", "secondary"
      size: "lg", // e.g., "sm", "lg"
      icon: "🔔", // optional icon
    };

    return (
      <ReactstrapButton
        key={comp.id}
        href={buttonBlock.link} // Apply link as href
        color={buttonBlock.variant} // Apply variant as color
        size={buttonBlock.size} // Apply size
        className="mb-2"
        block
      >
        {buttonBlock.icon} {buttonBlock.title}
      </ReactstrapButton>
    );
  }

  return ComponentToRender ? <ComponentToRender key={comp.uniqueId} /> : null;
};

// Main dashboard component
const PageBuilder: React.FC = () => {
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

  // Handle the drop action
  const handleDrop = (id: number) => {
    const component = components.find((comp) => comp.id === id);
    if (component) {
      const newDroppedComponent = {
        ...component,
        uniqueId: generateUniqueId(),  // Assign a unique ID to each dropped component
      };
      setDroppedComponents([...droppedComponents, newDroppedComponent]);
    }
  };

  return (
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
                    <div key={comp.uniqueId} className="mb-3">
                        {renderDroppedComponent(comp)}
                    </div>
                ))}
                </DroppableArea>
            </Container>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default PageBuilder;
