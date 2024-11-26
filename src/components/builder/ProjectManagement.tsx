import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Card,
  CardBody,
  Spinner
} from 'reactstrap';
import { 
    collection, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    getDocs, 
    doc, 
    query, 
    orderBy, 
    Timestamp,
    where,
    DocumentData, 
    QueryDocumentSnapshot 
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { Folder, Plus, FolderOpen, X } from 'lucide-react';

// Interfaces
interface Project {
  firestoreId: string;
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
  projectId: string | null;
  project?: Project; // Add this field
  synced?: boolean;
}

interface Note {
  id: string;
  text: string;
  timestamp: number;
}

interface NewProject {
  name: string;
  description: string;
}

interface ProjectManagementProps {
  isOpen: boolean;
  toggle: () => void;
  onProjectCreated: (project: Project) => void;
  onProjectSelected: (project: Project) => void;
  currentProject: Project | null;
  layouts: Layout[];
  onLayoutAssigned: () => void;
  onLayoutSelected: (layout: Layout, project: Project) => void; // Add this prop
  loadLayout: (layoutId: string) => void;
  deleteLayout : (layoutId: string) => void;
  renderComponentsList: (components: any[]) => React.ReactNode;
  
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({
  isOpen,
  toggle,
  onProjectCreated,
  onProjectSelected,
  currentProject,
  layouts,
  onLayoutAssigned,
  loadLayout,
  deleteLayout,
  renderComponentsList,
  onLayoutSelected
}) => {
  // State
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<NewProject>({ name: '', description: '' });
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedLayouts, setSelectedLayouts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);



  const loadProjects = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const projectsCollection = collection(db, 'projects');
      const projectsQuery = query(projectsCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(projectsQuery);

      const projectsData: Project[] = await Promise.all(
        querySnapshot.docs.map(async (projectDoc: QueryDocumentSnapshot<DocumentData>) => {
          const projectData = projectDoc.data() as Omit<Project, 'firestoreId'>;
          
          // Get layouts for this project
          const layoutsCollection = collection(db, 'layouts');
          const layoutsQuery = query(layoutsCollection, where('projectId', '==', projectDoc.id));
          const layoutsSnapshot = await getDocs(layoutsQuery);
          const layoutsData = layoutsSnapshot.docs.map(doc => ({
            ...(doc.data() as Layout),
            firestoreId: doc.id
          }));

          return {
            ...projectData,
            firestoreId: projectDoc.id,
            layouts: layoutsData
          };
        })
      );

      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
      setError('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLayoutSelect = async (layout: Layout, project: Project) => {
    try {
      // Find the full project data for this layout
      const projectForLayout = projects.find(p => p.firestoreId === layout.projectId);
      
      if (!projectForLayout) {
        console.error('Project not found for layout:', layout);
        return;
      }
  
      console.log('Found project:', projectForLayout);
      
      // Call onLayoutSelected with both the layout and its project
      onLayoutSelected(layout, projectForLayout);
      toggle();
    } catch (error) {
      console.error('Error handling layout selection:', error);
    }
  };

  const renderLayoutsList = (projectLayouts: Layout[], project: Project) => {
    if (!projectLayouts || projectLayouts.length === 0) {
      return (
        <div className="text-muted small ps-4 py-2">
          No layouts in this project yet
        </div>
      );
    }
  
    return (
      <div className="layouts-list mt-2">
        {projectLayouts.map((layout) => (
          <div key={layout.id} className="layout-item py-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="fw-medium">
                <Button 
                  color="none" 
                  size="sm" 
                  outline
                  onClick={() => handleLayoutSelect(layout, project)} // Pass the project here
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 14V11.375C20 10.4799 19.6444 9.62145 19.0115 8.98851C18.3786 8.35558 17.5201 8 16.625 8H15.125C14.8266 8 14.5405 7.88147 14.3295 7.6705C14.1185 7.45952 14 7.17337 14 6.875V5.375C14 4.47989 13.6444 3.62145 13.0115 2.98851C12.3785 2.35558 11.5201 2 10.625 2H8.75M11 2H6.125C5.504 2 5 2.504 5 3.125V20.375C5 20.996 5.504 21.5 6.125 21.5H18.875C19.496 21.5 20 20.996 20 20.375V11C20 8.61305 19.0518 6.32387 17.364 4.63604C15.6761 2.94821 13.3869 2 11 2Z" stroke="#262626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span className='px-2'>{layout.name}</span>
                </Button>
              </div>
              {/* <div className="d-flex gap-2 ms-3">
                <Button
                  color="none"
                  size="sm"
                  outline
                  onClick={() => {
                    setDeleteLayoutId(layout.id);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect width="20" height="20" fill="white"/>
                    <path d="M12.2833 7.49995L11.995 14.9999M8.005 14.9999L7.71667 7.49995M16.0233 4.82495C16.3083 4.86828 16.5917 4.91411 16.875 4.96328M16.0233 4.82495L15.1333 16.3941C15.097 16.8651 14.8842 17.3051 14.5375 17.626C14.1908 17.9469 13.7358 18.1251 13.2633 18.1249H6.73667C6.26425 18.1251 5.80919 17.9469 5.46248 17.626C5.11578 17.3051 4.90299 16.8651 4.86667 16.3941L3.97667 4.82495M16.0233 4.82495C15.0616 4.67954 14.0948 4.56919 13.125 4.49411M3.97667 4.82495C3.69167 4.86745 3.40833 4.91328 3.125 4.96245M3.97667 4.82495C4.93844 4.67954 5.9052 4.56919 6.875 4.49411M13.125 4.49411V3.73078C13.125 2.74745 12.3667 1.92745 11.3833 1.89661C10.4613 1.86714 9.53865 1.86714 8.61667 1.89661C7.63333 1.92745 6.875 2.74828 6.875 3.73078V4.49411M13.125 4.49411C11.0448 4.33334 8.95523 4.33334 6.875 4.49411" stroke="#0044C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </Button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const createProject = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsCreatingProject(true);
    setError(null);

    try {
      const projectData = {
        name: newProject.name,
        description: newProject.description,
        createdAt: Timestamp.now(),
        lastModified: Timestamp.now()
      };

      const projectsCollection = collection(db, 'projects');
      const docRef = await addDoc(projectsCollection, projectData);

      const createdProject: Project = {
        ...projectData,
        firestoreId: docRef.id,
        layouts: []
      };

      setProjects(prev => [createdProject, ...prev]);
      setNewProject({ name: '', description: '' });
      setShowCreateForm(false);
      setSuccess('Project created successfully!');
      onProjectCreated(createdProject);
      
      // Auto-assign selected layouts if any
      if (selectedLayouts.length > 0) {
        await assignLayoutsToProject(selectedLayouts, docRef.id);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project');
    } finally {
      setIsCreatingProject(false);
    }
  };

  const assignLayoutsToProject = async (layoutIds: string[], projectId: string): Promise<void> => {
    try {
      await Promise.all(
        layoutIds.map(async (layoutId) => {
          const layoutRef = doc(db, 'layouts', layoutId);
          await updateDoc(layoutRef, {
            projectId: projectId,
            lastModified: Timestamp.now()
          });
        })
      );
      await loadProjects();
      onLayoutAssigned();
    } catch (error) {
      console.error('Error assigning layouts:', error);
      setError('Failed to assign layouts to project');
    }
  };

  const deleteProject = async (projectId: string): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      // Delete project document
      await deleteDoc(doc(db, 'projects', projectId));
      
      // Update all layouts to remove projectId
      const layoutsCollection = collection(db, 'layouts');
      const layoutsQuery = query(layoutsCollection, where('projectId', '==', projectId));
      const layoutsSnapshot = await getDocs(layoutsQuery);
      
      await Promise.all(
        layoutsSnapshot.docs.map(async (layoutDoc) => {
          await updateDoc(doc(db, 'layouts', layoutDoc.id), {
            projectId: null,
            lastModified: Timestamp.now()
          });
        })
      );

      setProjects(prev => prev.filter(p => p.firestoreId !== projectId));
      setSuccess('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewProject(prev => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setNewProject(prev => ({ ...prev, description: e.target.value }));
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className='projects-modal'>
      <ModalHeader toggle={toggle}>
        Projects
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        <div className="mb-4">
        
          {!showCreateForm ? (
            <Button
              color="primary"
              onClick={() => setShowCreateForm(true)}
              className="d-flex align-items-center gap-1"
            >
              Create New Project
            </Button>
          ) : (
            <Card>
              <CardBody>
                <Form onSubmit={createProject}>
                  <FormGroup>
                    <Label for="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      value={newProject.name}
                      onChange={handleNameChange}
                      placeholder="Enter project name"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="projectDescription">Description (Optional)</Label>
                    <Input
                      type="textarea"
                      id="projectDescription"
                      value={newProject.description}
                      onChange={handleDescriptionChange}
                      placeholder="Enter project description"
                      rows={3}
                    />
                  </FormGroup>
                  <div className="d-flex gap-2">
                    <Button
                      type="submit"
                      color="primary"
                      disabled={!newProject.name.trim() || isCreatingProject}
                    >
                      {isCreatingProject ? (
                        <>
                          <span>Creating...</span>
                          <Spinner size="sm" className="ms-2" />
                        </>
                      ) : (
                        'Create Project'
                      )}
                    </Button>
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewProject({ name: '', description: '' });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="projects-list">
          {isLoading ? (
            <div className="text-center py-4">
              <Spinner />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No projects yet. Create your first project above!
            </div>
          ) : (
            <>
              {projects.map((project) => (
                <Card 
                  key={project.firestoreId} 
                  className={`mb-3 ${project.firestoreId === currentProject?.firestoreId ? 'border-primary' : ''}`}
                >
                  <CardBody>
                    {/* Project Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3 border-bottom">
                      <div>
                        <h4 className="d-flex align-items-center gap-2 mb-2">
                          {project.name}
                          <Button
                            color="primary"
                            outline
                            size="sm"
                            onClick={() => onProjectSelected(project)}
                            disabled={project.firestoreId === currentProject?.firestoreId}
                          >
                            {project.firestoreId === currentProject?.firestoreId ? 'Current' : 'Open'}
                          </Button>
                        </h4>
                        {project.description && (
                          <p className="text-muted small mb-2">{project.description}</p>
                        )}
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          className='remove-project'
                          size="sm"
                          onClick={() => deleteProject(project.firestoreId)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect width="20" height="20" fill="none"/>
                            <path d="M12.2833 7.49995L11.995 14.9999M8.005 14.9999L7.71667 7.49995M16.0233 4.82495C16.3083 4.86828 16.5917 4.91411 16.875 4.96328M16.0233 4.82495L15.1333 16.3941C15.097 16.8651 14.8842 17.3051 14.5375 17.626C14.1908 17.9469 13.7358 18.1251 13.2633 18.1249H6.73667C6.26425 18.1251 5.80919 17.9469 5.46248 17.626C5.11578 17.3051 4.90299 16.8651 4.86667 16.3941L3.97667 4.82495M16.0233 4.82495C15.0616 4.67954 14.0948 4.56919 13.125 4.49411M3.97667 4.82495C3.69167 4.86745 3.40833 4.91328 3.125 4.96245M3.97667 4.82495C4.93844 4.67954 5.9052 4.56919 6.875 4.49411M13.125 4.49411V3.73078C13.125 2.74745 12.3667 1.92745 11.3833 1.89661C10.4613 1.86714 9.53865 1.86714 8.61667 1.89661C7.63333 1.92745 6.875 2.74828 6.875 3.73078V4.49411M13.125 4.49411C11.0448 4.33334 8.95523 4.33334 6.875 4.49411" stroke="#0044C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </Button>
                      </div>
                    </div>

                    {/* Project Layouts */}
                    <div className="layouts-section">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="text-muted small">
                          {project.layouts?.length || 0} layouts
                        </div>
                        <div className="flex-grow-1 ms-2"></div>
                      </div>
                      {renderLayoutsList(project.layouts || [])}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProjectManagement;