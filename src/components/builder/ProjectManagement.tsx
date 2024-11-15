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
  components: any[]; // Replace with your actual component type
  notes: Note[];
  lastModified: number;
  firestoreId?: string;
  projectId?: string;
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
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({
  isOpen,
  toggle,
  onProjectCreated,
  onProjectSelected,
  currentProject,
  layouts,
  onLayoutAssigned
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
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>
        Project Management
      </ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        <div className="mb-4">
        
          {!showCreateForm ? (
            <Button
              color="primary"
              onClick={() => setShowCreateForm(true)}
              className="d-flex align-items-center gap-2"
            >
              <Plus size={16} />
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

        <h5 className="mb-3">Your Projects</h5>
        {isLoading ? (
          <div className="text-center py-4">
            <Spinner />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-4 text-muted">
            No projects yet. Create your first project above!
          </div>
        ) : (
          <div className="projects-list">
            {projects.map((project) => (
              <Card key={project.firestoreId} className="mb-3">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="d-flex align-items-center gap-2 mb-2">
                        {project.firestoreId === currentProject?.firestoreId ? (
                          <FolderOpen size={20} className="text-primary" />
                        ) : (
                          <Folder size={20} />
                        )}
                        {project.name}
                      </h6>
                      {project.description && (
                        <p className="text-muted small mb-2">{project.description}</p>
                      )}
                      <div className="text-muted small">
                        {/* Created: {project.createdAt?.toDate().toLocaleDateString()} */}
                        <br />
                        Layouts: {project.layouts?.length || 0}
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        color="primary"
                        outline
                        size="sm"
                        onClick={() => onProjectSelected(project)}
                        disabled={project.firestoreId === currentProject?.firestoreId}
                      >
                        {project.firestoreId === currentProject?.firestoreId ? 'Current' : 'Select'}
                      </Button>
                      <Button
                        color="danger"
                        outline
                        size="sm"
                        onClick={() => deleteProject(project.firestoreId)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProjectManagement;