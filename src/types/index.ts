// src/types/index.ts

export interface ComponentNote {
    id: string;
    text: string;
    timestamp: number;
  }
  
  export interface DroppedComponent {
    uniqueId: string;
    id: number;
    text: string;
    componentType: string;
    notes?: ComponentNote[];
  }