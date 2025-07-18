import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SUBJECTS } from '@/data/subjects';
import { Student } from '@/data/students';
import { X, Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

const studentSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  address: z.string().optional(),
  enrollmentDate: z.string().min(1, 'Enrollment date is required'),
  status: z.enum(['active', 'inactive', 'graduated']),
  subjectIds: z
    .array(z.string())
    .min(1, 'At least one subject must be selected'),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  student?: Student;
  onSave: (student: Omit<Student, 'id'>) => void;
  onCancel: () => void;
}

interface MultiSelectProps {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const toggleValue = (val: string) => {
    const updated = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val];

    onChange(updated);
    setOpen(false);
  };

  const selectedLabels = options
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border px-3 py-2 rounded bg-white flex justify-between items-center text-sm"
      >
        <span
          className={clsx('truncate', { 'text-gray-500': !selected.length })}
        >
          {selected.length
            ? selectedLabels.join(', ')
            : placeholder || 'Select options'}
        </span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
          {options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <div
                key={opt.value}
                onClick={() => toggleValue(opt.value)}
                className={clsx(
                  'cursor-pointer px-3 py-2 text-sm flex justify-between items-center hover:bg-gray-100',
                  { 'bg-gray-100': isSelected }
                )}
              >
                {opt.label}
                {isSelected && <Check className="w-4 h-4 text-green-500" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function StudentForm({ student, onSave, onCancel }: StudentFormProps) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      enrollmentDate: '',
      subjectIds: [],
      status: 'active',
    },
  });

  useEffect(() => {
    if (student) {
      reset(student);
    }
  }, [student, reset]);

  const subjectOptions = SUBJECTS.map((s) => ({
    label: `${s.name} (${s.code})`,
    value: s.id,
  }));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {student ? 'Edit Student' : 'Create New Student'}
            </CardTitle>
            <Button size="icon" variant="ghost" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSave)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input {...register('firstName')} />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Last Name</Label>
                <Input {...register('lastName')} />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Phone</Label>
                <Input {...register('phone')} />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input type="date" {...register('dateOfBirth')} />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Textarea {...register('address')} rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Enrollment Date</Label>
                <Input type="date" {...register('enrollmentDate')} />
                {errors.enrollmentDate && (
                  <p className="text-sm text-red-500">
                    {errors.enrollmentDate.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="graduated">Graduated</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div>
              <Label>Subjects</Label>
              <Controller
                name="subjectIds"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    options={subjectOptions}
                    selected={field.value}
                    onChange={field.onChange}
                    placeholder="Select subjects..."
                  />
                )}
              />
              {errors.subjectIds && (
                <p className="text-sm text-red-500">
                  {errors.subjectIds.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
              >
                {student ? 'Update Student' : 'Create Student'}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
