import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProfileStore } from '../../store/useProfileStore';
import { IncomeBracketSelect } from './income/IncomeBracketSelect';
import { OccupationSelect } from './occupation/OccupationSelect';
import { CitySelect } from './city/CitySelect';
import { useFormAutoSubmit } from '../../hooks/useFormAutoSubmit';

const basicDetailsSchema = z.object({
  income: z.string().min(1, 'Please select your annual income'),
  occupation: z.string().min(1, 'Please select your occupation'),
  city: z.string().min(1, 'Please select your city'),
});

type BasicDetailsForm = z.infer<typeof basicDetailsSchema>;

interface BasicDetailsProps {
  onNext: () => void;
}

export function BasicDetails({ onNext }: BasicDetailsProps) {
  const { basicDetails, setBasicDetails } = useProfileStore();
  
  const form = useForm<BasicDetailsForm>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: basicDetails || {
      income: '',
      occupation: '',
      city: '',
    },
  });

  const { formState: { errors }, setValue, watch } = form;
  const values = watch();

  // Use custom hook for form auto-submission
  useFormAutoSubmit({
    values,
    schema: basicDetailsSchema,
    onValidSubmit: (data) => {
      setBasicDetails(data);
      onNext();
    },
  });

  return (
    <div className="space-y-6">
      <IncomeBracketSelect
        value={values.income}
        onChange={(value) => setValue('income', value)}
        error={errors.income?.message}
      />

      <OccupationSelect
        value={values.occupation}
        onChange={(value) => setValue('occupation', value)}
        error={errors.occupation?.message}
      />

      <CitySelect
        value={values.city}
        onChange={(value) => setValue('city', value)}
        error={errors.city?.message}
      />
    </div>
  );
}