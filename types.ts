import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  icon: string;
}

export type Section = 'hero' | 'about' | 'projects' | 'contact';

export interface NavItem {
  id: Section;
  label: string;
  icon: React.ReactNode;
}