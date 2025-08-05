// Tipos principales de CMS Nova

export interface NovaConfig {
  auth: {
    secret: string;
    adminRoles: string[];
    baseUrl: string;
    requireEmailVerification?: boolean;
    sessionDuration?: number;
  };
  database: {
    url: string;
    provider: 'postgresql' | 'mysql' | 'sqlite';
  };
  ui: {
    theme: 'light' | 'dark';
    title: string;
    primaryColor?: string;
    logo?: string;
    customCSS?: string;
  };
  features: {
    users: boolean;
    plans: boolean;
    analytics?: boolean;
    fileManager?: boolean;
    backup?: boolean;
    contentTypes?: boolean;
  };
  permissions?: {
    customRoles?: string[];
    permissions?: Record<string, string[]>;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  role: string;
  image?: string;
}

export interface ContentType {
  id: string;
  name: string;
  apiIdentifier: string;
  description?: string;
  fields: Field[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Field {
  id: string;
  label: string;
  apiIdentifier: string;
  type: FieldType;
  isRequired: boolean;
  contentTypeId: string;
}

export enum FieldType {
  TEXT = 'TEXT',
  RICH_TEXT = 'RICH_TEXT',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  MEDIA = 'MEDIA'
}

export interface ContentEntry {
  id: string;
  contentTypeId: string;
  data: Record<string, any>;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: string;
  mainTitle: string;
  articleAlias: string;
  categoryAlias: string;
  promotionalText: string;
  attractionsTitle: string;
  attractionsText: string;
  transfersTitle: string;
  transfersText: string;
  holidayTitle: string;
  holidayText: string;
  destinationId?: string;
  includes: string;
  notIncludes: string;
  itinerary: any[];
  priceOptions: any[];
  generalPolicies?: string;
  transportOptions: any[];
  allowGroundTransport: boolean;
  videoUrl?: string;
  mainImage?: any;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
