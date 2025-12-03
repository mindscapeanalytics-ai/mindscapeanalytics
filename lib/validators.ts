/**
 * Input validation schemas using Zod
 * Used to validate API request bodies and parameters
 */

import { z } from 'zod';

// Chat API validation
export const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, 'Message content cannot be empty').max(10000, 'Message too long'),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1, 'At least one message is required').max(50, 'Too many messages'),
});

// Prediction API validation
export const predictionRequestSchema = z.object({
  data: z.array(z.any()).min(1, 'Data array cannot be empty'),
  target: z.string().min(1, 'Target field is required'),
  horizon: z.number().int().min(1).max(24).default(12),
  features: z.array(z.string()).optional().default([]),
});

// NLP API validation
export const nlpRequestSchema = z.object({
  text: z.string().min(1, 'Text is required').max(50000, 'Text too long'),
  options: z.object({
    detectSentiment: z.boolean().optional(),
    detectEntities: z.boolean().optional(),
    detectLanguage: z.boolean().optional(),
    generateSummary: z.boolean().optional(),
  }).optional().default({}),
});

// Vision API validation
export const visionRequestSchema = z.object({
  imageUrl: z.string().url('Image URL must be a valid URL'),
  options: z.object({
    detectText: z.boolean().optional(),
    detectObjects: z.boolean().optional(),
    detectFaces: z.boolean().optional(),
    detectLabels: z.boolean().optional(),
  }).optional().default({}),
});

// ContentForge API validation
export const contentForgeRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required').max(5000, 'Prompt too long'),
  type: z.enum(['text', 'image', 'code', 'blog', 'social', 'email', 'ad']).default('text'),
  options: z.record(z.any()).optional().default({}),
});

// User registration validation
export const registerUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// User login validation
export const loginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Type exports for TypeScript
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type PredictionRequest = z.infer<typeof predictionRequestSchema>;
export type NLPRequest = z.infer<typeof nlpRequestSchema>;
export type VisionRequest = z.infer<typeof visionRequestSchema>;
export type ContentForgeRequest = z.infer<typeof contentForgeRequestSchema>;
export type RegisterUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;

