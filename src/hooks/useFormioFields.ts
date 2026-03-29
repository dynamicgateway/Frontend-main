/**
 * Hook to fetch form field definitions from Dynamic Gateway
 * Allows keeping MUNI's UI while managing field logic via Form.io
 */

import { useState, useEffect } from 'react';

interface FormField {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  validate?: {
    required?: boolean;
    pattern?: string;
    custom?: string;
  };
}

interface FormDefinition {
  fields: FormField[];
  submitLabel?: string;
}

export const useFormioFields = (formId: string, apiBaseUrl: string = 'http://localhost:5173') => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormDefinition = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `${apiBaseUrl}/api/forms?id=${formId}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success || !data.form || !data.form.formio) {
          throw new Error('Invalid form data');
        }

        // Extract field definitions from Form.io structure
        const formioComponents = data.form.formio.components || [];
        const fieldDefinitions: FormField[] = formioComponents
          .filter((comp: any) => comp.type !== 'button') // Exclude buttons
          .map((comp: any) => ({
            key: comp.key,
            label: comp.label,
            type: comp.type,
            placeholder: comp.placeholder,
            validate: comp.validate,
          }));

        setFields(fieldDefinitions);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch form definition');
        setLoading(false);
      }
    };

    fetchFormDefinition();
  }, [formId, apiBaseUrl]);

  return { fields, loading, error };
};

/**
 * Submit form data to Dynamic Gateway for processing
 */
export const submitToFormio = async (
  formId: string,
  data: any,
  apiBaseUrl: string = 'http://localhost:5173'
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const url = `${apiBaseUrl}/api/forms/${formId}/submit`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`Submission failed: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};
