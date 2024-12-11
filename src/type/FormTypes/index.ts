import { LoginFormSchema } from '@/schemas';
import { z } from 'zod';

export type LoginFormFieldsProps = {
  fieldName: keyof z.infer<typeof LoginFormSchema>;
  fieldType: 'text' | 'email' | 'password';
  placeholder: string;
};
